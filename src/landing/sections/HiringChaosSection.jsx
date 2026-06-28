'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

// ── InterviewHire Chaos Section — actual color scheme ────────────────────────
// Dark olive-black bg, gold numbers, hot-pink accent, off-white text

const THEME = {
  bg:       '#0F0D07',
  card:     '#18160C',
  border:   'rgba(184,150,12,0.15)',
  gold:     '#C9A84C',
  pink:     '#E8356D',
  white:    '#F0ECD8',
  muted:    '#6B6650',
  faint:    'rgba(201,168,76,0.06)',
};

// ── Pain pills ───────────────────────────────────────────────────────────────
const PAIN_PILLS = [
  { num: "50%+", label: "Reduction in cost-per-hire" },
  { num: "100s of hrs", label: "Saved per hire cycle" },
  { num: "Zero Bias", label: "In AI screening layer" },
  { num: "24/7", label: "Candidate interviews automated" },
  { num: "98%", label: "Cheating detection accuracy" },
  { num: "10x Faster", label: "Hiring pipeline velocity" },
  { num: "4.9/5", label: "Candidate experience rating" },
];

// ── Cards ────────────────────────────────────────────────────────────────────
const CHAOS_CARDS = [
  {
    type: 'score',
    label: 'Candidate Score',
    name: 'Priya Sharma — Backend Eng.',
    score: '61 / 100',
    scoreColor: THEME.gold,
    note1: 'Manually reviewed by 3 people',
    note2: 'No decision after 2 weeks',
  },
  {
    type: 'status',
    label: 'Interview Status',
    name: 'Marcus T. — Final Round',
    status: 'DROPPED',
    reason: 'Interviewer no-showed',
    time: '3 days ago',
  },
  {
    type: 'calendar',
    label: 'Scheduling',
    candidate: 'Arjun M. — 4th reschedule',
    slots: [
      { day: 'Mon · 10:00 AM', state: 'declined' },
      { day: 'Tue · 2:30 PM',  state: 'declined' },
      { day: 'Wed · 4:00 PM',  state: 'pending'  },
    ],
  },
  {
    type: 'cost',
    label: 'Recruiter Cost',
    line: 'Manual screening',
    hrs: '38 hrs',
    hrsLabel: 'this week',
    cost: '$2,660',
    costLabel: 'recruiter cost',
    flag: 'Zero AI assistance used',
  },
  {
    type: 'score',
    label: 'Panel Evaluation',
    name: 'Kevin L. — Data Engineer',
    score: '78 / 100',
    scoreColor: THEME.pink,
    note1: 'Conflicting feedback from panel',
    note2: 'No structured rubric applied',
  },
  {
    type: 'status',
    label: 'Offer Status',
    name: 'Neha R. — Product Manager',
    status: 'OFFER DECLINED',
    reason: 'Process took 6 weeks',
    time: 'Yesterday',
  },
];

const CARD_POSITIONS = [
  { top: '4%',  left: '1%',  rotate: -5 },
  { top: '40%', left: '-1%', rotate:  3 },
  { top: '5%',  right: '2%', rotate:  4 },
  { top: '44%', right: '1%', rotate: -3 },
  { top: '70%', right: '3%', rotate:  2 },
  { top: '70%', left: '1%',  rotate: -4 },
];

const PILL_POSITIONS = [
  { top: '13%', left: '26%'  },
  { top: '22%', left: '36%'  },
  { top: '16%', right: '24%' },
  { top: '77%', left: '24%'  },
  { top: '81%', left: '40%'  },
  { top: '74%', right: '22%' },
  { bottom: '48%', left: '6%' },
];

// ── Shake params ─────────────────────────────────────────────────────────────
function makeParams(seed) {
  const r = (n) => ((seed * 9301 + n * 49297) % 233280) / 233280;
  return { ax: 3+r(1)*5, ay: 2+r(2)*4, ar: 0.4+r(3)*0.9, fr: 0.5+r(4)*0.7, ph: r(5)*Math.PI*2 };
}

