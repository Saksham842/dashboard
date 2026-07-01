'use client';
import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Color Palette ─────────────────────────────────────────────────────────────
const T = {
  gold:   '#C9A84C',
  pink:   '#E91E8C',
  orange: '#FF6B35',
  white:  '#F5F0E8',
  muted:  '#888880',
  card:   'rgba(255,255,255,0.025)',
  border: 'rgba(201,168,76,0.12)',
};

// ── ROW 1 — Problem facts (scrolls LEFT) ─────────────────────────────────────
const ROW1_CARDS = [
  {
    type: 'stat',
    accent: '#FF6B35',
    stat: '72%',
    source: 'LINKEDIN TALENT TRENDS 2024',
    body: 'Of recruiters say they have encountered at least one fabricated job title or company on a resume in the past year.',
  },
  {
    type: 'quote',
    accent: '#E91E8C',
    quote: '"We spent 6 weeks interviewing a candidate who had never actually worked at the companies on their CV."',
    author: 'VP of Engineering, Fintech Unicorn',
    via: 'SHARED AT TECHCRUNCH DISRUPT 2024',
  },
  {
    type: 'stat',
    accent: '#C9A84C',
    stat: '40–60',
    source: 'SHRM HIRING BENCHMARK REPORT',
    body: 'Days. The average time-to-hire for a mid-level tech role — and most of that time is pure scheduling overhead.',
  },
  {
    type: 'stat',
    accent: '#FF6B35',
    stat: '$17,000',
    source: 'SOCIETY FOR HUMAN RESOURCE MGMT',
    body: 'Average cost per bad hire. For senior roles it balloons to over 3× the annual salary.',
  },
  {
    type: 'quote',
    accent: '#E91E8C',
    quote: '"Our panel gave wildly different scores to the same candidate. We had no idea who to believe."',
    author: 'Head of Talent, B2B SaaS Company',
    via: 'GLASSDOOR EMPLOYER STUDY 2025',
  },
  {
    type: 'stat',
    accent: '#C9A84C',
    stat: '35%',
    source: 'HARVARD BUSINESS REVIEW',
    body: 'Of engineering managers\' time is consumed by screening calls that could be fully automated.',
  },
  {
    type: 'stat',
    accent: '#FF6B35',
    stat: '46%',
    source: 'ROBERT HALF STAFFING SURVEY',
    body: 'Of new hires fail within 18 months — not due to skill gaps, but misaligned expectations set during rushed interviews.',
  },
  {
    type: 'quote',
    accent: '#E91E8C',
    quote: '"I interviewed the same person twice before realising they had two completely different LinkedIn profiles."',
    author: 'Engineering Lead, Series C Startup',
    via: 'HACKER NEWS THREAD, 2025',
  },
];

// ── ROW 2 — Fraud & identity facts (scrolls RIGHT) ───────────────────────────
const ROW2_CARDS = [
  {
    type: 'stat',
    accent: '#C9A84C',
    stat: '600%',
    source: 'IDENTITY THEFT RESOURCE CENTER 2024',
    body: 'Increase in synthetic identity fraud targeting HR and onboarding systems since 2020.',
  },
  {
    type: 'quote',
    accent: '#FF6B35',
    quote: '"We had a candidate answer every technical question correctly on paper, then couldn\'t write a single line of code on day one."',
    author: 'CTO, Climate Tech Startup',
    via: 'BLIND TECH FORUM, MARCH 2025',
  },
  {
    type: 'stat',
    accent: '#E91E8C',
    stat: '1 in 3',
    source: 'WORKSTREAM HIRING REPORT 2025',
    body: 'Remote job offers are now accepted by someone other than the person who interviewed — ghost employment is mainstream.',
  },
  {
    type: 'stat',
    accent: '#C9A84C',
    stat: '$220B',
    source: 'WORLD ECONOMIC FORUM 2024',
    body: 'Lost globally each year to occupational fraud — insider threats now start at the hiring stage.',
  },
  {
    type: 'quote',
    accent: '#FF6B35',
    quote: '"The developer we hired for $140k/year was outsourcing their entire job to someone in another country — for years."',
    author: 'Engineering Director, Public SaaS Company',
    via: 'THE VERGE, JANUARY 2025',
  },
  {
    type: 'stat',
    accent: '#E91E8C',
    stat: '88%',
    source: 'GARTNER TALENT SURVEY 2024',
    body: 'Of CHROs admit their current vetting process would not catch a sophisticated identity spoof or proxy interview.',
  },
  {
    type: 'stat',
    accent: '#C9A84C',
    stat: '3.2×',
    source: 'MCKINSEY FUTURE OF WORK REPORT',
    body: 'More likely to make a bad hire when interviews are rushed and unstructured versus AI-assisted evaluations.',
  },
  {
    type: 'quote',
    accent: '#FF6B35',
    quote: '"By the time we realised the candidate was using AI to answer everything live, we had already made the offer."',
    author: 'Director of Engineering, E-Commerce Platform',
    via: 'TECHCRUNCH APRIL 2025',
  },
];

