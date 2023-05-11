// CameraGrid.tsx
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { CameraData, CameraResponse } from '@/app/map/defs';

type Section = 'alberta-highways' | 'calgary-cameras' | 'edmonton-cameras' | 'banff-cameras';

const BOUNDARIES = {
  'calgary-cameras': { latMin: 50.8345, latMax: 51.19477, lonMin: -114.2705, lonMax: -113.79533 },
  'edmonton-cameras': { latMin: 53.39612, latMax: 53.66752, lonMin: -113.7123, lonMax: -113.2454 },
  'banff-cameras': { latMin: 51.0279, latMax: 51.5040, lonMin: -116.3205, lonMax: -115.10374 },
  'alberta-highways': { latMin: 49, latMax: 60, lonMin: -120, lonMax: -110 },
};

interface CameraGridProps {
  section: Section;
  gridSize: string;
}

const CameraGrid: React.FC<CameraGridProps> = ({ section, gridSize }) => {
  const [cameras, setCameras] = useState<{
    [key in Section]: CameraData[];
  }>({
    'calgary-cameras': [],
    'edmonton-cameras': [],
    'banff-cameras': [],
    'alberta-highways': [],
  });

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const cameraResponse: AxiosResponse<CameraResponse> = await axios.get('/map/cameras');
        const cameraData: CameraData[] = (cameraResponse.data.data as any) as CameraData[];

        const categorizedCameras = {
          'calgary-cameras': [],
          'edmonton-cameras': [],
          'banff-cameras': [],
          'alberta-highways': [],
        };

        for (const camera of cameraData) {
          for (const section in BOUNDARIES) {
            const { latMin, latMax, lonMin, lonMax } = BOUNDARIES[section];
            if (
              camera.Latitude >= latMin &&
              camera.Latitude <= latMax &&
              camera.Longitude >= lonMin &&
              camera.Longitude <= lonMax
            ) {
              categorizedCameras[section as Section].push(camera);
              break;
            }
          }
        }

        setCameras(categorizedCameras);
      } catch (error) {
        console.error('Failed to fetch camera data:', error);
      }
    };

    fetchCameras();
  }, []);

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
    <div className={`grid ${gridSize} gap-4 text-black`}>
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
