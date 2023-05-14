import { FC } from 'react';
import { Alert, Accordion } from "flowbite-react";
import React from "react";
import { HiInformationCircle, HiEye } from 'react-icons/hi'

interface WeatherAlertProps {
  title: string;
  infoStr: string;
  url: string;
}

const WeatherAlert: FC<WeatherAlertProps> = ({ title, infoStr, url }) => {
  return (
    <Alert
      style={{ width: '100%' }}
      className='mt-2'
      color="info"
      additionalContent={
        <React.Fragment>
          <div className="mt-2 mb-2 text-xs text-blue-700 dark:text-blue-800" />
          <div className="flex">
            <button type="button" className="mr-2 inline-flex items-center rounded-lg bg-blue-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-900">
              <HiEye className="-ml-0.5 mr-2 h-4 w-4" />
              View more
            </button>
            <button type="button" className="rounded-lg border border-blue-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:ring-4 focus:ring-blue-300 dark:border-blue-800 dark:text-blue-800 dark:hover:text-white">
              Dismiss
            </button>
          </div>
        </React.Fragment>}
      icon={HiInformationCircle}
    >
      <h3 className="text-md font-medium text-blue-700 dark:text-blue-800">
        {title}
      </h3>
    </Alert>

  );
};

export default WeatherAlert;
