'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const THEME = {
  bg:     '#000000',
  card:   'rgba(255,255,255,0.02)',
  border: 'rgba(201,168,76,0.1)',
  gold:   '#C9A84C',
  pink:   '#E91E8C',
  white:  '#F5F0E8',
  muted:  '#888880',
  faint:  'rgba(201,168,76,0.06)',
};

const PAIN_PILLS = [
  { num: "50%+",       label: "Reduction in cost-per-hire" },
  { num: "100s of hrs",label: "Saved per hire cycle" },
  { num: "Zero Bias",  label: "In AI screening layer" },
  { num: "24/7",       label: "Candidate interviews automated" },
  { num: "98%",        label: "Cheating detection accuracy" },
  { num: "10x Faster", label: "Hiring pipeline velocity" },
  { num: "4.9/5",      label: "Candidate experience rating" },
];

const CHAOS_CARDS = [
  { type:'score',    label:'Candidate Score',   name:'Priya Sharma — Backend Eng.',  score:'61 / 100', scoreColor:THEME.gold, note1:'Manually reviewed by 3 people',  note2:'No decision after 2 weeks' },
  { type:'status',   label:'Interview Status',  name:'Marcus T. — Final Round',      status:'DROPPED',  reason:'Interviewer no-showed',         time:'3 days ago' },
  { type:'calendar', label:'Scheduling',        candidate:'Arjun M. — 4th reschedule', slots:[{day:'Mon · 10:00 AM',state:'declined'},{day:'Tue · 2:30 PM',state:'declined'},{day:'Wed · 4:00 PM',state:'pending'}] },
  { type:'cost',     label:'Recruiter Cost',    line:'Manual screening',              hrs:'38 hrs',      hrsLabel:'this week',                   cost:'$2,660',   costLabel:'recruiter cost', flag:'Zero AI assistance used' },
  { type:'score',    label:'Panel Evaluation',  name:'Kevin L. — Data Engineer',      score:'78 / 100', scoreColor:THEME.pink, note1:'Conflicting feedback from panel', note2:'No structured rubric applied' },
  { type:'status',   label:'Offer Status',      name:'Neha R. — Product Manager',     status:'OFFER DECLINED', reason:'Process took 6 weeks',    time:'Yesterday' },
];

// Each card: [fromX, fromY, fromRotate] — where it bursts in FROM
const CARD_ENTRY = [
  { top:'4%',  left:'1%',  rotate:-5, fromX:'-140%', fromY:'-80%',  fromR:-30 },
  { top:'40%', left:'-1%', rotate: 3, fromX:'-160%', fromY:'20%',   fromR: 18 },
  { top:'5%',  right:'2%', rotate: 4, fromX:'140%',  fromY:'-80%',  fromR: 28 },
  { top:'44%', right:'1%', rotate:-3, fromX:'160%',  fromY:'20%',   fromR:-20 },
  { top:'70%', right:'3%', rotate: 2, fromX:'130%',  fromY:'80%',   fromR: 22 },
  { top:'70%', left:'1%',  rotate:-4, fromX:'-130%', fromY:'80%',   fromR:-25 },
];

// Pills burst from center outward
const PILL_POSITIONS = [
  { top:'13%', left:'26%',  fromX:'-60px', fromY:'60px' },
  { top:'22%', left:'36%',  fromX:'-30px', fromY:'80px' },
  { top:'16%', right:'24%', fromX:'60px',  fromY:'60px' },
  { top:'68%', left:'24%',  fromX:'-60px', fromY:'-60px' },
  { top:'81%', left:'40%',  fromX:'-30px', fromY:'-80px' },
  { top:'72%', right:'28%', fromX:'60px',  fromY:'-60px' },
  { top:'30%', right:'10%', fromX:'80px',  fromY:'30px' },
];

function makeParams(seed) {
  const r = (n) => ((seed * 9301 + n * 49297) % 233280) / 233280;
  return { ax:3+r(1)*5, ay:2+r(2)*4, ar:0.4+r(3)*0.9, fr:0.5+r(4)*0.7, ph:r(5)*Math.PI*2 };
}

