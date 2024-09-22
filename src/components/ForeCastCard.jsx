import React, { useMemo } from 'react';

// Wrap ForecastCard with React.memo for performance optimization
const ForecastCard = React.memo(({ day, unit }) => {
  // Memoize the formatted date to avoid re-computation on re-renders
  const date = useMemo(() => {
    return new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
  }, [day]); // Re-compute only if the day prop changes

  // Memoize the high temperature calculation based on the unit
  const highTemp = useMemo(() => {
    return unit === 'metric' 
      ? Math.round(day.main.temp_max) // Celsius
      : Math.round(day.main.temp_max * 9/5 + 32); // Fahrenheit
  }, [day.main.temp_max, unit]); // Re-compute if temp_max or unit changes

  // Memoize the low temperature calculation based on the unit
  const lowTemp = useMemo(() => {
    return unit === 'metric' 
      ? Math.round(day.main.temp_min) // Celsius
      : Math.round(day.main.temp_min * 9/5 + 32); // Fahrenheit
  }, [day.main.temp_min, unit]); // Re-compute if temp_min or unit changes

  return (
    <div className="forecast-card">
      <h3>{date}</h3> {/* Display the day of the week */}
      <p>High: {highTemp}°{unit === 'metric' ? 'C' : 'F'}</p> {/* Display high temperature with unit */}
      <p>Low: {lowTemp}°{unit === 'metric' ? 'C' : 'F'}</p> {/* Display low temperature with unit */}
      <img 
        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
        alt={day.weather[0].description} // Accessibility: provide a description for the image
      />
    </div>
  );
});

// Memoization helps avoid unnecessary re-renders when the props haven't changed
export default ForecastCard;
