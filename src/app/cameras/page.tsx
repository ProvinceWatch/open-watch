"use client"
// page.tsx
import React from 'react';
import Layout from '@/components/Layout';
import Cameras from '@/components/cameras/Cameras';

export default function CamerasPage() {
  return (
    <Layout>
      <Cameras />
    </Layout>
  );
}
