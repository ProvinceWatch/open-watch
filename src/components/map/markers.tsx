import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import { getColourForRoadCondition } from './roadConditionsMap';
import { ConstructionData } from '@/app/api/construction/types';
import { CameraData } from '@/app/map/defs';
import { RoadConditionsData } from '@/app/api/road-conditions/types';
import polyline from '@mapbox/polyline';

export const getConstructionMarkers = async (map: any, constructionMarkersRef: any, showConstruction: boolean) => {
  const res = await fetch('/api/construction');
  const constructionData = await res.json() as ConstructionData[];

  constructionMarkersRef.current = constructionData.map((event) => {
    const latlng = { lat: event.Latitude, lng: event.Longitude };
    const icon = new window.H.map.Icon('/construction.png', { size: { w: 50, h: 50 } });
    const marker = new window.H.map.Marker(latlng, { icon: icon });

    marker.addEventListener('tap', () => {
      // TODO
    });

    marker.setVisibility(showConstruction);
    map.addObject(marker);
    return marker;
  });
}

export const getCameraMarkers = async (
  map: any,
  cameraMarkersRef: any,
  setSelectedCamera: (checked: any) => void,
  setShowCameraModal: (checked: any) => void
) => {
  const res = await fetch('/api/cameras');
  const cameraResponse = await res.json();
  const cameras = cameraResponse.data as CameraData[];

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

export const getRoadConditonMarkers = async (map: any, roadConditionMarkersRef: any) => {
  const response = await fetch('/api/road-conditions', { cache: 'no-store' });
  const roadConditions = await response.json();

  const tasks = roadConditions.data.map(async (roadCondition: RoadConditionsData) => {
    const decodedPolyline = polyline.decode(roadCondition.EncodedPolyline);
    const lineString = new window.H.geo.LineString();
    decodedPolyline.forEach((coords: number[]) => {
      lineString.pushPoint({ lat: coords[0], lng: coords[1] });
    });

    const color = getColourForRoadCondition(roadCondition)
    const line = new window.H.map.Polyline(lineString, { style: { strokeColor: color, lineWidth: 4 } });
    map.addObject(line);
    roadConditionMarkersRef.current.push(line as never);
  });

  await Promise.all(tasks);
};

export const addAlbertaBorder = (map: any) => {
  const reader = new window.H.data.geojson.Reader(process.env.ALBERTA_BORDER_GEO_JSON);
  reader.parse();
  map.addLayer(reader.getLayer());
}

export const handleMarkerVisibility = (
  markerStateSetter: Dispatch<SetStateAction<boolean>>,
  markerArrayRef: MutableRefObject<any[]>
) => {
  return () => markerStateSetter((current: boolean) => {
    markerArrayRef.current.forEach((marker) => {
      marker.setVisibility(!current);
    });
    return !current;
  });
}