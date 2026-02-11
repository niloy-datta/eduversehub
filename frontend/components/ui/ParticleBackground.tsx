'use client';

import { useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>(() => {
    // Generate particles on initialization
    const particleCount = 50;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    return newParticles;
  });

  useEffect(() => {
    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.vx + 100) % 100,
        y: (p.y + p.vy + 100) % 100
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-primary-400"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transition: 'all 50ms linear',
            filter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  );
}
