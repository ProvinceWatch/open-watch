import { FC } from 'react';
import { Alert, Accordion } from "flowbite-react";
import React from "react";

interface WeatherAlertProps {
  title: string;
  infoStr: string;
  url: string;
}

const WeatherAlert: FC<WeatherAlertProps> = ({ title, infoStr, url }) => {
  return (
 
          <Alert color="failure" rounded={true}>
            <h3 style={{fontWeight: 'bold', marginBottom: '8px'}}>{title}</h3>
            <div className=" text-xs text-red-700 dark:text-red-200" dangerouslySetInnerHTML={{ __html: infoStr }} />
          </Alert>
      
  );
};

export default WeatherAlert;
