'use client';
import React from 'react';

const STATIC_SPARKS = [
  { id: 0, left: 12, top: 24, size: 3.2, duration: 6.5, delay: 0.5, opacity: 0.5 },
  { id: 1, left: 85, top: 15, size: 2.5, duration: 8.2, delay: 1.2, opacity: 0.4 },
  { id: 2, left: 45, top: 60, size: 4.0, duration: 5.8, delay: 2.1, opacity: 0.6 },
  { id: 3, left: 22, top: 78, size: 2.8, duration: 7.1, delay: 0.8, opacity: 0.35 },
  { id: 4, left: 70, top: 82, size: 3.5, duration: 6.0, delay: 3.4, opacity: 0.45 },
  { id: 5, left: 92, top: 44, size: 2.2, duration: 9.0, delay: 1.8, opacity: 0.5 },
  { id: 6, left: 35, top: 38, size: 3.8, duration: 7.5, delay: 2.5, opacity: 0.4 },
  { id: 7, left: 58, top: 22, size: 2.9, duration: 8.0, delay: 0.2, opacity: 0.55 },
  { id: 8, left: 15, top: 90, size: 4.2, duration: 6.2, delay: 1.5, opacity: 0.35 },
  { id: 9, left: 78, top: 65, size: 3.1, duration: 7.8, delay: 2.8, opacity: 0.45 },
  { id: 10, left: 50, top: 88, size: 2.7, duration: 5.5, delay: 3.1, opacity: 0.5 },
  { id: 11, left: 65, top: 12, size: 3.6, duration: 8.5, delay: 0.9, opacity: 0.4 }
];

export default function AmbientSparks() {
  return (
    <div className="ambient-background-layer" aria-hidden="true">
      {/* Honeycomb Geometric Grid Backdrop */}
      <div className="honeycomb-pattern-overlay"></div>
      
      {/* Ambient Radial Golden Light Blooms */}
      <div className="ambient-radial-glow glow-top"></div>
      <div className="ambient-radial-glow glow-hero-center"></div>
      <div className="ambient-radial-glow glow-bottom"></div>

      {/* Floating gentle amber sparks */}
      <div className="sparks-container">
        {STATIC_SPARKS.map((spark) => (
          <div
            key={spark.id}
            className="ambient-spark-dot"
            style={{
              left: `${spark.left}%`,
              top: `${spark.top}%`,
              width: `${spark.size}px`,
              height: `${spark.size}px`,
              animationDuration: `${spark.duration}s`,
              animationDelay: `${spark.delay}s`,
              opacity: spark.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
