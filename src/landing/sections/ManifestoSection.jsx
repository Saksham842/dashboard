'use client';
import React, { useEffect, useRef } from 'react';

const words = [
  "We", "didn't", "build", "another", "tool.",
  "We", "built", "the", "hiring", "layer",
  "your", "team", "never", "had."
];

const REVEAL_WORDS = 4;

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export const ManifestoSection = () => {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const wordRefs = useRef([]);
  const cacheRef = useRef({ p: -1 });

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          if (!wrapRef.current || !trackRef.current) return;
          const c = cacheRef.current;
          const scrollTop = window.__lenis?.scroll ?? 0;
          if (c.scrollTop !== scrollTop) {
            c.scrollTop = scrollTop;
            c.wrapTop = wrapRef.current.offsetTop;
            c.wrapH = wrapRef.current.offsetHeight;
            c.scrollable = c.wrapH - window.innerHeight;
          }
          const p = Math.max(0, Math.min(1, (scrollTop - c.wrapTop) / c.scrollable));

          const revealEnd = 0.35;
          const scrollStart = 0.35;

          for (let i = 0; i < REVEAL_WORDS; i++) {
            const wordP = Math.max(0, Math.min(1,
              (p - (i * revealEnd / REVEAL_WORDS)) / (revealEnd / REVEAL_WORDS)
            ));
            const eased = easeInOut(wordP);
            const el = wordRefs.current[i];
            if (!el) continue;
            el.style.opacity = eased;
            el.style.transform = `translateY(${(1 - eased) * 60}px)`;
          }

          if (p >= scrollStart) {
            const slideP = (p - scrollStart) / (1 - scrollStart);
            const totalWords = words.length - REVEAL_WORDS;

            for (let i = REVEAL_WORDS; i < words.length; i++) {
              const wi = i - REVEAL_WORDS;
              const wordProgress = Math.max(0, Math.min(1,
                (slideP * (totalWords + 1) - wi) / 1.2
              ));
              const eased = easeInOut(wordProgress);
              const el = wordRefs.current[i];
              if (!el) continue;
              el.style.opacity = eased;
              el.style.transform = `translateX(${(1 - eased) * 120}px)`;
            }

            const trackOverflow = Math.max(
              0, trackRef.current.scrollWidth - window.innerWidth + 64
            );
            trackRef.current.style.transform = `translateX(-${slideP * trackOverflow}px)`;
          } else {
            trackRef.current.style.transform = `translateX(0px)`;
            for (let i = REVEAL_WORDS; i < words.length; i++) {
              const el = wordRefs.current[i];
              if (!el) continue;
              el.style.opacity = 0;
              el.style.transform = `translateX(120px)`;
            }
          }
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={wrapRef} style={{ height: '800vh', background: '#000', position: 'relative', marginTop: '-60px', marginBottom: '-60px' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div
          ref={trackRef}
          style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', paddingLeft: 'clamp(16px, 4vw, 32px)', willChange: 'transform' }}
        >
          {words.map((word, i) => (
            <span key={i} style={{ overflow: 'hidden', display: 'inline-block', marginRight: 'clamp(12px, 3vw, 28px)', flexShrink: 0 }}>
              <span
                ref={el => wordRefs.current[i] = el}
                style={{
                  display: 'inline-block',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  fontSize: 'clamp(5rem, 12vw, 10rem)',
                  color: '#C9A84C',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  opacity: 0,
                  transform: i < REVEAL_WORDS ? 'translateY(60px)' : 'translateX(120px)',
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};