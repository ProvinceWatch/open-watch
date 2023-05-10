import { FC } from "react";
import { Card } from "flowbite-react";

interface ControlCardProps {

};

const ControlCard: FC<ControlCardProps> = () => {
  return (<Card style={{ width: '400px' }}>
    <ul className="my-2 space-y-3">
      <li>
        <a href="#" className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
          <span className="ml-3 flex-1 whitespace-nowrap">
            Road Conditions
          </span>
        </a>
      </li>
      <li>
        <a href="#" className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
          <span className="ml-3 flex-1 whitespace-nowrap">
            Traffic Monitoring
          </span>
        </a>
      </li>
      <li>
        <a href="#" className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
          <span className="ml-3 flex-1 whitespace-nowrap">
            Traffic Cameras
          </span>
        </a>
      </li>
      <li>
        <a href="#" className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
          <span className="ml-3 flex-1 whitespace-nowrap">
            Weather Reports
          </span>
        </a>
      </li>
    </ul>
  </Card>
  );
};

export default ControlCard;