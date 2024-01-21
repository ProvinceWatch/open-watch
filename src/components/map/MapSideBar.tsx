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
  const [isOpen, setIsOpen] = useState(false);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [moreAlerts, setMoreAlerts] = useState<any[]>([]);

  useEffect(() => {
    getWeatherAlerts();
    getWeatherWarnings();
  }, []);

  const getWeatherAlerts = async () => {
    await fetch('/map/emergency-alerts', {
      headers: {
        'Cache-Control': 'max-age=0'
      },
    })
      .then(async (res) => {
        const json = await res.json();
        const alertsResp = json.data;
        const alerts = alertsResp.map((alert: Alert, i: Number) => {
          return <WeatherAlert title={alert.Message} infoStr={alert.Notes} url={"yes"} key={`e-${i}`} startTime={alert.StartTime} timeText=''/>
        });
        setWeatherAlerts(alerts.reverse());
      });
  };

  const getWeatherWarnings = async () => {
    await fetch('/map/weather-alerts', { cache: 'no-store' })
      .then(async (res) => {
        const json = await res.json();
        const alertsResp = json.data.features;
        const alerts : any[] = [];

        alertsResp.forEach((alert: any, i: Number) => {
          if (alert.properties.prov !== "AB") { return null; }
          alerts.push(<WeatherAlert title={alert.properties.name + " - " + alert.properties.alerts[0].alertBannerText} key={`w-${i}`} infoStr={alert.properties.alerts[0].zoneName} url={"https://weather.gc.ca/airquality/pages/provincial_summary/ab_e.html"} startTime={0} timeText={alert.properties.alerts[0].issueTimeText} />);
        });

        setMoreAlerts(alerts.reverse());
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
      <Sidebar aria-label="Default sidebar example" className="w-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              icon={FiAlertCircle}
              label={moreAlerts.length + weatherAlerts.length}
            >
              Alerts
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <div style={{ height: '90%', overflowY: 'scroll', scrollbarWidth: 'none', scrollbarColor: 'lightgray darkgray' }}>
          {weatherAlerts}
          {moreAlerts}
        </div>
      </Sidebar>
    </SideBar>
  );
});

MapSideBar.displayName = "Map Sidebar";
export default MapSideBar;