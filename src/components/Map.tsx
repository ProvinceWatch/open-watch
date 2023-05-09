// components/Map.js
"use client"

import { useEffect, useState, FC } from 'react';
import Script from 'next/script';
import axios from 'axios';
import { AxiosResponse } from 'axios';

interface MapProps {
  lat: number;
  lng: number;
  zoom: number;
}

interface CameraData {
  Latitude: number;
  Longitude: number;
  Url: string;
}

interface CameraResponse {
  data: {
    data: CameraData[]
  }
}

declare global {
  interface Window {
    H: any;
  }
}

const Map: FC<MapProps> = ({ lat, lng, zoom }) => {
  const [coreLoaded, setCoreLoaded] = useState<boolean>(false);
  const [serviceLoaded, setServiceLoaded] = useState<boolean>(false);
  const [eventsLoaded, setEventsLoaded] = useState<boolean>(false);
  const [uiLoaded, setUILoaded] = useState<boolean>(false);

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
      const ui = window.H.ui.UI.createDefault(map, defaultLayers);

      window.addEventListener('resize', () => map.getViewPort().resize());

      getCameraMarkers(map, ui);
    }
  }, [lat, lng, coreLoaded, serviceLoaded, eventsLoaded, uiLoaded, zoom]);

  const getCameraMarkers = async (map: any, ui: any) => {
    // Get cameras data
    const cameraResponse: AxiosResponse<CameraResponse> = await axios.get('/map/cameras');
    const cameras: CameraData[] = cameraResponse.data.data;

    // Create a group for the markers
    const group = new window.H.map.Group();

    // Add the group to the map
    map.addObject(group);

    // Add event listener for 'tap' events.
    group.addEventListener('tap', function (evt: any) {
      // read custom data
      const bubble = new window.H.ui.InfoBubble(evt.target.getGeometry(), {
        content: evt.target.getData()
      });
      // Show info bubble
      ui.addBubble(bubble);

      // Set the center of the map to the clicked marker's coordinates
      map.setCenter(evt.target.getGeometry());
    }, false);

    // For each camera, create a marker and add it to the group
    cameras.forEach((camera: CameraData) => {
      const cameraLatLng = { lat: camera.Latitude, lng: camera.Longitude };
      const marker = new window.H.map.Marker(cameraLatLng);
      const html = `<div style="background: white; padding: 10px; border: 1px solid black; width: 400px;"><img src="${camera.Url}" alt="Camera Snapshot" style="width: 100%; height: auto;" /></div>`;

      marker.setData(html);
      group.addObject(marker);
    });
  }

  const handleCoreLoad = (): void => {
    setCoreLoaded(true);
  };

  const handleServiceLoaded = (): void => {
    setServiceLoaded(true);
  };

  const handleEventsLoad = (): void => {
    setEventsLoaded(true);
  };

  const handleUILoad = (): void => {
    setUILoaded(true);
  };

  return (
    <>
      <div id="mapContainer" style={{ width: '100%', height: '95%', position: 'relative' }} />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-core.js" onLoad={handleCoreLoad} />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-service.js" onLoad={handleServiceLoaded} />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js" onLoad={handleEventsLoad} />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-ui.js" onLoad={handleUILoad} />
      <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
    </>
  );
};

export default Map; 
