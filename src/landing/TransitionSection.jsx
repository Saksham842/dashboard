'use client';
import React from 'react';
import { FadeUpOnScroll } from './Primitives';

// ── CSS 3D metallic polyhedron (poly-block style background shapes) ────────────
const MetalPoly = ({ size = 240, rotX = 20, rotY = 30, rotZ = 0, style = {} }) => (
  <div style={{
    width: size, height: size,
    transformStyle: 'preserve-3d',
    transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
    position: 'relative',
    ...style,
  }}>
    {/* Front */}
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(55,55,60,0.88) 0%,rgba(20,20,22,0.95) 45%,rgba(75,75,80,0.75) 100%)', border:'1px solid rgba(130,130,140,0.22)', transform:`translateZ(${size*0.18}px)`, boxShadow:'inset 0 0 40px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.1)' }} />
    {/* Top */}
    <div style={{ position:'absolute', width:'100%', height:size*0.36, background:'linear-gradient(180deg,rgba(85,85,90,0.82) 0%,rgba(30,30,34,0.9) 100%)', border:'1px solid rgba(140,140,150,0.18)', transform:`rotateX(-90deg) translateZ(${size*0.18}px)`, transformOrigin:'top center', boxShadow:'inset 0 0 20px rgba(255,255,255,0.07)' }} />
    {/* Right */}
    <div style={{ position:'absolute', width:size*0.36, height:'100%', background:'linear-gradient(90deg,rgba(18,18,20,0.96) 0%,rgba(45,45,50,0.82) 100%)', border:'1px solid rgba(100,100,110,0.16)', transform:`rotateY(90deg) translateZ(${size*0.64}px)`, transformOrigin:'right center', boxShadow:'inset -2px 0 30px rgba(255,255,255,0.05)' }} />
    {/* Specular */}
    <div style={{ position:'absolute', width:'32%', height:'55%', top:'7%', left:'9%', background:'linear-gradient(135deg,rgba(255,255,255,0.16) 0%,transparent 70%)', transform:`translateZ(${size*0.19}px)`, pointerEvents:'none' }} />
    <div style={{ position:'absolute', width:'48%', height:'28%', bottom:'14%', left:'26%', background:'radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.1) 0%,transparent 100%)', transform:`translateZ(${size*0.19}px)`, pointerEvents:'none' }} />
  </div>
);

const MetalDiamond = ({ size = 100, rotZ = 45, style = {} }) => (
  <div style={{
    width: size, height: size,
    transform: `rotate(${rotZ}deg)`,
    background: 'linear-gradient(135deg,rgba(65,65,70,0.82) 0%,rgba(18,18,20,0.96) 55%,rgba(85,85,90,0.72) 100%)',
    border: '1px solid rgba(150,150,160,0.18)',
    boxShadow: '0 0 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.14)',
    position: 'relative',
    overflow: 'hidden',
    ...style,
  }}>
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(255,255,255,0.13) 0%,transparent 55%)', pointerEvents:'none' }} />
  </div>
);

