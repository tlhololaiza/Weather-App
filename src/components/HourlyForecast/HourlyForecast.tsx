import type { ForecastData } from '../../types/weather';
import './HourlyForecast.css';

interface HourlyForecastProps {
  forecast: ForecastData;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecast }) => {
  // Get next 24 hours (8 * 3-hour intervals)
  const hourlyData = forecast.list.slice(0, 8);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
  };

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: string } = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️',
    };
    return iconMap[iconCode] || '☀️';
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 30) return '#FF6B35';
    if (temp >= 20) return '#FFA726';
    if (temp >= 10) return '#66BB6A';
    if (temp >= 0) return '#42A5F5';
    return '#AB47BC';
  };

  return (
    <div className="hourly-forecast-new">
      <div className="hourly-scroll-container">
        {hourlyData.map((hour, index) => (
          <div 
            key={hour.dt} 
            className={`hourly-item-new ${index === 0 ? 'current' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="hour-time-new">
              {index === 0 ? 'Now' : formatTime(hour.dt)}
            </div>
            
            <div className="hour-icon-new">
              {getWeatherIcon(hour.weather[0].icon)}
            </div>
            
            <div className="hour-temp-new">
              <span 
                className="temp-value"
                style={{ color: getTemperatureColor(hour.main.temp) }}
              >
                {Math.round(hour.main.temp)}°
              </span>
            </div>
            
            <div className="hour-desc-new">
              {hour.weather[0].main}
            </div>
            
            <div className="hour-details">
              <div className="detail-item">
                <span className="detail-icon">💧</span>
                <span className="detail-value">{Math.round(hour.pop * 100)}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">💨</span>
                <span className="detail-value">{Math.round(hour.wind.speed * 3.6)}km/h</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;