'use client';
import React from 'react';
import { Eyebrow } from '../ui';

export const ComparisonSection = () => {
  const cons = [
    "Endless scheduling and coordination delays",
    "Repetitive screening calls waste recruiter hours",
    "Inconsistent evaluations across interviewers",
    "Candidate cheating and proxy interviews go unnoticed"
  ];

  const pros = [
    "AI interviews candidates 24/7 automatically",
    "Built-in cheating detection ensures interview integrity",
    "Standardised scoring for fair candidate evaluation",
    "Hire faster with automated screening and instant insights"
  ];

  return (
    <section id="comparison" style={{ background: '#0A0A0A', padding: 'clamp(60px, 8vw, 100px) clamp(16px, 4vw, 48px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Eyebrow>Workflow Shift</Eyebrow>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: '#F5F0E8',
            letterSpacing: '-0.02em',
            lineHeight: 1.15
          }}>
            From <span style={{ color: '#FF6B35' }}>Chaos</span> to <span style={{
              background: 'linear-gradient(90deg, #FF6B35, #E91E8C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Clarity.</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 40,
          position: 'relative'
        }}>
          {/* Chaos Card */}
          <div style={{
            background: 'rgba(255, 107, 53, 0.02)',
            border: '1px solid rgba(255, 107, 53, 0.12)',
            borderRadius: 20,
            padding: 'clamp(24px, 3vw, 40px) clamp(20px, 3vw, 32px)',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)'
          }}>
            <h3 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(18px, 3vw, 22px)',
              fontWeight: 700,
              color: '#FF6B35',
              marginBottom: 12,
              letterSpacing: '-0.01em'
            }}>Traditional Hiring</h3>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, color: '#888880', marginBottom: 32 }}>The Old Way</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 2vw, 20px)' }}>
              {cons.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <span style={{ color: '#FF6B35', fontWeight: 'bold', fontSize: 'clamp(14px, 2.5vw, 16px)' }}>✕</span>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(13px, 2vw, 15px)', color: '#888880', lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider Connector (Hidden on small screens) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.3,
            pointerEvents: 'none'
          }} className="comparison-connector">
            <svg width="40" height="120" viewBox="0 0 40 120" fill="none">
              <path d="M20 0V120" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="4 4"/>
              <circle cx="20" cy="60" r="6" fill="#C9A84C"/>
            </svg>
          </div>

          {/* Clarity Card */}
          <div style={{
            background: 'rgba(201, 168, 76, 0.03)',
            border: '1px solid rgba(201, 168, 76, 0.2)',
            borderRadius: 20,
            padding: 'clamp(24px, 3vw, 40px) clamp(20px, 3vw, 32px)',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)'
          }}>
            <h3 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(18px, 3vw, 22px)',
              fontWeight: 700,
              color: '#C9A84C',
              marginBottom: 12,
              letterSpacing: '-0.01em'
            }}>With IntervieHire</h3>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, color: '#888880', marginBottom: 32 }}>AI-Powered Hiring That Scales</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 2vw, 20px)' }}>
              {pros.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <span style={{ color: '#C9A84C', fontWeight: 'bold', fontSize: 'clamp(14px, 2.5vw, 16px)' }}>✓</span>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(13px, 2vw, 15px)', color: '#F5F0E8', lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
