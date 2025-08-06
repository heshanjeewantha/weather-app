import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from './services/weatherService';
import WeatherCard from './components/WeatherCard';


function App() {
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchData() {
        try {
          const data = await fetchWeatherData();
          setWeatherData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching weather data:', error);
          setLoading(false);
        }
      }
      fetchData();
    }, []);

  return (
    
    <div className="min-h-screen bg-blue-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">🌤️ Weather Dashboard</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading weather data...</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {weatherData.map((city, index) => (
            <WeatherCard key={index} city={city} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;