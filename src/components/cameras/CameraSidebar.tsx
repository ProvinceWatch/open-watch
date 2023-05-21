import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ListGroup } from 'flowbite-react';
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { Section } from '@/app/cameras/defs'

interface CameraSidebarProps {
  onSectionSelect: (section: Section) => void;
}

const CameraSidebar = forwardRef(({ onSectionSelect }: CameraSidebarProps, ref) => {
  const sections: Section[] = ['alberta-highways', 'calgary-cameras', 'edmonton-cameras', 'banff-cameras'];
  const [isOpen, setIsOpen] = useState(true);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const handleSelect = (index: number) => {
    setActiveSectionIndex(index);
    onSectionSelect(sections[index]);
  };

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useImperativeHandle(ref, () => ({
    handleToggleSidebar,
  }));

  return (
    <>
      <style jsx>{`
        .translate-x-80 {
          transform: translateX(-100%);
       }`
      }</style>
      <div>
        {
          isOpen ?
            <TbLayoutSidebarLeftCollapse onClick={handleToggleSidebar} size={35} style={{ position: 'fixed', zIndex: 5, marginLeft: `${isOpen ? '0%' : '0%'}`, color: 'black' }} /> :
            <TbLayoutSidebarLeftExpand onClick={handleToggleSidebar} size={35} style={{ position: 'fixed', zIndex: 5, marginLeft: `${isOpen ? '1%' : '0%'}`, color: 'black' }} />
        }
      </div>
      <div className={`w-80 min-h-screen bg-gray-100 p-4 py-10 fixed transform transition-transform duration-300 ${isOpen ? '' : 'translate-x-80'}`} style={{ zIndex: 4 }}>
        <ListGroup>
          {sections.map((section, index) => (
            <ListGroup.Item
              key={section}
              onClick={() => handleSelect(index)}
              active={index === activeSectionIndex}
            >
              {section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
});

CameraSidebar.displayName = "Camera Sidebar";
export default CameraSidebar;
