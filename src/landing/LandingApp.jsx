'use client';
import React from 'react';
import { Navbar, PageTransition } from './layout';
import {
  HeroSection,
  TransitionSection,
  DemoVideoSection,
  SolutionSection,
  ExplainerVideoSection,
  CalculatorSection,
  SolvingForSection,
  ManifestoSection,
  HiringChaosSection,
  FAQSection,
  AboutFounderSection,
  BlogsSection,
  ContactSection,
  FooterCTA,
} from './sections';
import { SmoothScrollProvider } from './SmoothScrollProvider';

export default function LandingApp() {
  return (
    <SmoothScrollProvider>
    <div className="ih-landing">
      <Navbar />
      {/* Wrapper to limit the sticky lifetime of HeroSection */}
      <div style={{ position: 'relative', height: '200vh' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 1 }}>
          <HeroSection />
        </div>
      </div>
      <TransitionSection />
      <DemoVideoSection />
      <SolutionSection />
      {/* Wrapper to limit the sticky lifetime of ExplainerVideoSection */}
      <div style={{ position: 'relative', height: '200vh' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 1, display: 'flex', alignItems: 'center', width: '100%', background: '#050505' }}>
          <ExplainerVideoSection />
        </div>
      </div>
      <CalculatorSection />
      <SolvingForSection />
      <ManifestoSection />
      <HiringChaosSection/>
      <FAQSection />
      <AboutFounderSection />
      <BlogsSection />
      <ContactSection />
      <FooterCTA />
      <PageTransition />
    </div>
    </SmoothScrollProvider>
  );
}
