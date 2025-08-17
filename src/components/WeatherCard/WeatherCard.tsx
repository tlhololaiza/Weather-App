import { useState } from 'react';
import type { WeatherData } from '../../types/weather';
import './WeatherCard.css';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  
  // Helper function to convert Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius: number): number => {
    return Math.round((celsius * 9/5) + 32);
  };
  
  // Get temperatures in both units
  const tempCelsius = Math.round(weather.main.temp);
  const tempFahrenheit = celsiusToFahrenheit(weather.main.temp);
  const feelsLikeCelsius = Math.round(weather.main.feels_like);
  const feelsLikeFahrenheit = celsiusToFahrenheit(weather.main.feels_like);
  
  // Current display values based on selected unit
  const currentTemp = isCelsius ? tempCelsius : tempFahrenheit;
  const currentFeelsLike = isCelsius ? feelsLikeCelsius : feelsLikeFahrenheit;
  const tempUnit = isCelsius ? '°C' : '°F';
  
  const humidity = weather.main.humidity;
  const windSpeed = Math.round(weather.wind.speed * 3.6); // Convert m/s to km/h
  const description = weather.weather[0].description;
  const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);

  const handleTempUnitToggle = (unit: 'celsius' | 'fahrenheit') => {
    setIsCelsius(unit === 'celsius');
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location-info">
          <div className="location-icon">📍</div>
          <span className="location-name">{weather.name}</span>
        </div>
        <div className="temperature-toggle">
          <span 
            className={`temp-unit ${isCelsius ? 'active' : ''}`}
            onClick={() => handleTempUnitToggle('celsius')}
          >
            °C
          </span>
          <span className="temp-divider">/</span>
          <span 
            className={`temp-unit ${!isCelsius ? 'active' : ''}`}
            onClick={() => handleTempUnitToggle('fahrenheit')}
          >
            °F
          </span>
        </div>
      </div>
      
      <div className="main-weather">
        <div className="temperature">
          {currentTemp}{tempUnit}
        </div>
        <div className="weather-description">
          {capitalizedDescription}
        </div>
      </div>
      
      <div className="weather-details">
        <div className="weather-detail">
          <div className="detail-label">Humidity</div>
          <div className="detail-value">{humidity}%</div>
        </div>
        <div className="weather-detail">
          <div className="detail-label">Wind</div>
          <div className="detail-value">{windSpeed} km/h</div>
        </div>
        <div className="weather-detail">
          <div className="detail-label">Feels Like</div>
          <div className="detail-value">{currentFeelsLike}{tempUnit}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;