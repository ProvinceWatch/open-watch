export interface MapProps {
    lat: number;
    lng: number;
    zoom: number;
}

export interface CameraData {
    Latitude: number;
    Longitude: number;
    Url: string;
}

export interface CameraResponse {
    data: {
        data: CameraData[]
    }
}

declare global {
    interface Window {
        H: any;
    }
}