// CameraSidebar.tsx
import React, { forwardRef, useImperativeHandle } from 'react';

type Section = 'alberta-highways' | 'calgary-cameras' | 'edmonton-cameras' | 'banff-cameras';

interface CameraSidebarProps {
  onSectionSelect: (section: Section) => void;
}

const CameraSidebar = forwardRef<{}, CameraSidebarProps>((props: CameraSidebarProps, ref) => {
  const { onSectionSelect } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useImperativeHandle(ref, () => ({
    handleToggleSidebar,
  }));

  return (
    <div className={`w-64 min-h-screen bg-gray-100 p-4 fixed transform transition-transform duration-300 ${isOpen ? '' : '-translate-x-64'}`}>
      <button onClick={handleToggleSidebar} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded">Close</button>
      <ul className="mt-8">
        <li className="py-2 px-4 bg-gray-200 hover:bg-gray-300 cursor-pointer text-black" onClick={() => onSectionSelect('alberta-highways')}>Alberta Highways</li>
        <li className="py-2 px-4 bg-gray-200 hover:bg-gray-300 cursor-pointer text-black" onClick={() => onSectionSelect('calgary-cameras')}>Calgary Cameras</li>
        <li className="py-2 px-4 bg-gray-200 hover:bg-gray-300 cursor-pointer text-black" onClick={() => onSectionSelect('edmonton-cameras')}>Edmonton Cameras</li>
        <li className="py-2 px-4 bg-gray-200 hover:bg-gray-300 cursor-pointer text-black" onClick={() => onSectionSelect('banff-cameras')}>Banff Cameras</li>
      </ul>
    </div>
  );
});

export default CameraSidebar;
