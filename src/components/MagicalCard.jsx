'use client';
import React, { useRef, useState } from 'react';

export default function MagicalCard({ children, className = '', onClick, maxTilt = 10, glowColor = 'rgba(79, 116, 98, 0.15)' }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    glimmerPos: { x: 50, y: 50, opacity: 0 },
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      glimmerPos: { x: percentX, y: percentY, opacity: 1 },
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      glimmerPos: { x: 50, y: 50, opacity: 0 },
    });
  };

  return (
    <div
      ref={cardRef}
      className={`magical-card-wrapper ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: style.transform,
        transition: style.glimmerPos.opacity === 0 ? 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'transform 0.08s ease-out',
        position: 'relative',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic Specular Glimmer Overlay */}
      <div
        className="magical-card-glimmer"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 5,
          opacity: style.glimmerPos.opacity,
          transition: 'opacity 0.25s ease',
          background: `radial-gradient(circle at ${style.glimmerPos.x}% ${style.glimmerPos.y}%, ${glowColor} 0%, rgba(185, 214, 220, 0.12) 35%, transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}
