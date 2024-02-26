import { NextResponse } from 'next/server';
import { CanadaWeatherAlerts, Feature } from './types';

export async function GET(): Promise<NextResponse> {
  try {
    const res = await fetch('https://weather.gc.ca/data/dms/alert_geojson/alerts.en.geojson');
    const alerts: CanadaWeatherAlerts = await res.json();
    const abAlerts: Feature[] = alerts.features.filter((alert: Feature) => alert.properties.prov == 'AB');
    const response = NextResponse.json(abAlerts);
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json([]);
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 10;