"use client"

import { useEffect, useState, FC } from 'react';
import axios, { AxiosResponse } from 'axios';
import Script from 'next/script';
import ControlBar from './ControlBar';
import { MapProps, CameraData, CameraResponse } from '@/app/map/defs';
import polyline from '@mapbox/polyline';
import MapSideBar from './MapSideBar';


const Map: FC<MapProps> = ({ lat, lng, zoom }) => {
  const [coreLoaded, setCoreLoaded] = useState<boolean>(false);
  const [serviceLoaded, setServiceLoaded] = useState<boolean>(false);
  const [eventsLoaded, setEventsLoaded] = useState<boolean>(false);
  const [uiLoaded, setUILoaded] = useState<boolean>(false);
  const [clusterLoaded, setClusterLoaded] = useState<boolean>(false);
  

  const handleCoreLoad = (): void => { setCoreLoaded(true); };
  const handleServiceLoaded = (): void => { setServiceLoaded(true); };
  const handleEventsLoad = (): void => { setEventsLoaded(true); };
  const handleUILoad = (): void => { setUILoaded(true); };
  const handleClusterLoad = (): void => {setClusterLoaded(true); }

  let openBubble: any = null;

  const initMap = (): void => {
    if (coreLoaded && serviceLoaded && eventsLoaded && uiLoaded && clusterLoaded &&  window.H) {
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
            center: { lat: 53.9333, lng: -116.5765 },  // Center of Alberta
            zoom: zoom,
            pixelRatio: window.devicePixelRatio || 1,
          }
        );

      const minZoom = 7;
      map.addEventListener('mapviewchangeend', function () {
        if (map.getZoom() < minZoom) {
          map.setZoom(minZoom, true);
        }
      });

      // Define the boundaries for Alberta
      const albertaBounds = {
        north: 60.0000,
        south: 48.9988,
        east: -110.0000,
        west: -120.0000
      };

      // Restrict the map view to Alberta
      map.addEventListener('mapviewchangeend', function () {
        const center = map.getCenter();
        if (center.lat > albertaBounds.north || center.lat < albertaBounds.south ||
          center.lng > albertaBounds.east || center.lng < albertaBounds.west) {
          map.setCenter({ lat: 53.9333, lng: -116.5765 }, true);  // Reset to Alberta center
        }
      });

      new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
      const ui = window.H.ui.UI.createDefault(map, defaultLayers);
      window.addEventListener('resize', () => map.getViewPort().resize());
      getCameraMarkers(map, ui);
      getRoadConditonMarkers(map, ui);
    }
  };

  const getCameraMarkers = async (map: any, ui: any) => {
    const cameraIcon = new window.H.map.Icon('/camera.png', { size: { w: 75, h: 75 } });
    const cameraResponse: AxiosResponse<CameraResponse> = await axios.get('/map/cameras');
    const cameras: CameraData[] = (cameraResponse.data.data as any) as CameraData[];

    const group = new window.H.map.Group();
    map.addObject(group);

    group.addEventListener('tap', function (evt: any) {
      if (openBubble) { ui.removeBubble(openBubble); }

      const bubble = new window.H.ui.InfoBubble(evt.target.getGeometry(), {
        content: evt.target.getData()
      });

      openBubble  = bubble;
      ui.addBubble(bubble);
    }, false);

    cameras.forEach((camera: CameraData) => {
      const cameraLatLng = { lat: camera.Latitude, lng: camera.Longitude };
      const marker = new window.H.map.Marker(cameraLatLng, {icon: cameraIcon});
      const html = `
      <div style="background: white; padding: 5px; width: 400px;">
        <img src="${camera.Url}" alt="Camera Snapshot" style="width: 100%; height: auto;" />
        <p><strong>Name:</strong> ${camera.Name}</p>
        <p><strong>Description:</strong> ${camera.Description}</p>
        <p><strong>Direction of Travel:</strong> ${camera.DirectionOfTravel}</p>
        <p><strong>Roadway Name:</strong> ${camera.RoadwayName}</p>
        <p><strong>Wind Direction:</strong> ${camera.WindDirection}</p>
        <p><strong>Air Temperature:</strong> ${camera.AirTemperature}</p>
        <p><strong>Pavement Temperature:</strong> ${camera.PavementTemperature}</p>
        <p><strong>Relative Humidity:</strong> ${camera.RelativeHumidity}</p>
        <p><strong>Wind Speed:</strong> ${camera.WindSpeed}</p>
      </div>
    `;

      marker.setData(html);
      group.addObject(marker);
    });
  };

  const getRoadConditonMarkers = async (map: any, ui: any) => {
    // Fetch the road conditions data
    const response = await axios.get('/map/road-conditions');
    const roadConditions = response.data.data;

    // Create a list of promises
    const tasks = roadConditions.map(async (roadCondition: any) => {
      // Decode the polyline to get the coordinates
      const decodedPolyline = polyline.decode(roadCondition.EncodedPolyline);

      // Convert decoded polyline to LineString
      const lineString = new window.H.geo.LineString();
      decodedPolyline.forEach((coords: number[]) => {
        lineString.pushPoint({ lat: coords[0], lng: coords[1] });
      });

      // Determine the color based on the primary condition
      let color;
      switch (roadCondition['Primary Condition']) {
        case 'Bare Dry':
          color = 'green';
          break;
        case 'Closed':
          color = 'red';
        case 'Wet':
          color = 'blue';
          break;
        case 'Snow Covered':
          color = 'white';
          break;
        case 'Ice Covered':
          color = 'red';
          break;
        default:
          color = 'black'; // Use black for other conditions
      }

      // Create a polyline on the map
      const line = new window.H.map.Polyline(lineString, { style: { strokeColor: color, lineWidth: 3 } });
      map.addObject(line);
    });

    // Wait for all tasks to complete
    await Promise.all(tasks);
  };


  useEffect(() => {
    initMap();
  }, [lat, lng, coreLoaded, serviceLoaded, eventsLoaded, uiLoaded, zoom]);

  return (
    <>
      <MapSideBar />
      <div id="mapContainer" style={{ width: '100%', height: '95%', position: 'relative' }} />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-core.js" onLoad={handleCoreLoad} />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-service.js" onLoad={handleServiceLoaded} />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js" onLoad={handleEventsLoad} />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-ui.js" onLoad={handleUILoad} />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-clustering.js" onLoad={handleClusterLoad} />
      <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
    </>
  );
};

export default Map; 
