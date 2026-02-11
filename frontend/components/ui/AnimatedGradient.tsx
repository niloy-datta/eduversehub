'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Gradient animation
    let hue = 0;
    const animate = () => {
      hue = (hue + 0.5) % 360;

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      );

      gradient.addColorStop(0, `hsla(${hue}, 70%, 50%, 0.1)`);
      gradient.addColorStop(0.5, `hsla(${(hue + 60) % 360}, 70%, 50%, 0.05)`);
      gradient.addColorStop(1, `hsla(${(hue + 120) % 360}, 70%, 50%, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-20"
      style={{ zIndex: 0 }}
    />
  );
}
