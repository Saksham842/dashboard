'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Navbar } from './layout';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { FooterCTA } from './sections/FooterCTA';

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    desc: 'For small teams ready to automate their first hiring pipeline.',
    features: [
      '25 AI interviews per month',
      'Cheat detection (face verify + plagiarism scan)',
      'Email support',
      'Standardized scoring',
      '24/7 automated scheduling',
    ],
    cta: 'Subscribe Now',
    badge: null,
    color: '#888880',
  },
  {
    name: 'Growth',
    price: '$99',
    period: '/month',
    desc: 'For growing teams that need speed, scale, and integrity.',
    features: [
      '200 AI interviews per month',
      'Advanced cheat detection (face verify + screen share + plagiarism)',
      'Priority support',
      'Custom scoring rubrics',
      'Team collaboration',
      'Analytics dashboard',
      'ATS integration (Greenhouse, Lever, Ashby)',
      'API access',
    ],
    cta: 'Subscribe Now',
    badge: 'Most Popular',
    color: '#C9A84C',
  },
  {
    name: 'Enterprise',
    price: '$299',
    period: '/month',
    desc: 'For organizations with unique hiring workflows at scale.',
    features: [
      '1,000 AI interviews per month',
      'All cheat detection features',
      'Whitelabel AI interviews',
      'Dedicated account manager',
      'SSO & custom integrations',
      'Industry expert calibration',
      'SLA guarantee',
      'On-premise option',
    ],
    cta: 'Subscribe Now',
    badge: null,
    color: '#E91E8C',
  },
];

const Sparkle = ({ delay, x, y, size }) => (
  <div className="pp-sparkle" style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, animationDelay: `${delay}s` }} />
);

