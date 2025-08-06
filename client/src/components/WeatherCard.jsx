import React from 'react';

const WeatherCard = ({ city }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full sm:w-64 text-center">
      <h2 className="text-xl font-semibold">{city.name}</h2>
      <p className="text-gray-600 capitalize">{city.condition}</p>
      <p className="text-2xl mt-2">{city.temperature}°C</p>
      
    </div>
  );
};

export default WeatherCard;
