"use client"

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
    if (typeof window !== "undefined") {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }
  }, [open]);


  if (!open) {
    return null;
  } else {
    return (
      <Modal
        dismissible
        show={open}
        onClose={onClose}
        className='rounded'
      >
        <div tabIndex={-1}>

          <Modal.Header className='text-center'>
            {selectedCamera.Name || "N/A"}
          </Modal.Header>
          <Modal.Body style={{ color: 'black' }}>
            <img src={selectedCamera.Url} alt="Camera Snapshot" className='rounded'/>
            <div className="flex">
              <Toast className='ml-2 mt-2'>
                <FaLocationArrow className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                <div className="pl-4 text-sm font-bold">
                  {selectedCamera.Description || "N/A"}
                </div>
              </Toast>
              <Toast className='mr-2 mt-2'>
                <FaDirections className="h-7 w-7 text-blue-600 dark:text-blue-500" />
                <div className="pl-4 text-sm font-bold">
                  {selectedCamera.DirectionOfTravel || "N/A"}
                </div>
              </Toast>
            </div>


            <div className="flex">
              <Toast className='ml-2 mt-2'>
                <FaRoad className="h-7 w-7 text-blue-600 dark:text-blue-500" />
                <div className="pl-4 text-sm font-bold">
                  {selectedCamera.RoadwayName || "N/A"}
                </div>
              </Toast>
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
            </div>

            <div className="flex">
              <Toast className='ml-2 mt-2'>
                <FaTemperatureHigh className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                <div className="pl-4 text-sm font-bold">
                  {selectedCamera.AirTemperature || "N/A"}
                </div>
              </Toast>
              <Toast className='mr-2 mt-2'>
                <WiHumidity className="h-7 w-7 text-blue-600 dark:text-blue-500" />
                <div className="pl-4 text-sm font-bold">
                  {selectedCamera.RelativeHumidity || "N/A"}
                </div>
              </Toast>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    );
  }
};

export default CameraModal;