// ── TiltCard with spotlight ────────────────────────────────────────────────────
const TiltCard = ({ children, style = {}, className = '' }) => {
  const cardRef = React.useRef(null);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = React.useState({ x: '50%', y: '50%', opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTilt({ x: ((y / rect.height) - 0.5) * -14, y: ((x / rect.width) - 0.5) * 14 });
    setSpotlight({ x: `${x}px`, y: `${y}px`, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpotlight({ x: '50%', y: '50%', opacity: 0 });
  };

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={className}
      style={{ transform:`perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition:'transform 0.12s cubic-bezier(0.25,1,0.5,1)', position:'relative', overflow:'hidden', ...style }}>
      <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at ${spotlight.x} ${spotlight.y},rgba(255,255,255,0.07) 0%,transparent 60%)`, opacity:spotlight.opacity, transition:'opacity 0.3s ease', pointerEvents:'none', zIndex:1 }} />
      <div style={{ position:'relative', zIndex:2 }}>{children}</div>
    </div>
  );
};

// ── Morphing AI/Human blob ────────────────────────────────────────────────────
const MorphBlob = ({ progress }) => {
  const chaosOpacity   = progress < 0.25 ? 1 : progress < 0.45 ? 1-(progress-0.25)/0.2 : 0;
  const clarityOpacity = progress < 0.55 ? 0 : progress < 0.75 ? (progress-0.55)/0.2    : 1;
  const humanOpacity   = progress < 0.4  ? 1 : progress < 0.65 ? 1-(progress-0.4)/0.25  : 0;
  const aiOpacity      = progress < 0.4  ? 0 : progress < 0.65 ? (progress-0.4)/0.25    : 1;
  const morphScaleY    = (progress<0.35||progress>0.65) ? 1 : 1-(1-Math.abs(progress-0.5)/0.15)*0.22;
  const morphScaleX    = (progress<0.35||progress>0.65) ? 1 : 1+(1-Math.abs(progress-0.5)/0.15)*0.18;
  const scanTop        = progress<0.3 ? -10 : progress<0.6 ? ((progress-0.3)/0.3)*110 : 110;

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
      <div style={{ position:'relative', width:300, height:300, display:'flex', alignItems:'center', justifyContent:'center', transform:`scaleY(${morphScaleY}) scaleX(${morphScaleX})`, transition:'transform 0.1s ease-out, box-shadow 0.5s ease', filter:'brightness(1.15) saturate(1.25)', boxShadow:`${progress<0.5?'rgba(201,168,76,0.35)':'rgba(201,168,76,0.45)'} 0px 0px 80px 20px`, borderRadius:'50%' }}>

        {/* Chaos blob */}
        <div style={{ position:'absolute', inset:0, opacity:chaosOpacity*0.65, transition:'opacity 0.2s', pointerEvents:'none' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle,rgba(255,107,53,0.75) 0%,rgba(233,30,140,0.6) 35%,rgba(139,92,246,0.4) 70%,transparent 100%)', borderRadius:'70% 30% 30% 70% / 60% 40% 60% 40%', filter:'blur(3px)', animation:'6s ease-in-out infinite evyMorph' }} />
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle,rgba(233,30,140,0.5) 0%,rgba(139,92,246,0.3) 45%,transparent 100%)', borderRadius:'30% 70% 70% 30% / 30% 30% 70% 70%', filter:'blur(4px)', animation:'12s ease-in-out infinite reverse evyMorph' }} />
          <div style={{ position:'absolute', inset:9, background:'linear-gradient(135deg,rgba(255,255,255,0.4) 0%,rgba(233,30,140,0.2) 60%,transparent 100%)', borderRadius:'80% 20% 20% 80% / 20% 80% 20% 80%', filter:'blur(3.5px)', animation:'8s ease-in-out infinite reverse evyMorph', boxShadow:'rgba(255,255,255,0.3) 0px 0px 30px inset' }} />
        </div>

        {/* Clarity blob */}
        <div style={{ position:'absolute', inset:0, opacity:clarityOpacity*0.65, transition:'opacity 0.2s', pointerEvents:'none' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle,rgba(201,168,76,0.75) 0%,rgba(34,211,238,0.6) 35%,rgba(16,185,129,0.4) 70%,transparent 100%)', borderRadius:'70% 30% 30% 70% / 60% 40% 60% 40%', filter:'blur(3px)', animation:'6s ease-in-out infinite evyMorph' }} />
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle,rgba(34,211,238,0.5) 0%,rgba(16,185,129,0.3) 45%,transparent 100%)', borderRadius:'30% 70% 70% 30% / 30% 30% 70% 70%', filter:'blur(4px)', animation:'12s ease-in-out infinite reverse evyMorph' }} />
          <div style={{ position:'absolute', inset:9, background:'linear-gradient(135deg,rgba(255,255,255,0.4) 0%,rgba(201,168,76,0.2) 60%,transparent 100%)', borderRadius:'80% 20% 20% 80% / 20% 80% 20% 80%', filter:'blur(3.5px)', animation:'8s ease-in-out infinite reverse evyMorph', boxShadow:'rgba(255,255,255,0.3) 0px 0px 30px inset' }} />
        </div>

        {/* Human figure */}
        <div style={{ position:'absolute', inset:24, opacity:humanOpacity, transition:'opacity 0.1s', zIndex:10 }}>
          <svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
            <circle cx="100" cy="60" r="32" stroke="#F5F0E8" strokeWidth="1.5" />
            <path d="M88 90 L88 108 M112 90 L112 108" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M40 140 C40 120 70 110 100 110 C130 110 160 120 160 140 L160 220 L40 220 Z" stroke="#F5F0E8" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
            <path d="M40 140 L20 185" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
            <path d="M160 140 L180 185" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
          </svg>
          <div style={{ position:'absolute', left:-10, right:-10, top:`${scanTop}%`, height:2, background:'linear-gradient(90deg,transparent,#C9A84C,transparent)', boxShadow:'0 0 12px rgba(201,168,76,0.8)', opacity:(progress>0.3&&progress<0.6)?1:0, transition:'opacity 0.2s' }} />
        </div>

        {/* AI figure */}
        <div style={{ position:'absolute', inset:24, opacity:aiOpacity, transition:'opacity 0.1s', zIndex:10 }}>
          <svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
            <path d="M100 28 L130 45 L130 79 L100 96 L70 79 L70 45 Z" stroke="#C9A84C" strokeWidth="1.5" />
            <path d="M100 28 L100 96 M70 45 L130 79 M130 45 L70 79" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.4" />
            <rect x="83" y="54" width="8" height="6" rx="1" fill="#C9A84C" fillOpacity="0.7" />
            <rect x="109" y="54" width="8" height="6" rx="1" fill="#C9A84C" fillOpacity="0.7" />
            <path d="M88 96 L88 116 M112 96 L112 116" stroke="#C9A84C" strokeWidth="1.5" />
            <path d="M50 150 L50 116 C50 116 70 110 100 110 C130 110 150 116 150 116 L150 150" stroke="#C9A84C" strokeWidth="1.5" />
            <rect x="50" y="150" width="100" height="70" rx="4" stroke="#C9A84C" strokeWidth="1.5" />
            <path d="M50 125 L22 160 L22 195" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
            <path d="M150 125 L178 160 L178 195" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
            <ellipse cx="100" cy="62" rx="45" ry="45" stroke="#C9A84C" strokeWidth="0.3" strokeOpacity="0.15" strokeDasharray="4 6" />
          </svg>
        </div>
      </div>

      {/* Label */}
      <div style={{ marginTop:20, height:20, position:'relative', width:300, textAlign:'center' }}>
        <div style={{ fontFamily:'Outfit,sans-serif', fontSize:12, letterSpacing:'0.1em', textTransform:'uppercase', transition:'opacity 0.3s', opacity:humanOpacity>0.5?1:0, color:'#888880', position:'absolute', width:'100%', left:0 }}>The Traditional Interviewer</div>
        <div style={{ fontFamily:'Outfit,sans-serif', fontSize:12, letterSpacing:'0.1em', textTransform:'uppercase', transition:'opacity 0.3s', opacity:aiOpacity>0.5?1:0, color:'#C9A84C', position:'absolute', width:'100%', left:0 }}>Your IntervieHire Agent</div>
      </div>
    </div>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────
export const TransitionSection = () => {
  const sectionRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  const [scrollY, setScrollY] = React.useState(0);
  const [shakeTrigger, setShakeTrigger] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const [hasEntered, setHasEntered] = React.useState(false);
  const prevProgress = React.useRef(0);
  const [autoRot, setAutoRot] = React.useState(0);

  // Scroll tracker
  React.useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const total = sectionRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setScrollY(Math.max(0, scrolled));
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Entrance observer
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasEntered) { setInView(true); setHasEntered(true); }
    }, { threshold: 0.04 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasEntered]);

  // Shake at 50% crossover
  React.useEffect(() => {
    const crossed = (prevProgress.current < 0.5 && progress >= 0.5) || (prevProgress.current > 0.5 && progress <= 0.5);
    if (crossed) {
      setShakeTrigger(true);
      const t = setTimeout(() => setShakeTrigger(false), 400);
      return () => clearTimeout(t);
    }
    prevProgress.current = progress;
  }, [progress]);

  // Slow auto-rotation for bg shapes
  React.useEffect(() => {
    let raf;
    const tick = () => { setAutoRot(r => r + 0.08); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const chaosOpacity   = progress < 0.25 ? 1 : progress < 0.45 ? 1-(progress-0.25)/0.2 : 0;
  const clarityOpacity = progress < 0.55 ? 0 : progress < 0.75 ? (progress-0.55)/0.2    : 1;

  // Background shape parallax amounts
  const bg1Y = scrollY * -0.14;
  const bg1X = scrollY * 0.03;
  const bg2Y = scrollY * -0.20;
  const bg2X = scrollY * -0.04;
  const bg3Y = scrollY * -0.10;

  const cons = [
    'Endless scheduling and coordination delays',
    'Repetitive screening calls waste recruiter hours',
    'Inconsistent evaluations across interviewer panels',
    'Candidate cheating and proxy interviews go unnoticed',
  ];
  const pros = [
    'AI interviews candidates 24/7 automatically',
    'Built-in cheating detection ensures interview integrity',
    'Standardised scoring for fair candidate evaluation',
    'Hire faster with automated screening and instant insights',
  ];

  return (
    <div id="avatar-explainer" ref={sectionRef} style={{ height:'400vh', position:'relative' }}>
      <div style={{
        position:'sticky', top:0, height:'100vh', background:'#000',
        display:'flex', flexDirection:'column', alignItems:'center',
        justifyContent:'center', overflow:'hidden', padding:'0 48px',
        perspective:'1400px',
      }}>

        {/* ════════════════════════════════════════════
            POLY-BLOCK BACKGROUND LAYER
            Floating metallic 3D shapes that parallax on scroll
            ════════════════════════════════════════════ */}

        {/* Shape 1 — large cube, top-center drifts down-left as you scroll */}
        <div style={{
          position:'absolute',
          top:'2%', left:'50%', marginLeft:'-160px',
          transform:`translateY(${bg1Y}px) translateX(${bg1X}px)`,
          zIndex:1, opacity:0.55,
          pointerEvents:'none',
        }}>
          <MetalPoly size={340} rotX={18+autoRot*0.08} rotY={autoRot*0.3} rotZ={6} />
        </div>

        {/* Shape 2 — medium cube, top-right */}
        <div style={{
          position:'absolute',
          top:'-6%', right:'-4%',
          transform:`translateY(${bg2Y}px) translateX(${bg2X}px)`,
          zIndex:1, opacity:0.42,
          pointerEvents:'none',
        }}>
          <MetalPoly size={260} rotX={-16-autoRot*0.06} rotY={-autoRot*0.25} rotZ={-14} />
        </div>

        {/* Shape 3 — diamond, top-left */}
        <div style={{
          position:'absolute',
          top:'4%', left:'-2%',
          transform:`translateY(${bg3Y}px)`,
          zIndex:1, opacity:0.48,
          pointerEvents:'none',
        }}>
          <MetalDiamond size={140} rotZ={24 + autoRot*0.18} />
        </div>

        {/* Shape 4 — small diamond, far right mid */}
        <div style={{
          position:'absolute',
          top:'22%', right:'6%',
          transform:`translateY(${bg1Y*0.6}px)`,
          zIndex:1, opacity:0.32,
          pointerEvents:'none',
        }}>
          <MetalDiamond size={72} rotZ={-autoRot*0.22} />
        </div>

        {/* Ambient glow behind shapes */}
        <div style={{
          position:'absolute', top:'-5%', left:'35%',
          width:600, height:500, borderRadius:'50%',
          background:'radial-gradient(ellipse,rgba(35,35,40,0.55) 0%,transparent 70%)',
          filter:'blur(70px)',
          transform:`translateY(${bg1Y*0.5}px)`,
          pointerEvents:'none', zIndex:0,
        }} />

        {/* Edge vignette over shapes */}
        <div style={{
          position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
          background:'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.65) 100%)',
        }} />

        {/* ════════════════════════════════════════════
            EXISTING UI — title + 3 column grid
            ════════════════════════════════════════════ */}

        {/* Title — page-rise entrance */}
        <div style={{
          textAlign:'center', marginBottom:48, zIndex:10,
          opacity:0,
          animation: inView ? 'titlePageReveal 0.9s cubic-bezier(0.16,1,0.3,1) 0s forwards' : 'none',
        }}>
          <div style={{
            display:'inline-block', padding:'5px 14px', borderRadius:999,
            border:`1px solid ${progress<0.5?'rgba(255,107,53,0.35)':'rgba(201,168,76,0.35)'}`,
            background:'rgba(10,10,10,0.7)', backdropFilter:'blur(12px)',
            fontSize:11, fontFamily:'Outfit,sans-serif',
            color: progress<0.5?'#FF6B35':'#C9A84C',
            letterSpacing:'0.1em', textTransform:'uppercase',
            marginBottom:14, transition:'border-color 0.4s, color 0.4s',
          }}>
            Workflow Shift
          </div>
          <h2 style={{
            fontFamily:'Space Grotesk,sans-serif',
            fontSize:'clamp(2rem,4.5vw,3.2rem)',
            fontWeight:700, color:'#F5F0E8',
            letterSpacing:'-0.02em', lineHeight:1.15, margin:0,
          }}>
            From{' '}
            <span style={{ color:'#FF6B35', opacity:progress<0.55?1:0.4, transition:'opacity 0.3s' }}>Chaos</span>
            {' '}to{' '}
            <span style={{ background:'linear-gradient(90deg,#C9A84C,#E8C97A)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', opacity:progress>=0.45?1:0.4, transition:'opacity 0.3s' }}>Clarity.</span>
          </h2>
        </div>

        {/* 3-column grid */}
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 320px 1fr',
          gap:60, width:'100%', maxWidth:1200,
          alignItems:'center', position:'relative', zIndex:10,
        }}>

          {/* LEFT CARD — booms in, always present */}
          <div style={{ opacity:0, animation: inView ? 'leftBoomReveal 1s cubic-bezier(0.34,1.56,0.64,1) 0.5s forwards' : 'none' }}>
            <TiltCard style={{
              background:'rgba(255,107,53,0.01)',
              border:'1px solid rgba(255,107,53,0.08)',
              borderRadius:20, padding:'40px 32px',
              boxShadow:'0 15px 30px rgba(0,0,0,0.4)',
            }}>
              <div style={{ fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:'#FF6B35', fontFamily:'Outfit,sans-serif', fontWeight:600, marginBottom:6 }}>From Chaos</div>
              <h3 style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:26, fontWeight:700, color:'#FF6B35', marginBottom:8, letterSpacing:'-0.01em' }}>Traditional Hiring</h3>
              <p style={{ fontFamily:'Outfit,sans-serif', fontSize:14, color:'#666660', marginBottom:28 }}>The Old Way</p>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:16 }}>
                {cons.map((item, idx) => (
                  <li key={idx} style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                    <span style={{ color:'#FF6B35', fontWeight:'bold', fontSize:15, flexShrink:0 }}>✕</span>
                    <span style={{ fontFamily:'Outfit,sans-serif', fontSize:14, color:'#888880', lineHeight:1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </div>

          {/* CENTRE — slow fade-up */}
          <FadeUpOnScroll delay={0.1} y={30} threshold={0.6}>
            <div className={shakeTrigger ? 'morph-shake' : ''}>
              <MorphBlob progress={progress} />
            </div>
          </FadeUpOnScroll>

          {/* RIGHT CARD — slow fade-up */}
          <FadeUpOnScroll delay={0.2} y={30} threshold={0.6}>
            <TiltCard
              className={progress > 0.75 ? 'pulse-glow' : ''}
              style={{
                opacity:clarityOpacity,
                background:'rgba(201,168,76,0.02)',
                border:'1px solid rgba(201,168,76,0.12)',
                borderRadius:20, padding:'40px 32px',
                boxShadow:'0 15px 30px rgba(0,0,0,0.4)',
                pointerEvents:clarityOpacity<0.1?'none':'auto',
                transition:'opacity 0.15s',
              }}
            >
              <div style={{ fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:'#C9A84C', fontFamily:'Outfit,sans-serif', fontWeight:600, marginBottom:6 }}>To Clarity</div>
              <h3 style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:26, fontWeight:700, color:'#C9A84C', marginBottom:8, letterSpacing:'-0.01em' }}>With IntervieHire</h3>
              <p style={{ fontFamily:'Outfit,sans-serif', fontSize:14, color:'#666660', marginBottom:28 }}>AI-Powered Hiring That Scales</p>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:16 }}>
                {pros.map((item, idx) => (
                  <li key={idx} style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                    <span style={{ color:'#C9A84C', fontWeight:'bold', fontSize:15, flexShrink:0 }}>✓</span>
                    <span style={{ fontFamily:'Outfit,sans-serif', fontSize:14, color:'#F5F0E8', lineHeight:1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </FadeUpOnScroll>
        </div>

        {/* Scroll hint */}
        <div style={{
          position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)',
          opacity:progress<0.05?0.5:0, transition:'opacity 0.4s',
          color:'#555550', fontFamily:'Outfit,sans-serif', fontSize:12, letterSpacing:'0.1em', zIndex:10,
        }}>
          SCROLL
        </div>

        {/* Progress bar */}
        <div style={{ position:'absolute', bottom:0, left:0, height:1, width:'100%', background:'rgba(255,255,255,0.04)', zIndex:10 }}>
          <div style={{ height:'100%', width:`${progress*100}%`, background:'linear-gradient(90deg,rgba(201,168,76,0.5),rgba(201,168,76,0.15))', transition:'width 0.05s linear' }} />
        </div>
      </div>
    </div>
  );
};
