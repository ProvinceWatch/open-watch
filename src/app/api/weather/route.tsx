import { NextResponse } from 'next/server';

const headers =  {
  headers: {
    'Cache-Control': 'max-age=0'
  },
};

export async function GET() {
  const calgaryWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=51.0447&lon=114.0719&appid=${process.env.OWM_API_KEY}&units=metric`, headers);
  const calgaryData = await calgaryWeather.json();

  const edmontonWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=53.54617&lon=113.4937&appid=${process.env.OWM_API_KEY}&units=metric`, headers);
  const edmontonData = await edmontonWeather.json();


  const lethbridgeWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=49.6956&lon=112.8451&appid=${process.env.OWM_API_KEY}&units=metric`, headers);
  const lethbridgeData = await lethbridgeWeather.json();

  const medicineHatWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=50.0290&lon=110.7032&appid=${process.env.OWM_API_KEY}&units=metric`, headers);
  const medicineHatData = await medicineHatWeather.json();

  return NextResponse.json({
    data: {
      Calgary: calgaryData,
      Edmonton: edmontonData,
      Lethbridge: lethbridgeData,
      'Medicine Hat': medicineHatData
    }
  });
}