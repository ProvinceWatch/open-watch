import { FC } from "react";
import { Card } from "flowbite-react";

interface ControlCardProps {
  WeatherAlerts: any
};

const ControlCard: FC<ControlCardProps> = ({ WeatherAlerts }) => {
  return (<Card style={{ width: '100%' }}>
    <ul className="my-2 space-y-3">
      <li>
        <a href="#" className="group flex items-center rounded-lg bg-gray-200 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
          <span className="ml-3 flex-1 whitespace-nowrap">
            Road Conditions
          </span>
        </a>
      </li>
      <li>
        <a href="#" className="group flex items-center rounded-lg bg-gray-200 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
          <span className="ml-3 flex-1 whitespace-nowrap">
            Traffic Monitoring
          </span>
        </a>
      </li>
      <li>
        <a href="#" className="group flex items-center rounded-lg bg-gray-200 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
          <span className="ml-3 flex-1 whitespace-nowrap">
            Traffic Cameras
          </span>
        </a>
      </li>
      <li>
        <a href="#" className="group flex items-center rounded-lg bg-gray-200 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
          <span className="ml-3 flex-1 whitespace-nowrap">
            Weather Reports
          </span>
        </a>
      </li>
    </ul>
    <h4 className="text-black" style={{ textAlign: 'center', fontWeight: 'bold' }}>
      Notices and Alerts
    </h4>
    {WeatherAlerts}
  </Card>
  );
};

export default ControlCard;