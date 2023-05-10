import { FC } from 'react';
import { Alert, } from "flowbite-react";
import React from "react";

interface WeatherAlertProps {
    title: string;
    infoStr: string;
    url: string;
}


const WeatherAlert: FC<WeatherAlertProps> = ({ title, infoStr, url }) => {
    return (<Alert
        style={{ width: '400px', marginTop: '2%' }}
        color="failure"
        rounded={true}
        additionalContent={
            <React.Fragment>
                <div className="mt-2 mb-4 text-sm text-red-700 dark:text-red-800">More info about this info alert goes here. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.
                </div>
                <div className="flex">
                    <button type="button" className="mr-2 inline-flex items-center rounded-lg bg-red-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-800 dark:hover:bg-red-900">
                        View more
                    </button>
                    <button type="button" className="rounded-lg border border-red-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-red-700 hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-300 dark:border-red-800 dark:text-red-800 dark:hover:text-white">
                        Dismiss</button>
                </div>
            </React.Fragment>}
    >
        <h3 className="text-lg font-medium text-red-700 dark:text-red-800">
            This is a weather alert
        </h3>
    </Alert>);
};

export default WeatherAlert;