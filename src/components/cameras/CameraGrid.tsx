import React, { useState, useEffect } from 'react';
import { CameraData } from '@/app/map/defs';
import { sortCameras } from '@/app/cameras/sort';
import { Section } from '@/app/cameras/defs';
import CameraModal from '@/components/cameras/CameraModal';

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
  const [selectedCamera, setSelectedCamera] = useState<CameraData | null>(null); // null when no camera is selected

  useEffect(() => {
    const fetchAndSortCameras = async () => {
      try {
        const res: any = await fetch('/map/cameras');
        const cameraResponse = await res.json();
        let cameraData: CameraData[] = (cameraResponse.data as any) as CameraData[];
    
        // Sort the cameras so the ones with Status "Disabled" are at the end
        const sortedCameras = sortCameras(cameraData);
    
        setCameras(sortedCameras);
      } catch (error) {
        console.error('Failed to fetch and sort camera data:', error);
      }
    };
    

    fetchAndSortCameras();
    const intervalId = setInterval(fetchAndSortCameras, 5 * 60 * 1000); // Fetch new data every 5 minutes

    return () => {
      clearInterval(intervalId); // Clear the interval when the component is unmounted
    };
  }, []);

  const cameraName = (camera: CameraData) => {
    if (camera.Name && camera.Name !== "N/A") {
      return camera.Name;
    } else if (camera.RoadwayName) {
      return camera.RoadwayName;
    } else {
      return `Latitude: ${camera.Latitude}, Longitude: ${camera.Longitude}`;
    }
  };

  return (
    <div className={`grid ${gridSize} gap-4 px-3 text-black overflow-auto max-h-screen`}>
      {cameras[section].map((camera, index) => (
        <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" onClick={() => setSelectedCamera(camera)}>
          <a href="#">
            <img className="rounded-t-lg w-full h-auto" src={camera.Url} alt="Camera Snapshot" />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{cameraName(camera)}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Camera details...</p>
          </div>
        </div>
      ))}
      {selectedCamera && (
        <CameraModal open={!!selectedCamera} onClose={() => setSelectedCamera(null)} selectedCamera={selectedCamera} />
      )}
    </div>
  );
}

export default CameraGrid;
