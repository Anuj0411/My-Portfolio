import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const pulseCosmos = () => {
  window.dispatchEvent(new CustomEvent('cosmic-pulse'));
};

const isFormField = (target) =>
  Boolean(target?.closest?.('input, textarea, select, option, [contenteditable="true"]'));

const spawnSparks = (clientX, clientY) => {
  const count = window.matchMedia('(max-width: 768px)').matches ? 8 : 12;

  return Array.from({ length: count }, (_, index) => {
    const angle = (Math.PI * 2 * index) / count + (Math.random() - 0.5) * 0.35;
    const distance = 28 + Math.random() * 36;
    return {
      id: `${Date.now()}-${index}`,
      x: clientX,
      y: clientY,
      dx: `${Math.cos(angle) * distance}px`,
      dy: `${Math.sin(angle) * distance}px`,
      size: 1.5 + Math.random() * 1.8,
    };
  });
};

const CosmicClicks = () => {
  const [sparks, setSparks] = useState([]);
  const clearRef = useRef();

  useEffect(() => {
    const onClick = (event) => {
      if (prefersReducedMotion()) return;
      if (event.clientX <= 0 && event.clientY <= 0) return;
      if (isFormField(event.target)) return;

      pulseCosmos();
      setSparks(spawnSparks(event.clientX, event.clientY));
      window.clearTimeout(clearRef.current);
      clearRef.current = window.setTimeout(() => setSparks([]), 700);
    };

    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.clearTimeout(clearRef.current);
    };
  }, []);

  return (
    <div className="cosmic-clicks" aria-hidden="true">
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="cosmic-spark"
          style={{
            left: spark.x,
            top: spark.y,
            width: spark.size,
            height: spark.size,
            '--spark-x': spark.dx,
            '--spark-y': spark.dy,
          }}
        />
      ))}
    </div>
  );
};

export default CosmicClicks;