// Handles both: 1) Staggered Spring/Burst Entry, and 2) Live Sine Wave Float
function FloatingAndBurstItem({ children, position, baseRotate, seed, animIn, delay = 0, type = 'card' }) {
  const ref   = useRef(null);
  const frame = useRef(null);
  const p     = useRef(makeParams(seed));

  useEffect(() => {
    const { ax, ay, ar, fr, ph } = p.current;
    let t0 = null;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const t = ((ts - t0) / 1000) * fr * Math.PI * 2;
      if (ref.current) {
        ref.current.style.transform =
          `rotate(${ar * Math.sin(t * 0.83 + ph + 2)}deg) translate(${ax * Math.sin(t + ph)}px,${ay * Math.sin(t * 1.37 + ph + 1)}px)`;
      }
      frame.current = requestAnimationFrame(tick);
    };

    if (animIn) {
      frame.current = requestAnimationFrame(tick);
    }
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [animIn]);

  const pos = {};
  ['top','left','right','bottom'].forEach(k => { if (position[k] != null) pos[k] = position[k]; });

  const entryStyle = animIn ? {
    opacity: 1,
    transform: `rotate(${baseRotate}deg) translate(0px,0px) scale(1)`,
    transition: `opacity 2.8s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 3.0s ${delay}s cubic-bezier(0.25,1,0.3,1)`,
  } : {
    opacity: 0,
    transform: `rotate(${position.fromR || 0}deg) translate(${position.fromX || '0px'}, ${position.fromY || '0px'}) scale(${type === 'pill' ? 0.3 : 0.4})`,
    transition: 'none',
  };

  return (
    <div style={{ position:'absolute', willChange:'transform', transformOrigin:'center', ...pos, ...entryStyle, zIndex: type === 'pill' ? 4 : 3 }}>
      <div ref={ref} style={{ willChange:'transform' }}>
        {children}
      </div>
    </div>
  );
}

const cs = {
  card:   { background:'rgba(255,255,255,0.03)', border:`1px solid ${THEME.border}`, borderRadius:14, padding:'16px 18px', width:252, boxShadow:'0 12px 40px rgba(0,0,0,0.6), 0 0 30px rgba(201,168,76,0.04)' },
  label:  { fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:600, letterSpacing:'0.1em', color:THEME.gold, textTransform:'uppercase', marginBottom:10 },
  name:   { fontFamily:'Inter,sans-serif', fontSize:13, fontWeight:600, color:THEME.white, marginBottom:4 },
  sub:    { fontFamily:'Inter,sans-serif', fontSize:11.5, color:THEME.muted, lineHeight:1.4 },
  divider:{ height:1, background:'rgba(201,168,76,0.08)', margin:'10px 0' },
};

const ScoreCard   = ({ card }) => (
  <div style={cs.card}>
    <div style={cs.label}>{card.label}</div>
    <div style={cs.name}>{card.name}</div>
    <div style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:26, fontWeight:700, color:card.scoreColor, margin:'8px 0' }}>{card.score}</div>
    <div style={cs.divider}/>
    <div style={{ ...cs.sub, marginBottom:4 }}>{card.note1}</div>
    <div style={cs.sub}>{card.note2}</div>
  </div>
);
const StatusCard  = ({ card }) => (
  <div style={cs.card}>
    <div style={cs.label}>{card.label}</div>
    <div style={cs.name}>{card.name}</div>
    <div style={{ display:'inline-block', background:'rgba(232,53,109,0.12)', border:'1px solid rgba(232,53,109,0.3)', borderRadius:6, padding:'3px 10px', margin:'8px 0' }}>
      <span style={{ fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:700, color:THEME.pink, letterSpacing:'0.06em' }}>{card.status}</span>
    </div>
    <div style={cs.divider}/>
    <div style={{ display:'flex', justifyContent:'space-between' }}>
      <span style={cs.sub}>{card.reason}</span>
      <span style={{ ...cs.sub, color:'#555550' }}>{card.time}</span>
    </div>
  </div>
);
const CalendarCard = ({ card }) => (
  <div style={cs.card}>
    <div style={cs.label}>{card.label}</div>
    <div style={{ ...cs.name, marginBottom:10 }}>{card.candidate}</div>
    {card.slots.map((s,i) => (
      <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
        <span style={{ ...cs.sub, color:'#666660' }}>{s.day}</span>
        <span style={{ fontSize:10, fontFamily:'Inter,sans-serif', fontWeight:600, borderRadius:4, padding:'2px 7px',
          color: s.state==='declined' ? THEME.pink : THEME.gold,
          background: s.state==='declined' ? 'rgba(232,53,109,0.1)' : 'rgba(201,168,76,0.1)',
          border:`1px solid ${s.state==='declined'?'rgba(232,53,109,0.3)':'rgba(201,168,76,0.3)'}`,
        }}>{s.state.toUpperCase()}</span>
      </div>
    ))}
  </div>
);
const CostCard = ({ card }) => (
  <div style={cs.card}>
    <div style={cs.label}>{card.label}</div>
    <div style={cs.name}>{card.line}</div>
    <div style={{ display:'flex', gap:16, margin:'10px 0' }}>
      <div>
        <div style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:22, fontWeight:700, color:THEME.gold }}>{card.hrs}</div>
        <div style={cs.sub}>{card.hrsLabel}</div>
      </div>
      <div style={{ width:1, background:'rgba(201,168,76,0.08)' }}/>
      <div>
        <div style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:22, fontWeight:700, color:THEME.white }}>{card.cost}</div>
        <div style={cs.sub}>{card.costLabel}</div>
      </div>
    </div>
    <div style={cs.divider}/>
    <div style={{ ...cs.sub, color:THEME.pink }}>⚠ {card.flag}</div>
  </div>
);

