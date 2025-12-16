const axios = require('axios');

async function fetchWeatherForCity(city) {
  const trimmed = String(city || '').trim();
  if (!trimmed) {
    const err = new Error('City is required');
    err.status = 400;
    throw err;
  }

  const geoUrl = 'https://geocoding-api.open-meteo.com/v1/search';
  const geoRes = await axios.get(geoUrl, {
    params: {
      name: trimmed,
      count: 1,
      language: 'en',
      format: 'json'
    },
    timeout: 8000
  });

  const first = geoRes.data && geoRes.data.results && geoRes.data.results[0];
  if (!first) {
    const err = new Error(`No results found for city: ${trimmed}`);
    err.status = 404;
    throw err;
  }

  const latitude = first.latitude;
  const longitude = first.longitude;
  const resolvedName = [first.name, first.admin1, first.country]
    .filter(Boolean)
    .join(', ');

  const weatherUrl = 'https://api.open-meteo.com/v1/forecast';
  const weatherRes = await axios.get(weatherUrl, {
    params: {
      latitude,
      longitude,
      current: 'temperature_2m,weather_code',
      timezone: 'auto'
    },
    timeout: 8000
  });

  const current = weatherRes.data && weatherRes.data.current;
  if (!current || typeof current.temperature_2m !== 'number') {
    const err = new Error('Unexpected weather response from Open-Meteo');
    err.status = 502;
    throw err;
  }

  return {
    resolvedName,
    latitude,
    longitude,
    temperatureC: current.temperature_2m,
    weatherCode: current.weather_code,
    fetchedAt: new Date()
  };
}

module.exports = { fetchWeatherForCity };
