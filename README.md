# ☀️ Weather App

A modern, feature-rich weather application built with React, TypeScript, and Vite. Get real-time weather information, forecasts, and manage your favorite locations with a beautiful glass-morphism UI that adapts to light and dark themes.

## ✨ Features

### 🌤️ Weather Information
- **Real-time weather data** from OpenWeatherMap API
- **Current conditions** including temperature, humidity, wind speed, visibility, pressure, sunrise, and sunset
- **Temperature unit toggle** - Switch between Celsius and Fahrenheit
- **Weather descriptions** with dynamic icon representations

### 📊 Forecasts
- **Hourly Forecast** - 24 consecutive hours with interpolated data for smooth transitions
- **Daily Forecast** - 5-day outlook with high/low temperatures and precipitation probability
- **Weekly Forecast** - Extended 5-day forecast with detailed weather conditions

### 🔍 Smart Search
- **Live search suggestions** - Get city recommendations as you type (debounced API calls)
- **Popular cities** - Quick access to frequently searched locations
- **Geolocation support** - Automatically detect and display weather for your current location

### 💾 Location Management
- **Save locations** - Bookmark your favorite cities for quick access
- **Dropdown menu** - Easy navigation through saved locations with hamburger menu
- **Smart alerts** - Visual notifications for save/remove actions

### 🎨 Beautiful UI/UX
- **Glass-morphism design** - Modern frosted glass effect with backdrop blur
- **Light/Dark themes** - Seamless theme switching with persistent preferences
- **Responsive layout** - Optimized for desktop, tablet, and mobile devices
- **Smooth animations** - Slide-in alerts, hover effects, and transitions
- **Lucide React icons** - Professional, consistent iconography throughout

### 🔄 Advanced Features
- **Offline caching** - View cached weather data when offline
- **Last update timestamp** - Know when your data was last refreshed
- **Smart error handling** - Graceful fallback to cached data on network failures
- **Alert system** - Toast notifications for success, error, info, and warning messages

## 🛠️ Technologies Used

- **React 19.1.1** - Modern React with hooks and functional components
- **TypeScript 5.8.3** - Type-safe development
- **Vite 7.1.2** - Lightning-fast build tool and dev server
- **Lucide React 0.562.0** - Beautiful, consistent icon library
- **OpenWeatherMap API** - Reliable weather data provider
- **LocalStorage** - Client-side caching for offline support

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up API key**
   - The app uses OpenWeatherMap API (included in the code)
   - For production, create a `.env` file and add your own API key:
     ```
     VITE_OPENWEATHER_API_KEY=your_api_key_here
     ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite framework

3. **Configure (if needed)**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Your app will be live at `https://your-app.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables (Optional)

If you want to use your own OpenWeatherMap API key:

1. In Vercel Dashboard, go to: **Project Settings → Environment Variables**
2. Add: `VITE_OPENWEATHER_API_KEY` with your API key
3. Redeploy the project

### Troubleshooting Deployment

**Build fails?**
- Check that all dependencies are in `package.json`
- Ensure TypeScript has no errors: `npm run build` locally
- Verify Node version compatibility (16+)

**App not loading?**
- Check browser console for errors
- Ensure API key is working
- Verify `dist` folder is being generated correctly

## 📁 Project Structure

```
Weather-App/
├── src/
│   ├── components/          # React components
│   │   ├── Alert/          # Toast notification system
│   │   ├── DailyForecast/  # 5-day forecast component
│   │   ├── ForecastTabs/   # Tab navigation for forecasts
│   │   ├── HourlyForecast/ # 24-hour forecast with interpolation
│   │   ├── SavedLocations/ # Location management dropdown
│   │   ├── SearchBar/      # Search with live suggestions
│   │   ├── TabButton/      # Reusable tab button component
│   │   ├── ThemeToggle/    # Light/Dark mode switcher
│   │   ├── WeatherCard/    # Main weather display card
│   │   └── WeeklyForecast/ # Extended weekly forecast
│   ├── contexts/           # React Context providers
│   │   ├── AlertContext.tsx    # Alert notification state
│   │   └── ThemeContext.tsx    # Theme management
│   ├── hooks/              # Custom React hooks
│   │   └── useWeather.ts   # Weather data fetching & caching
│   ├── services/           # API services
│   │   └── weatherApi.ts   # OpenWeatherMap API integration
│   ├── types/              # TypeScript type definitions
│   │   └── weather.ts      # Weather data interfaces
│   ├── utils/              # Utility functions
│   │   └── storage.ts      # LocalStorage management
│   ├── App.tsx             # Main application component
│   ├── App.css             # Global styles and theme variables
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## 🎨 Features in Detail

### Theme System
- Automatic theme detection from system preferences
- Manual toggle with persistent localStorage
- CSS variables for consistent theming across components
- Smooth transitions between themes

### Caching Strategy
- Weather data cached in localStorage on every successful fetch
- Automatic cache restoration on app load
- Fallback to cache when network requests fail
- Timestamp tracking for data freshness

### Alert System
- Four types: Success (green), Error (red), Info (blue), Warning (orange)
- Auto-dismiss after 4 seconds
- Manual close with X button
- Stacked alerts with smooth slide-in animations

### Hourly Forecast Interpolation
- Converts 3-hour API data to 24 consecutive hourly forecasts
- Linear interpolation for temperature, feels-like, wind speed, and precipitation
- Color-coded temperatures for visual clarity

## 🔑 API Configuration

The app uses the OpenWeatherMap API for weather data:
- **Current Weather API** - Real-time conditions
- **5 Day Forecast API** - 3-hour interval forecasts
- **Geocoding API** - City search and coordinates

API endpoints are managed in `src/services/weatherApi.ts` with built-in caching.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)

---

**Developed by Tlholo**
