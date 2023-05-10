import { Card, } from "flowbite-react";
import React from "react";

import WeatherAlert from "./WeatherAlert";
import ControlCard from "./ControlCard";


const ControlBar = () => {
  return (
    <div id='control-bar' className="max-w-sm" style={{ position: 'fixed', top: '8%', margin: '1%' }}>
      <ControlCard />
      <WeatherAlert title="hello" infoStr="world" url="google.com" />
    </div>);
}

export default ControlBar;