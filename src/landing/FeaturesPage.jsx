'use client';
import React from 'react';
import { Navbar } from './layout';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { Eyebrow, FadeUpOnScroll } from './ui';
import { FooterCTA } from './sections/FooterCTA';
import { ManifestoSection } from './sections/ManifestoSection';
import LinaInterviewerSection from './sections/LinaInterviewerSection';

const steps = [
  { title: "Create an Interview", desc: "Define the role, upload a job description, set skill weights, and configure culture-fit criteria. Lina uses this to build a custom scoring rubric.", features: ["AI rubric builder", "Skill weighting", "Culture fit config"], time: "5 min setup" },
  { title: "Invite Candidates", desc: "Send automated email invitations with calendar scheduling. Candidates pick a slot — no back-and-forth coordination needed.", features: ["Auto email", "Calendar sync", "Reminders"], time: "1 click" },
  { title: "Screen Resumes Beyond Keywords", desc: "Lina reads resumes for actual capability signals — not just keyword matches. She spots transferable skills, project complexity, and growth trajectory.", features: ["Semantic parsing", "Skill signal detection", "Growth scoring"], time: "Real-time" },
  { title: "Candidates Take Interviews", desc: "Candidates enter a conversational AI interview that adapts in real time. Lina asks follow-ups, probes depth, and evaluates responses — 24/7, no human needed.", features: ["Adaptive questioning", "Real-time scoring", "24/7 availability"], time: "30–45 min" },
  { title: "See Results & Hire Faster", desc: "Review full transcripts, skill scores, red flags, and a ranked shortlist. Make data-driven decisions in hours, not weeks.", features: ["Transcripts", "Scorecards", "Ranked shortlist"], time: "Instant" },
];

