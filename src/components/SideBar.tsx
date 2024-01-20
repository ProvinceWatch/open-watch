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
      <div style={{ width: '35px', height: '35px', backgroundColor: 'white', zIndex: 4, position: 'fixed', borderRadius: '8px', textAlign: 'center' }}>
        <TbLayoutSidebar onClick={handleToggleSidebar} size={35} style={{ position: 'fixed', zIndex: 4, marginLeft: `${isOpen ? '1%' : '0%'}`, color: 'black' }} />
      </div>
      <div className={`w-3/12 min-h-screen bg-white p-3 pt-10 fixed transform transition-transform duration-300 ${isOpen ? '' : 'translate-x-80'}`} style={{ zIndex: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {children}
      </div>
    </>
  );
};