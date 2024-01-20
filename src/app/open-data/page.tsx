"use client"
import React from 'react';
import NavBar from '@/components/NavBar';

const OpenDataDashboard = ({ }: {}) => {
  return (
    <>
      <NavBar selectedTab='open-data' />
      <main className="h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="text-center space-y-4">
        <ConstructionIcon className="mx-auto h-20 w-20 text-gray-500 dark:text-gray-400" />
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-300">Under Development</h1>
        <p className="text-gray-500 dark:text-gray-400">Come Back Soon</p>
      </div>
    </main>
    </>
  );
}

function ConstructionIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="6" width="20" height="8" rx="1" />
      <path d="M17 14v7" />
      <path d="M7 14v7" />
      <path d="M17 3v3" />
      <path d="M7 3v3" />
      <path d="M10 14 2.3 6.3" />
      <path d="m14 6 7.7 7.7" />
      <path d="m8 6 8 8" />
    </svg>
  )
}

  export default OpenDataDashboard;