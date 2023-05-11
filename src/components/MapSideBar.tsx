import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { TextInput } from "flowbite-react";
import WeatherAlert from "./WeatherAlert";
import ControlCard from "./ControlCard";
import axios from 'axios';

interface MapSideBarProps {
}

interface Alert {
    Message: string,
    Notes: string,
  }

const MapSideBar = forwardRef<{}, MapSideBarProps>((props: MapSideBarProps, ref) => {
  const [isOpen, setIsOpen] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState([]);

  useEffect(() => {
    getWeatherAlerts();
  }, []);

  const getWeatherAlerts = async () => {
    console.log('doing this');
    await axios.get('/map/emergency-alerts')
      .then((res) => {
        const alertsResp = res.data.data;
        const alerts = alertsResp.map((alert: Alert) => {
          return <WeatherAlert title={alert.Message} infoStr={alert.Notes} url={"yes"} />
        });
        setWeatherAlerts(alerts);
      });
  };

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useImperativeHandle(ref, () => ({
    handleToggleSidebar,
  }));

  return (
    <div className={`w-85 min-h-screen bg-white p-4 fixed transform transition-transform duration-300`} style={{zIndex: 1000}}>
      <div id='control-bar' style={{ width: '100%' }}>
      <form className="flex flex-col">
        <div style={{marginBottom: '2%'}}>
          <TextInput
            id="text"
            type="text"
            placeholder="Search for city in Alberta"
            required={true}
            style={{width: '100%'}}
          />
        </div>
      </form>
      <ControlCard WeatherAlerts={weatherAlerts}/>
    </div>
    </div>
  );
});

export default MapSideBar;