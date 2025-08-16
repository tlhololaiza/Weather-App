import type { WeatherData, ForecastData } from '../types/weather';

const API_KEY = '2b886d2ea7ff4c2aeb201bf433764a44';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherApi = {
  getCurrentWeather: async (city: string): Promise<WeatherData> => {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error('Weather data not found');
    }
    return response.json();
  },

  getCurrentWeatherByCoords: async (lat: number, lon: number): Promise<WeatherData> => {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error('Weather data not found');
    }
    return response.json();
  },

  getForecast: async (city: string): Promise<ForecastData> => {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error('Forecast data not found');
    }
    return response.json();
  },

  getForecastByCoords: async (lat: number, lon: number): Promise<ForecastData> => {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error('Forecast data not found');
    }
    return response.json();
  },
};