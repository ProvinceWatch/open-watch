import React from "react";
import { FC, useState } from 'react';
import { Alert, Button, Modal } from "flowbite-react";
import { HiEye } from 'react-icons/hi'
import { GoAlert } from 'react-icons/go';

interface WeatherAlertProps {
  title: string;
  infoStr: string | null;
  url: string;
  startTime: number;
  timeText: string;
}

const WeatherAlert: FC<WeatherAlertProps> = ({ title, infoStr, url, startTime, timeText }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Modal show={modalOpen} onClose={() => setModalOpen(false)} size="4xl">
        <Modal.Header>{title} - {startTime > 0 ? new Date(startTime * 1000).toDateString() : timeText}</Modal.Header>
        <Modal.Body>
          <Alert color="red">
            <span className="font-bold">Alert Message:</span>
            <br />
            {infoStr}
          </Alert>
        </Modal.Body>
      </Modal>
      <Alert
        style={{ width: '100%' }}
        className='mt-2'
        color="red"
        icon={GoAlert}
      >
        <h3 className="text-md font-medium text-black-700 dark:text-black-800">
          <span className="font-bold">{title}</span> <br /> {startTime > 0 ? new Date(startTime * 1000).toDateString() : timeText}
        </h3>
        <HiEye size={20} onClick={() => { setModalOpen(true) }} className="mt-2"/>
      </Alert>
    </>
  );
};

export default WeatherAlert;
