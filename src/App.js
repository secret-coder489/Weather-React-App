import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import CitySearch from './components/CitySearch';
import WeatherDisplay from './components/WeatherDisplay';
import TemperatureToggle from './components/TemperatureToggler';
import ForecastCard from './components/ForeCastCard';

const App = () => {
  // State variables to manage weather data, loading state, current city, unit of measurement, and forecast data
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(''); // Default city
  const [unit, setUnit] = useState('metric'); // Default unit
  const [forecastData, setForecastData] = useState([]);

  // Use useEffect to fetch weather data when the component mounts or the default city changes
  useEffect(() => {
    const cachedWeather = localStorage.getItem('lastWeather'); // Check for cached weather data
    if (cachedWeather) {
      setWeatherData(JSON.parse(cachedWeather)); // Load cached data if available
    } else {
      fetchWeather(city); // Fetch weather for the default city
    }
  }, [city]); // Dependency array to fetch data whenever the city changes

  // Fetch current weather data for a specified city
  const fetchWeather = useCallback(async (city) => {
    const apiKey = '8c1553ef718fe1af0837b0907c1a095d'; // Replace with your actual API key
    setLoading(true); // Set loading state to true while fetching data
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`);
      const data = await response.json(); // Parse JSON response
      console.log(data); // Log the response for debugging
      if (response.ok) {
        setWeatherData(data); // Set weather data state
        fetchForecast(city); // Fetch the forecast for the city
        localStorage.setItem('lastWeather', JSON.stringify(data)); // Cache weather data
      } else {
        alert(data.message || 'City not found'); // Alert user if city is not found
      }
    } catch (error) {
      console.error("Network error:", error); // Log network errors
      alert("Network error. Please try again."); // Alert user on network error
    } finally {
      setLoading(false); // Set loading state to false after fetching data
    }
  }, [unit]); // Dependency on unit to fetch the appropriate unit of measurement

  // Fetch weather forecast for a specified city
  const fetchForecast = async (city) => {
    const apiKey = '8c1553ef718fe1af0837b0907c1a095d'; // Use the same API key
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`);
      const data = await response.json(); // Parse JSON response
      console.log(data); // Log the response for debugging
      if (response.ok) {
        setForecastData(data?.list?.filter((_, index) => index % 8 === 0)); // Filter to get daily forecast
      } else {
        alert(data.message || 'City not found'); // Alert user if city is not found
      }
    } catch (error) {
      console.error("Network error:", error); // Log network errors
      alert("Network error. Please try again."); // Alert user on network error
    }
  };

  // Refresh weather data for the currently selected city
  const refreshWeather = () => {
    if (weatherData && weatherData.name) {
      fetchWeather(weatherData.name); // Re-fetch weather for the current city
    } else {
      alert('No city selected! Please search for a city first.'); // Alert if no city is selected
    }
  };

  // Clear the search input and reset weather and forecast data
  const clearSearch = () => {
    setWeatherData(null); // Clear weather data
    setForecastData([]); // Clear forecast data
    setCity(''); // Clear city input
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <CitySearch fetchWeather={fetchWeather} city={city} setCity={setCity} clearSearch={clearSearch} />
      {loading ? (
        <p>Loading...</p> // Show loading text while fetching data
      ) : (
        weatherData && <WeatherDisplay data={weatherData} unit={unit} /> // Display weather data if available
      )}
      <button onClick={refreshWeather} className="toggle-button">Refresh Weather</button>
      <TemperatureToggle unit={unit} setUnit={setUnit} />
      <div className="forecast">
        {forecastData.map((day, index) => (
          <ForecastCard key={index} day={day} unit={unit} /> // Render forecast cards
        ))}
      </div>
    </div>
  );
};

export default App;