// ── Individual Card ───────────────────────────────────────────────────────────
const ProblemCard = ({ card }) => {
  const [hovered, setHovered] = useState(false);
  const isQuote = card.type === 'quote';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: isQuote ? 320 : 260,
        minHeight: 220,
        background: hovered ? 'rgba(255,255,255,0.05)' : T.card,
        border: `1px solid ${hovered ? card.accent : T.border}`,
        borderRadius: 18,
        padding: '24px 20px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.35s ease, background 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease',
        transform: hovered ? 'translateY(-6px) scale(1.015)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? `0 24px 60px rgba(0,0,0,0.7), 0 0 40px ${card.accent}33`
          : '0 8px 32px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 18,
      }}
    >
      {/* Accent glow corner */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 120, height: 120,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${card.accent}22 0%, transparent 70%)`,
        pointerEvents: 'none',
        opacity: hovered ? 1 : 0.4,
        transition: 'opacity 0.4s ease',
      }} />
      {/* Bottom accent line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${card.accent}66, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s ease',
      }} />

      {isQuote ? (
        <>
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 64, lineHeight: 0.8,
            color: card.accent, opacity: 0.2,
            fontWeight: 700, userSelect: 'none',
          }}>"</div>

          <p style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(12.5px, 1.4vw, 14px)',
            color: '#F5F0E8',
            lineHeight: 1.6,
            fontStyle: 'italic',
            margin: 0, flex: 1,
          }}>
            {card.quote}
          </p>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 }}>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 600, color: T.white, marginBottom: 3 }}>
              {card.author}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, fontWeight: 700, color: card.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {card.via}
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: card.accent,
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>
            {card.stat}
          </div>

          <p style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(12px, 1.3vw, 13.5px)',
            color: T.muted,
            lineHeight: 1.65,
            margin: 0, flex: 1,
          }}>
            {card.body}
          </p>

          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 9, fontWeight: 700,
            color: `${card.accent}88`, letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            {card.source}
          </div>
        </>
      )}
    </div>
  );
};

// ── CtaButton ─────────────────────────────────────────────────────────────────
const CtaButton = ({ children, primary, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: 15, fontWeight: 600,
        padding: 'clamp(11px, 1.6vh, 14px) clamp(22px, 2.8vw, 34px)',
        borderRadius: 10, cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        background: primary ? 'linear-gradient(90deg, #FF6B35, #E91E8C)' : 'transparent',
        color: primary ? '#fff' : '#C9A84C',
        border: primary ? 'none' : '1px solid #C9A84C',
        filter: primary && hov ? 'brightness(1.1) saturate(1.2)' : 'none',
        boxShadow: primary && hov
          ? '0 8px 30px rgba(233,30,140,0.35)'
          : !primary && hov ? '0 0 24px rgba(201,168,76,0.3)' : 'none',
        transform: hov ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
    >
      {children}
    </button>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
export const TheProblemSection = () => {
  const sectionRef = useRef(null);
  const row1Ref    = useRef(null);
  const row2Ref    = useRef(null);
  const ctaRef     = useRef(null);

  // IntersectionObserver — same pattern as TransitionSection
  const [inView, setInView]         = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [row1Ready, setRow1Ready]   = useState(false);
  const [row2Ready, setRow2Ready]   = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEntered) {
          setInView(true);
          setHasEntered(true);
          setTimeout(() => setRow1Ready(true), 300);
          setTimeout(() => setRow2Ready(true), 550);
        }
      },
      { threshold: 0.04 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasEntered]);

  // GSAP scrub — runs on top of CSS boom-in anims
  useGSAP(() => {
    const wrapper = window.__scrollWrapper || window;

    // Row 1 → scrubs LEFT as user scrolls down
    if (row1Ref.current) {
      const el   = row1Ref.current;
      const dist = el.scrollWidth * 0.22;
      gsap.to(el, {
        x: -dist,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: wrapper,
          start: 'top 70%',
          end: 'bottom 0%',
          scrub: 1.4,
        },
      });
    }

    // Row 2 → scrubs RIGHT (starts shifted left, and drifts right so no empty space appears on the left)
    if (row2Ref.current) {
      const el   = row2Ref.current;
      const dist = el.scrollWidth * 0.18;
      gsap.fromTo(el,
        { x: -dist },
        {
          x: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: wrapper,
            start: 'top 70%',
            end: 'bottom 0%',
            scrub: 1.4,
          },
        }
      );
    }

    // CTA stagger fade-up
    if (ctaRef.current) {
      gsap.fromTo(
        Array.from(ctaRef.current.children),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: {
            trigger: ctaRef.current,
            scroller: wrapper,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, { scope: sectionRef });

  // Lenis readiness refresh
  useEffect(() => {
    if (window.__lenis) { ScrollTrigger.refresh(); return; }
    const id = setInterval(() => {
      if (window.__lenis) { clearInterval(id); ScrollTrigger.refresh(); }
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      data-scroll
      id="the-problem"
      style={{
        background: '#000000',
        overflowX: 'clip',
        paddingTop: 'clamp(30px, 5vw, 60px)',
        paddingBottom: 'clamp(20px, 4vw, 40px)',
        position: 'relative',
      }}
    >
      {/* ── Keyframes (reuse global ones from landing.css) ────────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .tp-header-wrap { opacity: 0; }
        .tp-header-wrap.boom { animation: titlePageReveal 0.9s cubic-bezier(0.16,1,0.3,1) 0s forwards; }
        .tp-row1-wrap { opacity: 0; }
        .tp-row1-wrap.boom { animation: leftBoomReveal 1s cubic-bezier(0.34,1.56,0.64,1) 0s forwards; }
        .tp-row2-wrap { opacity: 0; }
        .tp-row2-wrap.boom { animation: rightBoomReveal 1s cubic-bezier(0.34,1.56,0.64,1) 0s forwards; }

        @keyframes rightBoomReveal {
          0%   { opacity:0; transform:scale(0.1) translateX(40px); filter:brightness(5) blur(20px); }
          40%  { opacity:1; transform:scale(1.25) translateX(-6px); filter:brightness(1.8) blur(4px); }
          65%  { transform:scale(0.92) translateX(2px); filter:brightness(1) blur(0); }
          82%  { transform:scale(1.06) translateX(-1px); }
          100% { opacity:1; transform:scale(1) translateX(0); filter:brightness(1) blur(0); }
        }
      `}} />

      {/* ── Glowing cut-line (same as TransitionSection) ─────────────────── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 20%, rgba(255,255,255,0.95) 50%, rgba(201,168,76,0.5) 80%, transparent 100%)',
        boxShadow: '0 0 40px 2px rgba(201,168,76,0.55), 0 4px 80px rgba(201,168,76,0.18)',
        zIndex: 20, pointerEvents: 'none',
      }} />

      {/* Background glows */}
      <div style={{ position: 'absolute', top: '25%', left: '50%', width: 900, height: 600, background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 65%)', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '5%', width: 500, height: 500, background: 'radial-gradient(ellipse, rgba(233,30,140,0.05) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '10%', left: '3%', width: 400, height: 400, background: 'radial-gradient(ellipse, rgba(255,107,53,0.04) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ─── titlePageReveal ──────────────────────────────────── */}
        <div
          className={`tp-header-wrap${inView ? ' boom' : ''}`}
          style={{
            padding: '0 clamp(20px, 5vw, 80px)',
            marginBottom: 'clamp(52px, 7vw, 80px)',
            textAlign: 'center',
          }}
        >
          {/* Heading */}
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
            fontWeight: 700, color: '#F5F0E8',
            letterSpacing: '-0.03em', lineHeight: 1.05,
            margin: '0 auto 20px',
          }}>
            The{' '}
            <span style={{
              background: 'linear-gradient(90deg, #FF6B35, #E91E8C)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Problem.
            </span>
          </h2>

          {/* Sub-copy */}
          <p style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#888880', maxWidth: 560,
            lineHeight: 1.7, margin: '0 auto 52px',
          }}>
            Modern hiring is broken from the inside. Fraud, bias, wasted hours, and bad hires are not edge cases — they're the default.
          </p>

        </div>

        {/* ── Row label row ─────────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0 clamp(20px, 5vw, 80px)',
          marginBottom: 20,
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.6s ease 0.4s',
        }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>
            ← The hiring crisis
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(233,30,140,0.45)' }}>
            Identity & fraud risk →
          </span>
        </div>

        {/* ── Row 1: leftBoomReveal → GSAP scrubs LEFT ─────────────────────── */}
        <div
          className={`tp-row1-wrap${row1Ready ? ' boom' : ''}`}
          style={{ marginBottom: 'clamp(16px, 2.5vw, 24px)' }}
        >
          <div style={{ overflow: 'hidden' }}>
            <div
              ref={row1Ref}
              style={{
                display: 'flex',
                gap: 'clamp(14px, 1.8vw, 20px)',
                padding: 'clamp(12px, 1.5vw, 16px) clamp(20px, 5vw, 80px)',
                willChange: 'transform',
              }}
            >
              {/* Duplicate for seamless feel */}
              {[...ROW1_CARDS, ...ROW1_CARDS].map((card, i) => (
                <ProblemCard key={`r1-${i}`} card={card} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 2: rightBoomReveal → GSAP scrubs RIGHT ───────────────────── */}
        <div
          className={`tp-row2-wrap${row2Ready ? ' boom' : ''}`}
          style={{ marginBottom: 'clamp(36px, 5vw, 64px)' }}
        >
          <div style={{ overflow: 'hidden' }}>
            <div
              ref={row2Ref}
              style={{
                display: 'flex',
                gap: 'clamp(14px, 1.8vw, 20px)',
                padding: 'clamp(12px, 1.5vw, 16px) clamp(20px, 5vw, 80px)',
                willChange: 'transform',
              }}
            >
              {[...ROW2_CARDS, ...ROW2_CARDS].map((card, i) => (
                <ProblemCard key={`r2-${i}`} card={card} />
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <div
          ref={ctaRef}
          style={{
            padding: '0 clamp(20px, 5vw, 80px)',
            paddingBottom: 'clamp(8px, 2vw, 20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
          }}
        >
          <p style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
            fontWeight: 700, color: '#F5F0E8',
            letterSpacing: '-0.02em', lineHeight: 1.3,
            maxWidth: 640, margin: '0 auto', opacity: 0,
            textAlign: 'center',
          }}>
            Your next hire could be a ghost.{' '}
            <span style={{ background: 'linear-gradient(90deg, #FF6B35, #E91E8C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              intervieHire stops them before they start.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default TheProblemSection;
