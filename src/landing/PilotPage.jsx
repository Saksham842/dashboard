'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FooterCTA } from './sections/FooterCTA';

const Sparkle = ({ delay, x, y, size }) => (
  <div className="bd-sparkle" style={{
    left: `${x}%`, top: `${y}%`, width: size, height: size,
    animationDelay: `${delay}s`,
  }} />
);

export default function BookDemoPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div style={{
      minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column',
      position: 'relative', fontFamily: 'Outfit, sans-serif',
    }}>
      {/* Golden cut-line top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 20,
        background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 20%, rgba(255,255,255,0.95) 50%, rgba(201,168,76,0.5) 80%, transparent 100%)',
        boxShadow: '0 0 40px 2px rgba(201,168,76,0.55), 0 4px 80px rgba(201,168,76,0.18)',
      }} />

      {/* Background glows */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', width: 800, height: 600,
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 1, transform: 'translateX(-50%)',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '5%', width: 500, height: 400,
        background: 'radial-gradient(ellipse, rgba(233,30,140,0.05) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: '5%', width: 400, height: 400,
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      <Sparkle delay={0} x={10} y={15} size={3} />
      <Sparkle delay={0.8} x={88} y={22} size={4} />
      <Sparkle delay={1.5} x={15} y={72} size={3} />
      <Sparkle delay={0.3} x={92} y={78} size={3} />
      <Sparkle delay={1.1} x={50} y={8} size={3} />
      <Sparkle delay={0.6} x={75} y={45} size={3} />
      <Sparkle delay={1.8} x={25} y={85} size={3} />
      <Sparkle delay={0.4} x={60} y={65} size={3} />

      {/* Navbar */}
      <nav style={{
        position: 'relative', zIndex: 10, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px clamp(16px, 4vw, 48px)',
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(201,168,76,0.06)',
      }}>
        <Link href="/" style={{
          textDecoration: 'none', fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em',
        }}>
          <span style={{ color: '#F5F0E8' }}>intervie</span>
          <span style={{ color: '#E91E8C' }}>Hire</span>
        </Link>
        <Link href="/" style={{
          fontSize: 13, fontWeight: 500, color: '#888880', textDecoration: 'none',
          padding: '6px 18px', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 99, transition: 'all 0.3s ease',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#888880'; }}
        >
          ← Back to Home
        </Link>
      </nav>

      {/* Content */}
      <div style={{
        flex: 1, position: 'relative', zIndex: 5,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(16px, 3vh, 32px) clamp(16px, 4vw, 48px)',
      }}>
        <div style={{
          display: 'flex', gap: 'clamp(24px, 4vw, 56px)',
          alignItems: 'start', maxWidth: 1100, width: '100%',
          flexWrap: 'wrap', justifyContent: 'center',
        }}>
          {/* Left */}
          <div style={{
            flex: '1 1 320px', minWidth: 280,
            opacity: loaded ? 1 : 0, transform: loaded ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 16px', borderRadius: 100,
              fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase',
              background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)',
              color: '#C9A84C', marginBottom: 20, letterSpacing: '0.04em',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginRight: 2 }}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#C9A84C" />
              </svg>
              Book a Demo
            </div>

            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 700, color: '#F5F0E8',
              letterSpacing: '-0.02em', lineHeight: 1.1,
              marginBottom: 24,
            }}>
              Ready to Hire{' '}
              <span style={{
                background: 'linear-gradient(90deg, #FF6B35, #E91E8C)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Decisively?</span>
            </h2>

            <p style={{
              fontSize: 'clamp(14px, 1.6vw, 16px)', color: '#888880',
              maxWidth: 440, lineHeight: 1.65, marginBottom: 'clamp(24px, 3vh, 36px)',
            }}>
              Get started with a free pilot. Have our industry experts interview your next round of applicants for free and see the feedback depth yourself.
            </p>

            {/* Trust badges */}
            <div style={{
              display: 'flex', gap: 'clamp(16px, 2.5vw, 32px)',
              opacity: loaded ? 1 : 0, transform: loaded ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.4s',
            }}>
              {[
                { num: '10x', label: 'Faster Hiring' },
                { num: '98%', label: 'Cheat Detection' },
                { num: '4.9/5', label: 'Candidate Rating' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(18px, 2.2vw, 24px)', fontWeight: 700, color: '#C9A84C', lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: 11, color: '#666660', marginTop: 3, whiteSpace: 'nowrap' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div style={{
            flex: '0 1 420px', minWidth: 300, width: '100%',
            opacity: loaded ? 1 : 0, transform: loaded ? 'translateX(0)' : 'translateX(30px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s',
          }}>
            <div style={{
              background: 'rgba(15, 15, 18, 0.6)',
              border: '1px solid rgba(201,168,76,0.1)',
              borderRadius: 24, padding: 'clamp(24px, 3vh, 32px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 2vw, 18px)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 'clamp(12px, 1.2vw, 14px)', fontWeight: 600, color: '#888880' }}>Full Name</label>
                  <input
                    type="text" placeholder="Devasri Bali"
                    value={name} onChange={e => setName(e.target.value)} required
                    style={{
                      fontSize: 'clamp(13px, 1.2vw, 15px)',
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)',
                      borderRadius: 12, padding: 'clamp(12px, 1.5vw, 14px) clamp(14px, 2vw, 18px)',
                      color: '#F5F0E8', outline: 'none', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#C9A84C'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 'clamp(12px, 1.2vw, 14px)', fontWeight: 600, color: '#888880' }}>Work Email</label>
                  <input
                    type="email" placeholder="devasri@company.com"
                    value={email} onChange={e => setEmail(e.target.value)} required
                    style={{
                      fontSize: 'clamp(13px, 1.2vw, 15px)',
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)',
                      borderRadius: 12, padding: 'clamp(12px, 1.5vw, 14px) clamp(14px, 2vw, 18px)',
                      color: '#F5F0E8', outline: 'none', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#C9A84C'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 'clamp(12px, 1.2vw, 14px)', fontWeight: 600, color: '#888880' }}>Company / Startup</label>
                  <input
                    type="text" placeholder="intervieHire"
                    value={company} onChange={e => setCompany(e.target.value)} required
                    style={{
                      fontSize: 'clamp(13px, 1.2vw, 15px)',
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)',
                      borderRadius: 12, padding: 'clamp(12px, 1.5vw, 14px) clamp(14px, 2vw, 18px)',
                      color: '#F5F0E8', outline: 'none', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#C9A84C'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 'clamp(12px, 1.2vw, 14px)', fontWeight: 600, color: '#888880' }}>Role Details (Optional)</label>
                  <textarea
                    placeholder="Tell us about the roles you are looking to hire for..."
                    rows={3} value={role} onChange={e => setRole(e.target.value)}
                    style={{
                      fontSize: 'clamp(13px, 1.2vw, 15px)',
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)',
                      borderRadius: 12, padding: 'clamp(12px, 1.5vw, 14px) clamp(14px, 2vw, 18px)',
                      color: '#F5F0E8', outline: 'none', resize: 'none', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#C9A84C'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
                  />
                </div>

                <button type="submit"
                  style={{
                    fontSize: 16, fontWeight: 700, fontFamily: 'Outfit, sans-serif',
                    background: 'linear-gradient(90deg, #FF6B35, #E91E8C)', color: '#fff',
                    border: 'none', borderRadius: 12, padding: 'clamp(14px, 2vw, 16px) clamp(20px, 3vw, 24px)',
                    cursor: 'pointer', marginTop: 4, transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.opacity = '0.9'}
                  onMouseLeave={e => e.target.style.opacity = '1'}
                >
                  Request Pilot & Demo
                </button>

                {submitted && (
                  <div style={{ color: '#22c55e', textAlign: 'center', fontWeight: 600, fontSize: 14 }}>
                    ✓ Request submitted! Our team will reach out shortly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <FooterCTA />

      {/* Golden cut-line bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, zIndex: 20,
        background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 20%, rgba(255,255,255,0.95) 50%, rgba(201,168,76,0.5) 80%, transparent 100%)',
        boxShadow: '0 0 40px 2px rgba(201,168,76,0.55)',
      }} />

      <style>{`
        .bd-sparkle {
          position: absolute; border-radius: 50%;
          background: #C9A84C;
          box-shadow: 0 0 6px rgba(201,168,76,0.8), 0 0 20px rgba(201,168,76,0.3);
          pointer-events: none; z-index: 2;
          animation: bdFloat 4s ease-in-out infinite;
        }
        @keyframes bdFloat {
          0%, 100% { opacity: 0; transform: scale(0) translate(0,0); }
          25% { opacity: 1; transform: scale(1) translate(8px,-12px); }
          50% { opacity: 0.6; transform: scale(0.8) translate(-6px,6px); }
          75% { opacity: 0.8; transform: scale(1.1) translate(4px,-4px); }
        }
      `}</style>
    </div>
  );
}
