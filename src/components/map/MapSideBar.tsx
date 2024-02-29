import { useState, FC } from 'react';
import { Sidebar } from "flowbite-react";
import { useQuery } from '@tanstack/react-query';
import { SideBar } from '@/components/SideBar';

import AlertsPanel from '@/components/map/sidebar/AlertsPanel';
import SettingsPanel from '@/components/map/sidebar/SettingsPanel';
import WeatherPanel from '@/components/map/sidebar/WeatherPanel';

import { fetchWeather, fetchAlbertaAlerts, fetchCanadaWeatherAlerts } from '@/app/api';

interface MapSideBarProps { }

const MapSideBar: FC<MapSideBarProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAlerts, setshowAlerts] = useState(true);
  const [showRoadConditions, setShowRoadConditions] = useState(true);
  const [showCameras, setShowCameras] = useState(true);
  const [showConstruction, setShowConstruction] = useState(true);
  const [showPOIs, setShowPOIs] = useState(true);

  const { data: weatherData = {} } = useQuery({
    queryKey: ['weatherData'],
    queryFn: fetchWeather,
    initialData: {},
    refetchInterval: 30000,
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

  return (
    <SideBar handleToggleSidebar={handleToggleSidebar} isOpen={isOpen} pt={0}>
      <Sidebar aria-label="Default sidebar example" className="w-full">
        <AlertsPanel albertaAlerts={albertaAlerts} canadaWeatherAlerts={canadaWeatherAlerts}/>
        <SettingsPanel
          showAlerts={showAlerts}
          setshowAlerts={setshowAlerts}
          showRoadConditions={showRoadConditions}
          setShowRoadConditions={setShowRoadConditions}
          showCameras={showCameras}
          setShowCameras={setShowCameras}
          showConstruction={showConstruction}
          setShowConstruction={setShowConstruction}
          showPOIs={showPOIs}
          setShowPOIs={setShowPOIs}
        />
        <WeatherPanel weatherData={weatherData}/>
      </Sidebar>

    </SideBar>
  );
};

MapSideBar.displayName = "Map Sidebar";
export default MapSideBar;