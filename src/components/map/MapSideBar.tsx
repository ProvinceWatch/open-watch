"use client"

import { forwardRef, useImperativeHandle, useState } from 'react';
import { FiAlertCircle, FiSun } from "react-icons/fi";
import { Sidebar } from "flowbite-react";
import { useQuery } from '@tanstack/react-query'

import { fetchWeather, fetchAlbertaAlerts, fetchCanadaWeatherAlerts } from '@/app/api';
import { ABAlert } from '@/app/api/ab-alerts/types';
import { Feature } from '@/app/api/can-weather-alerts/types';
import { SideBar } from '@/components/SideBar';
import WeatherAlert from "@/components/map/WeatherAlert";
import WeatherCard from '@/components/map/WeatherCard';

interface MapSideBarProps { }

const MapSideBar = forwardRef<{}, MapSideBarProps>((props: MapSideBarProps, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: weatherData } = useQuery({
    queryKey: ['weatherData'],
    queryFn: fetchWeather,
  });

  const { data: albertaAlerts } = useQuery({
    queryKey: ['albertaAlerts'],
    queryFn: fetchAlbertaAlerts,
    initialData: [],
    refetchInterval: 30000,
  });

  const { data: canadaWeatherAlerts } = useQuery({
    queryKey: ['canadaWeatherAlerts'],
    queryFn: fetchCanadaWeatherAlerts,
    initialData: [],
    refetchInterval: 30000,
  });

  const handleToggleSidebar = () => setIsOpen(!isOpen);
  useImperativeHandle(ref, () => ({ handleToggleSidebar }));

  return (
    <SideBar handleToggleSidebar={handleToggleSidebar} isOpen={isOpen} pt={0}>
      <Sidebar aria-label="Default sidebar example" className="w-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={FiAlertCircle} label={canadaWeatherAlerts.length + albertaAlerts.length}>
              Alerts
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <div style={{ overflowY: 'scroll', scrollbarWidth: 'none', scrollbarColor: 'lightgray darkgray', maxHeight: '40%' }}>
          {albertaAlerts &&
            albertaAlerts.map((alert: ABAlert, i: Number) => {
              return <WeatherAlert title={alert.Message} infoStr={alert.Notes} url={"yes"} key={`e-${i}`} startTime={alert.StartTime} timeText='' />
            })
          }
          {canadaWeatherAlerts &&
            canadaWeatherAlerts.map((feature: Feature, i: Number) => {
              return <WeatherAlert infoStr={feature.properties.alerts[0].text} title={feature.properties.name + " - " + feature.properties.alerts[0].alertBannerText} key={`w-${i}`} url={"https://weather.gc.ca/airquality/pages/provincial_summary/ab_e.html"} startTime={0} timeText={feature.properties.alerts[0].issueTimeText} />
            })
          }
        </div>

        <Sidebar.Items className='mt-5'>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={FiSun}> Weather </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <div style={{ overflowY: 'scroll', scrollbarWidth: 'none', scrollbarColor: 'lightgray darkgray', maxHeight: `${(canadaWeatherAlerts.length + albertaAlerts.length) > 3 ?  '40%' :''}` }}>
        {weatherData &&
          Object.keys(weatherData).map((city: string, i: Number) =>
            <WeatherCard city={city} temp={weatherData[city].main.temp} icon={weatherData[city].weather[0].icon} key={`w-${i}`} />)
        }
        </div>
      </Sidebar>
    </SideBar>
  );
});

MapSideBar.displayName = "Map Sidebar";
export default MapSideBar;