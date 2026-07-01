'use client';
import React from 'react';
import { Eyebrow, FadeUpOnScroll } from './ui';
import { ResourcePageShell } from './ResourcePageShell';

const steps = [
  { title: "Create an Interview", desc: "Create hiring intelligence" },
  { title: "Invite Candidates", desc: "Send automated invitations" },
  { title: "Screen Resumes Beyond Keywords", desc: "Analyze actual capabilities" },
  { title: "Candidates Take Interviews", desc: "Human-less interviews like a pro" },
  { title: "See the Results & Hire Faster", desc: "Review transcripts & scores" },
];

export default function FeaturesPage() {
  return (
    <ResourcePageShell>
      <section data-scroll style={{
        background: '#050505',
        padding: 'clamp(60px, 8vw, 120px) clamp(16px, 4vw, 48px)',
        position: 'relative', overflow: 'hidden',
        borderTop: '1px solid rgba(201,168,76,0.08)',
        minHeight: '100vh',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <FadeUpOnScroll delay={0.0} y={40}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <Eyebrow>Product Demo</Eyebrow>
              <h2 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 700, color: '#F5F0E8',
                letterSpacing: '-0.02em', lineHeight: 1.15,
              }}>
                See IntervieHire in{' '}
                <span style={{
                  background: 'linear-gradient(90deg, #FF6B35, #E91E8C)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Action.</span>
              </h2>
            </div>
          </FadeUpOnScroll>

          <div className="ev-grid" style={{
            display: 'grid', gridTemplateColumns: '1.6fr 1fr',
            gap: 60, alignItems: 'center',
          }}>
            <div>
              <FadeUpOnScroll delay={0.15} y={40}>
                <div style={{
                  background: '#000',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderRadius: 24, aspectRatio: '16/9', overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                }}>
                  <video src="/mp_.mp4" autoPlay muted loop playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </FadeUpOnScroll>
            </div>

            <div className="ev-steps" style={{
              display: 'flex', flexDirection: 'column',
              position: 'relative', paddingLeft: 'clamp(10px, 2vw, 20px)',
            }}>
              <div style={{
                position: 'absolute', left: 'clamp(27px, 5vw, 31px)',
                top: 20, bottom: 20, width: 2,
                background: 'rgba(201,168,76,0.15)', zIndex: 1,
              }} />

              {steps.map((step, idx) => (
                <FadeUpOnScroll key={idx} delay={0.1 + idx * 0.1} y={30}>
                  <div style={{
                    display: 'flex', alignItems: 'flex-start',
                    gap: 'clamp(10px, 2vw, 16px)',
                    marginBottom: idx < steps.length - 1 ? 'clamp(20px, 3vw, 32px)' : 0,
                    position: 'relative', zIndex: 2,
                  }}>
                    <div style={{
                      width: 'clamp(20px, 4vw, 24px)', height: 'clamp(20px, 4vw, 24px)',
                      borderRadius: '50%', background: '#C9A84C',
                      border: '2px solid #C9A84C', color: '#050505',
                      fontSize: 12, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 0 15px rgba(201,168,76,0.3)',
                    }}>
                      {idx + 1}
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: 700,
                        color: '#F5F0E8', marginBottom: 4, fontFamily: 'Space Grotesk, sans-serif',
                      }}>{step.title}</h3>
                      <p style={{
                        fontSize: 'clamp(12px, 2vw, 14px)', color: '#888880',
                        lineHeight: 1.4, fontFamily: 'Outfit, sans-serif',
                      }}>{step.desc}</p>
                    </div>
                  </div>
                </FadeUpOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>
      </ResourcePageShell>
  );
}
