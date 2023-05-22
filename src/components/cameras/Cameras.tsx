import React, { useState, useCallback, FC, useRef, useEffect } from 'react';
import CameraSidebar from '@/components/cameras/CameraSidebar';
import CameraGrid from '@/components/cameras/CameraGrid';
import CameraGridSize from '@/components/cameras/CameraGridSize';
import { Section } from '@/app/cameras/defs';

interface CamerasProps {}

const Cameras: React.FC<CamerasProps> = ({}) => {
  const [selectedSection, setSelectedSection] = useState('alberta-highways');
  const [gridSize, setGridSize] = useState(getInitialGridSize());
  const sidebarRef = useRef();

  const reduceColumns = useCallback(() => {
    if (gridSize === 'grid-cols-5') setGridSize('grid-cols-4');
    else if (gridSize === 'grid-cols-4') setGridSize('grid-cols-3');
    else if (gridSize === 'grid-cols-3') setGridSize('grid-cols-2');
    else if (gridSize === 'grid-cols-2') setGridSize('grid-cols-1');
  }, [gridSize]);

  const addColumns = useCallback(() => {
    if (gridSize === 'grid-cols-3') setGridSize('grid-cols-4');
    else if (gridSize === 'grid-cols-4') setGridSize('grid-cols-5');
    else if (gridSize === 'grid-cols-1') setGridSize('grid-cols-2');
    else if (gridSize === 'grid-cols-2') setGridSize('grid-cols-3');
  }, [gridSize]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setGridSize(getInitialGridSize());
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  function getInitialGridSize() {
    if (typeof window !== 'undefined') {
      const viewportWidth = window.innerWidth;
      return viewportWidth < 768 ? 'grid-cols-1' : 'grid-cols-3';
    }
    return 'grid-cols-3'; 
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-64">
        <CameraSidebar ref={sidebarRef} onSectionSelect={setSelectedSection} />
      </div>
      <div className="flex-1 overflow-auto min-h-screen p-1">
        <CameraGrid section={selectedSection as Section} gridSize={gridSize} />
      </div>
      <CameraGridSize onReduceColumns={reduceColumns} onAddColumns={addColumns} gridSize={gridSize} />
    </div>
  );
};

export default Cameras;
