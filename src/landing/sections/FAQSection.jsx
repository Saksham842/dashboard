'use client';
import React from 'react';
import { Eyebrow } from '../ui';

export const FAQSection = () => {
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [visible, setVisible] = React.useState([]);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('.faq-item');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.idx, 10);
            setVisible(prev => prev.includes(idx) ? prev : [...prev, idx]);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    items.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
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

  const toggleFAQ = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section ref={sectionRef} data-scroll id="faq" style={{ background: '#050505', padding: 'clamp(60px, 8vw, 100px) clamp(16px, 4vw, 48px)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
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
              <div className="faq-item"
                data-idx={idx}
                key={idx}
                style={{
                  background: isOpen ? 'rgba(201,168,76,0.04)' : 'rgba(255,255,255,0.02)',
                  border: isOpen ? '1px solid rgba(201,168,76,0.2)' : '1px solid rgba(201,168,76,0.1)',
                  boxShadow: isOpen ? '0 0 30px rgba(201,168,76,0.06)' : 'none',
                  borderRadius: 12,
                  overflow: 'hidden',
                  transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                  opacity: visible.includes(idx) ? 1 : 0,
                  transform: visible.includes(idx) ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${idx * 0.1}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${idx * 0.1}s, background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease`,
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
                <div style={{
                  display: 'grid',
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.4s cubic-bezier(0.16,1,0.3,1)',
                }}>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{
                      padding: isOpen ? '0 clamp(16px, 3vw, 24px) clamp(16px, 3vw, 24px)' : '0 clamp(16px, 3vw, 24px)',
                      fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(13px, 2vw, 15px)',
                      color: '#888880', lineHeight: 1.6,
                      opacity: isOpen ? 1 : 0,
                      transition: 'opacity 0.3s ease 0.1s',
                    }}>
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
