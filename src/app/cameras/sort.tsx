import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { CameraData, CameraResponse } from '@/app/map/defs';
import { Section } from '@/components/cameras/CameraGrid';

const BOUNDARIES = {
  'calgary-cameras': { latMin: 50.8345, latMax: 51.19477, lonMin: -114.2705, lonMax: -113.79533 },
  'edmonton-cameras': { latMin: 53.39612, latMax: 53.66752, lonMin: -113.7123, lonMax: -113.2454 },
  'banff-cameras': { latMin: 51.0279, latMax: 51.5040, lonMin: -116.3205, lonMax: -115.10374 },
  'alberta-highways': { latMin: 49, latMax: 60, lonMin: -120, lonMax: -110 },
};

export function useSortedCameras() {
  const [cameras, setCameras] = useState<{
    [key in 'calgary-cameras' | 'edmonton-cameras' | 'banff-cameras' | 'alberta-highways']: CameraData[];
  }>({
    'calgary-cameras': [],
    'edmonton-cameras': [],
    'banff-cameras': [],
    'alberta-highways': [],
  });

  useEffect(() => {
    const fetchAndSortCameras = async () => {
      try {
        const res: any = await fetch('/map/cameras');
        const cameraResponse = await res.json();
        let cameraData: CameraData[] = (cameraResponse.data as any) as CameraData[];

        // Sort the cameras so the ones with Status "Disabled" are at the end
        cameraData = cameraData.sort((a, b) => (a.Status === "Disabled" ? 1 : -1));

        const categorizedCameras: Record<Section, CameraData[]> = {
            'calgary-cameras': [],
            'edmonton-cameras': [],
            'banff-cameras': [],
            'alberta-highways': [],
          };

        for (const camera of cameraData) {
          for (const section in BOUNDARIES) {
            const { latMin, latMax, lonMin, lonMax } = BOUNDARIES[section as Section];
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
        console.error('Failed to fetch and sort camera data:', error);
      }
    };

    fetchAndSortCameras();
    const intervalId = setInterval(fetchAndSortCameras, 5 * 60 * 1000); // Fetch new data every 5 minutes

    return () => {
      clearInterval(intervalId); // Clear the interval when the component is unmounted
    };
  }, []);

  return cameras;
}
