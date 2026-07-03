'use client';
import React from 'react';
import { Navbar } from './layout';
import {
  HeroSection,
  TheProblemSection,
  TransitionSection,

  SolutionSection,
  CalculatorSection,
  HiringChaosSection,
  BudgetCtaSection,
  FAQSection,
  FooterCTA,
} from './sections';
import { SmoothScrollProvider } from './SmoothScrollProvider';

export default function LandingApp() {

  return (
    <SmoothScrollProvider>
    <div className="ih-landing">
      <Navbar />
      {/* Wrapper to limit the sticky lifetime of HeroSection */}
      <div style={{ position: 'relative', height: '240vh' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 1 }}>
          <HeroSection />
        </div>
      </div>
      {/* TheProblemSection slides over the hero — same stacking trick as TransitionSection */}
      <div style={{ position: 'relative', zIndex: 2, marginTop: '-100vh' }}>
        <TheProblemSection />
      </div>
      <TransitionSection />
        <SolutionSection />
        <HiringChaosSection/>
      {/* HiringChaosSection — sticky wrapper so Calculator can slide over it */}
      <div style={{ position: 'relative', height: '200vh' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 1 }}>
        <BudgetCtaSection />
        </div>
      </div>
      {/* CalculatorSection slides over HiringChaos — same stacking trick as Problem/Hero */}
      <div style={{ position: 'relative', zIndex: 3, marginTop: '-100vh' }}>
        <CalculatorSection />
      </div>
     
      {/* Book a Demo CTA */}
      <section data-scroll style={{ background:'#000', padding:'clamp(80px,10vw,140px) clamp(16px,4vw,48px)', textAlign:'center', position:'relative', overflow:'hidden', borderTop:'1px solid rgba(201,168,76,0.08)' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:400, background:'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:'15%', left:'8%', width:6, height:6, borderRadius:'50%', background:'#C9A84C', pointerEvents:'none', boxShadow:'0 0 12px rgba(201,168,76,0.6)', animation:'ctaSparkle1 3s ease-in-out infinite 0.5s' }} />
        <div style={{ position:'absolute', bottom:'20%', right:'5%', width:8, height:8, borderRadius:'50%', background:'#C9A84C', pointerEvents:'none', boxShadow:'0 0 10px rgba(201,168,76,0.5)', animation:'ctaSparkle2 4s ease-in-out infinite 1s' }} />
        <div style={{ position:'absolute', top:'30%', right:'12%', width:4, height:4, borderRadius:'50%', background:'#E91E8C', pointerEvents:'none', boxShadow:'0 0 8px rgba(233,30,140,0.5)', animation:'ctaSparkle1 3.5s ease-in-out infinite 0.8s' }} />
        <div style={{ position:'absolute', bottom:'40%', left:'4%', width:5, height:5, borderRadius:'50%', background:'#C9A84C', pointerEvents:'none', boxShadow:'0 0 10px rgba(201,168,76,0.5)', animation:'ctaSparkle2 2.8s ease-in-out infinite 0.3s' }} />
        <div style={{ position:'relative', zIndex:2 }}>
          <h2 style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(2rem,4.5vw,3.5rem)', fontWeight:700, color:'#F5F0E8', letterSpacing:'-0.02em', lineHeight:1.1, margin:'0 auto 16px', maxWidth:600, opacity:0, animation:'ctaReveal 1s cubic-bezier(0.16,1,0.3,1) 0s forwards' }}>
            Ready to{' '}
            <span style={{ background:'linear-gradient(90deg, #C9A84C, #E8C97A)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>join us?</span>
          </h2>
          <p style={{ fontSize:'clamp(14px,1.6vw,16px)', color:'#888880', maxWidth:480, margin:'0 auto 32px', lineHeight:1.6, opacity:0, animation:'ctaReveal 1s cubic-bezier(0.16,1,0.3,1) 0.15s forwards' }}>
            Start hiring smarter with AI-powered interviews and built-in integrity checks.
          </p>
          <button
            onClick={() => window.location.href = '/book-demo'}
            style={{
              fontFamily:'Outfit,sans-serif', fontSize:16, fontWeight:700,
              background:'linear-gradient(135deg, #C9A84C, #d4b85a)', color:'#000',
              border:'none', borderRadius:12, padding:'16px 36px', cursor:'pointer',
              boxShadow:'0 0 30px rgba(201,168,76,0.25)', opacity:0,
              animation:'ctaReveal 1s cubic-bezier(0.16,1,0.3,1) 0.3s forwards',
              transition:'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='scale(1.04)'; e.currentTarget.style.boxShadow='0 0 45px rgba(201,168,76,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 0 30px rgba(201,168,76,0.25)'; }}
          >
            Book a Demo &rarr;
          </button>
        </div>
        <style>{`
          @keyframes ctaReveal { 0% { opacity:0; transform:translateY(40px) scale(0.95); filter:blur(6px); } 100% { opacity:1; transform:translateY(0) scale(1); filter:blur(0); } }
          @keyframes ctaSparkle1 { 0%,100% { opacity:0.2; transform:scale(0.5) translate(0,0); } 50% { opacity:1; transform:scale(1.2) translate(10px,-15px); } }
          @keyframes ctaSparkle2 { 0%,100% { opacity:0.2; transform:scale(0.5) translate(0,0); } 50% { opacity:1; transform:scale(1.4) translate(-8px,10px); } }
        `}</style>
      </section>
      <FAQSection />
      <FooterCTA />
    </div>
    </SmoothScrollProvider>
  );
}
