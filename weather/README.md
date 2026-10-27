# Weather Information Dashboard 🌤️

A complete, responsive, and modern Weather Information Dashboard built with **React.js** and **Vite** for college coursework. It fetches real-time meteorological data using the free **Open-Meteo API** (no API key required) and leverages native browser `fetch` and React Hooks (`useState`, `useEffect`).

---

## 📌 Project Features

- **Real-Time Weather Data**: Displays current temperature in Celsius (°C), weather condition with icons/emojis, wind speed (km/h), humidity (%), and geographical coordinates.
- **Two-Step Geocoding & Forecast**: Converts any entered city name into latitude/longitude coordinates via Open-Meteo Geocoding API, then retrieves exact meteorological conditions.
- **Default City on Launch**: Automatically loads and displays the current weather for a default city (New Delhi) on initial startup.
- **Search & Validation**: Search any city worldwide using the search bar with Enter key or click of the Search button; prevents empty searches with inline warnings.
- **Quick City Chips**: One-click quick search buttons for major global cities (New Delhi, London, Tokyo, New York, Sydney).
- **Responsive & Modern UI**: Built with a clean light-blue and white theme, card layout, smooth animations, and mobile-responsive styling.
- **Error & Loading States**: Displays friendly animated loading states and descriptive error alerts if a city is not found or if the network fails.
- **Zero Heavy Dependencies**: Uses pure standard React Hooks, standard CSS, and native `fetch` (no Axios or heavy UI libraries).

---

## 🛠️ Technology Stack

- **Frontend Library**: React 18 (Functional Components, Hooks)
- **Build Tool**: Vite
- **Styling**: Pure CSS3 (Responsive Flexbox & Grid, CSS Variables)
- **API**: Open-Meteo REST API (Geocoding + Weather Forecast)
- **Package Manager**: npm

---

## 📂 Project Structure

```text
semin_weather/
├── index.html                 # HTML Entry point
├── package.json               # Project metadata and dependencies
├── vite.config.js             # Vite configuration
├── README.md                  # Project documentation
└── src/
    ├── main.jsx               # React DOM root render
    ├── App.jsx                # Main dashboard container & API logic
    ├── App.css                # App-level styles & layout
    ├── index.css              # Global styles, fonts, and background gradient
    ├── components/
    │   ├── SearchBar.jsx      # Search input, submit button & validation
    │   ├── SearchBar.css      # Styling for SearchBar
    │   ├── WeatherCard.jsx    # Displays temperature, condition, humidity, wind
    │   ├── WeatherCard.css    # Styling for weather card
    │   ├── Loading.jsx        # Animated spinner & status message
    │   ├── Loading.css        # Spinner animation styles
    │   ├── ErrorMessage.jsx   # Error banner with retry button
    │   └── ErrorMessage.css   # Error message styling
    └── utils/
        └── weatherCodes.js    # WMO weather code mapping to conditions & emojis
```

---

## 🚀 How to Run the Application

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher recommended) and **npm** installed on your computer.

Check your versions by running:
```bash
node -v
npm -v
```

### 2. Navigate to the project folder
Open your terminal or command prompt in this project directory:
```bash
cd semin_weather
```

### 3. Install dependencies (if running for the first time)
```bash
npm install
```

### 4. Start the Development Server
```bash
npm run dev
```

The terminal will display the local URL (typically `http://localhost:5173/` or `http://localhost:5174/`). Open this URL in your web browser to view the application.

### 5. Build for Production
To create an optimized production build:
```bash
npm run build
```

---

## 🌐 API Details (Open-Meteo)

1. **Geocoding API**:
   - `https://geocoding-api.open-meteo.com/v1/search?name={cityName}&count=1&language=en&format=json`
   - Converts city name into `latitude`, `longitude`, `country`, and administrative region.

2. **Current Weather Forecast API**:
   - `https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m`
   - Returns real-time temperature, humidity, wind speed, and WMO weather codes.
