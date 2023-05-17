import React, { useState } from 'react';
import { ListGroup } from 'flowbite-react';
import { Section } from '@/app/cameras/defs'

interface CameraSidebarProps {
  onSectionSelect: (section: Section) => void;
}

const CameraSidebar = ({ onSectionSelect}: CameraSidebarProps) => {
  const sections: Section[] = ['alberta-highways', 'calgary-cameras', 'edmonton-cameras', 'banff-cameras'];
  
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const handleSelect = (index: number) => {
    setActiveSectionIndex(index);
    onSectionSelect(sections[index]);
  };

  return (
    <div className="w-80 min-h-screen bg-gray-100 p-4 fixed left-0">
      <ListGroup>
        {sections.map((section, index) => (
          <ListGroup.Item 
            key={section}
            onClick={() => handleSelect(index)}
            active={index === activeSectionIndex} // Highlight if this section is selected
          >
            {section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default React.memo(CameraSidebar);