export default function FeaturesPage() {
  const videoRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  const [cardIn, setCardIn] = React.useState([]);
  const cardRefs = React.useRef([]);

  React.useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, steps.length);
  }, []);

  React.useEffect(() => {
    cardRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCardIn(prev => { const n = [...prev]; n[i] = true; return n; });
            obs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(ref);
    });
  }, []);

  React.useEffect(() => {
    const onScroll = () => {
      if (!videoRef.current) return;
      const rect = videoRef.current.getBoundingClientRect();
      const total = videoRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const t = progress;
  const scale = t < 0.5 ? 0.7 + (t / 0.5) * 0.3 : 1 - ((t - 0.5) / 0.5) * 0.3;
  const radius = t < 0.5 ? 20 * (1 - t / 0.5) : 20 * ((t - 0.5) / 0.5);

  return (
    <SmoothScrollProvider>
      <div className="ih-landing" style={{ background: '#000' }}>
        <Navbar simple />

        {/* Heading */}
        <div style={{ padding: 'clamp(80px,10vw,140px) clamp(16px,4vw,48px) 0', textAlign: 'center' }}>
          <FadeUpOnScroll delay={0} y={40}>
            <Eyebrow>Product Demo</Eyebrow>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 700, color: '#F5F0E8',
              letterSpacing: '-0.02em', lineHeight: 1.15,
              maxWidth: 800, margin: '0 auto',
            }}>
              See IntervieHire in{' '}
              <span style={{
                background: 'linear-gradient(90deg, #d96424, #8a3a10)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Action.</span>
            </h2>
          </FadeUpOnScroll>
        </div>

        {/* Video — 300vh scroll-based scale (DemoVideoSection pattern) */}
        <section data-scroll ref={videoRef} style={{ height: '300vh', position: 'relative' }}>
          <div style={{
            position: 'sticky', top: 0, height: '100vh',
            display: 'flex', flexDirection: 'column',
            background: '#000', overflow: 'hidden',
          }}>
            {/* Video */}
            <div style={{
              flex: 1, minHeight: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: '100%', height: '100%',
                borderRadius: radius,
                overflow: 'hidden',
                background: '#0A0A0A',
                border: t < 0.1 || t > 0.9 ? '1px solid rgba(217,100,36,0.1)' : 'none',
                boxShadow: t >= 0.2 && t <= 0.8
                  ? '0 0 100px rgba(217,100,36,0.08)'
                  : '0 20px 60px rgba(0,0,0,0.6)',
                transform: `scale(${scale})`,
                willChange: 'transform',
              }}>
                <video
                  src="/mp_.mp4"
                  autoPlay muted loop playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Vertical timeline — How It Works */}
        <section data-scroll style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(16px, 4vw, 48px) 20px',
          background: '#000',
          overflow: 'hidden',
        }}>
          <style>{`
            .fp-vert-card {
              border-radius: 20px;
              border: 1px solid rgba(217,100,36,0.1);
              background: rgba(255,255,255,0.02);
              transition: border-color 0.3s, background 0.3s, transform 0.3s;
              position: relative;
              padding: clamp(24px, 3vw, 36px);
            }
            .fp-vert-card:hover {
              border-color: rgba(217,100,36,0.3);
              background: rgba(255,255,255,0.04);
              transform: translateY(-3px);
            }
            .fp-vert-card::before {
              content: '';
              position: absolute;
              top: 0; left: 0; right: 0;
              height: 2px;
              border-radius: 2px 2px 0 0;
              background: linear-gradient(90deg, #d96424, #d96424);
              opacity: 0.3;
              transition: opacity 0.3s;
            }
            .fp-vert-card:hover::before { opacity: 1; }
            @keyframes fpSlideInLeft {
              0% { opacity: 0; transform: translateX(-60px) scale(0.97); filter: blur(4px); }
              100% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); }
            }
            @keyframes fpSlideInRight {
              0% { opacity: 0; transform: translateX(60px) scale(0.97); filter: blur(4px); }
              100% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); }
            }
            .fp-card-in { animation: fpSlideInLeft 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }
            .fp-card-in-alt { animation: fpSlideInRight 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }
          `}</style>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#d96424', marginBottom: 12 }}>
                How It Works
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 700, color: '#F5F0E8', maxWidth: 600, margin: '0 auto', lineHeight: 1.2 }}>
                From invite to hire — one seamless pipeline
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {steps.map((step, i) => (
                <div key={i} ref={el => cardRefs.current[i] = el} className="fp-vert-card"
                  style={{
                    marginLeft: i % 2 === 0 ? 0 : 'clamp(24px, 4vw, 60px)',
                    opacity: 0,
                    animation: cardIn[i] ? (i % 2 === 0 ? 'fpSlideInLeft 0.9s cubic-bezier(0.16,1,0.3,1) forwards' : 'fpSlideInRight 0.9s cubic-bezier(0.16,1,0.3,1) forwards') : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                    <div style={{
                      flexShrink: 0, width: 44, height: 44, borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(217,100,36,0.15), rgba(217,100,36,0.05))',
                      border: '1px solid rgba(217,100,36,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Space Grotesk,sans-serif', fontSize: 16, fontWeight: 700, color: '#d96424',
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                        <h4 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 17, fontWeight: 700, color: '#F5F0E8', margin: 0 }}>
                          {step.title}
                        </h4>
                        {step.time && (
                          <span style={{
                            fontFamily: 'Inter,sans-serif', fontSize: 11, fontWeight: 500,
                            color: '#d96424', letterSpacing: '0.04em',
                          }}>
                            ~ {step.time}
                          </span>
                        )}
                      </div>
                      <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: 14, color: '#888880', lineHeight: 1.65, margin: '0 0 14px', maxWidth: 600 }}>
                        {step.desc}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {(step.features || []).map((f, fi) => (
                          <span key={fi} style={{
                            fontFamily: 'Inter,sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
                            color: 'rgba(217,100,36,0.7)', background: 'rgba(217,100,36,0.06)',
                            border: '1px solid rgba(217,100,36,0.1)', borderRadius: 99, padding: '4px 12px',
                          }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ManifestoSection />
        <LinaInterviewerSection />

        <FooterCTA />
      </div>
    </SmoothScrollProvider>
  );
}
