import { useEffect, useRef, useState } from 'react';

import { observatory, portrait } from '../assets';

const STAR = [232, 238, 248];
const SAMPLE_W = 128;
const SAMPLE_H = 160;
const IN_DURATION = 1.6;
const OUT_DURATION = 0.9;
const PORTRAIT_ANCHOR = [0.5, 0.5];
const SCOPE_ANCHOR = [0.5, 0.42];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const particleCap = () => (window.matchMedia('(max-width: 768px)').matches ? 3200 : 6200);

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const smoothstep = (value) => {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
};

const mix = (a, b, t) => a + (b - a) * t;

const rand = (index, salt) => {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const luma = (r, g, b) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

const drawCover = (ctx, image, dw, dh, ax, ay) => {
  const imageRatio = image.width / image.height;
  const destRatio = dw / dh;
  let sx;
  let sy;
  let sw;
  let sh;

  if (imageRatio > destRatio) {
    sh = image.height;
    sw = image.height * destRatio;
    sx = (image.width - sw) * ax;
    sy = 0;
  } else {
    sw = image.width;
    sh = image.width / destRatio;
    sx = 0;
    sy = (image.height - sh) * ay;
  }

  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, dw, dh);
};

const readCover = (image, anchor) => {
  const canvas = document.createElement('canvas');
  canvas.width = SAMPLE_W;
  canvas.height = SAMPLE_H;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  drawCover(ctx, image, SAMPLE_W, SAMPLE_H, anchor[0], anchor[1]);
  return ctx.getImageData(0, 0, SAMPLE_W, SAMPLE_H).data;
};

