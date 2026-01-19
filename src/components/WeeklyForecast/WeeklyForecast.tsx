import type { ForecastData } from '../../types/weather';
import { Cloud, CloudRain, Sun, Moon, Wind, CloudSnow, CloudFog, CloudDrizzle, CloudLightning } from 'lucide-react';
import './WeeklyForecast.css';

interface WeeklyForecastProps {
  forecast: ForecastData;
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ forecast }) => {
  // For weekly view, we'll show the same 5-day data but with more details
  const weeklyData = forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  const getWeatherIcon = (iconCode: string) => {
    const iconProps = { size: 24, className: 'week-icon' };
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

  return (
    <div className="weekly-forecast">
      <div className="forecast-header">
        <h3>Extended Forecast</h3>
      </div>
      <div className="weekly-list">
        {weeklyData.map((day, index) => (
          <div key={day.dt} className={`weekly-item ${index === 0 ? 'today' : ''}`}>
            <div className="weekly-left">
              <div className="week-date">{formatDate(day.dt)}</div>
              <div className="week-condition">
                <span className="week-icon">{getWeatherIcon(day.weather[0].icon)}</span>
                <span className="week-desc">{day.weather[0].description}</span>
              </div>
            </div>
            <div className="weekly-right">
              <div className="week-temps">
                <span className="week-high">{Math.round(day.main.temp_max)}°</span>
                <span className="week-low">{Math.round(day.main.temp_min)}°</span>
              </div>
              <div className="week-details">
                <div className="week-detail">
                  <span>💧 {Math.round(day.pop * 100)}%</span>
                </div>
                <div className="week-detail">
                  <span>💨 {Math.round(day.wind.speed * 3.6)}km/h</span>
                </div>
                <div className="week-detail">
                  <span>💦 {day.main.humidity}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;