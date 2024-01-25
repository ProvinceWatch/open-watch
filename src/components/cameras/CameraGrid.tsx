import React, { useState, useEffect, useRef } from 'react';
import Pagination from '../Pagination'; 
import { CameraData } from '@/app/map/defs';
import { Section } from '@/app/cameras/defs';
import CameraModal from '@/components/cameras/CameraModal';
import CameraCard from './CameraCard'; 

interface CameraGridProps {
  cameras: Record<Section, CameraData[]>;
  section: Section;
  gridSize: string;
  setCameras: React.Dispatch<React.SetStateAction<Record<Section, CameraData[]>>>;
}

const CameraGrid: React.FC<CameraGridProps> = ({ cameras, section, gridSize, setCameras }) => {
  const [selectedCamera, setSelectedCamera] = useState<CameraData | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const columns = gridSize.includes('grid-cols-') ? parseInt(gridSize.split('-')[2]) : 3;
  const itemsPerPage = columns === 1 ? 6 : columns * 2;

  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLoadedImages({});
    if (gridRef.current) {
      gridRef.current.scrollTo(0, 0);
    }
    const totalPages = Math.ceil(cameras[section].length / itemsPerPage);
    setCurrentPage(prevPage => (prevPage <= totalPages ? prevPage : 1));
  }, [section, cameras]);

  // Function to get the cameras for the current page
  const getCurrentPageCameras = (): CameraData[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return cameras[section].slice(startIndex, endIndex);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(cameras[section].length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleGoToBeginning = () => {
    setCurrentPage(1);
  };

  const handleGoToLast = () => {
    const totalPages = Math.ceil(cameras[section].length / itemsPerPage);
    setCurrentPage(totalPages);
  };


  const handleCardSelect = (camera: CameraData) => {
    setSelectedCamera(camera);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedCamera) {
        if (event.key === 'ArrowLeft') {
          const currentIndex = cameras[section].indexOf(selectedCamera);
          const newIndex = currentIndex > 0 ? currentIndex - 1 : cameras[section].length - 1;
          setSelectedCamera(cameras[section][newIndex]);
        } else if (event.key === 'ArrowRight') {
          const currentIndex = cameras[section].indexOf(selectedCamera);
          const newIndex = currentIndex < cameras[section].length - 1 ? currentIndex + 1 : 0;
          setSelectedCamera(cameras[section][newIndex]);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCamera, cameras, section]);

  return (
    <div className='flex flex-col items-center'>
      <div className='bg-white dark:bg-gray-800 w-full sticky top-60 md:top-32 z-10'>
        {Math.ceil(cameras[section].length / itemsPerPage) >= 1 && (
          <div className="my-2 ">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(cameras[section].length / itemsPerPage)}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
              onGoToBeginning={handleGoToBeginning}
              onGoToLast={handleGoToLast}
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-center overflow-y-auto flex-grow w-full">
        <div ref={gridRef} className={`grid ${gridSize} gap-4 w-full max-w-screen-lg mt-2`}>
          {getCurrentPageCameras().map((camera, index) => (
            <CameraCard key={index} camera={camera} onSelect={handleCardSelect} columns={columns} />
          ))}
          {selectedCamera && <CameraModal open={!!selectedCamera} onClose={() => setSelectedCamera(null)} selectedCamera={selectedCamera} />}
        </div>
      </div>
    </div>
  );

};

export default CameraGrid;
