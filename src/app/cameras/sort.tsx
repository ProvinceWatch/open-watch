// sort.tsx
import { CameraData } from '@/app/map/defs';
import { Section, BOUNDARIES } from '@/app/cameras/defs';

export function sortCameras(cameraData: CameraData[]): Record<Section, CameraData[]> {
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

  return categorizedCameras;
}
