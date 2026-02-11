'use client';

interface ShimmerEffectProps {
  className?: string;
}

export default function ShimmerEffect({ className = '' }: ShimmerEffectProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div 
          className="w-1/2 h-full animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
          }}
        />
      </div>
    </div>
  );
}
