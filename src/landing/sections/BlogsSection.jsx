'use client';
import React from 'react';
import { Eyebrow, GlassCard } from '../ui';

export const BlogsSection = () => {
  const blogPosts = [
    { title: "Preventing AI Interview Cheating", excerpt: "How we screen for screen sharing, web searches, and copy-paste behavior.", date: "June 2, 2026" },
    { title: "Standardizing Tech Screening", excerpt: "The impact of standardized rubric evaluation on engineering diversity and performance.", date: "May 24, 2026" },
    { title: "Scaling Startups Asynchronously", excerpt: "How async technical screening saves up to 35 hours per engineer hiring cycle.", date: "May 10, 2026" }
  ];

  return (
    <section data-scroll id="blogs" style={{ background: '#050505', padding: 'clamp(60px, 8vw, 100px) clamp(16px, 4vw, 48px)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Eyebrow>Resources</Eyebrow>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: '#F5F0E8',
            letterSpacing: '-0.02em',
            lineHeight: 1.15
          }}>
            Our Latest <span style={{
              background: 'linear-gradient(90deg, #FF6B35, #E91E8C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Articles.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {blogPosts.map((post, idx) => (
            <GlassCard data-scroll-repeat key={idx}>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, color: '#C9A84C', marginBottom: 12, fontWeight: 600 }}>{post.date}</div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(16px, 2.5vw, 18px)', fontWeight: 700, color: '#F5F0E8', marginBottom: 12, lineHeight: 1.3 }}>{post.title}</h3>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(12px, 2vw, 14px)', color: '#888880', lineHeight: 1.6, marginBottom: 20 }}>{post.excerpt}</p>
              <a href="#" style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: '#F5F0E8', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'color 0.2s' }}
                 onMouseEnter={e => e.target.style.color = '#C9A84C'}
                 onMouseLeave={e => e.target.style.color = '#F5F0E8'}
              >
                Read Article
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
