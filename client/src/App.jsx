// src/App.jsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import WeatherCard from './components/WeatherCard';
import { fetchWeatherData } from './services/weatherService';

function App() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } = useAuth0();
  const [weatherData, setWeatherData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchWeatherData()
        .then(data => {
          setWeatherData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error:", err);
          setLoading(false);
        });
    }
  }, [isAuthenticated]);

  if (isLoading) return <div className="text-center mt-10">Loading auth...</div>;

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🌤️ Weather Dashboard</h1>
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span>Welcome, {user.name}</span>
            <button onClick={() => logout({ returnTo: window.location.origin })} className="bg-red-500 text-white px-3 py-1 rounded">
              Logout
            </button>
          </div>
        ) : (
          <button onClick={() => loginWithRedirect()} className="bg-blue-600 text-white px-4 py-2 rounded">
            Login
          </button>
        )}
      </div>

      {!isAuthenticated ? (
        <p className="text-center text-gray-600">🔒 Please log in to view weather data.</p>
      ) : loading ? (
        <p className="text-center">Loading weather data...</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {weatherData.map((city, i) => (
            <WeatherCard key={i} city={city} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
