import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const fetchWeatherData = async () => {
    try {
        const response = await axios.get(`${API_BASE}/api/weather`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}