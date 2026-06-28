'use client';
import React from 'react';
import { Eyebrow } from '../ui';

export const FAQSection = () => {
  const faqs = [
    {
      q: "How does the AI prevent candidate cheating?",
      a: "Our AI platform features advanced integrity checks: face verification via webcam, screen sharing detection, copy-paste blocks, and automated parsing of coding responses to detect plagiarism and third-party prompts."
    },
    {
      q: "What types of roles can intervieHire evaluate?",
      a: "We support a wide array of technical and non-technical roles, including software engineers (frontend, backend, fullstack), product managers, sales executives, customer success, and operations."
    },
    {
      q: "Can we integrate this with our existing ATS?",
      a: "Yes! We support integrations with major ATS platforms such as Greenhouse, Lever, and Ashby, allowing you to trigger evaluations and sync transcripts directly."
    },
    {
      q: "How are the industry experts calibrated?",
      a: "All of our human interviewers are active professionals in their respective fields who undergo standardized training and calibration cycles to evaluate candidates objectively."
    }
  ];

  const [activeIndex, setActiveIndex] = React.useState(null);

  const toggleFAQ = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section data-scroll data-scroll-class="reveal-text" id="faq" style={{ background: '#050505', padding: 'clamp(60px, 8vw, 100px) clamp(16px, 4vw, 48px)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Eyebrow>Questions</Eyebrow>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: '#F5F0E8',
            letterSpacing: '-0.02em',
            lineHeight: 1.15
          }}>
            Frequently Asked <span style={{
              background: 'linear-gradient(90deg, #FF6B35, #E91E8C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Questions.</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2vw, 16px)' }}>
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div data-scroll-repeat
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(201,168,76,0.1)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <div 
                  onClick={() => toggleFAQ(idx)}
                  style={{
                    padding: 'clamp(16px, 3vw, 24px)', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(14px, 2.5vw, 16px)', fontWeight: 600,
                    color: isOpen ? '#C9A84C' : '#F5F0E8'
                  }}
                >
                  <span>{faq.q}</span>
                  <svg 
                    width="14" height="8" viewBox="0 0 14 8" fill="none"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease', color: '#C9A84C' }}
                  >
                    <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {isOpen && (
                  <div style={{
                    padding: '0 clamp(16px, 3vw, 24px) clamp(16px, 3vw, 24px)',
                    fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(13px, 2vw, 15px)',
                    color: '#888880', lineHeight: 1.6
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
