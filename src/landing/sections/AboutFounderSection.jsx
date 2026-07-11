'use client';
import React, { useEffect, useRef, useState } from 'react';

const T = { bg:'#000000', card:'#121212', white:'#EEEEEE', muted:'#9aaab8', gold:'#d96424', pink:'#d96424', orange:'#d96424' };

const TEAM = [
  { name:'Rohit Sharma', role:'Head of Engineering', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name:'Priya Kapoor', role:'VP of AI Research', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  { name:'Alex Chen', role:'Lead Product Designer', img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { name:'Sarah Okafor', role:'Head of Customer Success', img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
  { name:'Marcus Lee', role:'Senior Full-Stack Engineer', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
  { name:'Ananya Patel', role:'ML Ops Lead', img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
];

const GALLERY = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
];

const FounderCard = ({ name, role, bio, image, delay }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold:0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      display:'flex', flexDirection:'column', gap:20,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
      transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`
    }}>
      <div style={{
        aspectRatio:'1/1', borderRadius:20, overflow:'hidden',
        border:'1px solid rgba(217,100,36,0.15)',
        boxShadow:'0 8px 32px rgba(0,0,0,0.6)',
        position:'relative'
      }}>
        <img src={image} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.6s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
      </div>
      <div>
        <div style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(18px,2.5vw,24px)', fontWeight:700, color:T.white, lineHeight:1.2 }}>{name}</div>
        <div style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(12px,1.6vw,13px)', fontWeight:600, color:T.gold, textTransform:'uppercase', letterSpacing:'0.08em', marginTop:4 }}>{role}</div>
        <p style={{ fontFamily:'Outfit,sans-serif', fontSize:'clamp(13px,1.8vw,14px)', color:T.muted, lineHeight:1.6, marginTop:10 }}>{bio}</p>
      </div>
    </div>
  );
};

const TeamCard = ({ name, role, img, idx }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold:0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      background:T.card, borderRadius:16, border:'1px solid rgba(217,100,36,0.06)',
      overflow:'hidden', cursor:'pointer',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${idx * 0.08}s`
    }}>
      <div style={{ aspectRatio:'1/1', overflow:'hidden', position:'relative' }}>
        <img src={img} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.7s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
      </div>
      <div style={{ padding:'14px 16px 18px' }}>
        <div style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:15, fontWeight:700, color:T.white }}>{name}</div>
        <div style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:T.muted, marginTop:2 }}>{role}</div>
      </div>
    </div>
  );
};

