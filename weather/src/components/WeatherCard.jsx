import React from 'react';
import './WeatherCard.css';

/**
 * WeatherCard Component
 * Displays city name, country, temperature in °C, condition with icon/emoji,
 * humidity, wind speed, and feels-like temperature.
 */
function WeatherCard({ weatherData }) {
  if (!weatherData) return null;

  const {
    cityName,
    country,
    admin1,
    temperature,
    apparentTemperature,
    humidity,
    windSpeed,
    condition,
    icon,
    latitude,
    longitude,
    time,
  } = weatherData;

  // Format timestamp into a readable date and time string
  const formattedDate = time
    ? new Date(time).toLocaleString(undefined, {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <div className="weather-card">
      <div className="card-header">
        <div className="location-info">
          <h2 className="city-name">
            {cityName}
            {country && <span className="country-badge">{country}</span>}
          </h2>
          {admin1 && admin1 !== cityName && (
            <p className="state-name">{admin1}</p>
          )}
          {formattedDate && <p className="date-time">🕒 {formattedDate}</p>}
        </div>
        <div className="weather-icon-wrapper" title={condition}>
          <span className="weather-icon">{icon}</span>
        </div>
      </div>

      <div className="temperature-section">
        <div className="temp-main">
          <span className="temp-value">{Math.round(temperature)}</span>
          <span className="temp-unit">°C</span>
        </div>
        <div className="condition-info">
          <p className="condition-text">{condition}</p>
          {apparentTemperature !== undefined && (
            <p className="feels-like">Feels like {Math.round(apparentTemperature)}°C</p>
          )}
        </div>
      </div>

      <hr className="divider" />

      <div className="weather-metrics-grid">
        <div className="metric-box">
          <div className="metric-icon">💧</div>
          <div className="metric-details">
            <span className="metric-label">Humidity</span>
            <span className="metric-value">{humidity}%</span>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon">💨</div>
          <div className="metric-details">
            <span className="metric-label">Wind Speed</span>
            <span className="metric-value">{windSpeed} km/h</span>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon">📍</div>
          <div className="metric-details">
            <span className="metric-label">Coordinates</span>
            <span className="metric-value coords">
              {latitude.toFixed(2)}°, {longitude.toFixed(2)}°
            </span>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon">🌡️</div>
          <div className="metric-details">
            <span className="metric-label">Exact Temp</span>
            <span className="metric-value">{temperature.toFixed(1)}°C</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
