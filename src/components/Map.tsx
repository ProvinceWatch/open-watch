// components/Map.js
"use client"

import { useEffect, useState, FC } from 'react';
import axios, { AxiosResponse } from 'axios';
import Script from 'next/script';
import ControlBar from './ControlBar';
import { MapProps, CameraData, CameraResponse } from '@/app/map/defs';


const Map: FC<MapProps> = ({ lat, lng, zoom }) => {
  const [coreLoaded, setCoreLoaded]       = useState<boolean>(false);
  const [serviceLoaded, setServiceLoaded] = useState<boolean>(false);
  const [eventsLoaded, setEventsLoaded]   = useState<boolean>(false);
  const [uiLoaded, setUILoaded]           = useState<boolean>(false);

  const handleCoreLoad      = (): void => { setCoreLoaded(true); };
  const handleServiceLoaded = (): void => { setServiceLoaded(true); };
  const handleEventsLoad    = (): void => { setEventsLoaded(true); };
  const handleUILoad        = (): void => { setUILoaded(true); };

  const initMap = (): void => {
    if (coreLoaded && serviceLoaded && eventsLoaded && uiLoaded && window.H) {
      const platform = new window.H
        .service
        .Platform({
          apikey: 'MlRC40I9PYNyBKflT02gYpBt0Yxb2qcSUq1cXmNw3MQ',
        });

      const defaultLayers = platform.createDefaultLayers();
      const map = new window.H
        .Map(
          document.getElementById('mapContainer'),
          defaultLayers.vector.normal.map,
          {
            center: { lat, lng },
            zoom: zoom,
            pixelRatio: window.devicePixelRatio || 1,
          }
        );

      new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
      const ui = window.H.ui.UI.createDefault(map, defaultLayers);
      window.addEventListener('resize', () => map.getViewPort().resize());
      getCameraMarkers(map, ui);
    }
  };

  const getCameraMarkers = async (map: any, ui: any) => {
    const cameraResponse: AxiosResponse<CameraResponse> = await axios.get('/map/cameras');
    const cameras: CameraData[] = (cameraResponse.data.data as any) as CameraData[];

    const group = new window.H.map.Group();
    map.addObject(group);

    group.addEventListener('tap', function (evt: any) {
      const bubble = new window.H.ui.InfoBubble(evt.target.getGeometry(), {
        content: evt.target.getData()
      });
      ui.addBubble(bubble);
    }, false);

    cameras.forEach((camera: CameraData) => {
      const cameraLatLng = { lat: camera.Latitude, lng: camera.Longitude };
      const marker = new window.H.map.Marker(cameraLatLng);
      const html =
        `<div style="background: white; padding: 5px; width: 400px;">
          <img src="${camera.Url}" alt="Camera Snapshot" style="width: 100%; height: auto;" />
        </div>
        `;

      marker.setData(html);
      group.addObject(marker);
    });
  };

  useEffect(() => {
    initMap();
  }, [lat, lng, coreLoaded, serviceLoaded, eventsLoaded, uiLoaded, zoom]);

  return (
    <>
      <div id="mapContainer" style={{ width: '100%', height: '95%', position: 'relative' }} />
      <ControlBar />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-core.js" onLoad={handleCoreLoad} />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-service.js" onLoad={handleServiceLoaded} />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js" onLoad={handleEventsLoad} />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-ui.js" onLoad={handleUILoad} />
      <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
    </>
  );
};

export default Map; 