const samplePortrait = (data) => {
  const points = [];

  for (let y = 0; y < SAMPLE_H; y += 1) {
    for (let x = 0; x < SAMPLE_W; x += 1) {
      const i = (y * SAMPLE_W + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const light = luma(r, g, b);
      if (light > 0.56 || light < 0.035) continue;
      points.push({ x: x / SAMPLE_W, y: y / SAMPLE_H, r, g, b });
    }
  }

  return points;
};

const sampleTelescope = (data) => {
  const points = [];

  for (let y = 0; y < SAMPLE_H; y += 1) {
    for (let x = 0; x < SAMPLE_W; x += 1) {
      const i = (y * SAMPLE_W + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const light = luma(r, g, b);
      const ny = y / SAMPLE_H;
      const sky = b > r + 8 && b > g - 6 && ny < 0.5 && light > 0.2 && light < 0.78;
      if (sky) continue;
      if (light > 0.88 && ny < 0.38) continue;
      if (light < 0.03 && ny > 0.82) continue;
      points.push({ x: x / SAMPLE_W, y: y / SAMPLE_H, r, g, b });
    }
  }

  return points;
};

const subsample = (points, limit) => {
  if (points.length <= limit) return points;
  const step = points.length / limit;
  return Array.from({ length: limit }, (_, index) => points[Math.floor(index * step)]);
};

const sortKey = (point) => point.y * 4 + point.x;

const buildParticles = (fromPoints, toPoints) => {
  const limit = particleCap();
  const from = subsample(
    [...fromPoints].sort((a, b) => sortKey(a) - sortKey(b)),
    limit
  );
  const to = subsample(
    [...toPoints].sort((a, b) => sortKey(a) - sortKey(b)),
    limit
  );
  const count = Math.min(from.length, to.length);
  const sx = new Float32Array(count);
  const sy = new Float32Array(count);
  const dx = new Float32Array(count);
  const dy = new Float32Array(count);
  const ex = new Float32Array(count);
  const ey = new Float32Array(count);
  const sr = new Float32Array(count);
  const sg = new Float32Array(count);
  const sb = new Float32Array(count);
  const er = new Float32Array(count);
  const eg = new Float32Array(count);
  const eb = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const start = from[i];
    const end = to[i];
    const angle = rand(i, 1) * Math.PI * 2;
    const dist = 0.06 + rand(i, 2) * 0.2;
    sx[i] = start.x;
    sy[i] = start.y;
    ex[i] = end.x;
    ey[i] = end.y;
    dx[i] = clamp(mix(start.x, 0.5, 0.55) + Math.cos(angle) * dist, 0.04, 0.96);
    dy[i] = clamp(mix(start.y, 0.42, 0.55) + Math.sin(angle) * dist - 0.04, 0.04, 0.96);
    sr[i] = start.r;
    sg[i] = start.g;
    sb[i] = start.b;
    er[i] = end.r;
    eg[i] = end.g;
    eb[i] = end.b;
  }

  return { count, sx, sy, dx, dy, ex, ey, sr, sg, sb, er, eg, eb };
};

const PortraitDust = () => {
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const portraitRef = useRef(null);
  const hintRef = useRef(null);
  const scopeRef = useRef(null);
  const particlesRef = useRef(null);
  const tRef = useRef(0);
  const heldRef = useRef(false);
  const visibleRef = useRef(true);
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  const lastTouchRef = useRef(0);
  const touchTimerRef = useRef(0);
  const toggleRef = useRef(() => {});
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!prefersReducedMotion()) return undefined;
    const frame = frameRef.current;
    if (!frame) return undefined;

    const apply = (next) => {
      heldRef.current = next;
      setRevealed(next);
      if (portraitRef.current) portraitRef.current.style.opacity = next ? '0' : '1';
      if (scopeRef.current) scopeRef.current.style.opacity = next ? '1' : '0';
    };

    const onEnter = () => apply(true);
    const onLeave = () => apply(false);
    const onDown = (event) => {
      if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
      event.preventDefault();
      apply(!heldRef.current);
    };

    toggleRef.current = () => apply(!heldRef.current);
    frame.addEventListener('pointerenter', onEnter);
    frame.addEventListener('pointerleave', onLeave);
    frame.addEventListener('pointerdown', onDown);
    frame.addEventListener('focus', onEnter);
    frame.addEventListener('blur', onLeave);

    return () => {
      frame.removeEventListener('pointerenter', onEnter);
      frame.removeEventListener('pointerleave', onLeave);
      frame.removeEventListener('pointerdown', onDown);
      frame.removeEventListener('focus', onEnter);
      frame.removeEventListener('blur', onLeave);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return undefined;

    const ctx = canvas.getContext('2d');
    let cancelled = false;

    const sizeCanvas = () => {
      const rect = frame.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const nextW = Math.max(1, Math.round(rect.width * dpr));
      const nextH = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width === nextW && canvas.height === nextH) return false;
      canvas.width = nextW;
      canvas.height = nextH;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    };

    const applyOpacities = (t) => {
      if (portraitRef.current) {
        portraitRef.current.style.opacity = String(1 - smoothstep(t / 0.32));
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(1 - smoothstep(t / 0.32));
      }
      if (scopeRef.current) {
        scopeRef.current.style.opacity = String(smoothstep((t - 0.78) / 0.22));
      }
      canvas.style.opacity = String(
        t <= 0 || t >= 1 ? 0 : Math.min(smoothstep(t / 0.06), smoothstep((1 - t) / 0.12))
      );
    };

    const draw = (t) => {
      const particles = particlesRef.current;
      const rect = frame.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      ctx.clearRect(0, 0, width, height);
      if (!particles || t <= 0) return;

      const e = smoothstep(t);
      const dust = e < 0.48 ? smoothstep(e / 0.48) : 1;
      const form = e < 0.48 ? 0 : smoothstep((e - 0.48) / 0.52);
      const { count, sx, sy, dx, dy, ex, ey, sr, sg, sb, er, eg, eb } = particles;

      for (let i = 0; i < count; i += 1) {
        const x = mix(mix(sx[i], dx[i], dust), ex[i], form);
        const y = mix(mix(sy[i], dy[i], dust), ey[i], form);
        const r = mix(mix(sr[i], STAR[0], dust), er[i], form);
        const g = mix(mix(sg[i], STAR[1], dust), eg[i], form);
        const b = mix(mix(sb[i], STAR[2], dust), eb[i], form);
        const spark = i % 17 === 0;
        const size = mix(1.15, spark ? 2.3 : 1.8, dust * (1 - form));
        ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
        ctx.fillRect(x * width, y * height, size, size);
      }
    };

    const loop = (now) => {
      if (cancelled || (!visibleRef.current && !heldRef.current)) {
        rafRef.current = 0;
        return;
      }

      if (!particlesRef.current) {
        if (heldRef.current) {
          lastRef.current = now;
          rafRef.current = window.requestAnimationFrame(loop);
        } else {
          rafRef.current = 0;
        }
        return;
      }

      const dt = Math.min(0.048, lastRef.current ? (now - lastRef.current) / 1000 : 0.016);
      lastRef.current = now;

      const held = heldRef.current;
      const duration = held ? IN_DURATION : OUT_DURATION;
      const target = held ? 1 : 0;
      let t = tRef.current;

      if (t !== target) {
        t = clamp(t + (target > t ? dt : -dt) / duration, 0, 1);
        tRef.current = t;
      }

      draw(t);
      applyOpacities(t);

      if (t !== target) {
        rafRef.current = window.requestAnimationFrame(loop);
      } else {
        rafRef.current = 0;
      }
    };

    const kick = () => {
      if (cancelled || rafRef.current) return;
      if (!visibleRef.current && !heldRef.current) return;
      lastRef.current = 0;
      rafRef.current = window.requestAnimationFrame(loop);
    };

    const setHeld = (next) => {
      heldRef.current = next;
      setRevealed(next);
      kick();
    };

    const hoverNone = () => window.matchMedia('(hover: none)').matches;

    const isTouchLike = (event) =>
      event.pointerType === 'touch' ||
      event.pointerType === 'pen' ||
      (event.pointerType !== 'mouse' && hoverNone());

    const fromRecentTouch = () => performance.now() - lastTouchRef.current < 700;

    const toggleTouch = () => {
      window.clearTimeout(touchTimerRef.current);
      const next = !heldRef.current;
      setHeld(next);
      if (next) {
        touchTimerRef.current = window.setTimeout(() => setHeld(false), 4000);
      }
    };
    toggleRef.current = toggleTouch;

    const onPointerDown = (event) => {
      if (!isTouchLike(event)) return;
      event.preventDefault();
      lastTouchRef.current = performance.now();
      toggleTouch();
    };

    const onPointerEnter = (event) => {
      if (fromRecentTouch() || isTouchLike(event) || hoverNone()) return;
      setHeld(true);
    };

    const onPointerLeave = (event) => {
      if (fromRecentTouch() || isTouchLike(event) || hoverNone()) return;
      setHeld(false);
    };

    const onFocus = () => {
      if (fromRecentTouch() || hoverNone()) return;
      setHeld(true);
    };

    const onBlur = () => {
      if (fromRecentTouch() || hoverNone()) return;
      setHeld(false);
    };

    const syncHeldFromPointer = () => {
      if (hoverNone()) return;
      if (frame.matches(':hover') || frame === document.activeElement) setHeld(true);
    };

    sizeCanvas();

    const resize = new ResizeObserver(() => {
      if (sizeCanvas()) draw(tRef.current);
    });
    resize.observe(frame);

    const intersect = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting || heldRef.current) kick();
        else if (rafRef.current) {
          window.cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        }
      },
      { threshold: 0.05 }
    );
    intersect.observe(frame);

    frame.addEventListener('pointerdown', onPointerDown);
    frame.addEventListener('pointerenter', onPointerEnter);
    frame.addEventListener('pointerleave', onPointerLeave);
    frame.addEventListener('focus', onFocus);
    frame.addEventListener('blur', onBlur);
    syncHeldFromPointer();

    const decode = (image) =>
      image && image.decode ? image.decode().catch(() => {}) : Promise.resolve();

    Promise.all([
      decode(portraitRef.current),
      decode(scopeRef.current),
      loadImage(portrait),
      loadImage(observatory),
    ])
      .then(([, , fromImage, toImage]) => {
        if (cancelled) return;
        particlesRef.current = buildParticles(
          samplePortrait(readCover(fromImage, PORTRAIT_ANCHOR)),
          sampleTelescope(readCover(toImage, SCOPE_ANCHOR))
        );
        draw(0);
        syncHeldFromPointer();
        if (heldRef.current || tRef.current > 0) kick();
      })
      .catch(() => {});

    applyOpacities(0);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafRef.current);
      window.clearTimeout(touchTimerRef.current);
      resize.disconnect();
      intersect.disconnect();
      frame.removeEventListener('pointerdown', onPointerDown);
      frame.removeEventListener('pointerenter', onPointerEnter);
      frame.removeEventListener('pointerleave', onPointerLeave);
      frame.removeEventListener('focus', onFocus);
      frame.removeEventListener('blur', onBlur);
    };
  }, []);

  return (
    <figure
      ref={frameRef}
      role="button"
      tabIndex={0}
      className="portrait-dust"
      aria-pressed={revealed}
      aria-label="Portrait of Anuj Parashar. Activate to reveal a night photograph at the telescope."
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        toggleRef.current();
      }}
    >
      <img
        ref={portraitRef}
        src={portrait}
        alt="Anuj Parashar, Senior Frontend Engineer"
        className="object-cover object-center contrast-[1.04]"
      />
      <img
        ref={scopeRef}
        src={observatory}
        alt=""
        className="portrait-dust-scope object-cover object-[50%_42%] contrast-[1.04]"
        aria-hidden="true"
      />
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/55 via-transparent to-transparent" />
      <p ref={hintRef} className="portrait-dust-hint">
        Tap to reveal
      </p>
    </figure>
  );
};

export default PortraitDust;
