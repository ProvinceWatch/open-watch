// components/Map.js
"use client"

import { useEffect, useState, FC } from 'react';
import Script from 'next/script';
import axios from 'axios';

interface MapProps {
  lat: number;
  lng: number;
  zoom: number;
}

declare global {
  interface Window {
    H: any;
  }
}

const Map: React.FC<MapProps> = ({ lat, lng, zoom }) => {
  const [coreLoaded, setCoreLoaded] = useState(false);
  const [serviceLoaded, setServiceLoaded] = useState(false);
  const [eventsLoaded, setEventsLoaded] = useState(false);
  const [uiLoaded, setUILoaded] = useState(false);

  useEffect(() => {
    if (coreLoaded && serviceLoaded && eventsLoaded && uiLoaded && typeof window !== 'undefined') {
      const platform = new window.H.service.Platform({
        apikey: 'MlRC40I9PYNyBKflT02gYpBt0Yxb2qcSUq1cXmNw3MQ',
      });

      const defaultLayers = platform.createDefaultLayers();

      const map = new window.H.Map(
        document.getElementById('mapContainer'),
        defaultLayers.vector.normal.map,
        {
          center: { lat, lng },
          zoom: zoom,
          pixelRatio: window.devicePixelRatio || 1,
        }
      );

      // Add behavior control
      const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));

      // Add UI controls
      window.H.ui.UI.createDefault(map, defaultLayers);

      window.addEventListener('resize', () => map.getViewPort().resize());


      testData();
    }
  }, [lat, lng, coreLoaded, serviceLoaded, eventsLoaded, uiLoaded, zoom]);

  const testData = async () => {
    await axios.get('/map/road-conditions');
    await axios.get('/map/cameras');
    await axios.get('/map/emergency-alerts');
  }

  const handleCoreLoad = () => {
    setCoreLoaded(true);
  };

  const handleServiceLoaded = () => {
    setServiceLoaded(true);
  };

  const handleEventsLoad = () => {
    setEventsLoaded(true);
  };

  const handleUILoad = () => {
    setUILoaded(true);
  };

  return (
    <>
      <div id="mapContainer" style={{ width: '100%', height: '100%' }} />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-core.js" onLoad={handleCoreLoad} />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-service.js" onLoad={handleServiceLoaded} />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js" onLoad={handleEventsLoad} />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-ui.js" onLoad={handleUILoad} />
    </>
  );
};

export default Map;
