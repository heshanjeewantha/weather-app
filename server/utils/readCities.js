const fs =require('fs');
const path = require('path');

function getCityIds() {
  const filePath = path.join(__dirname, '../../cities.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  const citiesData = JSON.parse(data);
  const cities = citiesData.List; // Extract the List array from the JSON object
  return cities.map(city => city.CityCode).join(',');
}

module.exports = { getCityIds };