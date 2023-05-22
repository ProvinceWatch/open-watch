import React, { useState, useCallback, useRef } from 'react';
import CameraSidebar from '@/components/cameras/CameraSidebar';
import CameraGrid from '@/components/cameras/CameraGrid';
import CameraGridSize from '@/components/cameras/CameraGridSize';
import { Section } from '@/app/cameras/defs';

interface CamerasProps {}

const Cameras: React.FC<CamerasProps> = ({}) => {
  const [selectedSection, setSelectedSection] = useState('alberta-highways');
  const [gridSize, setGridSize] = useState('grid-cols-3');

  const sidebarRef = useRef<HTMLDivElement>(null);
  const reduceColumns = useCallback(() => {
    if (gridSize === 'grid-cols-5') {
      setGridSize('grid-cols-4');
    } else if (gridSize === 'grid-cols-4') {
      setGridSize('grid-cols-3');
    }
  }, [gridSize, setGridSize]);

  const addColumns = useCallback(() => {
    if (gridSize === 'grid-cols-3') {
      setGridSize('grid-cols-4');
    } else if (gridSize === 'grid-cols-4') {
      setGridSize('grid-cols-5');
    }
  }, [gridSize, setGridSize]);

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