const RENDERERS = { score:ScoreCard, status:StatusCard, calendar:CalendarCard, cost:CostCard };

// ── Headline ───────────────────────────────────────────────────────────────────
function AnimatedHeadline({ animIn }) {
  const line1 = 'While your team sleeps, Lina screens,';
  const line2 = 'scores, and ranks every applicant.';
  const pinkLine = 'You wake up to a shortlist, not an inbox.';

  const lineStyle = (delay) => ({
    opacity: animIn ? 1 : 0,
    transform: animIn ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
    filter: animIn ? 'blur(0px)' : 'blur(6px)',
    transition: animIn 
      ? `opacity 2.5s ${delay}s cubic-bezier(0.16, 1, 0.3, 1), transform 2.5s ${delay}s cubic-bezier(0.16, 1, 0.3, 1), filter 2.5s ${delay}s`
      : 'none',
  });

  return (
    <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:10, textAlign:'center', pointerEvents:'none', width:'100%', padding:'0 clamp(12px,4vw,20px)' }}>
      {/* Glowing backdrop blur behind headline */}
      <div style={{
        position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        width:520, height:200,
        background:'radial-gradient(ellipse, rgba(0,0,0,0.85) 0%, transparent 70%)',
        filter:'blur(20px)',
        pointerEvents:'none',
        opacity: animIn ? 1 : 0,
        transition:'opacity 2.5s 0.1s',
      }}/>

      <h2 style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(1.3rem, 2.8vw, 2.2rem)', fontWeight:700, color:THEME.white, letterSpacing:'-0.03em', lineHeight:1.35, margin:0 }}>
        <div style={lineStyle(0.35)}>{line1}</div>
        <div style={lineStyle(0.85)}>{line2}</div>
      </h2>

      <div style={{
        ...lineStyle(1.35),
        fontFamily:'Space Grotesk,sans-serif',
        fontSize:'clamp(1.3rem, 2.8vw, 2.2rem)',
        fontWeight:700,
        color:THEME.pink,
        letterSpacing:'-0.03em',
        lineHeight:1.35,
        marginTop:12,
      }}>
        {pinkLine}
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export const HiringChaosSection = () => {
  const sectionRef = useRef(null);
  const [animIn, setAnimIn] = useState(false);
  const isMobileOrTablet = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimIn(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // ── Mobile ──────────────────────────────────────────────────────────────────
  if (isMobileOrTablet) {
    return (
      <section ref={sectionRef} data-scroll style={{ background:THEME.bg, padding:'clamp(60px,8vw,100px) clamp(16px,4vw,32px) clamp(80px,10vw,140px)', position:'relative', overflow:'hidden', borderTop:`1px solid ${THEME.border}`, marginBottom:'clamp(40px, 4vw, 60px)' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:500, height:500, background:'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)', pointerEvents:'none', zIndex:1 }}/>
        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:2, display:'flex', flexDirection:'column', gap:'clamp(32px,6vw,48px)', alignItems:'center' }}>
          <div style={{ textAlign:'center' }}>
            <h2 style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(1.3rem,3.5vw,2rem)', fontWeight:700, color:THEME.white, letterSpacing:'-0.03em', lineHeight:1.25, margin:0,
              opacity: animIn ? 1 : 0, transform: animIn ? 'translateY(0)' : 'translateY(30px)', transition:'opacity 0.7s, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            }}>
              While your team sleeps, Lina screens,<br/>scores, and ranks every applicant.
            </h2>
            <div style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(1.3rem,3.5vw,2rem)', fontWeight:700, color:THEME.pink, letterSpacing:'-0.03em', lineHeight:1.25, marginTop:12,
              opacity: animIn ? 1 : 0, transform: animIn ? 'translateY(0)' : 'translateY(30px)', transition:'opacity 0.7s 0.2s, transform 0.7s 0.2s cubic-bezier(0.16,1,0.3,1)',
            }}>
              You wake up to a shortlist, not an inbox.
            </div>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:10, justifyContent:'center', maxWidth:800 }}>
            {PAIN_PILLS.map((pill,i) => (
              <div key={i} style={{ fontFamily:'Inter,sans-serif', fontSize:13, fontWeight:500, color:THEME.white,
                background:'rgba(15,13,7,0.85)', border:'1px solid rgba(201,168,76,0.18)', borderRadius:99, padding:'8px 18px', backdropFilter:'blur(12px)',
                opacity: animIn ? 1 : 0, transform: animIn ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
                transition:`opacity 0.5s ${0.3+i*0.07}s, transform 0.6s ${0.3+i*0.07}s cubic-bezier(0.34,1.56,0.64,1)`,
              }}>
                <span style={{ color:THEME.gold, fontWeight:700, marginRight:6 }}>{pill.num}</span>{pill.label}
              </div>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px,1fr))', gap:20, width:'100%', maxWidth:900 }}>
            {CHAOS_CARDS.map((card,i) => {
              const Renderer = RENDERERS[card.type];
              return (
                <div key={i} style={{ display:'flex', justifyContent:'center',
                  opacity: animIn ? 1 : 0, transform: animIn ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.9)',
                  transition:`opacity 0.6s ${0.4+i*0.08}s, transform 0.7s ${0.4+i*0.08}s cubic-bezier(0.34,1.2,0.64,1)`,
                }}>
                  <Renderer card={card}/>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // ── Desktop ─────────────────────────────────────────────────────────────────
  return (
    <section ref={sectionRef} data-scroll style={{ background:THEME.bg, height:'100vh', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'clamp(40px, 4vw, 60px)', padding:'0 clamp(8px, 2vw, 24px) clamp(20px, 3vw, 40px)' }}>
      {/* Radial glows */}
      <div style={{ position:'absolute', top:'30%', left:'50%', transform:'translate(-50%,-50%)', width:900, height:600, background:'radial-gradient(ellipse, rgba(201,168,76,0.12) 0%, transparent 65%)', pointerEvents:'none', zIndex:1 }}/>
      <div style={{ position:'absolute', bottom:'20%', right:'10%', width:600, height:400, background:'radial-gradient(ellipse, rgba(233,30,140,0.06) 0%, transparent 65%)', pointerEvents:'none', zIndex:1 }}/>
      <div style={{ position:'absolute', top:'15%', left:'5%', width:400, height:400, background:'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 65%)', pointerEvents:'none', zIndex:1 }}/>

      {/* Explosion shockwave ring — fires once on entry */}
      <div style={{
        position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        width: animIn ? 1800 : 0, height: animIn ? 1800 : 0,
        borderRadius:'50%',
        border:`1px solid rgba(201,168,76,${animIn ? 0 : 0.35})`,
        opacity: animIn ? 0 : 1,
        transition: animIn ? 'width 3.5s cubic-bezier(0.1,0.8,0.2,1), height 3.5s cubic-bezier(0.1,0.8,0.2,1), opacity 3.5s cubic-bezier(0.1,0.8,0.2,1), border-color 3.5s' : 'none',
        pointerEvents:'none', zIndex:5,
      }}/>

      <div style={{ position:'relative', width:'100%', maxWidth:1400, height:'100vh' }}>

        {/* Cards — burst in + float */}
        {CHAOS_CARDS.map((card, i) => {
          const Renderer = RENDERERS[card.type];
          const entry    = CARD_ENTRY[i];
          return (
            <FloatingAndBurstItem key={`c-${i}`} position={entry} baseRotate={entry.rotate} seed={i*7+3} animIn={animIn} delay={i*0.25} type="card">
              <Renderer card={card}/>
            </FloatingAndBurstItem>
          );
        })}

        {/* Pills — burst in + float */}
        {PAIN_PILLS.map((pill, i) => {
          const pp = PILL_POSITIONS[i];
          return (
            <FloatingAndBurstItem key={`p-${i}`} position={pp} baseRotate={0} seed={i*11+1} animIn={animIn} delay={0.6+i*0.18} type="pill">
              <div style={{ fontFamily:'Inter,sans-serif', fontSize:13.5, fontWeight:500, color:THEME.white,
                background:'rgba(15,13,7,0.85)', border:'1px solid rgba(201,168,76,0.18)', borderRadius:99,
                padding:'10px 22px', backdropFilter:'blur(12px)', whiteSpace:'nowrap',
                boxShadow:'0 4px 20px rgba(0,0,0,0.5), 0 0 20px rgba(201,168,76,0.04)',
              }}>
                <span style={{ color:THEME.gold, fontWeight:700, marginRight:6 }}>{pill.num}</span>{pill.label}
              </div>
            </FloatingAndBurstItem>
          );
        })}

        {/* Headline — cinematic word-split */}
        <AnimatedHeadline animIn={animIn}/>

      </div>

      <style dangerouslySetInnerHTML={{__html:`
        @keyframes hcRingPulse {
          0%   { transform:translate(-50%,-50%) scale(0); opacity:0.6; }
          100% { transform:translate(-50%,-50%) scale(1); opacity:0; }
        }
      `}}/>
    </section>
  );
};

export default HiringChaosSection;
