'use client';
import React, { useState, useEffect } from 'react';
import { Navbar, PageTransition } from './layout';
import {
  HeroSection,
  TheProblemSection,
  TransitionSection,

  SolutionSection,
  CalculatorSection,
  SolvingForSection,
  ManifestoSection,
  HiringChaosSection,
  BudgetCtaSection,
  ContactSection,
  FooterCTA,
} from './sections';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { AwardsLoader } from './ui';

export default function LandingApp() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3500);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return <AwardsLoader />;

  return (
    <SmoothScrollProvider>
    <div className="ih-landing">
      <Navbar />
      {/* Wrapper to limit the sticky lifetime of HeroSection */}
      <div style={{ position: 'relative', height: '240vh' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 1 }}>
          <HeroSection />
        </div>
      </div>
      {/* TheProblemSection slides over the hero — same stacking trick as TransitionSection */}
      <div style={{ position: 'relative', zIndex: 2, marginTop: '-100vh' }}>
        <TheProblemSection />
      </div>
      <TransitionSection />
        <SolutionSection />
        <HiringChaosSection/>
      {/* HiringChaosSection — sticky wrapper so Calculator can slide over it */}
      <div style={{ position: 'relative', height: '200vh' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 1 }}>
        <BudgetCtaSection />
        </div>
      </div>
      {/* CalculatorSection slides over HiringChaos — same stacking trick as Problem/Hero */}
      <div style={{ position: 'relative', zIndex: 3, marginTop: '-100vh' }}>
        <CalculatorSection />
      </div>
     
      <SolvingForSection />
      <ManifestoSection />
      <ContactSection />
      <FooterCTA />
      <PageTransition />
    </div>
    </SmoothScrollProvider>
  );
}
