import { CameraData } from '@/app/map/defs';
import React, { useEffect } from 'react';
import { Modal, Toast } from 'flowbite-react';
import {
  FaCamera, FaLocationArrow, FaDirections,
  FaRoad, FaWind, FaTemperatureHigh
} from 'react-icons/fa';

import { WiHumidity } from 'react-icons/wi'

interface ModalProps {
  open: boolean;
  onClose: () => void;
  selectedCamera: CameraData;
}

const CameraModal: React.FC<ModalProps> = ({ open, onClose, selectedCamera }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);


  if (!open) {
    return null;
  } else {
    return (
      <Modal
        dismissible={true}
        show={open}
        onClose={onClose}>
        <Modal.Body style={{ color: 'black' }}>
          <img src={selectedCamera.Url} alt="Camera Snapshot" style={{borderRadius: '10px', boxShadow: '2px 2px 2px 2px lightgrey'}}/>
          <div className="flex">
            <Toast className='mr-2 mt-2'>
              <FaCamera className="h-7 w-7 text-blue-600 dark:text-blue-100" />
              <div className="pl-4 text-sm font-bold">
                {selectedCamera.Name || "N/A"}
              </div>
            </Toast>
            <Toast className='ml-2 mt-2'>
              <FaLocationArrow className="h-5 w-5 text-blue-600 dark:text-blue-500" />
              <div className="pl-4 text-sm font-bold">
                {selectedCamera.Description || "N/A"}
              </div>
            </Toast>
          </div>


          <div className="flex">
            <Toast className='mr-2 mt-2'>
              <FaDirections className="h-7 w-7 text-blue-600 dark:text-blue-500" />
              <div className="pl-4 text-sm font-bold">
                {selectedCamera.DirectionOfTravel || "N/A"}
              </div>
            </Toast>
            <Toast className='ml-2 mt-2'>
              <FaRoad className="h-7 w-7 text-blue-600 dark:text-blue-500" />
              <div className="pl-4 text-sm font-bold">
                {selectedCamera.RoadwayName || "N/A"}
              </div>
            </Toast>
          </div>

          <div className="flex">
            <Toast className='mr-2 mt-2'>
              <FaWind className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              <div className="pl-4 text-sm font-bold">
                {
                  selectedCamera.WindDirection && selectedCamera.WindSpeed ?
                    `${selectedCamera.WindSpeed} ${selectedCamera.WindDirection}`
                    : "N/A"
                }
              </div>
            </Toast>
            <Toast className='ml-2 mt-2'>
              <FaTemperatureHigh className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              <div className="pl-4 text-sm font-bold">
                {selectedCamera.AirTemperature || "N/A"}
              </div>
            </Toast>
          </div>

          <div className="flex">
            <Toast className='mr-2 mt-2'>
              <WiHumidity className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              <div className="pl-4 text-sm font-bold">
                {selectedCamera.RelativeHumidity || "N/A"}
              </div>
            </Toast>

          </div>
        </Modal.Body>
      </Modal>
    );
  }
};

export default CameraModal;
