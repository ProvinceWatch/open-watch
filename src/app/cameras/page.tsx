"use client"
// page.tsx
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import CameraSidebar from '@/components/CameraSidebar';
import CameraGrid from '@/components/CameraGrid';

export default function Cameras() {
  const [selectedSection, setSelectedSection] = useState('alberta-highways');

  return (
    <Layout>
      <div className="flex min-h-screen">
        <CameraSidebar onSectionSelect={setSelectedSection} />
        <div className="flex-1 overflow-auto bg-white min-h-screen ml-64">
          <CameraGrid section={selectedSection} />
        </div>
      </div>
    </Layout>
  );
}
