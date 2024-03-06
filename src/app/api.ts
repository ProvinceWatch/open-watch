const fetchfn = (endpoint: string) : () => Promise<Response> => {
  return () => fetch(endpoint, {cache: 'no-cache'}).then((res) => res.json());
}

export const fetchWeather             = fetchfn('/api/weather');
export const fetchAlbertaAlerts       = fetchfn('/api/ab-alerts');
export const fetchCanadaWeatherAlerts = fetchfn('/api/can-weather-alerts');
