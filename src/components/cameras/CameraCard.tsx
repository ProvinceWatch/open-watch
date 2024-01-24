import React, { useState, useEffect } from 'react';
import { Card, Spinner } from 'flowbite-react';
import { CameraData } from '@/app/map/defs';

interface CameraCardProps {
  camera: CameraData;
  onSelect: (camera: CameraData) => void;
}

const CameraCard: React.FC<CameraCardProps> = ({ camera, onSelect }) => {
  const [loadedImage, setLoadedImage] = useState(false);

  const handleSelect = () => {
    onSelect(camera);
  };

  const cameraName = () => {
    if (camera.Name && camera.Name !== 'N/A') {
      return camera.Name;
    } else if (camera.RoadwayName) {
      return camera.RoadwayName;
    } else {
      return 'N/A';
    }
  };

  return (
    <Card
      className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      onClick={handleSelect}
    >
      {!loadedImage ? (
        <div role="status" className="relative w-full aspect-[1/1]">
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        </div>
      ) : null}
      <img
        style={{ display: loadedImage ? 'block' : 'none' }}
        className="rounded-t-lg w-full h-auto"
        src={camera.Url}
        alt="Camera Snapshot"
        onLoad={() => setLoadedImage(true)}
      />
      {loadedImage && (
        <div className="p-2">
          <a href="#">
            <h5 className="mb-2 text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{cameraName()}</h5>
          </a>
        </div>
      )}
    </Card>
  );
};

export default CameraCard;
