import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://weather.gc.ca/data/dms/alert_geojson/alerts.en.geojson', { cache: 'no-store' });
    const data = await res.json();
    console.log('DATA FROM WEATHER ALERTS HERE');
    console.log(data);
    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: [] })
  }
}