import { useState, useEffect } from 'react';
import type { WeatherData, ForecastData } from '../types/weather';
import { weatherApi } from '../services/weatherApi';
import { useAlert } from '../contexts/AlertContext';

export const useWeather = () => {
  const { showAlert } = useAlert();
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(() => {
    // Initialize with cached data if available
    try {
      const cached = localStorage.getItem('weather-app-cache-weather');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  
  const [forecast, setForecast] = useState<ForecastData | null>(() => {
    // Initialize with cached data if available
    try {
      const cached = localStorage.getItem('weather-app-cache-forecast');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(() => {
    return localStorage.getItem('weather-app-cache-timestamp');
  });

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherApi.getCurrentWeather(city),
        weatherApi.getForecast(city)
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setLastUpdate(weatherApi.getLastUpdate());
      showAlert('success', `Weather data loaded for ${weatherData.name}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      showAlert('error', errorMessage);
      // Data might still be set from cache, so we don't clear it
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherApi.getCurrentWeatherByCoords(lat, lon),
        weatherApi.getForecastByCoords(lat, lon)
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setLastUpdate(weatherApi.getLastUpdate());
      showAlert('success', `Weather data loaded for ${weatherData.name}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      showAlert('error', errorMessage);
      // Data might still be set from cache, so we don't clear it
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get user's location and fetch weather on initial load
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
      },
      () => {
        // Fallback to New York if geolocation fails
        fetchWeatherData('New York');
      }
    );
  }, []);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    lastUpdate,
    fetchWeatherData,
    fetchWeatherByCoords,
  };
};