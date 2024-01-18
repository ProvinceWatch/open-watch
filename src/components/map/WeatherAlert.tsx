import React from "react";
import { FC } from 'react';
import { Alert } from "flowbite-react";
import { HiEye } from 'react-icons/hi'
import {GoAlert} from 'react-icons/go';

interface WeatherAlertProps {
  title: string;
  infoStr: string;
  url: string;
  startTime: number;
  timeText: string;
}

const WeatherAlert: FC<WeatherAlertProps> = ({ title, infoStr, url, startTime, timeText }) => {
  return (
    <Alert
      style={{ width: '100%' }}
      className='mt-2'
      color="warning"
      icon={GoAlert}
    >
      <h3 className="text-md font-medium text-black-700 dark:text-black-800">
        {title} - {startTime > 0 ? new Date(startTime * 1000).toDateString() : timeText}
      </h3>
    </Alert>
  );
};

export default WeatherAlert;
