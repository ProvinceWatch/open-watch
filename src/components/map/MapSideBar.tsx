import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { TextInput, ListGroup, Toast, Button } from "flowbite-react";
import { FiAlertCircle } from "react-icons/fi";
import WeatherAlert from "@/components/map/WeatherAlert";
import { SideBar } from '@/components/SideBar';

interface MapSideBarProps {
}

interface Alert {
  Message: string,
  Notes: string,
}

const MapSideBar = forwardRef<{}, MapSideBarProps>((props: MapSideBarProps, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [moreAlerts, setMoreAlerts] = useState([]);

  useEffect(() => {
    getWeatherAlerts();
    getWeatherWarnings();
  }, []);

  const getWeatherAlerts = async () => {
    await fetch('/map/emergency-alerts')
      .then(async (res) => {
        const json = await res.json();
        const alertsResp = json.data;
        const alerts = alertsResp.map((alert: Alert, i: Number) => {
          return <WeatherAlert title={alert.Message} infoStr={alert.Notes} url={"yes"} key={`e-${i}`} />
        });
        setWeatherAlerts(alerts);
      });
  };

  const getWeatherWarnings = async () => {
    await fetch('/map/weather-alerts')
      .then(async (res) => {
        const json = await res.json();
        const alertsResp = json.data.features;
        const alerts = alertsResp.map((alert: any, i: Number) => {
          return <WeatherAlert title={alert.properties.name + " - " + alert.properties.alerts[0].alertBannerText} key={`w-${i}`} infoStr={alert.properties.alerts[0].zoneName} url={"https://weather.gc.ca/airquality/pages/provincial_summary/ab_e.html"} />
        });

        setMoreAlerts(alerts);
      });
  };

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useImperativeHandle(ref, () => ({
    handleToggleSidebar,
  }));

  return (
    <SideBar handleToggleSidebar={handleToggleSidebar} isOpen={isOpen} pt={1}>
      <div id='control-bar' className='mt-8' style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <form className="flex flex-col">
          <div style={{ marginBottom: '2%' }}>
            <TextInput
              id="text"
              type="text"
              placeholder="Search for city in Alberta"
              required={true}
              style={{ width: '100%' }}
            />
          </div>
        </form>
        <div>
          <ListGroup>
            <ListGroup.Item>
              Road Conditions
            </ListGroup.Item>
            <ListGroup.Item>
              Traffic
            </ListGroup.Item>
            <ListGroup.Item>
              Cameras
            </ListGroup.Item>
            <ListGroup.Item>
              Weather
            </ListGroup.Item>
          </ListGroup>
        </div>
        <Toast className="mt-2">
          <FiAlertCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
          <div className="pl-4 text-sm font-bold">
            Emergency & Weather Alerts
          </div>
        </Toast>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {weatherAlerts}
          {moreAlerts}
        </div>
      </div>
    </SideBar>
  );
});

MapSideBar.displayName = "Map Sidebar";
export default MapSideBar;