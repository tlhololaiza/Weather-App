import { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { ThemeProvider } from './contexts/ThemeContext';
import { AlertProvider, useAlert } from './contexts/AlertContext';
import type { ForecastType } from './types/weather';
import { Snowflake } from 'lucide-react';
import WeatherCard from './components/WeatherCard/WeatherCard';
import SearchBar from './components/SearchBar/SearchBar';
import ForecastTabs from './components/ForecastTabs/ForecastTabs';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';
import DailyForecast from './components/DailyForecast/DailyForecast';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import SavedLocations from './components/SavedLocations/SavedLocations';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import Alert from './components/Alert/Alert';
import './App.css';

function AppContent() {
  const { currentWeather, forecast, loading, error, lastUpdate, fetchWeatherData } = useWeather();
  const { alerts } = useAlert();
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
      <div className="alerts-container">
        {alerts.map(alert => (
          <Alert key={alert.id} alert={alert} />
        ))}
      </div>
      <div className="app-header">
        <div className="header-title">
          <Snowflake size={32} className="header-icon" />
          <h1>Weather</h1>
        </div>
        <ThemeToggle />
      </div>
      <div className="app-container">
        <div className="search-section">
          <SearchBar onSearch={fetchWeatherData} loading={loading} />
          {currentWeather && (
            <div className="saved-locations-inline">
              <SavedLocations 
                currentLocation={{
                  id: currentWeather.id.toString(),
                  name: currentWeather.name,
                  country: currentWeather.sys.country,
                  coord: currentWeather.coord
                }}
                onLocationSelect={fetchWeatherData}
              />
            </div>
          )}
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        {loading && <div className="loading">Loading weather data...</div>}
        
        {currentWeather && (
          <>
            <WeatherCard weather={currentWeather} lastUpdate={lastUpdate} />
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

function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <AppContent />
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;