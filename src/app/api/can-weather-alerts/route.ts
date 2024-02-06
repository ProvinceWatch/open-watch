import { NextResponse } from 'next/server';
import { CanadaWeatherAlerts, Feature } from './types';

export async function GET(): Promise<NextResponse> {
  try {
    const res = await fetch(
      'https://weather.gc.ca/data/dms/alert_geojson/alerts.en.geojson',
      { next: { revalidate: 60 } }
    );
    
    const alerts: CanadaWeatherAlerts = await res.json();
    const abAlerts: Feature[] = alerts.features.filter((alert: Feature) => alert.properties.prov == 'AB');
    return NextResponse.json(abAlerts);
  } catch (error) {
    console.log(error);
    return NextResponse.json([]);
  }
}