// ── FloatingItem ─────────────────────────────────────────────────────────────
function FloatingItem({ children, position, baseRotate, seed }) {
  const ref   = useRef(null);
  const frame = useRef(null);
  const p     = useRef(makeParams(seed));

  useEffect(() => {
    const { ax, ay, ar, fr, ph } = p.current;
    let t0 = null;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const t = ((ts - t0) / 1000) * fr * Math.PI * 2;
      if (ref.current)
        ref.current.style.transform =
          `rotate(${baseRotate + ar * Math.sin(t * 0.83 + ph + 2)}deg) translate(${ax * Math.sin(t + ph)}px,${ay * Math.sin(t * 1.37 + ph + 1)}px)`;
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [baseRotate]);

  const pos = {};
  ['top','left','right','bottom'].forEach(k => { if (position[k] != null) pos[k] = position[k]; });

  return (
    <div ref={ref} style={{ position:'absolute', willChange:'transform', transformOrigin:'center', ...pos }}>
      {children}
    </div>
  );
}

// ── Card styles ───────────────────────────────────────────────────────────────
const cs = {
  card:   { background: THEME.card, border: `1px solid ${THEME.border}`, borderRadius: 14, padding: '16px 18px', width: 252, boxShadow: '0 12px 40px rgba(0,0,0,0.6)' },
  label:  { fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:600, letterSpacing:'0.1em', color:THEME.gold, textTransform:'uppercase', marginBottom:10 },
  name:   { fontFamily:'Inter,sans-serif', fontSize:13, fontWeight:600, color:THEME.white, marginBottom:4 },
  sub:    { fontFamily:'Inter,sans-serif', fontSize:11.5, color:THEME.muted, lineHeight:1.4 },
  divider:{ height:1, background:'rgba(201,168,76,0.08)', margin:'10px 0' },
};

const ScoreCard = ({ card }) => (
  <div style={cs.card}>
    <div style={cs.label}>{card.label}</div>
    <div style={cs.name}>{card.name}</div>
    <div style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:26, fontWeight:700, color:card.scoreColor, margin:'8px 0' }}>{card.score}</div>
    <div style={cs.divider}/>
    <div style={{ ...cs.sub, color:THEME.muted, marginBottom:4 }}>{card.note1}</div>
    <div style={cs.sub}>{card.note2}</div>
  </div>
);

const StatusCard = ({ card }) => (
  <div style={cs.card}>
    <div style={cs.label}>{card.label}</div>
    <div style={cs.name}>{card.name}</div>
    <div style={{ display:'inline-block', background:'rgba(232,53,109,0.12)', border:'1px solid rgba(232,53,109,0.3)', borderRadius:6, padding:'3px 10px', margin:'8px 0' }}>
      <span style={{ fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:700, color:THEME.pink, letterSpacing:'0.06em' }}>{card.status}</span>
    </div>
    <div style={cs.divider}/>
    <div style={{ display:'flex', justifyContent:'space-between' }}>
      <span style={cs.sub}>{card.reason}</span>
      <span style={{ ...cs.sub, color:'#3D3B2E' }}>{card.time}</span>
    </div>
  </div>
);

