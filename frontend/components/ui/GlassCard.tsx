'use client';

import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  depth?: 'sm' | 'md' | 'lg';
}

export default function GlassCard({ children, className = '', hover = false, depth = 'md' }: GlassCardProps) {
  const depthClasses = {
    sm: 'backdrop-blur-md',
    md: 'backdrop-blur-xl',
    lg: 'backdrop-blur-2xl'
  };

  const baseClasses = `
    glass card-glass p-6 
    ${depthClasses[depth]}
    ${hover ? 'card-hover transition-all duration-300' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
}
