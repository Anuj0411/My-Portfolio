import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const smoothstep = (t) => t * t * (3 - 2 * t);

const fillBox = (count, [sx, sy, sz]) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * sx;
    positions[i * 3 + 1] = (Math.random() - 0.5) * sy;
    positions[i * 3 + 2] = (Math.random() - 0.5) * sz;
  }
  return positions;
};

const useFlightState = () => {
  const progress = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const reduceMotion = useRef(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      reduceMotion.current = motionQuery.matches;
    };
    syncMotion();
    motionQuery.addEventListener('change', syncMotion);

    const onScroll = () => {
      if (reduceMotion.current) {
        progress.current = 0.08;
        return;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const onMouse = (event) => {
      if (reduceMotion.current) return;
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouse, { passive: true });

    return () => {
      motionQuery.removeEventListener('change', syncMotion);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return { progress, mouse, reduceMotion };
};

const CameraRig = ({ progress, mouse, reduceMotion }) => {
  const { camera } = useThree();
  const look = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const t = reduceMotion.current ? 0.08 : smoothstep(progress.current);
    const camZ = THREE.MathUtils.lerp(9, -7, t);
    const pathX = Math.sin(t * Math.PI) * 0.55;
    const pathY = 0.15 + t * 0.35;
    const mx = reduceMotion.current ? 0 : mouse.current.x;
    const my = reduceMotion.current ? 0 : mouse.current.y;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, pathX + mx * 0.35, 2.4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pathY + my * 0.22, 2.4, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, camZ, 2.4, delta);

    look.set(pathX + mx * 0.55, pathY + my * 0.25, camZ - 4);
    camera.lookAt(look);
  });

  return null;
};

const StarField = ({ count, reduceMotion, progress, pulse }) => {
  const points = useRef();
  const positions = useMemo(() => fillBox(count, [22, 14, 46]), [count]);

  useFrame((_, delta) => {
    if (!points.current) return;
    const t = reduceMotion.current ? 0.08 : progress.current;
    const clearing = Math.max(0, (t - 0.78) / 0.22);
    const flare = reduceMotion.current ? 0 : pulse.current;
    points.current.material.opacity = 0.85 * (1 - clearing * 0.5) * (1 + flare * 0.4);
    points.current.material.size = 0.016 + flare * 0.02;
    if (reduceMotion.current) return;
    points.current.rotation.y += delta * 0.012;
    points.current.rotation.x += delta * 0.003;
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#e8eef8"
        size={0.016}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
};

const DustLane = ({ count, reduceMotion, progress, pulse }) => {
  const points = useRef();
  const positions = useMemo(() => fillBox(count, [18, 2.4, 46]), [count]);

  useFrame((_, delta) => {
    if (!points.current) return;
    const t = reduceMotion.current ? 0.08 : progress.current;
    const clearing = Math.max(0, (t - 0.78) / 0.22);
    const flare = reduceMotion.current ? 0 : pulse.current;
    points.current.material.opacity = 0.22 * (1 - clearing * 0.7) * (1 + flare * 0.55);
    if (reduceMotion.current) return;
    points.current.rotation.y += delta * 0.006;
  });

  return (
    <group rotation={[0.12, 0.2, 0.08]}>
      <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8ea0c8"
          size={0.045}
          sizeAttenuation
          depthWrite={false}
          opacity={0.22}
        />
      </Points>
    </group>
  );
};

const FlightScene = ({ isMobile }) => {
  const { progress, mouse, reduceMotion } = useFlightState();
  const pulse = useRef(0);
  const starCount = isMobile ? 1800 : 4600;
  const dustCount = isMobile ? 380 : 1100;

  useEffect(() => {
    const onPulse = () => {
      if (reduceMotion.current) return;
      pulse.current = 1;
    };
    window.addEventListener('cosmic-pulse', onPulse);
    return () => window.removeEventListener('cosmic-pulse', onPulse);
  }, [reduceMotion]);

  useFrame((_, delta) => {
    pulse.current = THREE.MathUtils.damp(pulse.current, 0, 3.4, delta);
  });

  return (
    <>
      <CameraRig progress={progress} mouse={mouse} reduceMotion={reduceMotion} />
      <StarField count={starCount} reduceMotion={reduceMotion} progress={progress} pulse={pulse} />
      <DustLane count={dustCount} reduceMotion={reduceMotion} progress={progress} pulse={pulse} />
    </>
  );
};

const CosmosCanvas = () => {
  const [ready, setReady] = useState(false);
  const isMobile = useMemo(
    () => (typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-primary" aria-hidden="true">
      <Canvas
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        style={{ background: '#050816', opacity: ready ? 1 : 0 }}
        camera={{ position: [0, 0.2, 9], fov: 55, near: 0.1, far: 80 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#050816', 1);
          setReady(true);
        }}
      >
        <Suspense fallback={null}>
          <FlightScene isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CosmosCanvas;
