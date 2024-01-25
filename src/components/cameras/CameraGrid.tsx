import React, { useState, useEffect, useRef } from 'react';
import Pagination from '../Pagination'; // Adjust the import path based on your actual file structure
import { CameraData } from '@/app/map/defs';
import { sortCameras } from '@/app/cameras/sort';
import { Section } from '@/app/cameras/defs';
import CameraModal from '@/components/cameras/CameraModal';
import { Spinner } from 'flowbite-react';
import CameraCard from './CameraCard'; // Adjust the import path based on your actual file structure

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
  const itemsPerPage = 6;

  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLoadedImages({});
    if (gridRef.current) {
      gridRef.current.scrollTo(0, 0);
    }
    setCurrentPage(1);
  }, [section]);

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
      {Math.ceil(cameras[section].length / itemsPerPage) >= 1 && (
        <div className="ml-10 md:ml-0 mb-4">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(cameras[section].length / itemsPerPage)}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            onGoToBeginning={handleGoToBeginning}
            onGoToLast={handleGoToLast} />
        </div>
      )}
      <div ref={gridRef} className={`grid ${gridSize} gap-4 pl-10 text-black flex-grow w-full max-w-screen-lg`}>
        {getCurrentPageCameras().map((camera, index) => (
          <CameraCard key={index} camera={camera} onSelect={handleCardSelect} />
        ))}
        {selectedCamera && <CameraModal open={!!selectedCamera} onClose={() => setSelectedCamera(null)} selectedCamera={selectedCamera} />}
      </div>
    </div>
  );
};

export default CameraGrid;
