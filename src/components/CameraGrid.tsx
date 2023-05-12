import React, { useState } from 'react';
import { CameraData } from '@/app/map/defs';
import { useSortedCameras } from '@/app/cameras/sort';
import Modal from '@/components/Modal';

type Section = 'alberta-highways' | 'calgary-cameras' | 'edmonton-cameras' | 'banff-cameras';

interface CameraGridProps {
  section: Section;
  gridSize: string;
}

const CameraGrid: React.FC<CameraGridProps> = ({ section, gridSize }) => {
  const cameras = useSortedCameras();
  const [selectedCamera, setSelectedCamera] = useState<CameraData | null>(null);

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
        <div key={index} className="border border-gray-300 rounded p-4" onClick={() => setSelectedCamera(camera)}>
          <h3 className="text-lg font-semibold mb-2">{cameraName(camera)}</h3>
          <img src={camera.Url} alt="Camera Snapshot" className="w-full h-auto" />
        </div>
      ))}
      {selectedCamera && (
        <Modal open={Boolean(selectedCamera)} onClose={() => setSelectedCamera(null)}>
          <h2>{selectedCamera.Name}</h2>
          <img src={selectedCamera.Url} alt="Camera Snapshot" className="w-full h-auto my-4 max-h-screen" />
          {selectedCamera.Latitude && <p>Latitude: {selectedCamera.Latitude}</p>}
          {selectedCamera.Longitude && <p>Longitude: {selectedCamera.Longitude}</p>}
          {selectedCamera.AirTemperature && <p>Air Temperature: {selectedCamera.AirTemperature}</p>}
          {selectedCamera.Name && <p>Name: {selectedCamera.Name}</p>}
          {selectedCamera.PavementTemperature && <p>Pavement Temperature: {selectedCamera.PavementTemperature}</p>}
          {selectedCamera.RelativeHumidity && <p>Relative Humidity: {selectedCamera.RelativeHumidity}</p>}
          {selectedCamera.RoadwayName && <p>Roadway Name: {selectedCamera.RoadwayName}</p>}
          {selectedCamera.WindDirection && <p>Wind Direction: {selectedCamera.WindDirection}</p>}
          {selectedCamera.WindSpeed && <p>Wind Speed: {selectedCamera.WindSpeed}</p>}
        </Modal>
      )}
    </div>
  );
};

export default CameraGrid;