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
    <Accordion style={{ width: '100%'}}>
      <Accordion.Panel color="failure">
        <Accordion.Title style={{ height: '20px', lineHeight: '20px' }}>
          <h3 className="text-md font-medium text-red-700 dark:text-red-800">
            {title}
          </h3>
        </Accordion.Title>
        <Accordion.Content style={{margin: '0', padding: '0'}}>
          <Alert color="failure" rounded={true}>
            <div className=" text-xs text-red-700 dark:text-red-200" dangerouslySetInnerHTML={{ __html: infoStr }} />
          </Alert>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
};

export default WeatherAlert;
