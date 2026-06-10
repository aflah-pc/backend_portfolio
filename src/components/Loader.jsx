import React from 'react';

const Loader = ({ fadeOut }) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
        backgroundColor: '#0a0a0a',
        transition: 'opacity 0.6s ease, visibility 0.6s ease',
        opacity: fadeOut ? 0 : 1,
        visibility: fadeOut ? 'hidden' : 'visible',
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 40% 30% at 50% 50%, rgba(59,130,246,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Brand name */}
      <span
        style={{
          position: 'absolute',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '1.1rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          whiteSpace: 'nowrap',
        }}
      >
        Aflah Muneer PC
      </span>

      {/* Newton's Cradle */}
      <div className="newtons-cradle">
        <div className="newtons-cradle__dot" />
        <div className="newtons-cradle__dot" />
        <div className="newtons-cradle__dot" />
        <div className="newtons-cradle__dot" />
      </div>

      {/* Loading text */}
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default Loader;
