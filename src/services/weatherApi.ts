import type { WeatherData, ForecastData } from '../types/weather';

const API_KEY = '2b886d2ea7ff4c2aeb201bf433764a44';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Cache keys
const CACHE_PREFIX = 'weather-app-cache-';
const WEATHER_CACHE_KEY = `${CACHE_PREFIX}weather`;
const FORECAST_CACHE_KEY = `${CACHE_PREFIX}forecast`;
const TIMESTAMP_KEY = `${CACHE_PREFIX}timestamp`;

// Cache management
const cacheManager = {
  setWeatherCache: (weather: WeatherData) => {
    localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(weather));
    localStorage.setItem(TIMESTAMP_KEY, new Date().toISOString());
  },
  
  getWeatherCache: (): WeatherData | null => {
    const cached = localStorage.getItem(WEATHER_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  },
  
  setForecastCache: (forecast: ForecastData) => {
    localStorage.setItem(FORECAST_CACHE_KEY, JSON.stringify(forecast));
  },
  
  getForecastCache: (): ForecastData | null => {
    const cached = localStorage.getItem(FORECAST_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  },
  
  getLastUpdate: (): string | null => {
    return localStorage.getItem(TIMESTAMP_KEY);
  },
  
  clearCache: () => {
    localStorage.removeItem(WEATHER_CACHE_KEY);
    localStorage.removeItem(FORECAST_CACHE_KEY);
    localStorage.removeItem(TIMESTAMP_KEY);
  }
};

export const weatherApi = {
  getCurrentWeather: async (city: string): Promise<WeatherData> => {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      const data = await response.json();
      cacheManager.setWeatherCache(data);
      return data;
    } catch (error) {
      // Return cached data if fetch fails
      const cached = cacheManager.getWeatherCache();
      if (cached) {
        return cached;
      }
      throw error;
    }
  },

  getCurrentWeatherByCoords: async (lat: number, lon: number): Promise<WeatherData> => {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      const data = await response.json();
      cacheManager.setWeatherCache(data);
      return data;
    } catch (error) {
      // Return cached data if fetch fails
      const cached = cacheManager.getWeatherCache();
      if (cached) {
        return cached;
      }
      throw error;
    }
  },

  getForecast: async (city: string): Promise<ForecastData> => {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('Forecast data not found');
      }
      const data = await response.json();
      cacheManager.setForecastCache(data);
      return data;
    } catch (error) {
      // Return cached data if fetch fails
      const cached = cacheManager.getForecastCache();
      if (cached) {
        return cached;
      }
      throw error;
    }
  },

  getForecastByCoords: async (lat: number, lon: number): Promise<ForecastData> => {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('Forecast data not found');
      }
      const data = await response.json();
      cacheManager.setForecastCache(data);
      return data;
    } catch (error) {
      // Return cached data if fetch fails
      const cached = cacheManager.getForecastCache();
      if (cached) {
        return cached;
      }
      throw error;
    }
  },
  
  getLastUpdate: () => cacheManager.getLastUpdate(),
  clearCache: () => cacheManager.clearCache(),
};