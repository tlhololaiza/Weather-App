import type { ForecastData } from '../../types/weather';
import { Cloud, CloudRain, Sun, Moon, Wind, CloudSnow, CloudFog, CloudDrizzle, CloudLightning } from 'lucide-react';
import './HourlyForecast.css';

interface HourlyForecastProps {
  forecast: ForecastData;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecast }) => {
  // Interpolate 3-hour data to create hourly forecasts
  const createHourlyData = () => {
    const hourlyInterpolated = [];
    const sourceData = forecast.list.slice(0, 8); // 24 hours in 3-hour intervals
    
    for (let i = 0; i < sourceData.length - 1; i++) {
      const current = sourceData[i];
      const next = sourceData[i + 1];
      
      // Add the current 3-hour interval data point
      hourlyInterpolated.push(current);
      
      // Interpolate 2 hourly points between current and next 3-hour intervals
      for (let hour = 1; hour <= 2; hour++) {
        const ratio = hour / 3;
        hourlyInterpolated.push({
          dt: current.dt + (3600 * hour),
          main: {
            temp: current.main.temp + (next.main.temp - current.main.temp) * ratio,
            feels_like: current.main.feels_like + (next.main.feels_like - current.main.feels_like) * ratio,
            temp_min: current.main.temp_min,
            temp_max: current.main.temp_max,
            pressure: current.main.pressure,
            humidity: current.main.humidity,
          },
          weather: current.weather,
          wind: {
            speed: current.wind.speed + (next.wind.speed - current.wind.speed) * ratio,
            deg: current.wind.deg,
          },
          pop: current.pop + (next.pop - current.pop) * ratio,
        });
      }
    }
    
    // Add the last data point
    hourlyInterpolated.push(sourceData[sourceData.length - 1]);
    
    // Return first 24 hours
    return hourlyInterpolated.slice(0, 24);
  };

  const hourlyData = createHourlyData();

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
  };

  const getWeatherIcon = (iconCode: string) => {
    const iconProps = { size: 32, className: 'weather-icon' };
    const iconMap: { [key: string]: React.ReactNode } = {
      '01d': <Sun {...iconProps} />,
      '01n': <Moon {...iconProps} />,
      '02d': <Cloud {...iconProps} />,
      '02n': <Cloud {...iconProps} />,
      '03d': <Cloud {...iconProps} />,
      '03n': <Cloud {...iconProps} />,
      '04d': <Cloud {...iconProps} />,
      '04n': <Cloud {...iconProps} />,
      '09d': <CloudDrizzle {...iconProps} />,
      '09n': <CloudDrizzle {...iconProps} />,
      '10d': <CloudRain {...iconProps} />,
      '10n': <CloudRain {...iconProps} />,
      '11d': <CloudLightning {...iconProps} />,
      '11n': <CloudLightning {...iconProps} />,
      '13d': <CloudSnow {...iconProps} />,
      '13n': <CloudSnow {...iconProps} />,
      '50d': <CloudFog {...iconProps} />,
      '50n': <CloudFog {...iconProps} />,
    };
    return iconMap[iconCode] || <Sun {...iconProps} />;
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