
const axios = require('axios');
const cache = require('../cache/cache');
const { getCityIds } = require('../utils/readCities');

const API_KEY = process.env.OPENWEATHER_API_KEY;

// Helper function to fetch weather for a single city
const fetchCityWeather = async (cityId) => {
  try {
    const url = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${API_KEY}`;
    const response = await axios.get(url);
    return {
      name: response.data.name,
      condition: response.data.weather[0].description,
      temperature: response.data.main.temp
    };
  } catch (error) {
    console.error(`Failed to fetch weather for city ID ${cityId}:`, error.message);
    return null;
  }
};

// Helper function to fetch all cities weather
const fetchAllCitiesWeather = async () => {
  const cityIds = getCityIds().split(',');
  console.log(' Fetching weather for cities:', cityIds.join(','));
  
  const weatherPromises = cityIds.map(fetchCityWeather);
  const results = await Promise.all(weatherPromises);
  
  return results.filter(Boolean); 
};

const getWeatherData = async (req, res) => {
  const cacheKey = 'weather_data';

  // Check cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log('📦 Serving from cache');
    return res.json(cachedData);
  }

  try {
    const weatherList = await fetchAllCitiesWeather();
    
    // Save to cache
    cache.set(cacheKey, weatherList);
    console.log('🌐 Fetched from API');
    
    res.json(weatherList);
  } catch (error) {
    console.error(' Error fetching weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

module.exports = { getWeatherData };
