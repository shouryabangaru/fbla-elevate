"use client";

import LiquidEther from './LiquidEther';

// Dark navy blue colors with cyan accent for FBLA Elevate theme
const fblaColors = ['#0a1628', '#0d1f3c', '#06b6d4', '#2563eb', '#1d4ed8', '#3b82f6', '#0f172a'];

export function ParticleBackground() {
  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'auto'
      }}
    >
      {/* Solid dark navy background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#0a1628',
          zIndex: 0
        }}
      />
      
      {/* Liquid Ether effect */}
      <LiquidEther
        colors={fblaColors}
        mouseForce={15}
        cursorSize={120}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.4}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.3}
        autoIntensity={1.8}
        takeoverDuration={0.25}
        autoResumeDelay={2000}
        autoRampDuration={0.6}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1
        }}
      />
    </div>
  );
}

