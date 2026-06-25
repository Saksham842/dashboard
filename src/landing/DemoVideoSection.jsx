'use client';
import React from 'react';

export const DemoVideoSection = () => {
  const sectionRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  const [entered, setEntered] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const total = sectionRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    if (!sectionRef.current || entered) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setEntered(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [entered]);

  const t = progress;
  const scale = t < 0.5 ? 0.7 + (t / 0.5) * 0.3 : 1 - ((t - 0.5) / 0.5) * 0.3;
  const radius = t < 0.5 ? 20 * (1 - t / 0.5) : 20 * ((t - 0.5) / 0.5);
  const headingOpacity = t < 0.2 ? 1 : t < 0.4 ? 1 - (t - 0.2) / 0.2 : 0;
  const headingHeight = t < 0.2 ? 120 : t < 0.4 ? 120 * (1 - (t - 0.2) / 0.2) : 0;

  return (
    <section ref={sectionRef} style={{ height: '300vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', flexDirection: 'column',
        background: '#000', overflow: 'hidden',
      }}>
        {/* Heading — sits above video, shrinks to 0 as video expands */}
        <div style={{
          flexShrink: 0, textAlign: 'center', overflow: 'hidden',
          opacity: Math.min(headingOpacity, entered ? 1 : 0),
          height: entered ? `${headingHeight}px` : '0px',
          transform: entered ? 'translateY(0)' : 'translateY(40px)',
          transition: entered
            ? 'opacity 0.2s ease, height 0.2s ease'
            : 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, height 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          paddingBottom: 4,
        }}>
          <div style={{
            fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FF6B35',
            marginBottom: 8,
          }}>
            The Problem
          </div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 700, color: '#F5F0E8',
            letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: 520,
            margin: '0 auto',
          }}>
            Traditional hiring is <span style={{ color: '#FF6B35' }}>broken</span>.
          </h2>
        </div>

        {/* Video — fills remaining space, scales to full screen */}
        <div style={{
          flex: 1, minHeight: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '100%', height: '100%',
            borderRadius: radius,
            overflow: 'hidden',
            background: '#0A0A0A',
            border: t < 0.1 || t > 0.9 ? '1px solid rgba(201,168,76,0.1)' : 'none',
            boxShadow: t >= 0.2 && t <= 0.8
              ? '0 0 100px rgba(201,168,76,0.08)'
              : '0 20px 60px rgba(0,0,0,0.6)',
            transform: `scale(${scale})`,
            willChange: 'transform',
          }}>
            <video
              src="/mp_.mp4"
              autoPlay muted loop playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
