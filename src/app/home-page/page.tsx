"use client"
import React from 'react'
import NavBar from '@/components/NavBar';
import HomeInfo from '@/components/home/HomeInfo';
import GlobalFooter from '@/components/GlobalFooter';




const HomePage = ({ }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar selectedTab='home' />
      <HomeInfo />
      <GlobalFooter />
    </div>
  );
}

export default HomePage;