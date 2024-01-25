import React, { useState, useCallback, FC, useRef, useEffect } from 'react';
import CameraSidebar from '@/components/cameras/CameraSidebar';
import CameraGrid from '@/components/cameras/CameraGrid';
import CameraGridSize from '@/components/cameras/CameraGridSize';
import { Section } from '@/app/cameras/defs';
import { CameraData } from '@/app/map/defs';
import { sortCameras } from '@/app/cameras/sort';
import { Spinner } from 'flowbite-react';
import CameraSearch from './CameraSearch';

interface CamerasProps { }

const Cameras: React.FC<CamerasProps> = ({ }) => {
  const [selectedSection, setSelectedSection] = useState('alberta-highways');
  const [gridSize, setGridSize] = useState(getInitialGridSize());
  const [showSidebar, setShowSidebar] = useState(false);
  const [cameras, setCameras] = useState<Record<Section, CameraData[]>>({
    'calgary-cameras': [],
    'edmonton-cameras': [],
    'banff-cameras': [],
    'alberta-highways': [],
  });
  const [loading, setLoading] = useState(true);
  const [filteredCameras, setFilteredCameras] = useState<Record<Section, CameraData[]>>({
    'calgary-cameras': [],
    'edmonton-cameras': [],
    'banff-cameras': [],
    'alberta-highways': [],
  });
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
    const fetchAndSortCameras = async () => {
      try {
        setLoading(true);
        const res: any = await fetch('/map/cameras');
        const cameraResponse = await res.json();
        const cameraData: CameraData[] = (cameraResponse.data as any) as CameraData[];
        const sortedCameras = sortCameras(cameraData);
        setCameras(sortedCameras);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch and sort camera data:', error);
        setLoading(false);
      }
    };
    fetchAndSortCameras();
  }, []);

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

  const hasFilteredCameras = (): boolean => {
    return Object.values(filteredCameras).some((sectionCameras) => sectionCameras.length > 0);
  };

  const formatSectionName = (section: string): string => {
    return section.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800">
      <div className="flex flex-col sticky w-full top-16 bg-white dark:bg-gray-800 z-20">
        <div className="flex z-50">
          <CameraSidebar ref={sidebarRef} onSectionSelect={setSelectedSection} showSideBar={showSidebar} setShowSideBar={setShowSidebar} />
        </div>
        <div className='flex flex-col sm:flex-row justify-between gap-4 px-2'>
          <h1 className='ml-10 text-lg dark:text-white mt-2'>
            Viewing {formatSectionName(selectedSection)}
          </h1>
          <CameraSearch
            currentCameras={cameras[selectedSection as Section]}
            onSearchResult={(filteredCameras) => setFilteredCameras({ ...cameras, [selectedSection]: filteredCameras })}
          />
        </div>
        
      </div>
      
      <div>
      {loading ? (
          <div className='flex items-center justify-center h-screen'>
            <Spinner size="xl" />
          </div>
        ) : (
          <CameraGrid
            cameras={hasFilteredCameras() ? filteredCameras : cameras}
            section={selectedSection as Section}
            gridSize={gridSize}
            setCameras={setCameras}
          />
        )}
      </div>
      <CameraGridSize onReduceColumns={reduceColumns} onAddColumns={addColumns} gridSize={gridSize} />
    </div>
  );
};

export default Cameras;
