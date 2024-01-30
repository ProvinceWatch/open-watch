import { NextResponse } from 'next/server';

const LAT_LONGS: LatLongs = {
  'Banff': {
    lat: 51.1784,
    lon: -115.5708
  },
  'Calgary': {
    lat: 51.0447,
    lon: 14.0719,
  },
  'Canmore': {
    lat: 51.0884,
    lon: -115.3479
  },
  'Edmonton': {
    lat: 53.54617,
    lon: -113.4937,
  },
  'Lethbridge': {
    lat: 49.6956,
    lon: -112.8451,
  },
  'Medicine Hat': {
    lat: 50.0290,
    lon: -110.7032,
  },
};

export async function GET(): Promise<NextResponse> {
  const res: Record<string, WeatherData> = {};

  for (const [city, loc] of Object.entries(LAT_LONGS)) {
    console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${process.env.OWM_API_KEY}&units=metric`);
    const cityWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${process.env.OWM_API_KEY}&units=metric`,
      { cache: 'no-store' }
    );
    const weatherData: WeatherData = await cityWeather.json();
    res[city] = weatherData;
  }

  return NextResponse.json(res);
}
