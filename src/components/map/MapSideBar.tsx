import { useState, FC } from 'react';
import { Sidebar } from "flowbite-react";
import { useQuery } from '@tanstack/react-query';
import { SideBar } from '@/components/SideBar';

import AlertsPanel from '@/components/map/sidebar/AlertsPanel';
import SettingsPanel from '@/components/map/sidebar/SettingsPanel';
import WeatherPanel from '@/components/map/sidebar/WeatherPanel';

import { fetchWeather, fetchAlbertaAlerts, fetchCanadaWeatherAlerts } from '@/app/api';
import { ABAlert } from '@/app/api/ab-alerts/types';
import { Feature } from '@/app/api/can-weather-alerts/types';

interface MapSideBarProps {
  showCameras: boolean,
  setShowCameras: (checked: boolean) => void,
  showRoadConditions: boolean,
  setShowRoadConditions: (checked: boolean) => void,
  showConstruction: boolean,
  setShowConstruction: (checked: boolean) => void
}

const MapSideBar: FC<MapSideBarProps> = ({showCameras, setShowCameras, showRoadConditions, setShowRoadConditions, showConstruction, setShowConstruction}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showAlerts, setshowAlerts] = useState(true);
  const [showPOIs, setShowPOIs] = useState(true);

  const { data: weatherData = {} } = useQuery({
    queryKey: ['weatherData'],
    queryFn: fetchWeather,
    refetchInterval: 30000,
  });

  const { data: albertaAlerts = [] } = useQuery({
    queryKey: ['albertaAlerts'],
    queryFn: fetchAlbertaAlerts,
    refetchInterval: 30000,
  });

  const { data: canadaWeatherAlerts = [] } = useQuery({
    queryKey: ['canadaWeatherAlerts'],
    queryFn: fetchCanadaWeatherAlerts,
    refetchInterval: 30000,
  });

  const handleToggleSidebar = () => setIsOpen(!isOpen);

  return (
    <SideBar handleToggleSidebar={handleToggleSidebar} isOpen={isOpen} pt={0}>
      <Sidebar aria-label="Default sidebar example" className="w-full">
        <AlertsPanel albertaAlerts={albertaAlerts as ABAlert[]} canadaWeatherAlerts={canadaWeatherAlerts as Feature[]}/>
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