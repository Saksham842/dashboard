'use client';
import React from 'react';
import { FAQSection } from '../sections/FAQSection';
import { ResourcePageShell } from '../ResourcePageShell';

export default function FaqPage() {
  return (
    <ResourcePageShell>
      <FAQSection />
    </ResourcePageShell>
  );
}
