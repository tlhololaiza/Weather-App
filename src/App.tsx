import './App.css'
import DailyForecast from './components/DailyForecast/DailyForecast'
import ForecastTabs from './components/ForecastTabs/ForecastTabs'
import HourlyForecast from './components/HourlyForecast/HourlyForecast'
import SearchBar from './components/SearchBar/SearchBar'
import WeatherCard from './components/WeatherCard/WeatherCard'
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast'
import React from 'react';
import type { ForecastData } from './types/weather';
import type { WeatherData } from './types/weather';




function App() {
  
  return (
    <>
      
          <h1>City Search</h1>
          <p>Enter a city name to search for weather information.</p>
        
        <SearchBar onSearch={(city) => console.log(`Searching for: ${city}`)} loading={false} />
        
         

      <ForecastTabs activeTab="hourly" onTabChange={(tab) => console.log(`Active tab changed to: ${tab}`)} />
      
      
    </>
  )
}

export default App
