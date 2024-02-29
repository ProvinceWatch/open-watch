import { Sidebar } from "flowbite-react";
import { FC } from "react";
import {FiAlertCircle} from "react-icons/fi";
import WeatherAlert from "../WeatherAlert";

import { ABAlert } from '@/app/api/ab-alerts/types';
import { Feature } from '@/app/api/can-weather-alerts/types';

interface AlertsPanelProps {
  canadaWeatherAlerts: Feature[],
  albertaAlerts: ABAlert[]
}

const AlertsPanel: FC<AlertsPanelProps> = ({ canadaWeatherAlerts, albertaAlerts }) => {
  return (
    <>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={FiAlertCircle} label={canadaWeatherAlerts.length + albertaAlerts.length}>
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <span>Alerts</span>
              </div>
            </div>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      <div style={{ overflowY: 'scroll', scrollbarWidth: 'none', scrollbarColor: 'lightgray darkgray', maxHeight: '13.5%' }}>
        {albertaAlerts.map((alert: ABAlert, i: any) => (
          <WeatherAlert title={alert.Message} infoStr={alert.Notes} url={"yes"} key={`e-${i}`} startTime={alert.StartTime} timeText='' />
        ))}
        {canadaWeatherAlerts.map((feature: Feature, i: any) => (
          <WeatherAlert infoStr={feature.properties.alerts[0].text} title={feature.properties.name + " - " + feature.properties.alerts[0].alertBannerText} key={`w-${i}`} url={"https://weather.gc.ca/airquality/pages/provincial_summary/ab_e.html"} startTime={0} timeText={feature.properties.alerts[0].issueTimeText} />
        ))}
      </div>
    </>
  );
};

export default AlertsPanel;