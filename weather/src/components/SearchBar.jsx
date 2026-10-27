import React, { useState } from 'react';
import './SearchBar.css';

/**
 * SearchBar Component
 * Allows user to enter a city name and search via button click or Enter key.
 * Prevents empty searches with helpful feedback.
 */
function SearchBar({ onSearch, isLoading }) {
  const [inputCity, setInputCity] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedCity = inputCity.trim();

    if (!trimmedCity) {
      setValidationError('Please enter a city name before searching.');
      return;
    }

    setValidationError('');
    onSearch(trimmedCity);
  };

  const handleInputChange = (e) => {
    setInputCity(e.target.value);
    if (validationError) {
      setValidationError('');
    }
  };

  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search city (e.g., Tokyo, Paris, New York)..."
            value={inputCity}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          className="search-button"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {validationError && (
        <p className="validation-error">{validationError}</p>
      )}
    </div>
  );
}

export default SearchBar;
