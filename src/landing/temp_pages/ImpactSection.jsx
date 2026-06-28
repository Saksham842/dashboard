'use client';
import React from 'react';
import { Eyebrow, RevealCard, FadeUpOnScroll } from '../ui';

export const ImpactSection = () => {
  const stats = [
    { num: "50%+", label: "Reduction in cost-per-hire" },
    { num: "100s of hrs", label: "Saved per hire cycle" },
    { num: "Zero Bias", label: "In AI screening layer" },
    { num: "24/7", label: "Candidate interviews automated" },
    { num: "98%", label: "Cheating detection accuracy" },
    { num: "10x Faster", label: "Hiring pipeline velocity" },
    { num: "4.9/5", label: "Candidate experience rating" },
  ];

  const doubleStats = [...stats, ...stats];

  return (
    <section data-scroll style={{ background: '#0F0D07', padding: 'clamp(60px, 8vw, 120px) clamp(16px, 4vw, 48px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}/>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <Eyebrow>What We Solve</Eyebrow>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: '#F5F0E8', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 64, maxWidth: 560 }}>
          What changes when you use intervieHire.
        </h2>
        
        <div data-scroll className="evy-stat-marquee" style={{ marginBottom: 56 }}>
          <div className="evy-stat-track">
            {doubleStats.map((s, i) => (
              <div key={i} style={{
                flexShrink: 0,
                width: 'clamp(240px, 60vw, 320px)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(201, 168, 76, 0.12)',
                borderRadius: 16,
                padding: 'clamp(24px, 3vw, 36px) clamp(20px, 3vw, 28px)',
                marginRight: 24,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
              }}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(2.2rem, 4.5vw, 2.8rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  marginBottom: 16,
                  background: 'linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {s.num}
                </div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(13px, 2vw, 15px)', color: '#888880', lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <RevealCard delay={0.3}>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, color: '#555550', lineHeight: 1.7, maxWidth: 680, borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 40 }}>
            Our interviewers are trained, calibrated, and use a standardized framework, removing bias and ensuring every candidate gets a fair, high-quality assessment.
          </p>
        </RevealCard>
      </div>
    </section>
  );
};
