import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ListGroup } from 'flowbite-react';
import { Section } from '@/app/cameras/defs'
import { SideBar } from '@/components/SideBar';

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
    <SideBar handleToggleSidebar={handleToggleSidebar} isOpen={isOpen} pt={10}>
      <ListGroup className='my-6'>
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
    </SideBar>
  );
});

CameraSidebar.displayName = "Camera Sidebar";
export default CameraSidebar;
