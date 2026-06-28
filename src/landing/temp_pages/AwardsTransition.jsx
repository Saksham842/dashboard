'use client';
import React from 'react';

const FLOWER_PETALS = [
  { angle: 0,   rx: 22, ry: 150, c1: '#FF9A42', c2: '#FFD580' },
  { angle: 30,  rx: 16, ry: 128, c1: '#5ECFC6', c2: '#92E8E0' },
  { angle: 60,  rx: 18, ry: 142, c1: '#C8E6C9', c2: '#81C784' },
  { angle: 90,  rx: 22, ry: 165, c1: '#4DD0E1', c2: '#80DEEA' },
  { angle: 120, rx: 17, ry: 138, c1: '#66BB6A', c2: '#A5D6A7' },
  { angle: 150, rx: 15, ry: 122, c1: '#4DB6AC', c2: '#B2EBF2' },
  { angle: 180, rx: 21, ry: 148, c1: '#FF9A42', c2: '#FF6B35' },
  { angle: 210, rx: 14, ry: 114, c1: '#80DEEA', c2: '#4DB6AC' },
  { angle: 240, rx: 16, ry: 124, c1: '#A5D6A7', c2: '#66BB6A' },
  { angle: 270, rx: 20, ry: 154, c1: '#26C6DA', c2: '#4DD0E1' },
  { angle: 300, rx: 14, ry: 114, c1: '#81C784', c2: '#C8E6C9' },
  { angle: 330, rx: 17, ry: 133, c1: '#FFD580', c2: '#FF9A42' },
];

const RAY_PETALS = [
  { angle: 75,  rx: 10, ry: 160, c1: '#92E8E0', c2: '#5ECFC6' },
  { angle: 90,  rx: 16, ry: 185, c1: '#AAF0F8', c2: '#4DD0E1' },
  { angle: 105, rx: 10, ry: 158, c1: '#A5D6A7', c2: '#66BB6A' },
];

const PetalDiv = ({ angle, rx, ry, c1, c2, blur = 7 }) => (
  <div style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0 }}>
    <div style={{
      position: 'absolute',
      width: rx * 2,
      height: ry,
      left: -rx,
      top: -ry,
      transformOrigin: 'center bottom',
      transform: `rotate(${angle}deg)`,
      background: `linear-gradient(to top, transparent 0%, ${c1}88 12%, ${c2}DD 48%, ${c1}99 82%, transparent 100%)`,
      borderRadius: '50%',
      filter: `blur(${blur}px)`,
      pointerEvents: 'none',
    }} />
  </div>
);

export const AwardsTransition = () => {
  const sectionRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect  = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p     = Math.max(0, Math.min(1, -rect.top / total));
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const flowerOpacity   = Math.max(0, 1 - progress * 2.8);
  const rayOpacity      = progress < 0.05  ? 0
                        : progress < 0.25  ? (progress - 0.05) / 0.20
                        : progress < 0.65  ? 1
                        : Math.max(0, 1 - (progress - 0.65) / 0.35);
  const rayElongateP    = Math.max(0, Math.min(1, (progress - 0.05) / 0.65));
  const lineOpacity     = progress < 0.08  ? 0
                        : progress < 0.28  ? (progress - 0.08) / 0.20
                        : progress < 0.70  ? 1
                        : Math.max(0, 1 - (progress - 0.70) / 0.30);
  const burstY          = `calc(50% + ${progress * -7}vh)`;
  const centerGlow      = Math.max(0.22, 1 - progress * 0.82);

  return (
    <div ref={sectionRef} style={{ height: '200vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        background: 'linear-gradient(180deg, #000000 0%, #010701 55%, #000000 100%)',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>

        {/* STARBURST */}
        <div style={{
          position: 'absolute',
          left: '50%', top: burstY,
          transform: 'translate(-50%, -50%)',
          width: 440, height: 440,
          zIndex: 2, pointerEvents: 'none',
        }}>
          {/* Ambient halo */}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(70,195,165,0.14) 0%, rgba(255,155,50,0.06) 50%, transparent 72%)',
            borderRadius: '50%', filter: 'blur(35px)',
            opacity: 1 - progress * 0.97,
          }} />

          {/* Rotating flower petals */}
          <div className="awards-burst-rotator" style={{ position: 'absolute', inset: 0, opacity: flowerOpacity }}>
            {FLOWER_PETALS.map((p, i) => <PetalDiv key={i} {...p} />)}
          </div>

          {/* Static upward ray petals */}
          <div style={{ position: 'absolute', inset: 0, opacity: rayOpacity }}>
            {RAY_PETALS.map((p, i) => (
              <PetalDiv
                key={i}
                angle={p.angle}
                rx={p.rx * Math.max(0.18, 1 - rayElongateP * 0.82)}
                ry={p.ry * (1 + rayElongateP * 3.5)}
                c1={p.c1}
                c2={p.c2}
                blur={2}
              />
            ))}
          </div>

          {/* Warm centre glow */}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 100, height: 100,
            background: 'radial-gradient(circle, rgba(255,242,168,1) 0%, rgba(255,162,52,0.88) 28%, rgba(255,100,20,0.42) 58%, transparent 100%)',
            borderRadius: '50%', filter: 'blur(12px)',
            zIndex: 4, opacity: centerGlow,
          }} />

          {/* Tiny bright core */}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 16, height: 16,
            background: 'radial-gradient(circle, rgba(255,255,235,1) 0%, rgba(255,220,140,0.5) 60%, transparent 100%)',
            borderRadius: '50%', filter: 'blur(2px)',
            zIndex: 5, opacity: centerGlow,
          }} />
        </div>

        {/* HORIZONTAL DIVIDER LINE */}
        <div style={{
          position: 'absolute', top: '50%', left: 0, right: 0,
          height: 1, transform: 'translateY(-50%)',
          background: 'linear-gradient(90deg, transparent 0%, rgba(130,225,90,0.45) 18%, rgba(240,215,75,0.96) 50%, rgba(130,225,90,0.45) 82%, transparent 100%)',
          boxShadow: '0 0 32px rgba(190,230,70,0.44), 0 0 10px rgba(255,228,80,0.88)',
          opacity: lineOpacity, zIndex: 5, pointerEvents: 'none',
        }} />

        {/* Edge vignettes */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '22%', background: 'linear-gradient(to bottom, #000 0%, transparent 100%)', zIndex: 4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '22%', background: 'linear-gradient(to top, #000 0%, transparent 100%)', zIndex: 4, pointerEvents: 'none' }} />

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: 34, left: '50%',
          transform: 'translateX(-50%)',
          opacity: progress < 0.05 ? 0.4 : 0, transition: 'opacity 0.5s',
          color: '#3a3a35', fontFamily: 'Outfit, sans-serif',
          fontSize: 11, letterSpacing: '0.20em', zIndex: 10,
        }}>SCROLL</div>

      </div>
    </div>
  );
};
