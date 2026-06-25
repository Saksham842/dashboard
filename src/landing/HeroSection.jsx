'use client';
import React from 'react';

// HeroSection.jsx — gydexp.com-style: left text + right video half-half
export const HeroSection = () => {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const words1 = ["Interview", "Smarter,"];
  const words2 = ["Hire", "Faster."];

  return (
    <section style={{
      minHeight: '100vh',
      background: '#000000',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '84px 48px 40px',
      boxSizing: 'border-box',
    }}>

      {/* ── Video: RIGHT half, full video visible on dark bg, no crop ── */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '65%',
        height: '100%',
        background: '#000000',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
        <video
          id="hero-pipeline-video"
          src="/conveyor.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            marginTop: '18vh',
            marginRight: '-6vw',
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.95)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
          }}
        />

        {/* Left edge: fade video into left text area */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '38%',
          height: '100%',
          background: 'linear-gradient(to right, #000000 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Bottom edge */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 160,
          background: 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Top edge */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 130,
          background: 'linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Right edge */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 70,
          height: '100%',
          background: 'linear-gradient(to left, #000000 0%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Left: solid dark bg so text is always clean ── */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '35%',
        height: '100%',
        background: '#000000',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 3, maxWidth: 620}}>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.08,
          marginBottom: 'clamp(40px, 6vh, 56px)',
          color: '#F5F0E8',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 14px', fontSize: 'clamp(2.8rem, 9vh, 5rem)', marginBottom: 'clamp(4px, 1vh, 8px)' }}>
            {words1.map((w, i) => (
              <span key={i} style={{
                display: 'inline-block',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.7s ease ${0.2 + i * 0.07}s, transform 0.7s ease ${0.2 + i * 0.07}s`,
              }}>{w}</span>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 14px', fontSize: 'clamp(2.8rem, 9vh, 5rem)' }}>
            {words2.map((w, i) => (
              <span key={i} style={{
                display: 'inline-block',
                background: i === 1 ? 'linear-gradient(90deg,#FF6B35,#E91E8C)' : 'none',
                WebkitBackgroundClip: i === 1 ? 'text' : 'unset',
                WebkitTextFillColor: i === 1 ? 'transparent' : '#F5F0E8',
                backgroundClip: i === 1 ? 'text' : 'unset',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.7s ease ${0.41 + i * 0.07}s, transform 0.7s ease ${0.41 + i * 0.07}s`,
              }}>{w}</span>
            ))}
          </div>
        </h1>

        {/* Subheadline */}
        <p style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(17px, 2.8vh, 22px)',
          fontWeight: 400,
          color: '#888880',
          lineHeight: 1.6,
          maxWidth: 520,
          marginBottom: 'clamp(44px, 7vh, 60px)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease 0.65s, transform 0.7s ease 0.65s',
        }}>
          AI-powered interviews 24/7 with built-in cheating detection, helping teams screen candidates faster and more reliably. No scheduling needed.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: 14, flexWrap: 'wrap',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease 0.8s, transform 0.7s ease 0.8s',
        }}>
          <HeroBtn primary onClick={() => window.triggerPageTransition ? window.triggerPageTransition('contact') : document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Book a Demo</HeroBtn>
          <HeroBtn onClick={() => window.triggerPageTransition ? window.triggerPageTransition('explainer-video') : document.getElementById('explainer-video')?.scrollIntoView({ behavior: 'smooth' })}>See How It Works</HeroBtn>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex', gap: 0,
          marginTop: 'clamp(32px, 6vh, 60px)',
          flexWrap: 'wrap',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 1.1s',
        }}>
          {[
            { num: '$100B', text: 'lost yearly to inefficient hiring' },
            { num: '25–35%', text: 'of manager time drained by interviews' },
            { num: '40–60', text: 'days. Still no reliable hire.' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: '1 1 140px',
              padding: '0 16px',
              borderRight: i < 2 ? '1px solid rgba(201,168,76,0.12)' : 'none',
              paddingLeft: i === 0 ? 0 : 16,
            }}>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(24px, 4vh, 32px)',
                fontWeight: 700,
                color: '#C9A84C',
                letterSpacing: '-0.02em',
                marginBottom: 4
              }}>{s.num}</div>
              <div style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(13px, 2.2vh, 15px)',
                color: '#555550',
                lineHeight: 1.3
              }}>{s.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HeroBtn = ({ children, primary, onClick }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 500,
        padding: 'clamp(11px, 1.6vh, 14px) clamp(22px, 2.8vw, 34px)', borderRadius: 8, cursor: 'pointer',
        transition: 'all 0.2s ease',
        background: primary ? '#C9A84C' : 'transparent',
        color: primary ? '#0A0A0A' : '#C9A84C',
        border: primary ? 'none' : '1px solid #C9A84C',
        filter: primary && hov ? 'brightness(1.12)' : 'none',
        boxShadow: !primary && hov ? '0 0 24px rgba(201,168,76,0.3)' : 'none',
        transform: hov ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >{children}</button>
  );
};
