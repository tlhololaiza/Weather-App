import type { WeatherData } from '../../types/weather';
import './WeatherCard.css';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const temperature = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const humidity = weather.main.humidity;
  const windSpeed = Math.round(weather.wind.speed * 3.6); // Convert m/s to km/h
  const description = weather.weather[0].description;
  const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location-info">
          <div className="location-icon">📍</div>
          <span className="location-name">{weather.name}</span>
        </div>
        <div className="temperature-toggle">
          <span className="temp-unit active">°C</span>
          <span className="temp-divider">/</span>
          <span className="temp-unit">°F</span>
        </div>
      </div>
      
      <div className="main-weather">
        <div className="temperature">
          {temperature}°C
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
          <div className="detail-value">{feelsLike}°C</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;