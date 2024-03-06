"use client"

import { useEffect, FC, useState, useRef } from 'react';
import { MapProps, CameraData } from '@/app/map/defs';
import MapSideBar from '@/components/map/MapSideBar';
import CameraModal from '@/components/cameras/CameraModal';
import RoadConditionsLegend from '@/components/map/RoadConditionsLegend';
import { loadScript } from '@/components/map/util';
import {
  getConstructionMarkers,
  getCameraMarkers,
  getRoadConditonMarkers,
  addAlbertaBorder,
  handleMarkerVisibility
} from '@/components/map/markers';

const Map: FC<MapProps> = ({ zoom }) => {
  // map states
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showConstructionInfo, setShowConstructionInfo] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState({} as CameraData);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [showCameras, setShowCameras] = useState(true);
  const [showRoadConditions, setShowRoadConditions] = useState(true);
  const [showConstruction, setShowConstruction] = useState(false);

  // marker refs
  const cameraMarkersRef = useRef([] as any[]);
  const roadConditionMarkersRef = useRef([] as any[]);
  const constructionMarkersRef = useRef([] as any[]);

  const initMap = async () => {
    if (document.querySelector('.H_imprint')) { return };

    const platform = new window.H.service.Platform({
      apikey: process.env.HERE_API_KEY,
    });

    const defaultLayers = platform.createDefaultLayers();
    const map = new window.H.Map(
      document.getElementById('mapContainer'),
      defaultLayers.raster.normal.mapnight,
      {
        center: { lat: 53.9333, lng: -116.5765 },
        zoom: zoom,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
    window.H.ui.UI.createDefault(map, defaultLayers);
    window.addEventListener('resize', () => map.getViewPort().resize());

    // initialize markers
    await getRoadConditonMarkers(map, roadConditionMarkersRef);
    await getCameraMarkers(map, cameraMarkersRef, setSelectedCamera, setShowCameraModal);
    await getConstructionMarkers(map, constructionMarkersRef, showConstruction);
    addAlbertaBorder(map);
    setIsMapInitialized(true);
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
      <MapSideBar
        showCameras={showCameras}
        showRoadConditions={showRoadConditions}
        showConstruction={showConstruction}
        setShowCameras={handleMarkerVisibility(setShowCameras, cameraMarkersRef)}
        setShowRoadConditions={handleMarkerVisibility(setShowRoadConditions, roadConditionMarkersRef)}
        setShowConstruction={handleMarkerVisibility(setShowConstruction, constructionMarkersRef)}
      />
      <div id="mapContainer" style={{ width: '100%', height: '95%', position: 'fixed' }} />
      <RoadConditionsLegend />
      <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
    </div>
  );
};

export default Map; 
