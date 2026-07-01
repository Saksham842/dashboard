'use client';
import React from 'react';
import { BlogsSection } from '../sections/BlogsSection';
import { ResourcePageShell } from '../ResourcePageShell';

export default function BlogsPage() {
  return (
    <ResourcePageShell>
      <BlogsSection />
    </ResourcePageShell>
  );
}
