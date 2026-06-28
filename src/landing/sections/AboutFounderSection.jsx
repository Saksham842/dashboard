'use client';
import React from 'react';

export const AboutFounderSection = () => {
  return (
    <section data-scroll data-scroll-class="reveal-text" id="about-founder" style={{ background: '#0A0A0A', padding: 'clamp(60px, 8vw, 100px) clamp(16px, 4vw, 48px)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(32px, 5vw, 60px)', alignItems: 'center' }}>
          {/* Visual Brand Image Frame */}
          <div data-scroll data-scroll-speed="0.15" style={{
            background: 'rgba(15, 15, 18, 0.6)',
            border: '1px solid rgba(201, 168, 76, 0.15)',
            borderRadius: 24,
            padding: 'clamp(24px, 4vw, 40px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            minHeight: 'clamp(240px, 50vw, 320px)', position: 'relative', overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(201,168,76,0.05) 0%, transparent 80%)' }}/>
            <div style={{ zIndex: 2, textAlign: 'center' }}>
              {/* Co-Founders Title overlay */}
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 24, fontWeight: 700, color: '#C9A84C', marginBottom: 8 }}>Our Vision</h3>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(13px, 2vw, 15px)', color: '#888880', maxWidth: 300, margin: '0 auto', lineHeight: 1.6 }}>
                "We started IntervieHire to build the autonomous hiring layer of the web—eliminating bias and saving thousands of engineering hours."
              </p>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(12px, 2vw, 13px)', color: '#F5F0E8', fontWeight: 600, marginTop: 24 }}>
                Devasri Bali & Aditya Rana
              </div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(10px, 1.8vw, 11px)', color: '#555550', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>
                Co-Founders, intervieHire
              </div>
            </div>
          </div>

          {/* Text Description */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 16px',
              borderRadius: 100,
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              background: 'rgba(201, 168, 76, 0.1)',
              border: '1px solid rgba(201, 168, 76, 0.2)',
              color: '#C9A84C',
              marginBottom: 20
            }}>
              About Us
            </div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#F5F0E8',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: 24
            }}>
              The Story Behind <span style={{
                background: 'linear-gradient(90deg, #FF6B35, #E91E8C)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>intervieHire.</span>
            </h2>
            <p style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(14px, 2.5vw, 16px)',
              color: '#888880',
              lineHeight: 1.7,
              marginBottom: 20
            }}>
              Hiring technical candidates requires immense time from your engineering leads, often pulling them away from building core product. We observed this friction firsthand and set out to automate evaluations without sacrificing quality or candidate experience.
            </p>
            <p style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(14px, 2.5vw, 16px)',
              color: '#888880',
              lineHeight: 1.7
            }}>
              By pairing state-of-the-art AI screening layer with a network of vetted, highly-calibrated industry experts, IntervieHire delivers a complete, secure, and standardized evaluation pipeline that scales with your growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
