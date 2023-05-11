import React from 'react';

type Section = 'alberta-highways' | 'calgary-cameras' | 'edmonton-cameras' | 'banff-cameras';

interface CameraSidebarProps {
  onSectionSelect: (section: Section) => void;
  onIncreaseGridSize: () => void;
  onDecreaseGridSize: () => void;
}

const CameraSidebar = ({ onSectionSelect, onIncreaseGridSize, onDecreaseGridSize }: CameraSidebarProps) => {
  return (
    <div className="w-64 min-h-screen bg-gray-100 p-4 fixed left-0">
      <ul className="mt-8">
        <li className="py-2 px-4 bg-gray-200 hover:bg-gray-300 cursor-pointer text-black" onClick={() => onSectionSelect('alberta-highways')}>Alberta Highways</li>
        <li className="py-2 px-4 bg-gray-200 hover:bg-gray-300 cursor-pointer text-black" onClick={() => onSectionSelect('calgary-cameras')}>Calgary Cameras</li>
        <li className="py-2 px-4 bg-gray-200 hover:bg-gray-300 cursor-pointer text-black" onClick={() => onSectionSelect('edmonton-cameras')}>Edmonton Cameras</li>
        <li className="py-2 px-4 bg-gray-200 hover:bg-gray-300 cursor-pointer text-black" onClick={() => onSectionSelect('banff-cameras')}>Banff Cameras</li>
      </ul>
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

export default CameraSidebar;
