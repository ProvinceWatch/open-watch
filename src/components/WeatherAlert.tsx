import { FC } from 'react';
import { Alert, } from "flowbite-react";
import React from "react";

interface WeatherAlertProps {
  title: string;
  infoStr: string;
  url: string;
}

const WeatherAlert: FC<WeatherAlertProps> = ({ title, infoStr, url }) => {
  return (
    <Alert
      style={{ width: '100%', marginTop: '2%' }}
      color="failure"
      rounded={true}
      additionalContent={
        <React.Fragment>
          <div className="mt-2 mb-4 text-xs text-red-700 dark:text-red-200" dangerouslySetInnerHTML={{ __html: infoStr }} />
        </React.Fragment>}>
      <h3 className="text-lg font-medium text-red-700 dark:text-red-800">
        {title}
      </h3>
    </Alert>
  );
};

export default WeatherAlert;