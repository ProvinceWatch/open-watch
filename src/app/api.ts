export const fetchWeather = () => fetch('/api/weather').then(res => res.json())

export const fetchEmergencyAlerts = () => fetch('/api/emergency-alerts').then(res => res.json())

export const fetchWeatherAlerts = () => fetch('/api/weather-alerts').then(res => res.json())
