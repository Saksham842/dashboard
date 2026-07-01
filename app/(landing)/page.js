'use client';
import dynamic from 'next/dynamic';
import { AwardsLoader } from '../../src/landing/ui/AwardsLoader';

const LandingApp = dynamic(() => import('../../src/landing/LandingApp'), {
  ssr: false,
  loading: () => <AwardsLoader />,
});

export default function LandingPage() {
  return <LandingApp />;
}
