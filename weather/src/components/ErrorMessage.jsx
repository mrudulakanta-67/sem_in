import React from 'react';
import './ErrorMessage.css';

/**
 * ErrorMessage Component
 * Displays a friendly error banner with message and a retry button.
 */
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-card">
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <h3 className="error-title">Unable to Retrieve Weather</h3>
        <p className="error-message">{message}</p>
        {onRetry && (
          <button className="retry-button" onClick={onRetry}>
            🔄 Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;