const GalleryItem = ({ src, idx }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold:0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      borderRadius:14, overflow:'hidden',
      border:'1px solid rgba(217,100,36,0.08)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
      transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${idx * 0.1}s`
    }}>
      <img src={src} alt="" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.6s ease' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      />
    </div>
  );
};

export const AboutFounderSection = () => {
  return (
    <div style={{ position:'relative' }}>
      {/* Golden cut-line top */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:1, zIndex:20,
        background:'linear-gradient(90deg, transparent 0%, rgba(217,100,36,0.5) 20%, rgba(255,255,255,0.95) 50%, rgba(217,100,36,0.5) 80%, transparent 100%)',
        boxShadow:'0 0 40px 2px rgba(217,100,36,0.55), 0 4px 80px rgba(217,100,36,0.18)',
      }} />

      {/* ── Section 1: Hero ── */}
      <section data-scroll style={{ background:T.bg, padding:'clamp(140px,18vh,220px) clamp(16px,4vw,48px) clamp(60px,8vw,100px)', borderTop:'1px solid rgba(217,100,36,0.08)' }}>
        <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:12, marginBottom:24,
            padding:'6px 16px', borderRadius:100, fontSize:'0.75rem', fontWeight:700,
            textTransform:'uppercase', letterSpacing:'0.12em',
            background:'rgba(217,100,36,0.1)', border:'1px solid rgba(217,100,36,0.2)', color:T.gold
          }}>
            About Us
          </div>
          <h2 style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(2.4rem,5.5vw,4rem)', fontWeight:700, color:T.white, letterSpacing:'-0.02em', lineHeight:1.08, margin:0 }}>
            The Story Behind{' '}
            <span style={{ background:'linear-gradient(90deg, #d96424, #8a3a10)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>intervieHire.</span>
          </h2>
          <p style={{ fontFamily:'Outfit,sans-serif', fontSize:'clamp(15px,2vw,18px)', color:T.muted, lineHeight:1.7, maxWidth:650, margin:'48px auto 0' }}>
            Hiring technical candidates requires immense time from your engineering leads, often pulling them away from building core product. We observed this friction firsthand and set out to automate evaluations without sacrificing quality or candidate experience.
          </p>
          <p style={{ fontFamily:'Outfit,sans-serif', fontSize:'clamp(14px,1.8vw,16px)', color:'#aaa8a0', lineHeight:1.7, maxWidth:650, margin:'16px auto 0' }}>
            By pairing state-of-the-art AI screening with a network of vetted, highly-calibrated industry experts, IntervieHire delivers a complete, secure, and standardized evaluation pipeline that scales with your growth.
          </p>
        </div>
      </section>

      {/* ── Section 2: Meet the Founders ── */}
      <section data-scroll style={{ background:T.bg, padding:'clamp(60px,8vw,100px) clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'clamp(40px,6vw,64px)' }}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:12, marginBottom:16,
              padding:'6px 16px', borderRadius:100, fontSize:'0.75rem', fontWeight:700,
              textTransform:'uppercase', letterSpacing:'0.12em',
              background:'rgba(217,100,36,0.1)', border:'1px solid rgba(217,100,36,0.2)', color:T.gold
            }}>
              Meet the Founders
            </div>
            <h2 style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(2rem,4.5vw,3rem)', fontWeight:700, color:T.white, letterSpacing:'-0.02em', lineHeight:1.1, margin:0 }}>
              The People Behind the Mission.
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'clamp(32px,4vw,60px)' }}>
            <FounderCard
              name="Devasri Bali"
              role="Co-Founder & CEO"
              bio="Devasri brings deep expertise in AI product strategy and go-to-market execution. She spent the last decade building intelligent hiring systems and saw firsthand how broken the technical interview process really is."
              image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80"
              delay={0}
            />
            <FounderCard
              name="Aditya Rana"
              role="Co-Founder & CTO"
              bio="Aditya architected large-scale ML pipelines at multiple hyper-growth startups. He believes hiring should be as rigorous as the product you build — and that AI can make it fair, fast, and fraud-proof."
              image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80"
              delay={0.15}
            />
          </div>
          <div style={{ textAlign:'center', marginTop:'clamp(32px,5vw,48px)' }}>
            <p style={{ fontFamily:'Outfit,sans-serif', fontSize:'clamp(14px,1.8vw,16px)', color:T.muted, lineHeight:1.6, fontStyle:'italic', maxWidth:600, margin:'0 auto' }}>
              "We started IntervieHire to build the autonomous hiring layer of the web — eliminating bias and saving thousands of engineering hours."
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 3: Meet the Team ── */}
      <section data-scroll style={{ background:T.bg, padding:'clamp(60px,8vw,100px) clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'clamp(32px,5vw,56px)' }}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:12, marginBottom:16,
              padding:'6px 16px', borderRadius:100, fontSize:'0.75rem', fontWeight:700,
              textTransform:'uppercase', letterSpacing:'0.12em',
              background:'rgba(217,100,36,0.1)', border:'1px solid rgba(217,100,36,0.2)', color:T.gold
            }}>
              Our Team
            </div>
            <h2 style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(2rem,4.5vw,3rem)', fontWeight:700, color:T.white, letterSpacing:'-0.02em', lineHeight:1.1, margin:0 }}>
              Meet the People Who Build It.
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(170px, 1fr))', gap:'clamp(12px,2vw,20px)' }}>
            {TEAM.map((m, i) => <TeamCard key={i} {...m} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ── Section 4: Gallery ── */}
      <section data-scroll style={{ background:T.bg, padding:'clamp(60px,8vw,100px) clamp(16px,4vw,48px)', borderBottom:'1px solid rgba(217,100,36,0.08)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'clamp(32px,5vw,56px)' }}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:12, marginBottom:16,
              padding:'6px 16px', borderRadius:100, fontSize:'0.75rem', fontWeight:700,
              textTransform:'uppercase', letterSpacing:'0.12em',
              background:'rgba(217,100,36,0.1)', border:'1px solid rgba(217,100,36,0.2)', color:T.gold
            }}>
              Life at IntervieHire
            </div>
            <h2 style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(2rem,4.5vw,3rem)', fontWeight:700, color:T.white, letterSpacing:'-0.02em', lineHeight:1.1, margin:0 }}>
              Moments That Matter.
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'clamp(12px,2vw,18px)' }}>
            {GALLERY.map((src, i) => <GalleryItem key={i} src={src} idx={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
};
