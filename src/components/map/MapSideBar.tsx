import { forwardRef, useImperativeHandle, useState } from 'react';
import { FiAlertCircle, FiSun } from "react-icons/fi";
import { Sidebar } from "flowbite-react";
import { useQuery } from '@tanstack/react-query'

import WeatherAlert from "@/components/map/WeatherAlert";
import WeatherCard from '@/components/map/WeatherCard';
import { SideBar } from '@/components/SideBar';
import {
  fetchWeather,
  fetchEmergencyAlerts,
  fetchWeatherAlerts
} from '@/app/api';

interface MapSideBarProps { }
interface Alert {
  Message: string,
  Notes: string,
  StartTime: number
}

const MapSideBar = forwardRef<{}, MapSideBarProps>((props: MapSideBarProps, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: weatherData } = useQuery({
    queryKey: ['weatherData'],
    queryFn: fetchWeather,
  });

  const { data: emergencyAlerts } = useQuery({
    queryKey: ['emergencyAlerts'],
    queryFn: fetchEmergencyAlerts,
    initialData: []
  });

  const { data: weatherAlerts } = useQuery({
    queryKey: ['weatherAlerts'],
    queryFn: fetchWeatherAlerts,
    initialData: []
  });

  const handleToggleSidebar = () => setIsOpen(!isOpen);
  useImperativeHandle(ref, () => ({ handleToggleSidebar }));

  return (
    <SideBar handleToggleSidebar={handleToggleSidebar} isOpen={isOpen} pt={0}>
      <Sidebar aria-label="Default sidebar example" className="w-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              icon={FiAlertCircle}
              label={weatherAlerts.length + emergencyAlerts.length}
            >
              Alerts
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <div style={{ overflowY: 'scroll', scrollbarWidth: 'none', scrollbarColor: 'lightgray darkgray', maxHeight: '40%' }}>
          {emergencyAlerts &&
            emergencyAlerts.map((alert: Alert, i: Number) => {
              return <WeatherAlert title={alert.Message} infoStr={alert.Notes} url={"yes"} key={`e-${i}`} startTime={alert.StartTime} timeText='' />
            })
          }
          {weatherAlerts &&
            weatherAlerts.map((alert: any, i: Number) => {
              return <WeatherAlert infoStr={alert.properties.alerts[0].text} title={alert.properties.name + " - " + alert.properties.alerts[0].alertBannerText} key={`w-${i}`} url={"https://weather.gc.ca/airquality/pages/provincial_summary/ab_e.html"} startTime={0} timeText={alert.properties.alerts[0].issueTimeText} />
            })
          }
        </div>

        <Sidebar.Items className='mt-5'>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={FiSun}> Weather </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <div style={{ overflowY: 'scroll', scrollbarWidth: 'none', scrollbarColor: 'lightgray darkgray', maxHeight: `${(weatherAlerts.length + emergencyAlerts.length) > 3 ?  '40%' :''}` }}>
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