'use client';
import React from 'react';
import { AboutFounderSection } from '../sections/AboutFounderSection';
import { ResourcePageShell } from '../ResourcePageShell';

export default function AboutFounderPage() {
  return (
    <ResourcePageShell>
      <AboutFounderSection />
    </ResourcePageShell>
  );
}
