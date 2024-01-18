import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { TextInput, ListGroup, Toast, Button, Sidebar } from "flowbite-react";
import { FiAlertCircle } from "react-icons/fi";
import { TbRoad, TbTrafficLights, TbCamera, TbTemperatureCelsius } from "react-icons/tb";
import WeatherAlert from "@/components/map/WeatherAlert";
import { SideBar } from '@/components/SideBar';

interface MapSideBarProps {
}

interface Alert {
  Message: string,
  Notes: string,
  StartTime: number
}

const MapSideBar = forwardRef<{}, MapSideBarProps>((props: MapSideBarProps, ref) => {
  const [isOpen, setIsOpen] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [moreAlerts, setMoreAlerts] = useState([]);

  useEffect(() => {
    getWeatherAlerts();
    getWeatherWarnings();
  }, []);

  const getWeatherAlerts = async () => {
    await fetch('/map/emergency-alerts', { next: { revalidate: 300 } })
      .then(async (res) => {
        const json = await res.json();
        const alertsResp = json.data;
        const alerts = alertsResp.map((alert: Alert, i: Number) => {
          return <WeatherAlert title={alert.Message} infoStr={alert.Notes} url={"yes"} key={`e-${i}`} startTime={alert.StartTime} timeText=''/>
        });
        setWeatherAlerts(alerts);
      });
  };

  const getWeatherWarnings = async () => {
    await fetch('/map/weather-alerts', { next: { revalidate: 300 } })
      .then(async (res) => {
        const json = await res.json();
        const alertsResp = json.data.features;
        console.log(alertsResp[0].properties.alerts[0]);

        const alerts = alertsResp.map((alert: any, i: Number) => {
          return <WeatherAlert title={alert.properties.name + " - " + alert.properties.alerts[0].alertBannerText} key={`w-${i}`} infoStr={alert.properties.alerts[0].zoneName} url={"https://weather.gc.ca/airquality/pages/provincial_summary/ab_e.html"} startTime={0} timeText={alert.properties.alerts[0].issueTimeText} />
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
    <SideBar handleToggleSidebar={handleToggleSidebar} isOpen={isOpen} pt={0}>
      <Sidebar aria-label="Default sidebar example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              icon={TbRoad}
              active
            >
              Road Conditions
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={TbTrafficLights}
              active
              labelColor="alternative"
            >
              Traffic
            </Sidebar.Item>
            <Sidebar.Item
              active
              href="#"
              icon={TbCamera}
            >
              Cameras
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              active
              icon={TbTemperatureCelsius}
            >
              Weather
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={FiAlertCircle}
              label={moreAlerts.length + weatherAlerts.length}
            >
              Emergency Alerts
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <div style={{ height: '70%', overflowY: 'scroll' }}>
          {weatherAlerts}
          {moreAlerts}
        </div>
      </Sidebar>
    </SideBar>
  );
});

MapSideBar.displayName = "Map Sidebar";
export default MapSideBar;