export default function PricingPage() {
  const includedRef = useRef(null);
  const ctaRef = useRef(null);
  const [includedVisible, setIncludedVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const el = includedRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIncludedVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCtaVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <SmoothScrollProvider>
    <div className="ih-landing" style={{ background: '#000' }}>
      <Navbar simple />

      <div style={{ position: 'relative' }}>
      {/* Golden cut-line top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 20,
        background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 20%, rgba(255,255,255,0.95) 50%, rgba(201,168,76,0.5) 80%, transparent 100%)',
        boxShadow: '0 0 40px 2px rgba(201,168,76,0.55), 0 4px 80px rgba(201,168,76,0.18)',
      }} />

      {/* Background glows */}
      <div style={{
        position: 'absolute', top: '15%', left: '50%', width: 900, height: 600,
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 1, transform: 'translateX(-50%)',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', right: '5%', width: 400, height: 400,
        background: 'radial-gradient(ellipse, rgba(233,30,140,0.05) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '3%', width: 350, height: 350,
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      <Sparkle delay={0} x={8} y={12} size={4} />
      <Sparkle delay={0.8} x={88} y={18} size={3} />
      <Sparkle delay={1.5} x={12} y={78} size={5} />
      <Sparkle delay={0.3} x={92} y={82} size={3} />
      <Sparkle delay={1.1} x={50} y={6} size={3} />
      <Sparkle delay={0.6} x={72} y={48} size={4} />
      <Sparkle delay={1.8} x={28} y={42} size={3} />
      <Sparkle delay={2.2} x={40} y={70} size={3} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 5,
        padding: 'clamp(120px, 14vh, 200px) clamp(16px, 4vw, 48px) clamp(60px, 8vh, 100px)',
      }}>
        <div style={{ maxWidth: 1100, width: '100%' }}>
          {/* Header */}
          <div style={{
            textAlign: 'center', marginBottom: 'clamp(32px, 4vh, 48px)',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 16px', borderRadius: 100,
              fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase',
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.2)',
              color: '#C9A84C', marginBottom: 12,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginRight: 2 }}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#C9A84C" />
              </svg>
              Pricing
            </div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700,
              color: '#F5F0E8', letterSpacing: '-0.02em', lineHeight: 1.15,
              margin: '0 auto',
            }}>
              Simple, transparent{' '}
              <span style={{
                background: 'linear-gradient(90deg, #C9A84C, #E8C97A)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>pricing</span>
            </h2>
            <p style={{
              fontSize: 'clamp(13px, 1.4vw, 15px)', color: '#888880',
              marginTop: 8, maxWidth: 480, margin: '8px auto 0',
            }}>
              Start for free, scale with confidence. No hidden fees.
            </p>
          </div>

          {/* Cards */}
          <div className="pp-grid">
            {plans.map((plan, i) => {
              const isPopular = plan.badge === 'Most Popular';
              const delay = 0.2 + i * 0.15;

              return (
                <div
                  key={i}
                  className={`pp-card ${isPopular ? 'pp-card--popular' : ''}`}
                  style={{
                    animation: `ppCardIn 0.8s cubic-bezier(0.34,1.56,0.64,1) ${delay}s forwards`,
                  }}
                >
                  {isPopular && <div className="pp-popular-glow" />}

                  {plan.badge && (
                    <div className="pp-badge">
                      <div className="pp-badge-inner">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginRight: 4 }}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#C9A84C" />
                        </svg>
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  <div style={{ marginBottom: 24 }}>
                    <h3 style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 'clamp(16px, 1.5vw, 20px)', fontWeight: 700,
                      color: isPopular ? '#C9A84C' : '#F5F0E8',
                      letterSpacing: '-0.01em', margin: '0 0 2px',
                    }}>{plan.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 12 }}>
                      <span style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: 'clamp(32px, 3vw, 42px)', fontWeight: 700,
                        color: '#F5F0E8', letterSpacing: '-0.03em',
                      }}>{plan.price}</span>
                      {plan.period && (
                        <span style={{ fontSize: 13, color: '#666660' }}>{plan.period}</span>
                      )}
                    </div>
                    <p style={{
                      fontSize: 13, color: '#888880', marginTop: 8, margin: '8px 0 0', lineHeight: 1.5,
                    }}>{plan.desc}</p>
                  </div>

                  <ul className="pp-features" style={{
                    listStyle: 'none', padding: 0, margin: '0 0 24px',
                    display: 'flex', flexDirection: 'column', gap: 10, flex: 1,
                  }}>
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="pp-feature-item" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                          <circle cx="8" cy="8" r="7" stroke="#C9A84C" strokeWidth="1.2" opacity="0.3" />
                          <path d="M5 8.5L7 10.5L11 6" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontSize: 13, color: isPopular ? '#e0ddd5' : '#999990', lineHeight: 1.4 }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`pp-cta ${isPopular ? 'pp-cta--primary' : 'pp-cta--secondary'}`}
                    onClick={() => window.location.href = '/book-demo'}
                  >
                    {plan.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Included in Every Plan */}
      <div ref={includedRef} className="pp-included" style={{
        position: 'relative', zIndex: 5, maxWidth: 1100, margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 48px) clamp(80px, 10vh, 120px)',
      }}>
        {/* Separator */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.3) 20%, rgba(255,255,255,0.5) 50%, rgba(201,168,76,0.3) 80%, transparent 100%)',
          marginBottom: 'clamp(48px, 6vh, 64px)',
        }} />

        <div className="pp-included-header" style={{
          textAlign: 'center', marginBottom: 'clamp(36px, 5vh, 48px)',
          opacity: includedVisible ? 0 : 0,
          transform: includedVisible ? 'translateY(20px)' : 'translateY(20px)',
          animation: includedVisible ? 'ppHeaderIn 0.8s cubic-bezier(0.16,1,0.3,1) 0s forwards' : 'none',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 16px', borderRadius: 100,
            fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase',
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.2)',
            color: '#C9A84C', marginBottom: 12,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="22 4 12 14.01 9 11.01" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Included in Every Plan
          </div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700,
            color: '#F5F0E8', letterSpacing: '-0.02em', lineHeight: 1.15,
            margin: '0 auto',
          }}>
            The full{' '}
            <span style={{
              background: 'linear-gradient(90deg, #C9A84C, #E8C97A)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Lina</span>{' '}
            experience — no feature gating
          </h2>
        </div>

        <div className="pp-included-grid">
          {[
            { icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', title: 'Conversational AI Interviews', desc: 'Follow-up questions, 24/7 — just like a real interviewer' },
            { icon: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', title: 'Skill-Based Scoring', desc: 'Resume + interview combined into one standardized score' },
            { icon: 'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', title: 'Eye Tracking & Integrity', desc: 'Real-time gaze monitoring & anti-cheat integrity checks' },
            { icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8', title: 'Full Transcripts & Video', desc: 'Every interview recorded with timestamped transcripts' },
            { icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z', title: 'Candidate Dashboard', desc: 'Rankings, detailed scores, and one-click export' },
            { icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', title: 'Custom or AI-Generated Questions', desc: 'Write your own or let Lina generate the perfect interview' },
            { icon: 'M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16 M9 12h6', title: 'CSV Upload & ATS Integration', desc: 'Bulk upload candidates and connect with your ATS' },
            { icon: 'M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', title: 'Learns From Your Feedback', desc: 'The AI adapts to your preferences and improves over time' },
          ].map((feat, i) => (
            <div key={i} className="pp-feat-card" style={{
              opacity: includedVisible ? 0 : 0,
              transform: includedVisible ? 'translateY(30px)' : 'translateY(30px)',
              animation: includedVisible ? `ppFeatIn 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s forwards` : 'none',
            }}>
              <div className="pp-feat-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={feat.icon} />
                </svg>
              </div>
              <div>
                <h4 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(14px, 1.3vw, 16px)', fontWeight: 600,
                  color: '#F5F0E8', margin: '0 0 3px',
                }}>{feat.title}</h4>
                <p style={{
                  fontSize: 'clamp(12px, 1.1vw, 13px)', color: '#888880',
                  margin: 0, lineHeight: 1.5,
                }}>{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaRef} className="pp-cta-section" style={{
        position: 'relative', zIndex: 5, maxWidth: 800, margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 48px) clamp(80px, 10vh, 120px)',
        textAlign: 'center',
      }}>
        {/* Floating sparkles for CTA */}
        <div style={{
          position: 'absolute', top: '-10%', left: '10%', width: 12, height: 12,
          borderRadius: '50%', background: '#C9A84C', pointerEvents: 'none',
          boxShadow: '0 0 12px rgba(201,168,76,0.6)',
          opacity: ctaVisible ? 1 : 0,
          animation: ctaVisible ? 'ctaSparkle1 3s ease-in-out infinite 0.5s' : 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '5%', width: 8, height: 8,
          borderRadius: '50%', background: '#C9A84C', pointerEvents: 'none',
          boxShadow: '0 0 10px rgba(201,168,76,0.5)',
          opacity: ctaVisible ? 1 : 0,
          animation: ctaVisible ? 'ctaSparkle2 4s ease-in-out infinite 1s' : 'none',
        }} />

        <div style={{
          opacity: ctaVisible ? 0 : 0, transform: ctaVisible ? 'translateY(40px) scale(0.95)' : 'translateY(40px) scale(0.95)',
          filter: ctaVisible ? 'blur(6px)' : 'blur(6px)',
          animation: ctaVisible ? 'ctaReveal 1s cubic-bezier(0.16,1,0.3,1) 0s forwards' : 'none',
        }}>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 700,
            color: '#F5F0E8', letterSpacing: '-0.02em', lineHeight: 1.1,
            margin: '0 auto 16px', maxWidth: 600,
          }}>
            Ready to{' '}
            <span style={{
              background: 'linear-gradient(90deg, #C9A84C, #E8C97A)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>join us?</span>
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.6vw, 16px)', color: '#888880',
            maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.6,
          }}>
            Start hiring smarter with AI-powered interviews and built-in integrity checks.
          </p>
          <button
            onClick={() => window.location.href = '/book-demo'}
            style={{
              fontFamily: 'Outfit, sans-serif', fontSize: 16, fontWeight: 700,
              background: 'linear-gradient(135deg, #C9A84C, #d4b85a)',
              color: '#000', border: 'none', borderRadius: 12,
              padding: '16px 36px', cursor: 'pointer',
              boxShadow: '0 0 30px rgba(201,168,76,0.25)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 0 45px rgba(201,168,76,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(201,168,76,0.25)'; }}
          >
            Book a Demo →
          </button>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 5 }}>
        <FooterCTA />
      </div>

      {/* Golden cut-line bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, zIndex: 20,
        background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 20%, rgba(255,255,255,0.95) 50%, rgba(201,168,76,0.5) 80%, transparent 100%)',
        boxShadow: '0 0 40px 2px rgba(201,168,76,0.55)',
      }} />

      <style>{`
        [data-scroll-wrapper]::-webkit-scrollbar { display: none; }
        [data-scroll-wrapper] { -ms-overflow-style: none; scrollbar-width: none; }

        .pp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2vw, 24px);
          align-items: stretch;
        }
        @media (max-width: 768px) {
          .pp-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; }
        }

        .pp-card {
          position: relative;
          border-radius: 20px;
          padding: clamp(24px, 2.5vw, 36px) clamp(20px, 2.5vw, 28px);
          display: flex;
          flex-direction: column;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, border-color 0.3s ease;
          overflow: hidden;
        }
        .pp-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }

        .pp-card--popular {
          background: linear-gradient(180deg, rgba(201,168,76,0.06) 0%, rgba(201,168,76,0.01) 100%);
          border-color: rgba(201,168,76,0.3);
          box-shadow: 0 0 40px rgba(201,168,76,0.08), 0 10px 30px rgba(0,0,0,0.4);
          transform: scale(1.04);
          z-index: 3;
        }
        .pp-card--popular:hover {
          border-color: rgba(201,168,76,0.5);
          box-shadow: 0 0 60px rgba(201,168,76,0.15), 0 20px 60px rgba(0,0,0,0.5);
          transform: scale(1.04) translateY(-6px);
        }

        .pp-popular-glow {
          position: absolute; top: -60px; left: 50%;
          transform: translateX(-50%); width: 200px; height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%);
          pointer-events: none;
          animation: ppGlowPulse 3s ease-in-out infinite;
        }

        .pp-badge { display: flex; justify-content: center; margin-bottom: 16px; }
        .pp-badge-inner {
          display: inline-flex; align-items: center;
          padding: 5px 14px; border-radius: 100px;
          background: linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05));
          border: 1px solid rgba(201,168,76,0.3);
          font-size: 11px; font-weight: 600; letter-spacing: 0.05em;
          color: #C9A84C; text-transform: uppercase;
          animation: ppBadgePulse 2.5s ease-in-out infinite;
        }

        .pp-feature-item { opacity: 0.8; transition: opacity 0.3s ease; }
        .pp-card:hover .pp-feature-item { opacity: 1; }

        .pp-cta {
          width: 100%; padding: 12px 20px; border-radius: 12px;
          font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600;
          cursor: pointer; border: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .pp-cta:hover { transform: scale(1.03); }
        .pp-cta--primary {
          background: linear-gradient(135deg, #C9A84C, #d4b85a);
          color: #000;
          box-shadow: 0 0 20px rgba(201,168,76,0.3);
        }
        .pp-cta--primary:hover { box-shadow: 0 0 30px rgba(201,168,76,0.5); }
        .pp-cta--secondary {
          background: rgba(255,255,255,0.04);
          color: #F5F0E8;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .pp-cta--secondary:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); }

        .pp-sparkle {
          position: absolute; border-radius: 50%;
          background: #C9A84C;
          box-shadow: 0 0 6px rgba(201,168,76,0.8);
          pointer-events: none; z-index: 2;
          animation: ppSparkle 3s ease-in-out infinite;
        }

        @keyframes ppCardIn {
          0% { opacity: 0; transform: translateY(60px) scale(0.92); filter: blur(8px); }
          60% { filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes ppGlowPulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.6; }
          50% { transform: translateX(-50%) scale(1.2); opacity: 1; }
        }
        @keyframes ppBadgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.2); }
          50% { box-shadow: 0 0 20px 4px rgba(201,168,76,0.15); }
        }
        @keyframes ppSparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          30% { opacity: 1; transform: scale(1); }
          60% { opacity: 0.5; transform: scale(0.6); }
          100% { opacity: 0; transform: scale(0); }
        }

        .pp-included-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(12px, 1.5vw, 16px);
        }
        @media (max-width: 768px) {
          .pp-included-grid { grid-template-columns: 1fr; }
        }

        .pp-feat-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: clamp(16px, 2vw, 20px);
          border-radius: 14px;
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(201,168,76,0.06);
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, border-color 0.3s ease, background 0.3s ease;
        }
        .pp-feat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(201,168,76,0.15);
          background: rgba(255,255,255,0.03);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
        }

        .pp-feat-icon {
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.1);
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .pp-feat-card:hover .pp-feat-icon {
          background: rgba(201,168,76,0.15);
          border-color: rgba(201,168,76,0.25);
        }

        @keyframes ppFeatIn {
          0% { opacity: 0; transform: translateY(30px) scale(0.95); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        @keyframes ppHeaderIn {
          0% { opacity: 0; transform: translateY(20px); filter: blur(2px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        @keyframes ctaReveal {
          0% { opacity: 0; transform: translateY(40px) scale(0.95); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        @keyframes ctaSparkle1 {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0); }
          30% { opacity: 1; transform: translate(20px, -30px) scale(1); }
          60% { opacity: 0.5; transform: translate(-10px, -50px) scale(0.6); }
        }

        @keyframes ctaSparkle2 {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0); }
          25% { opacity: 1; transform: translate(-15px, -20px) scale(1); }
          55% { opacity: 0.6; transform: translate(10px, -40px) scale(0.7); }
        }
      `}</style>
      </div>
    </div>
    </SmoothScrollProvider>
  );
}
