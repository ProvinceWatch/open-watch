import React, { useState, useCallback, FC } from 'react';
import CameraSidebar from '@/components/CameraSidebar';
import CameraGrid from '@/components/CameraGrid';

interface CamerasProps {}

const Cameras: FC<CamerasProps> = ({}) => {
  const [selectedSection, setSelectedSection] = useState('alberta-highways');
  const [gridSize, setGridSize] = useState('grid-cols-3');

  const increaseGridSize = useCallback(() => {
    if (gridSize === 'grid-cols-5') {
      setGridSize('grid-cols-4');
    } else if (gridSize === 'grid-cols-4') {
      setGridSize('grid-cols-3');
    }
  }, [gridSize, setGridSize]);

  const decreaseGridSize = useCallback(() => {
    if (gridSize === 'grid-cols-3') {
      setGridSize('grid-cols-4');
    } else if (gridSize === 'grid-cols-4') {
      setGridSize('grid-cols-5');
    }
  }, [gridSize, setGridSize]);

  return (
    <div className="flex min-h-screen">
      <CameraSidebar onSectionSelect={setSelectedSection} onIncreaseGridSize={increaseGridSize} onDecreaseGridSize={decreaseGridSize} />
      <div className="flex-1 overflow-auto bg-white min-h-screen ml-80">
        <CameraGrid section={selectedSection} gridSize={gridSize} />
      </div>
    </div>
  );
}

export default Cameras;
