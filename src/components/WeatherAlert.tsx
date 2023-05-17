import { FC } from 'react';
import { Alert, Accordion } from "flowbite-react";
import React from "react";
import { HiInformationCircle, HiEye } from 'react-icons/hi'
import {GoAlert} from 'react-icons/go';

interface WeatherAlertProps {
  title: string;
  infoStr: string;
  url: string;
}

const WeatherAlert: FC<WeatherAlertProps> = ({ title, infoStr, url }) => {

  const navigateToURL = () => {
    window.open(url, '_blank');
  };

  return (
    <Alert
      style={{ width: '100%' }}
      className='mt-2'
      color="info"
      additionalContent={
        <React.Fragment>
          <div className="mt-2 mb-2 text-xs text-blue-700 dark:text-blue-800" />
          <div className="flex">
            <button type="button" className="mr-2 inline-flex items-center rounded-lg bg-red-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-800 dark:hover:bg-red-900" onClick={navigateToURL}>
              <HiEye className="-ml-0.5 mr-2 h-4 w-4" />
              View more
            </button>
          </div>
        </React.Fragment>}
      icon={GoAlert}
    >
      <h3 className="text-md font-medium text-blue-700 dark:text-blue-800">
        {title}
      </h3>
    </Alert>

  );
};

export default WeatherAlert;
