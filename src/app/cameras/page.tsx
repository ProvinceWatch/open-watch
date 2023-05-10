"use client"
import React, { useRef, useState } from 'react';
import Layout from '@/components/Layout';
import CameraSidebar from '@/components/CameraSidebar';
import CameraGrid from '@/components/CameraGrid';

export default function Cameras() {
  const [selectedSection, setSelectedSection] = useState('alberta-highways');
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    sidebarRef.current?.handleToggleSidebar();
  };

  return (
    <div className="bg-white min-h-screen">
      <Layout>
        <div className="flex min-h-screen">
          <CameraSidebar ref={sidebarRef} onSectionSelect={setSelectedSection} />
          <div className="flex-1">
            <button onClick={toggleSidebar} className="bg-blue-500 text-white p-2 rounded m-4">Open Sidebar</button>
            <CameraGrid section={selectedSection} />
          </div>
        </div>
      </Layout>
    </div>
  );
}