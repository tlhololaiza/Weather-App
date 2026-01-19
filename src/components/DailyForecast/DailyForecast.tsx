import type { ForecastData } from '../../types/weather';
import { Cloud, CloudRain, Sun, Moon, CloudSnow, CloudFog, CloudDrizzle, CloudLightning } from 'lucide-react';
import './DailyForecast.css';

interface DailyForecastProps {
  forecast: ForecastData;
}

const DailyForecast: React.FC<DailyForecastProps> = ({ forecast }) => {
  // Group forecast data by day (taking one entry per day, preferably around noon)
  const dailyData = forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5);

  const formatDay = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  const getWeatherIcon = (iconCode: string) => {
    const iconProps = { size: 28, className: 'day-icon' };
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
    <div className="daily-forecast">
      <div className="forecast-header">
        <h3>5-Day Forecast</h3>
      </div>
      <div className="daily-list">
        {dailyData.map((day, index) => (
          <div key={day.dt} className={`daily-item ${index === 0 ? 'today' : ''}`}>
            <div className="day-name">
              {formatDay(day.dt)}
            </div>
            <div className="day-icon">
              {getWeatherIcon(day.weather[0].icon)}
            </div>
            <div className="day-desc">
              {day.weather[0].main}
            </div>
            <div className="day-temps">
              <span className="temp-high">{Math.round(day.main.temp_max)}°</span>
              <span className="temp-low">{Math.round(day.main.temp_min)}°</span>
            </div>
            <div className="day-rain">
              💧 {Math.round(day.pop * 100)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;