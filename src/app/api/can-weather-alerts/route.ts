import { NextResponse } from 'next/server';
import { CanadaWeatherAlerts, Feature } from './types';

export async function GET() {
  try {
    const res = await fetch('https://weather.gc.ca/data/dms/alert_geojson/alerts.en.geojson');
    const canWeatherAlerts: CanadaWeatherAlerts  = await res.json();
    const abAlerts: Feature[] = canWeatherAlerts.features
      .filter((alert: Feature) => alert.properties.prov == 'AB');
    return NextResponse.json(abAlerts);
  } catch (error) {
    console.log(error);
    return NextResponse.json([])
  }
}