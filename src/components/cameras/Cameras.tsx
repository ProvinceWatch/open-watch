import React, { useState, useCallback, FC, useRef } from 'react';
import CameraSidebar from '@/components/cameras/CameraSidebar';
import CameraGrid from '@/components/cameras/CameraGrid';
import CameraGridSize from '@/components/cameras/CameraGridSize';
import { Section } from '@/app/cameras/defs'

interface CamerasProps {}

const Cameras: FC<CamerasProps> = ({}) => {
  const [selectedSection, setSelectedSection] = useState('alberta-highways');
  const [gridSize, setGridSize] = useState(window.innerWidth <= 768 ? 'grid-cols-1' : 'grid-cols-3');

  const sidebarRef = useRef();
  const reduceColumns = useCallback(() => {
    if (gridSize === 'grid-cols-5') {
      setGridSize('grid-cols-4');
    } else if (gridSize === 'grid-cols-4') {
      setGridSize('grid-cols-3');
    } else if (gridSize == 'grid-cols-3') {
      setGridSize('grid-cols-2');
    } else if (gridSize == 'grid-cols-2') {
      setGridSize('grid-cols-1')
    }
  }, [gridSize, setGridSize]);

  const addColumns = useCallback(() => {
    if (gridSize === 'grid-cols-3') {
      setGridSize('grid-cols-4');
    } else if (gridSize === 'grid-cols-4') {
      setGridSize('grid-cols-5');
    } else if (gridSize == 'grid-cols-1'){
      setGridSize('grid-cols-2');
    } else if (gridSize == 'grid-cols-2') {
      setGridSize('grid-cols-3');
    }
  }, [gridSize, setGridSize]);

  return (
    <div className="flex min-h-screen bg-white">
      <CameraSidebar ref={sidebarRef} onSectionSelect={setSelectedSection}/>
      <div className="flex-1 overflow-auto min-h-screen">
        <CameraGrid section={selectedSection as Section} gridSize={gridSize} />
      </div>
      <CameraGridSize onReduceColumns={reduceColumns} onAddColumns={addColumns} gridSize={gridSize} />
    </div>
  );
}

export default Cameras;