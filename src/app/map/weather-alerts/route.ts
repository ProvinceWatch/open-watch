import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://weather.gc.ca/data/dms/alert_geojson/alerts.en.geojson', {
      headers: {
        'Cache-Control': 'max-age=0'
      },
    });
    const data = await res.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: [] })
  }
}