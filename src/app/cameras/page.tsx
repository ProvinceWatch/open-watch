"use client"
// page.tsx
import React from 'react';
import Cameras from '@/components/cameras/Cameras';
import NavBar from '@/components/NavBar';

export default function CamerasPage() {
  return (
    <>
      <NavBar selectedTab='cameras'/>
      <Cameras />
    </>
  );
}
