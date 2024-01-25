"use client"
// page.tsx
import React from 'react';
import Cameras from '@/components/cameras/Cameras';
import NavBar from '@/components/NavBar';

export default function CamerasPage() {
  return (
    <div>
      <div className='sticky w-full top-0 z-50'>
        <NavBar selectedTab='cameras' />
      </div>
      <div className='min-h-screen bg-white dark:bg-gray-800'>
        <Cameras />
      </div>
    </div>
  );
}
