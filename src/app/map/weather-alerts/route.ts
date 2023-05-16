import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await axios.get('https://weather.gc.ca/data/dms/alert_geojson/alerts.en.geojson', {});
    const data = res.data;
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ data: [] })
  }
}