const CalendarCard = ({ card }) => (
  <div style={cs.card}>
    <div style={cs.label}>{card.label}</div>
    <div style={{ ...cs.name, marginBottom:10 }}>{card.candidate}</div>
    {card.slots.map((s,i) => (
      <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
        <span style={{ ...cs.sub, color:'#7A7660' }}>{s.day}</span>
        <span style={{
          fontSize:10, fontFamily:'Inter,sans-serif', fontWeight:600, borderRadius:4, padding:'2px 7px',
          color: s.state==='declined' ? THEME.pink : THEME.gold,
          background: s.state==='declined' ? 'rgba(232,53,109,0.1)' : 'rgba(201,168,76,0.1)',
          border: `1px solid ${s.state==='declined' ? 'rgba(232,53,109,0.3)' : 'rgba(201,168,76,0.3)'}`,
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

const RENDERERS = { score: ScoreCard, status: StatusCard, calendar: CalendarCard, cost: CostCard };

// ── Section ───────────────────────────────────────────────────────────────────
export const HiringChaosSection = () => {
  const [mounted, setMounted] = useState(false);
  const isMobileOrTablet = useMediaQuery('(max-width: 1024px)');
  useEffect(() => setMounted(true), []);

  if (isMobileOrTablet) {
    return (
      <section data-scroll style={{ background: THEME.bg, padding: 'clamp(60px, 8vw, 100px) clamp(16px, 4vw, 32px)', position: 'relative', overflow: 'hidden', borderTop: `1px solid ${THEME.border}` }}>
        {/* Warm radial glow */}
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:500, height:500, background:'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)', pointerEvents:'none', zIndex:1 }}/>
        
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 6vw, 48px)', alignItems: 'center' }}>
          
          {/* Headline */}
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(1.3rem, 3.5vw, 2rem)', fontWeight:700, color:THEME.white, letterSpacing:'-0.03em', lineHeight:1.25, margin:0 }}>
              While your team sleeps, Lina screens,<br/>
              scores, and ranks every applicant.
            </h2>
            <div style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(1.3rem, 3.5vw, 2rem)', fontWeight:700, color:THEME.pink, letterSpacing:'-0.03em', lineHeight:1.25, marginTop:12 }}>
              You wake up to a shortlist, not an inbox.
            </div>
          </div>

          {/* Pain Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', maxWidth: 800 }}>
            {PAIN_PILLS.map((pill, i) => (
              <div key={i} className="hc-pill" style={{
                fontFamily:'Inter,sans-serif', fontSize:13, fontWeight:500,
                color: THEME.white,
                background: 'rgba(15,13,7,0.9)',
                border: '1px solid rgba(201,168,76,0.14)',
                borderRadius:99, padding:'8px 18px',
                backdropFilter:'blur(12px)',
                boxShadow:'0 4px 20px rgba(0,0,0,0.5)',
              }}>
                <span style={{ color: THEME.gold, fontWeight:700, marginRight:6 }}>{pill.num}</span>
                {pill.label}
              </div>
            ))}
          </div>

          {/* Chaos Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 20,
            width: '100%',
            maxWidth: 900
          }}>
            {CHAOS_CARDS.map((card, i) => {
              const Renderer = RENDERERS[card.type];
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Renderer card={card} />
                </div>
              );
            })}
          </div>

        </div>
      </section>
    );
  }

  return (
    <section data-scroll style={{ background: THEME.bg, minHeight:'100vh', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {/* Warm radial glow */}
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:700, height:500, background:'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents:'none', zIndex:1 }}/>

      <div style={{ position:'relative', width:'100%', maxWidth:1400, height:'100vh', minHeight:700 }}>
        {CHAOS_CARDS.map((card, i) => {
          const Renderer = RENDERERS[card.type];
          const pos = CARD_POSITIONS[i];
          return (
            <FloatingItem key={i} position={pos} baseRotate={pos.rotate} seed={i*7+3}>
              <div style={{ opacity: mounted ? 1 : 0, transition:`opacity 0.5s ${i*0.08}s`, zIndex:3 }}>
                <Renderer card={card}/>
              </div>
            </FloatingItem>
          );
        })}

        {PAIN_PILLS.map((pill, i) => (
          <FloatingItem key={`p${i}`} position={PILL_POSITIONS[i]} baseRotate={0} seed={i*11+1}>
            <div style={{ opacity: mounted ? 1 : 0, transition:`opacity 0.5s ${0.3+i*0.06}s` }}>
              <div className="hc-pill" style={{
                fontFamily:'Inter,sans-serif', fontSize:13.5, fontWeight:500,
                color: THEME.white,
                background: 'rgba(15,13,7,0.9)',
                border: '1px solid rgba(201,168,76,0.14)',
                borderRadius:99, padding:'10px 22px',
                backdropFilter:'blur(12px)',
                whiteSpace:'nowrap',
                boxShadow:'0 4px 20px rgba(0,0,0,0.5)',
              }}>
                <span style={{ color: THEME.gold, fontWeight:700, marginRight:6 }}>{pill.num}</span>
                {pill.label}
              </div>
            </div>
          </FloatingItem>
        ))}

        {/* Headline */}
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:10, textAlign:'center', pointerEvents:'none', width:'100%', padding:'0 clamp(12px, 4vw, 20px)' }}>
          <h2 style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(1.2rem,2.5vw,2rem)', fontWeight:700, color:THEME.white, letterSpacing:'-0.03em', lineHeight:1.2, margin:0 }}>
            While your team sleeps, Lina screens,<br/>
            scores, and ranks every applicant.
          </h2>
          <div style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(1.2rem,2.5vw,2rem)', fontWeight:700, color:THEME.pink, letterSpacing:'-0.03em', lineHeight:1.2, marginTop:12 }}>
            You wake up to a shortlist, not an inbox.
          </div>
        </div>

      </div>
    </section>
  );
};

export default HiringChaosSection;
