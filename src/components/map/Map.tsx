"use client"

import { useEffect, FC, useState, useRef } from 'react';
import { MapProps, CameraData } from '@/app/map/defs';
import polyline from '@mapbox/polyline';
import MapSideBar from '@/components/map/MapSideBar';
import CameraModal from '@/components/cameras/CameraModal';
import RoadConditionsLegend from '@/components/map/RoadConditionsLegend';
import { ConstructionData } from '@/app/api/construction/types';

const Map: FC<MapProps> = ({ zoom }) => {
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState({} as CameraData);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [showCameras, setShowCameras] = useState(true);
  const [showRoadConditions, setShowRoadConditions] = useState(true);
  const [showConstruction, setShowConstruction] = useState(false);

  const cameraMarkersRef = useRef([]);
  const roadConditionMarkersRef = useRef([]);
  const constructionMarkersRef = useRef([]);

  const initMap = async () => {
    if (document.querySelector('.H_imprint')) {
      console.log('Element with class H_imprint exists. Exiting initMap early.');
      return;
    }
    console.log('initMap');
    const platform = new window.H
      .service
      .Platform({
        apikey: process.env.HERE_API_KEY,
      });

    const defaultLayers = platform.createDefaultLayers();
    const map = new window.H
      .Map(
        document.getElementById('mapContainer'),
        defaultLayers.raster.normal.mapnight,
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
    await getCameraMarkers(map, ui);
    await getConstructionMarkers(map, ui);

    // Add border to alberta
    const reader = new window.H.data.geojson.Reader('https://gist.githubusercontent.com/oscj/4b1fdf0369692586968582e0fb218960/raw/3061793c473f94c573c7141e1a68f3cd1fa52ab4/alberta.json');
    reader.parse();
    map.addLayer(reader.getLayer());
    setIsMapInitialized(true);
  };

  const getConstructionMarkers = async (map: any, ui: any) => {
    const res = await fetch('/api/construction');
    const constructionData = await res.json() as ConstructionData[];

    /*@ts-ignore*/
    constructionMarkersRef.current = constructionData.map((event) => {
      const latlng = { lat: event.Latitude, lng: event.Longitude };
      const icon = new window.H.map.Icon('/construction.png', { size: { w: 60, h: 60 } });
      const marker = new window.H.map.Marker(latlng, { icon: icon });

      marker.addEventListener('tap', () => {
        // TODO
      });

      map.addObject(marker);
      return marker;
    });
  }


  const getCameraMarkers = async (map: any, ui: any) => {
    const res = await fetch('/api/cameras');
    const cameraResponse = await res.json();
    const cameras = cameraResponse.data as CameraData[];
    
    /*@ts-ignore*/
    cameraMarkersRef.current = cameras.map((camera) => {
      const cameraLatLng = { lat: camera.Latitude, lng: camera.Longitude };
      const icon = new window.H.map.Icon('/camera-light.png', { size: { w: 64, h: 64 } });
      const marker = new window.H.map.Marker(cameraLatLng, { icon: icon });
      
      marker.addEventListener('tap', () => {
        setSelectedCamera(camera);
        setShowCameraModal(true);
      });
      
      map.addObject(marker);
      return marker;
    });
  
    return cameraMarkersRef.current;
  };

  const getRoadConditonMarkers = async (map: any, ui: any) => {
    const response = await fetch('/api/road-conditions', { cache: 'no-store' });
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
          color = '#8791E5';
          break;
        case 'Bare Wet':
          color = '#8791E5';
          break;
        case 'Ptly Cvd Snw':
          color = '#ADD8E6';
          break;
        case 'Cvd Snw':
          color = '#ADD8E6';
          break;
        case 'Snow Covered':
          color = '#ADD8E6';
          break;
        case 'Ice Covered':
          color = '#FFC000';
          break;
        case "Ptly Cvd Ice":
          color = '#FFC000';
          break;
        case "Cvd Ice":
          color = '#FFC000';
          break;
        case 'Travel Not Recommended':
          color = 'orange';
          break;
        case 'No Report':
          color = 'black';
          break;
        default:
          color = 'black';
      }

      const line = new window.H.map.Polyline(lineString, { style: { strokeColor: color, lineWidth: 4 } });
      map.addObject(line);
      roadConditionMarkersRef.current.push(line as never);
    });

    await Promise.all(tasks);

  };

  // For loading HERE js scripts into the DOM
  const loadScript = (src: string): Promise<void> => {
    if (typeof window !== "undefined") {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          resolve();
        };
        script.onerror = () => {
          reject();
        };
        document.body.appendChild(script);
      });
    }
    return new Promise((res, rej) => { });
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

    if (!isMapInitialized) { loadScriptsInOrder().then(() => initMap()) }
    return () => { };
  }, []);

  return (
    <div style={{ overflow: 'hidden' }} className='flex-grow'>
      <CameraModal open={showCameraModal} selectedCamera={selectedCamera} onClose={() => { setShowCameraModal(false); setSelectedCamera({} as CameraData); }} />
      <MapSideBar showCameras={showCameras} setShowCameras={() => {
        setShowCameras(currentShowCameras => {
          cameraMarkersRef.current.forEach(marker => {
            /**@ts-ignore */
            marker.setVisibility(!currentShowCameras);
          });
          return !currentShowCameras;
        });
      }}
      showRoadConditions={showRoadConditions}
      setShowRoadConditions={() => {
        setShowRoadConditions(currentShowRoadConditions => {
          roadConditionMarkersRef.current.forEach(marker => {
            /**@ts-ignore */
            marker.setVisibility(!currentShowRoadConditions);
          });
          return !currentShowRoadConditions;
        });
      }}
      showConstruction={showConstruction}
      setShowConstruction={() => {
        setShowConstruction(current => {
          constructionMarkersRef.current.forEach(marker => {
            /**@ts-ignore */
            marker.setVisibility(!current);
          });
          return !current;
        });
      }}
      />
      <div id="mapContainer" style={{ width: '100%', height: '95%', position: 'fixed' }} />
      <RoadConditionsLegend />
      <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
    </div>
  );
};

export default Map; 
