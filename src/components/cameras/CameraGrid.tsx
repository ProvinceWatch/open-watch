import React, { useState, useEffect, useRef } from 'react';
import Pagination from '../Pagination'; // Adjust the import path based on your actual file structure
import { CameraData } from '@/app/map/defs';
import { sortCameras } from '@/app/cameras/sort';
import { Section } from '@/app/cameras/defs';
import CameraModal from '@/components/cameras/CameraModal';
import { Spinner } from 'flowbite-react';

interface CameraGridProps {
  section: Section;
  gridSize: string;
}

const CameraGrid: React.FC<CameraGridProps> = ({ section, gridSize }) => {
  const [cameras, setCameras] = useState<Record<Section, CameraData[]>>({
    'calgary-cameras': [],
    'edmonton-cameras': [],
    'banff-cameras': [],
    'alberta-highways': [],
  });
  const [selectedCamera, setSelectedCamera] = useState<CameraData | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; 

  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLoadedImages({});
    if (gridRef.current) {
      gridRef.current.scrollTo(0, 0);
    }
  }, [section]);

  useEffect(() => {
    const fetchAndSortCameras = async () => {
      try {
        const res: any = await fetch('/map/cameras');
        const cameraResponse = await res.json();
        const cameraData: CameraData[] = (cameraResponse.data as any) as CameraData[];
        const sortedCameras = sortCameras(cameraData);
        setLoadedImages({});
        setCameras(sortedCameras);
      } catch (error) {
        console.error('Failed to fetch and sort camera data:', error);
      }
    };
    fetchAndSortCameras();
  }, []);

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

  const cameraName = (camera: CameraData) => {
    if (camera.Name && camera.Name !== 'N/A') {
      return camera.Name;
    } else if (camera.RoadwayName) {
      return camera.RoadwayName;
    } else {
      return 'N/A';
    }
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
  <div className='flex flex-col'>
    <div ref={gridRef} className={`grid ${gridSize} gap-4 pl-10 text-black overflow-auto flex-grow`}>
      {getCurrentPageCameras().map((camera, index) => (
        <div
          key={index}
          className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          onClick={() => setSelectedCamera(camera)}
        >
          {!loadedImages[camera.Url] ? (
            <div role="status" className="relative w-full aspect-[1/1]">
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner size="xl" />
              </div>
            </div>
          ) : null}
          <img
            style={{ display: loadedImages[camera.Url] ? 'block' : 'none' }}
            className="rounded-t-lg w-full h-auto"
            src={camera.Url}
            alt="Camera Snapshot"
            onLoad={() => setLoadedImages((prev) => ({ ...prev, [camera.Url]: true }))}
          />
          {loadedImages[camera.Url] && (
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{cameraName(camera)}</h5>
              </a>
            </div>
          )}
        </div>
      ))}
      {selectedCamera && <CameraModal open={!!selectedCamera} onClose={() => setSelectedCamera(null)} selectedCamera={selectedCamera} />}
    </div>
    {Math.ceil(cameras[section].length) !== 0 && (
      <div className="sticky bottom-0 z-5">
        <Pagination currentPage={currentPage} totalPages={Math.ceil(cameras[section].length / itemsPerPage)} onPrevPage={handlePrevPage} onNextPage={handleNextPage} />
      </div>
    )}
  </div>
);

};

export default CameraGrid;
