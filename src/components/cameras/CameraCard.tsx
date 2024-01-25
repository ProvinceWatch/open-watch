import React, { useState, useEffect } from 'react';
import { Card, Spinner } from 'flowbite-react';
import { CameraData } from '@/app/map/defs';

interface CameraCardProps {
  camera: CameraData;
  onSelect: (camera: CameraData) => void;
  columns: number;
}

const CameraCard: React.FC<CameraCardProps> = ({ camera, onSelect, columns }) => {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true);

    // timeout to stop infinite spinners
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 3000); 
    
    return () => clearTimeout(timer); 
  }, [camera.Url]);


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

  const calculateTextSize = () => {
    switch (columns) {
      case 1:
        return 'text-3xl lg:text-4xl';
      case 2:
        return 'text-2xl';
      case 3:
        return 'text-xl';
      case 4: 
        return 'text-lg';
      case 5:
        return 'text-md';
      default:
        return 'text-lg lg:text-xl';
    }
  };

  return (
    <Card
      className={`w-full 'h-screen' bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
      onClick={handleSelect}
    >
      {loading && ( 
        <div role="status" className="relative w-full h-full aspect-[1/1]">
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        </div>
      )}
      <img
        style={{ display: loading ? 'none' : 'block' }} 
        className={`rounded-t-lg w-full h-full transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`} // Inverted opacity values
        src={camera.Url}
        alt="Camera Snapshot"
        onLoad={() => setLoading(false)} 
      />
      {!loading && (
        <div className={`p-2 opacity-100 ${calculateTextSize()}`}>
          <a href="#">
            <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{cameraName()}</h5>
          </a>
        </div>
      )}
    </Card>
  );
};

export default CameraCard;
