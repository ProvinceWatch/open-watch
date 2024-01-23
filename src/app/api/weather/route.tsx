import { NextResponse } from 'next/server';
 
export async function GET() {
 const res = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=51.0447&lon=114.0719&appid=${process.env.OWM_API_KEY}`)
}