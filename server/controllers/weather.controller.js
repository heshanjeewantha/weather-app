
const axios = require('axios');
const cache = require('../cache/cache');
const { getCityIds } = require('../utils/readCities');

const API_KEY = process.env.OPENWEATHER_API_KEY;

const getWeatherData = async (req, res) => {
  const cacheKey = 'weather_data';

  // 1. Check cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log('Serving from cache');
    return res.json(cachedData);
  }

  try {
    // 2. Get city IDs
    const cityIds = getCityIds();
    console.log('🌍 Fetching weather for cities:', cityIds);

    // Call OpenWeatherMap API for each city individually
    // (Group endpoint requires higher subscription level)
    const cityIdArray = cityIds.split(',');
    const weatherPromises = cityIdArray.map(async (cityId) => {
      try {
        const url = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${API_KEY}`;
        const response = await axios.get(url);
        return {
          name: response.data.name,
          condition: response.data.weather[0].description,
          temperature: response.data.main.temp
        };
      } catch (error) {
        console.error(` Failed to fetch weather for city ID ${cityId}:`, error.message);
        return null; 
        // Return null for failed requests
      }
    });

    //  Wait for all API calls to complete and filter out failed ones
    const results = await Promise.all(weatherPromises);
    const weatherList = results.filter(item => item !== null);

    //  Save to cache
    cache.set(cacheKey, weatherList);
    console.log('🌐 Fetched from API');

    res.json(weatherList);
  } catch (error) {
    console.error(' Error fetching weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

module.exports = { getWeatherData };
