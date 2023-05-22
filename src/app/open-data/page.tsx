"use client"
import React from 'react';
import NavBar from '@/components/NavBar';

const OpenDataDashboard = ({ }: {}) => {
  return (
    <>
      <NavBar selectedTab='open-data' />
      <div>
        open-data
      </div>
    </>
  );
}

export default OpenDataDashboard;