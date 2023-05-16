"use client"

import { useEffect, FC, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { MapProps, CameraData, CameraResponse } from '@/app/map/defs';
import polyline from '@mapbox/polyline';
import MapSideBar from './MapSideBar';
import Modal from './Modal';

const Map: FC<MapProps> = ({ lat, lng, zoom }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalChildren, setModalChildren] = useState(null);
  const [selectedCamera, setSelectedCamera] = useState({
    Url: '',
    Name: '',
  });

  let openBubble: any = null;

  const initMap = async () => {
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

    // Add border to alberta
    let reader = new window.H.data.geojson.Reader('https://gist.githubusercontent.com/oscj/4b1fdf0369692586968582e0fb218960/raw/3061793c473f94c573c7141e1a68f3cd1fa52ab4/alberta.json');
    reader.parse();
    map.addLayer(reader.getLayer());
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
        eps: 4,
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
          setSelectedCamera(camera);
          setShowModal(true);
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
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-data.js");
      } catch (err) {
        console.error("Failed to load scripts", err);
      }
    };

    loadScriptsInOrder().then(() => initMap())
  }, []);

  return (
    <>
      <Modal open={showModal} onClose={() => { setShowModal(false); setSelectedCamera(null); }}>
        {selectedCamera && <div style={{color: 'black'}}>
          <img src={selectedCamera.Url} alt="Camera Snapshot" className="w-full h-auto" />
          {selectedCamera.Name && <p><strong>Name:</strong> {selectedCamera.Name}</p>}
          {selectedCamera.Description && <p><strong>Description:</strong> {selectedCamera.Description}</p>}
          {selectedCamera.DirectionOfTravel && <p><strong>Direction of Travel:</strong> {selectedCamera.DirectionOfTravel}</p>}
          {selectedCamera.RoadwayName && <p><strong>Roadway Name:</strong> {selectedCamera.RoadwayName}</p>}
          {selectedCamera.WindDirection && <p><strong>Wind Direction:</strong> {selectedCamera.WindDirection}</p>}
          {selectedCamera.AirTemperature && <p><strong>Air Temperature:</strong> {selectedCamera.AirTemperature}</p>}
          {selectedCamera.PavementTemperature && <p><strong>Pavement Temperature:</strong> {selectedCamera.PavementTemperature}</p>}
          {selectedCamera.RelativeHumidity && <p><strong>Relative Humidity:</strong> {selectedCamera.RelativeHumidity}</p>}
          {selectedCamera.WindSpeed && <p><strong>Wind Speed:</strong> {selectedCamera.WindSpeed}</p>}
        </div>}
      </Modal>
      <MapSideBar />
      <div id="mapContainer" style={{ width: '100%', height: '95%', position: 'fixed' }} />
      <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
    </>
  );
};

export default Map; 
