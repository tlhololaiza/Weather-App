import { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import type { ForecastType } from './types/weather';
import WeatherCard from './components/WeatherCard/WeatherCard';
import SearchBar from './components/SearchBar/SearchBar';
import ForecastTabs from './components/ForecastTabs/ForecastTabs';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';
import DailyForecast from './components/DailyForecast/DailyForecast';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import SavedLocations from './components/SavedLocations/SavedLocations';
import './App.css';

function App() {
  const { currentWeather, forecast, loading, error, fetchWeatherData } = useWeather();
  const [activeForecast, setActiveForecast] = useState<ForecastType>('hourly');

  const renderForecast = () => {
    if (!forecast) return null;

    switch (activeForecast) {
      case 'hourly':
        return <HourlyForecast forecast={forecast} />;
      case 'daily':
        return <DailyForecast forecast={forecast} />;
      case 'weekly':
        return <WeeklyForecast forecast={forecast} />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <SearchBar onSearch={fetchWeatherData} loading={loading} />
        
        {error && <div className="error-message">{error}</div>}
        
        {loading && <div className="loading">Loading weather data...</div>}
        
        {currentWeather && (
          <>
            <WeatherCard weather={currentWeather} />
            <SavedLocations 
              currentLocation={{
                id: currentWeather.id.toString(),
                name: currentWeather.name,
                country: currentWeather.sys.country,
                coord: currentWeather.coord
              }}
              onLocationSelect={fetchWeatherData}
            />
            <ForecastTabs 
              activeTab={activeForecast}
              onTabChange={setActiveForecast}
            />
            {renderForecast()}
          </>
        )}
      </div>
    </div>
  );
}

export default App;