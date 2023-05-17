import React, { useState } from 'react';
import { CameraData } from '@/app/map/defs';
import { useSortedCameras } from '@/app/cameras/sort';
import CameraModal from '@/components/CameraModal';

export type Section = 'alberta-highways' | 'calgary-cameras' | 'edmonton-cameras' | 'banff-cameras';

interface CameraGridProps {
  section: Section;
  gridSize: string;
}

const CameraGrid: React.FC<CameraGridProps> = ({ section, gridSize }) => {
  const cameras = useSortedCameras();
  const [selectedCamera, setSelectedCamera] = useState<CameraData | null>(null); // null when no camera is selected

  const cameraName = (camera: CameraData) => {
    if (camera.Name) {
      return camera.Name;
    } else if (camera.RoadwayName) {
      return camera.RoadwayName;
    } else {
      return `Camera at Latitude: ${camera.Latitude}, Longitude: ${camera.Longitude}`;
    }
  };

  return (
    <div className={`grid ${gridSize} gap-4 text-black overflow-auto max-h-screen`}>
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
        <CameraModal open={!!selectedCamera} onClose={() => setSelectedCamera(null)} selectedCamera={selectedCamera}/>
      )}
    </div>
  );
}

export default CameraGrid;
