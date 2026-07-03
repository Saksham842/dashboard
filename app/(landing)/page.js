'use client';
import dynamic from 'next/dynamic';

const LandingApp = dynamic(() => import('../../src/landing/LandingApp'), {
  ssr: false,
});

export default function LandingPage() {
  return <LandingApp />;
}
