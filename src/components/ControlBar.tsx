"use client"

import React, { FC, useEffect, useState } from "react";
import WeatherAlert from "./WeatherAlert";
import ControlCard from "./ControlCard";
import axios from "axios";

interface ControlBarProps {

}

interface Alert {
  Message: string,
  Notes: string,
}

const ControlBar: FC<ControlBarProps> = () => {
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

  return (
    <div id='control-bar' className="max-w-sm" style={{ position: 'fixed', top: '8%', margin: '1%' }}>
      <ControlCard />
      {weatherAlerts}
    </div>);
}

export default ControlBar;