"use client"

import React, { FC, useEffect, useState } from "react";
import WeatherAlert from "./WeatherAlert";
import ControlCard from "./ControlCard";
import axios from "axios";
import { Button, Label, TextInput, Checkbox } from "flowbite-react";

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
    <div id='control-bar' style={{ position: 'fixed', top: '5%', margin: '1%', width: '550px' }}>
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
    </div>);
}

export default ControlBar;