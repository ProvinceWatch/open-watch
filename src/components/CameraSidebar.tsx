import React, { useState } from 'react';
import { ListGroup } from 'flowbite-react';

type Section = 'alberta-highways' | 'calgary-cameras' | 'edmonton-cameras' | 'banff-cameras';

interface CameraSidebarProps {
  onSectionSelect: (section: Section) => void;
  onIncreaseGridSize: () => void;
  onDecreaseGridSize: () => void;
}

const CameraSidebar = ({ onSectionSelect, onIncreaseGridSize, onDecreaseGridSize }: CameraSidebarProps) => {
  const sections: Section[] = ['alberta-highways', 'calgary-cameras', 'edmonton-cameras', 'banff-cameras'];
  
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const handleSelect = (index: number) => {
    setActiveSectionIndex(index);
    onSectionSelect(sections[index]);
  };

  return (
    <div className="w-64 min-h-screen bg-gray-100 p-4 fixed left-0">
      <ListGroup>
        {sections.map((section, index) => (
          <ListGroup.Item 
            key={section}
            onClick={() => handleSelect(index)}
            action
            active={index === activeSectionIndex} // Highlight if this section is selected
          >
            {section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className="flex justify-between mt-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onDecreaseGridSize}
        >
          -
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onIncreaseGridSize}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default React.memo(CameraSidebar);
