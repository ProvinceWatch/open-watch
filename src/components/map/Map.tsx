"use client"

import { useEffect, FC, useState } from 'react';
import { MapProps, CameraData } from '@/app/map/defs';
import polyline from '@mapbox/polyline';
import MapSideBar from '@/components/map/MapSideBar';
import CameraModal from '@/components/cameras/CameraModal';

const Map: FC<MapProps> = ({ zoom }) => {
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState({} as CameraData);

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
    const res: any = await fetch('/map/cameras');
    const cameraResponse = await res.json();
    console.log(cameraResponse);
    const cameras: CameraData[] = (cameraResponse.data as any) as CameraData[];
    const dataPoints: any[] = [];

    cameras.forEach((camera: CameraData) => {
      const cameraLatLng = { lat: camera.Latitude, lng: camera.Longitude };
      dataPoints.push(new window.H.clustering.DataPoint(cameraLatLng.lat, cameraLatLng.lng, null, camera));
    });

    startClustering(map, dataPoints, ui);
  };

  const startClustering = (map: any, data: any, ui: any) => {
    const clusteredDataProvider = new window.H.clustering.Provider(data, {
      clusteringOptions: {
        eps: 4,
        minWeight: 10
      }
    });

    const clusteringLayer = new window.H.map.layer.ObjectLayer(clusteredDataProvider);
    map.addLayer(clusteringLayer);

    map.addEventListener('tap', function (evt: any) {
      const target = evt.target;
      if (target instanceof window.H.map.Marker) {
        const camera = target.getData().a.data;
        if (camera) {
          setSelectedCamera(camera);
          setShowCameraModal(true);
        }
      }
    }, false);
  };

  const getRoadConditonMarkers = async (map: any, ui: any) => {
    const response = await fetch('/map/road-conditions');
    const roadConditions = await response.json();

    const tasks = roadConditions.data.map(async (roadCondition: any) => {
      const decodedPolyline = polyline.decode(roadCondition.EncodedPolyline);

      const lineString = new window.H.geo.LineString();
      decodedPolyline.forEach((coords: number[]) => {
        lineString.pushPoint({ lat: coords[0], lng: coords[1] });
      });

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
          color = 'black';
      }

      const line = new window.H.map.Polyline(lineString, { style: { strokeColor: color, lineWidth: 3 } });
      map.addObject(line);
    });

    await Promise.all(tasks);
  };

  // For loading HERE js scripts into the DOM
  const loadScript = (src: string): Promise<void> => {
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

  useEffect(() => {
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
    <div style={{overflow: 'hidden'}}>
      <CameraModal open={showCameraModal} selectedCamera={selectedCamera} onClose={() => { setShowCameraModal(false); setSelectedCamera({} as CameraData); }} />
      <MapSideBar />
      <div id="mapContainer" style={{ width: '100%', height: '95%', position: 'fixed' }} />
      <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
    </div>
  );
};

export default Map; 
