import React, { MouseEventHandler } from 'react';
import { TbLayoutSidebar } from "react-icons/tb";

interface SideBarProps {
  handleToggleSidebar: MouseEventHandler,
  isOpen: boolean,
  pt: Number
  children: React.ReactNode
};


export const SideBar = ({ handleToggleSidebar, isOpen, children, pt }: SideBarProps) => {
  return (
    <>
      <style jsx>{
        `.translate-x-80 {
            transform: translateX(-100%);
         }`
      }
      </style>
      <div style={{ width: '35px', height: '35px', zIndex: 4, position: 'fixed', borderRadius: '8px', textAlign: 'center', marginTop: '0.2%' }} className='bg-white dark:bg-gray-800'>
        <TbLayoutSidebar onClick={handleToggleSidebar} size={35} style={{ position: 'relative', zIndex: 4, marginLeft: `${isOpen ? '1%' : '0%'}` }} className='text-black dark:text-white'/>
      </div>
      <div className={`md:w-3/12 lg:md:w-3/12 sm:w-10/12 min-h-screen bg-white dark:bg-gray-800 p-3 pt-10 fixed transform transition-transform duration-300 ${isOpen ? '' : 'translate-x-80'}`} style={{ zIndex: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {children}
      </div>
    </>
  );
};