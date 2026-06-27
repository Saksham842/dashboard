'use client';
import React from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { TransitionSection } from './TransitionSection';
import { DemoVideoSection } from './DemoVideoSection';
import { SolutionSection } from './SolutionSection';
import {
  ExplainerVideoSection,
  CalculatorSection,
  SolvingForSection,
  ImpactSection,
  ManifestoSection,
  FAQSection,
  AboutFounderSection,
  BlogsSection,
  ContactSection,
  FooterCTA,
} from './Sections';
import { PageTransition } from './PageTransition';

export default function LandingApp() {
  return (
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
      <ImpactSection />
      <ManifestoSection />
      <FAQSection />
      <AboutFounderSection />
      <BlogsSection />
      <ContactSection />
      <FooterCTA />
      <PageTransition />
    </div>
  );
}
