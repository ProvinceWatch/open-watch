import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { CameraData, CameraResponse } from '@/app/map/defs';

const CameraGrid: React.FC = () => {
  const [cameras, setCameras] = useState<CameraData[]>([]);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const cameraResponse: AxiosResponse<CameraResponse> = await axios.get('/map/cameras');
        const cameraData: CameraData[] = (cameraResponse.data.data as any) as CameraData[];
        setCameras(cameraData);
      } catch (error) {
        console.error('Failed to fetch camera data:', error);
      }
    };

    fetchCameras();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-black">
      {cameras.map((camera, index) => (
        <div key={index} className="border border-gray-300 rounded p-4">
          <h3 className="text-lg font-semibold mb-2">
            Camera at Latitude: {camera.Latitude}, Longitude: {camera.Longitude}
          </h3>
          <img src={camera.Url} alt="Camera Snapshot" className="w-full h-auto" />
        </div>
      ))}
    </div>
  );
};

export default CameraGrid;
