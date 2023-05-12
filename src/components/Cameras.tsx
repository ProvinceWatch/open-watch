import React, { useState, useCallback } from 'react';
import CameraSidebar from '@/components/CameraSidebar';
import CameraGrid from '@/components/CameraGrid';

export default function Cameras() {
  const [selectedSection, setSelectedSection] = useState('alberta-highways');
  const [gridSize, setGridSize] = useState('grid-cols-3');

  const increaseGridSize = useCallback(() => {
    if (gridSize === 'grid-cols-5') {
      setGridSize('grid-cols-4');
    } else if (gridSize === 'grid-cols-4') {
      setGridSize('grid-cols-3');
    } else if (gridSize === 'grid-cols-3') {
      setGridSize('grid-cols-2');
    } else if (gridSize === 'grid-cols-2') {
      setGridSize('grid-cols-1');
    }
  }, [gridSize, setGridSize]);

  const decreaseGridSize = useCallback(() => {
    if (gridSize === 'grid-cols-1') {
      setGridSize('grid-cols-2');
    } else if (gridSize === 'grid-cols-2') {
      setGridSize('grid-cols-3');
    } else if (gridSize === 'grid-cols-3') {
      setGridSize('grid-cols-4');
    } else if (gridSize === 'grid-cols-4') {
      setGridSize('grid-cols-5');
    }
  }, [gridSize, setGridSize]);

  return (
    <div className="flex min-h-screen">
      <CameraSidebar onSectionSelect={setSelectedSection} onIncreaseGridSize={increaseGridSize} onDecreaseGridSize={decreaseGridSize} />
      <div className="flex-1 overflow-auto bg-white min-h-screen ml-64">
        <CameraGrid section={selectedSection} gridSize={gridSize} />
      </div>
    </div>
  );
}
