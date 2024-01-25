import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { TbLetterC, TbLetterA, TbLetterE, TbLetterB } from 'react-icons/tb';
import { Section } from '@/app/cameras/defs'
import { SideBar } from '@/components/SideBar';

interface CameraSidebarProps {
  onSectionSelect: (section: Section) => void;
  showSideBar: boolean
  setShowSideBar: Function
}

const CameraSidebar = forwardRef(({ onSectionSelect, showSideBar, setShowSideBar }: CameraSidebarProps, ref) => {
  const sections: Section[] = ['alberta-highways', 'calgary-cameras', 'edmonton-cameras', 'banff-cameras'];
  const icons: any[] = [TbLetterA, TbLetterC, TbLetterE, TbLetterB];
  const [isOpen, setIsOpen] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const handleSelect = (index: number) => {
    setActiveSectionIndex(index);
    onSectionSelect(sections[index]);
  };

  const handleToggleSidebar = () => {
    setShowSideBar(true);
    setIsOpen(!isOpen);
  };

  useImperativeHandle(ref, () => ({
    handleToggleSidebar,
  }));

  return (
    <div>
      <SideBar handleToggleSidebar={handleToggleSidebar} isOpen={showSideBar && isOpen} pt={0}>
        <Sidebar className="w-full">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {sections.map((section, index) => (
                <Sidebar.Item
                  key={section}
                  onClick={() => handleSelect(index)}
                  active={index === activeSectionIndex}
                  icon={icons[index]}
                >
                  {section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Sidebar.Item>
              ))}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </SideBar>
    </div>

  );
});

CameraSidebar.displayName = "Camera Sidebar";
export default CameraSidebar;
