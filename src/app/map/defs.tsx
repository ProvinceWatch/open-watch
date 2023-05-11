export interface MapProps {
    lat: number;
    lng: number;
    zoom: number;
}

export interface CameraData {
    Latitude: number;
    Longitude: number;
    Url: string;
    AirTemperature: number,
    Description: string,
    DirectionOfTravel: string,
    HasRWISData: boolean,
    Id: string,
    Name: string,
    Organization: string,
    PavementTemperature: number,
    RelativeHumidity: number,
    RoadwayName: string,
    Status: string,
    WindDirection: string,
    WindSpeed: number,
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