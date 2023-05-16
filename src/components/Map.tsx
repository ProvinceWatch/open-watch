"use client"

import { useEffect, FC } from 'react';
import axios, { AxiosResponse } from 'axios';

import { MapProps, CameraData, CameraResponse } from '@/app/map/defs';
import polyline from '@mapbox/polyline';
import MapSideBar from './MapSideBar';

const Map: FC<MapProps> = ({ lat, lng, zoom }) => {
  let openBubble: any = null;

  const initMap = (): void => {
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

    new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
    const ui = window.H.ui.UI.createDefault(map, defaultLayers);
    window.addEventListener('resize', () => map.getViewPort().resize());
    getRoadConditonMarkers(map, ui);
    getCameraMarkers(map, ui);
  };


  const getCameraMarkers = async (map: any, ui: any) => {
    const cameraResponse: AxiosResponse<CameraResponse> = await axios.get('/map/cameras');
    const cameras: CameraData[] = (cameraResponse.data.data as any) as CameraData[];
    const dataPoints: any[] = [];

    cameras.forEach((camera: CameraData) => {
      const cameraLatLng = { lat: camera.Latitude, lng: camera.Longitude };
      dataPoints.push(new window.H.clustering.DataPoint(cameraLatLng.lat, cameraLatLng.lng, null, camera));
    });

    startClustering(map, dataPoints, ui);
  };

  function startClustering(map, data, ui) {
    const clusteredDataProvider = new window.H.clustering.Provider(data, {
      clusteringOptions: {
        eps: 40,
        minWeight: 10
      }
    });

    var clusteringLayer = new window.H.map.layer.ObjectLayer(clusteredDataProvider);
    map.addLayer(clusteringLayer);

    map.addEventListener('tap', function (evt: any) {
      const target = evt.target;
      if (target instanceof window.H.map.Marker) {
        if (openBubble) { ui.removeBubble(openBubble); }

        const camera = target.getData().a.data;
        if (camera) {
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

          const bubble = new window.H.ui.InfoBubble(target.getGeometry(), { content: html });
          openBubble = bubble;
          ui.addBubble(bubble);
        }
      }

      if (target.getClusteringId !== undefined) {
        // Get the bounding rectangle of the cluster
        var bounds = target.getBounds();
        // Zoom the map to fit the cluster
        map.getViewModel().setLookAtData({
          bounds: bounds
        });
      }
    }, false);
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
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          console.log(`Loaded ${src}`);
          resolve();
        };
        script.onerror = () => {
          console.error(`Failed to load ${src}`);
          reject();
        };
        document.body.appendChild(script);
      });
    };

    const loadScriptsInOrder = async () => {
      try {
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-core.js");
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-service.js");
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-mapevents.js");
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-ui.js");
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-clustering.js");
        console.log("All scripts loaded");
      } catch (err) {
        console.error("Failed to load scripts", err);
      }
    };

    loadScriptsInOrder().then(() => initMap())
  }, []);

  return (
    <>
      <MapSideBar />
      <div id="mapContainer" style={{ width: '100%', height: '95%', position: 'fixed' }} />
      <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
    </>
  );
};

export default Map; 
