import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import { getWeatherDetails } from './utils/weatherCodes';
import './App.css';

/**
 * Main Application Component: Weather Information Dashboard
 * Built for college assignment using React functional components and hooks.
 * Uses the free Open-Meteo API with Geocoding and Forecast endpoints.
 */
function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState('New Delhi');

  /**
   * Fetches weather information for a given city name.
   * Step 1: Use Open-Meteo Geocoding API to convert city name to latitude/longitude.
   * Step 2: Use Open-Meteo Forecast API to get real-time weather metrics.
   */
  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Geocoding API to find coordinates
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        cityName
      )}&count=1&language=en&format=json`;

      const geoResponse = await fetch(geoUrl);

      if (!geoResponse.ok) {
        throw new Error('Failed to reach geocoding service. Please check your internet connection.');
      }

      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City "${cityName}" not found. Please verify the spelling and try again.`);
      }

      const location = geoData.results[0];
      const { latitude, longitude, name, country, admin1 } = location;

      // Step 2: Weather Forecast API using retrieved coordinates
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m`;

      const weatherResponse = await fetch(weatherUrl);

      if (!weatherResponse.ok) {
        throw new Error('Failed to retrieve weather data from Open-Meteo API.');
      }

      const weatherResult = await weatherResponse.json();
      const current = weatherResult.current;

      // Map WMO code to human-readable condition text & emoji
      const { condition, icon } = getWeatherDetails(
        current.weather_code,
        current.is_day
      );

      // Save processed weather object to state
      setWeatherData({
        cityName: name,
        country: country || '',
        admin1: admin1 || '',
        latitude,
        longitude,
        temperature: current.temperature_2m,
        apparentTemperature: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
        condition,
        icon,
        time: current.time,
      });

      setCurrentCity(name);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred while fetching weather data.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial load: Fetch weather for default city (New Delhi)
  useEffect(() => {
    fetchWeather('New Delhi');
  }, []);

  return (
    <div className="dashboard-app">
      <div className="dashboard-container">
        {/* Header Section */}
        <header className="dashboard-header">
          <div className="header-badge">Real-Time Forecast</div>
          <h1 className="dashboard-title">Weather Information Dashboard</h1>
          <p className="dashboard-subtitle">
            Get accurate, live meteorological information powered by Open-Meteo
          </p>
        </header>

        {/* Search Bar Section */}
        <SearchBar onSearch={fetchWeather} isLoading={loading} />

        {/* Quick Search Chips */}
        <div className="quick-cities">
          <span className="quick-label">Popular cities:</span>
          {['New Delhi', 'London', 'Tokyo', 'New York', 'Sydney'].map((city) => (
            <button
              key={city}
              type="button"
              className={`city-chip ${currentCity === city && !error ? 'active' : ''}`}
              onClick={() => fetchWeather(city)}
              disabled={loading}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <main className="dashboard-content">
          {loading && <Loading message={`Loading weather for ${currentCity}...`} />}

          {error && !loading && (
            <ErrorMessage
              message={error}
              onRetry={() => fetchWeather(currentCity || 'New Delhi')}
            />
          )}

          {!loading && !error && weatherData && (
            <WeatherCard weatherData={weatherData} />
          )}
        </main>

        {/* Footer */}
        <footer className="dashboard-footer">
          <p>
            Data provided by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo API</a> (No API Key Required)
          </p>
          <p className="college-tag">College Assignment • Built with React.js & Vite</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
