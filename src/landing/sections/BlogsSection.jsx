'use client';
import React, { useEffect, useRef, useState } from 'react';

const T = { bg:'#000', card:'#0A0A0A', white:'#F5F0E8', muted:'#888880', gold:'#C9A84C', pink:'#E91E8C', orange:'#FF6B35' };

const BLOGS = [
  { title:"Preventing AI Interview Cheating", excerpt:"How we screen for screen sharing, web searches, and copy-paste behavior in real-time interviews.", date:"June 2, 2026", tag:"Engineering", readTime:"5 min read" },
  { title:"Standardizing Tech Screening", excerpt:"The impact of standardized rubric evaluation on engineering diversity and long-term performance.", date:"May 24, 2026", tag:"Diversity", readTime:"7 min read" },
  { title:"Scaling Startups Asynchronously", excerpt:"How async technical screening saves up to 35 hours per engineer hiring cycle.", date:"May 10, 2026", tag:"Startups", readTime:"6 min read" },
  { title:"The Rise of AI-Powered Interviews", excerpt:"Why forward-thinking companies are replacing phone screens with conversational AI agents.", date:"Apr 28, 2026", tag:"AI Trends", readTime:"8 min read" },
  { title:"Building a Bias-Free Hiring Pipeline", excerpt:"Strategies for removing unconscious bias from every stage of the technical interview process.", date:"Apr 14, 2026", tag:"Diversity", readTime:"6 min read" },
  { title:"How to Evaluate Senior Engineers at Scale", excerpt:"Deep-dive system design and architecture assessments that separate top-tier talent.", date:"Mar 30, 2026", tag:"Engineering", readTime:"9 min read" },
  { title:"Why Traditional Technical Interviews Are Broken", excerpt:"The data behind why whiteboard interviews fail and what actually predicts job performance.", date:"Mar 15, 2026", tag:"Industry", readTime:"7 min read" },
  { title:"Reducing Time-to-Hire with Automation", excerpt:"How automated screening pipelines cut your hiring cycle from weeks to days.", date:"Feb 28, 2026", tag:"Productivity", readTime:"5 min read" },
  { title:"The Cost of a Bad Engineering Hire", excerpt:"Breaking down the real financial and cultural cost of mis-hiring in technical roles.", date:"Feb 10, 2026", tag:"Business", readTime:"6 min read" },
  { title:"Integrating AI Interviews with Your ATS", excerpt:"A technical guide to connecting IntervieHire with Greenhouse, Lever, Ashby and more.", date:"Jan 25, 2026", tag:"Integration", readTime:"8 min read" },
  { title:"Remote-First Hiring Best Practices", excerpt:"Building evaluation workflows that work across time zones, cultures, and async schedules.", date:"Jan 8, 2026", tag:"Remote", readTime:"5 min read" },
  { title:"2026 State of Technical Hiring", excerpt:"Annual report on hiring trends, salary benchmarks, and the fastest-growing skill demands.", date:"Dec 15, 2025", tag:"Research", readTime:"12 min read" },
];

const BlogCard = ({ post, idx }) => {
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
      background:T.card, borderRadius:16, border:'1px solid rgba(201,168,76,0.06)',
      padding:'clamp(20px,3vw,28px)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${idx * 0.06}s`
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
        <span style={{
          fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:700,
          textTransform:'uppercase', letterSpacing:'0.06em',
          padding:'4px 10px', borderRadius:100,
          background:'rgba(201,168,76,0.1)', color:T.gold, border:'1px solid rgba(201,168,76,0.15)'
        }}>{post.tag}</span>
        <span style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:T.muted }}>{post.readTime}</span>
      </div>
      <div style={{ fontFamily:'Outfit,sans-serif', fontSize:12, color:T.muted, marginBottom:10, fontWeight:500 }}>{post.date}</div>
      <h3 style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(15px,2.2vw,17px)', fontWeight:700, color:T.white, lineHeight:1.3, margin:'0 0 10px' }}>{post.title}</h3>
      <p style={{ fontFamily:'Outfit,sans-serif', fontSize:'clamp(12px,1.8vw,13px)', color:T.muted, lineHeight:1.65, margin:'0 0 16px' }}>{post.excerpt}</p>
      <a href="#" style={{
        fontFamily:'Outfit,sans-serif', fontSize:13, color:T.white, textDecoration:'none',
        fontWeight:600, display:'inline-flex', alignItems:'center', gap:6,
        transition:'color 0.2s'
      }}
        onMouseEnter={e => e.target.style.color = T.gold}
        onMouseLeave={e => e.target.style.color = T.white}
      >
        Read Article
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );
};

export const BlogsSection = () => {
  const [activeTag, setActiveTag] = useState('All');
  const tags = ['All', ...new Set(BLOGS.map(b => b.tag))];
  const filtered = activeTag === 'All' ? BLOGS : BLOGS.filter(b => b.tag === activeTag);

  return (
    <div style={{ position:'relative' }}>
      {/* Golden cut-line top */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:1, zIndex:20,
        background:'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 20%, rgba(255,255,255,0.95) 50%, rgba(201,168,76,0.5) 80%, transparent 100%)',
        boxShadow:'0 0 40px 2px rgba(201,168,76,0.55), 0 4px 80px rgba(201,168,76,0.18)',
      }} />

      <section data-scroll id="blogs" style={{ background: T.bg, padding:'clamp(100px,14vh,160px) clamp(16px,4vw,48px) clamp(60px,8vw,100px)', borderTop:'1px solid rgba(201,168,76,0.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)' }}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:12, marginBottom:16,
              padding:'6px 16px', borderRadius:100, fontSize:'0.75rem', fontWeight:700,
              textTransform:'uppercase', letterSpacing:'0.12em',
              background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.2)', color:T.gold
            }}>
              Resources
            </div>
            <h2 style={{
              fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(2.2rem,5vw,3.5rem)', fontWeight:700,
              color:T.white, letterSpacing:'-0.02em', lineHeight:1.15, margin:0
            }}>
              Our Latest <span style={{
                background:'linear-gradient(90deg, #FF6B35, #E91E8C)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'
              }}>Articles.</span>
            </h2>
          </div>

          {/* Category filter */}
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:8, marginBottom:'clamp(32px,5vw,48px)' }}>
            {tags.map(tag => (
              <button key={tag} onClick={() => setActiveTag(tag)} style={{
                fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600,
                textTransform:'uppercase', letterSpacing:'0.06em',
                padding:'8px 18px', borderRadius:100,
                cursor:'pointer', transition:'all 0.3s ease',
                background: activeTag === tag ? T.gold : 'rgba(201,168,76,0.06)',
                color: activeTag === tag ? '#000' : T.muted,
                border: activeTag === tag ? 'none' : '1px solid rgba(201,168,76,0.15)'
              }}>
                {tag}
              </button>
            ))}
          </div>

          {/* Blog grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'clamp(16px,2.5vw,24px)' }}>
            {filtered.map((post, idx) => (
              <BlogCard key={`${post.title}-${idx}`} post={post} idx={idx} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
