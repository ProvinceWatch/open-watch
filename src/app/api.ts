export const fetchWeather             = () => fetch('/api/weather').then(res => res.json())
export const fetchAlbertaAlerts       = () => fetch('/api/ab-alerts').then(res => res.json())
export const fetchCanadaWeatherAlerts = () => fetch('/api/can-weather-alerts').then(res => res.json())
