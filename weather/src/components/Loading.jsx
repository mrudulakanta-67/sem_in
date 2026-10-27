import React from 'react';
import './Loading.css';

/**
 * Loading Component
 * Displays an animated spinner and friendly message while fetching weather data.
 */
function Loading({ message = 'Fetching weather data...' }) {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">{message}</p>
    </div>
  );
}

export default Loading;
