import React, { MouseEventHandler } from 'react';
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from "react-icons/tb";

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
      {/* <div style={{ width: '35px', height: '35px', backgroundColor: 'white', zIndex: 2, position: 'fixed', borderRadius: '8px', textAlign: 'center' }}>
        {
          isOpen ?
            <TbLayoutSidebarLeftCollapse onClick={handleToggleSidebar} size={35} style={{ position: 'fixed', zIndex: 2, marginLeft: `${isOpen ? '1%' : '0%'}`, color: 'black' }} /> :
            <TbLayoutSidebarLeftExpand onClick={handleToggleSidebar} size={35} style={{ position: 'fixed', zIndex: 2, marginLeft: `${isOpen ? '1%' : '0%'}`, color: 'black' }} />
        }
      </div> */}
      <div className={`w-70 min-h-screen bg-white p-3 pt-${pt} fixed transform transition-transform duration-300 ${isOpen ? '' : 'translate-x-80'}`} style={{ zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {children}
      </div>
    </>
  );
};