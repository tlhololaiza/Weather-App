import { useState, useEffect } from 'react';
import type { WeatherData, ForecastData } from '../types/weather';
import { weatherApi } from '../services/weatherApi';

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
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
    fetchWeatherData,
    fetchWeatherByCoords,
  };
};