import React from 'react';
import { CameraData } from '@/app/map/defs';
import { useSortedCameras } from '@/app/cameras/sort';

type Section = 'alberta-highways' | 'calgary-cameras' | 'edmonton-cameras' | 'banff-cameras';

interface CameraGridProps {
  section: Section;
  gridSize: string;
}

const CameraGrid: React.FC<CameraGridProps> = ({ section, gridSize }) => {
  const cameras = useSortedCameras();

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
        <div key={index} className="border border-gray-300 rounded p-4">
          <h3 className="text-lg font-semibold mb-2">{cameraName(camera)}</h3>
          <img src={camera.Url} alt="Camera Snapshot" className="w-full h-auto" />
        </div>
      ))}
    </div>
  );
}  

export default CameraGrid;
