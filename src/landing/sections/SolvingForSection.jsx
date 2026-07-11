'use client';
import React, { useEffect, useRef, useState } from 'react';

export const SolvingForSection = () => {
  const sectionRef = useRef(null);
  const [ready, setReady] = useState(false);

  const solves = [
    {
      title: "Eliminating Scheduling Hell",
      desc: "No more endless calendar tennis. Candidates take interviews asynchronously on their own time, 24/7.",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=700&q=80"
    },
    {
      title: "Removing Recruitment Bias",
      desc: "Standardized AI evaluation frameworks ensure every candidate is graded fairly based on capability, not gut feeling.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=80"
    },
    {
      title: "Cheating & Proxy Prevention",
      desc: "Built-in plagiarism, copy-paste, and screen-sharing detection keep evaluations honest and transparent.",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=700&q=80"
    }
  ];

  const targetAudiences = [
    {
      title: "Smaller Teams & Startups",
      desc: "Build high-performing teams without dedicated HR managers. Save engineering lead hours.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80"
    },
    {
      title: "Fast-Growing Companies",
      desc: "Screen hundreds of applicants in hours rather than days. Scale hiring pipelines effortlessly.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&q=80"
    },
    {
      title: "Technical Hiring Managers",
      desc: "Stop conducting redundant phone screenings. Review structured feedback and hire directly.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&q=80"
    }
  ];

  // Wait for Lenis + scrollWrapper to be ready, then setup GSAP
  useEffect(() => {
    const check = setInterval(() => {
      if (window.__lenis && window.__scrollWrapper) {
        clearInterval(check);
        setReady(true);
      }
    }, 50);
    return () => clearInterval(check);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const wrapper = window.__scrollWrapper;
    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      gsap.from('.solve-pair', {
        height: '100px',
        stagger: { amount: 0.5 },
        scrollTrigger: {
          trigger: '.pairs-container',
          scroller: wrapper,
          start: 'top 100%',
          end: 'top -150%',
          scrub: true,
        },
      });
      ScrollTrigger.refresh();
    })();
  }, [ready]);

  return (
    <section data-scroll data-scroll-class="reveal-text"
      id="solving-for"
      ref={sectionRef}
      style={{
        background: '#000000',
        padding: 'clamp(60px, 8vw, 100px) clamp(16px, 4vw, 48px)',
        borderTop: '1px solid rgba(217,100,36,0.12)'
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* ── Heading Row ── */}
        <div className="sf-grid-head" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          marginBottom: 48
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '6px 16px', borderRadius: 100,
              fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase',
              background: 'rgba(217,100,36,0.10)',
              border: '1px solid rgba(217,100,36,0.25)',
              color: '#d96424', marginBottom: 12
            }}>
              Solutions
            </div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700,
              color: '#EEEEEE', letterSpacing: '-0.02em',
              lineHeight: 1.2, margin: '0 auto'
            }}>
              What We Solve.
            </h2>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '6px 16px', borderRadius: 100,
              fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase',
              background: 'rgba(217,100,36,0.10)',
              border: '1px solid rgba(217,100,36,0.25)',
              color: '#d96424', marginBottom: 12
            }}>
              Audience
            </div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700,
              color: '#EEEEEE', letterSpacing: '-0.02em',
              lineHeight: 1.2, margin: '0 auto'
            }}>
              Who We Solve For.
            </h2>
          </div>
        </div>

        {/* ── Pairs ── */}
        <div className="pairs-container sf-pairs" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2vw, 16px)' }}>
          {solves.map((solve, idx) => (
            <div
              key={idx}
              className="solve-pair"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(12px, 2vw, 16px)',
                height: 420,          // natural full height
                overflow: 'hidden'    // clips during stretch
              }}
            >
              {/* ── Left card: image bg + gradient + text always at bottom ── */}
              <div style={{
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid rgba(217,100,36,0.12)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                height: '100%'
              }}>
                {/* Full background image */}
                <img
                  src={solve.image}
                  alt={solve.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                {/* Dark gradient so text is always readable */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)'
                }} />
                {/* Text pinned to bottom — always visible regardless of height */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  padding: 'clamp(16px, 3vw, 28px)'
                }}>
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: 700,
                    color: '#d96424',
                    marginBottom: 8, marginTop: 0
                  }}>
                    {solve.title}
                  </h3>
                  <p style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 'clamp(12px, 2vw, 14px)', color: '#ccc9bf',
                    lineHeight: 1.6, margin: 0
                  }}>
                    {solve.desc}
                  </p>
                </div>
              </div>

              {/* ── Right card: same structure ── */}
              <div style={{
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid rgba(217,100,36,0.12)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                height: '100%'
              }}>
                <img
                  src={targetAudiences[idx].image}
                  alt={targetAudiences[idx].title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  padding: 'clamp(16px, 3vw, 28px)'
                }}>
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: 700,
                    color: '#d96424',
                    marginBottom: 8, marginTop: 0
                  }}>
                    {targetAudiences[idx].title}
                  </h3>
                  <p style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 'clamp(12px, 2vw, 14px)', color: '#ccc9bf',
                    lineHeight: 1.6, margin: 0
                  }}>
                    {targetAudiences[idx].desc}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
