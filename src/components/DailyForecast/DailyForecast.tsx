import type { ForecastData } from '../../types/weather';
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