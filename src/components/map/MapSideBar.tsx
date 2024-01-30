import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { FiAlertCircle, FiSun } from "react-icons/fi";
import { Sidebar } from "flowbite-react";
import { useQuery } from '@tanstack/react-query'

import WeatherAlert from "@/components/map/WeatherAlert";
import { SideBar } from '@/components/SideBar';
import WeatherCard from '@/components/map/WeatherCard';

interface MapSideBarProps {
}

interface Alert {
  Message: string,
  Notes: string,
  StartTime: number
}

const MapSideBar = forwardRef<{}, MapSideBarProps>((props: MapSideBarProps, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: weatherData } = useQuery({
    queryKey: ['weatherData'],
    queryFn: () =>
      fetch('/api/weather').then(async (res) => res.json())
  });

  const { data: weatherAlerts } = useQuery({
    queryKey: ['weatherAlerts'],
    queryFn: () =>
      fetch('/api/emergency-alerts').then(async (res) => res.json()),
    initialData: []
  });

  const { data: moreAlerts } = useQuery({
    queryKey: ['moreAlerts'],
    queryFn: () =>
      fetch('/api/weather-alerts').then(async (res) => res.json()),
    initialData: []
  })


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
        <div style={{ overflowY: 'scroll', scrollbarWidth: 'none', scrollbarColor: 'lightgray darkgray', maxHeight: '40%' }}>
          {weatherAlerts &&
            weatherAlerts.map((alert: Alert, i: Number) => {
              return <WeatherAlert title={alert.Message} infoStr={alert.Notes} url={"yes"} key={`e-${i}`} startTime={alert.StartTime} timeText='' />
            })
          }
          {moreAlerts &&
            moreAlerts.map((alert: any, i: Number) => {
              return <WeatherAlert infoStr={alert.properties.alerts[0].text} title={alert.properties.name + " - " + alert.properties.alerts[0].alertBannerText} key={`w-${i}`} url={"https://weather.gc.ca/airquality/pages/provincial_summary/ab_e.html"} startTime={0} timeText={alert.properties.alerts[0].issueTimeText} />
            })
          }
        </div>

        <Sidebar.Items className='mt-5'>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={FiSun}> Weather </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        {weatherData &&
          Object.keys(weatherData).map((city: string, i: Number) =>
            <WeatherCard city={city} temp={weatherData[city].main.temp} icon={weatherData[city].weather[0].icon} key={`w-${i}`}/>)
        }
      </Sidebar>
    </SideBar>
  );
});

MapSideBar.displayName = "Map Sidebar";
export default MapSideBar;