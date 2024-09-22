import React, { useMemo } from 'react';

// Wrap WeatherDisplay with React.memo for performance optimization
// This prevents unnecessary re-renders when the props do not change.
const WeatherDisplay = React.memo(({ data, unit }) => {
  
  // Memoize the calculated temperature based on the selected unit
  const temperature = useMemo(() => {
    // Check the unit and convert the temperature accordingly
    return unit === 'metric' 
      ? Math.round(data.main.temp) // Round temperature for Celsius
      : Math.round(data.main.temp * 9/5 + 32); // Convert to Fahrenheit and round
  }, [data.main.temp, unit]); // Dependencies: re-compute only when these change

  // Memoize the weather description for performance
  const description = useMemo(() => data.weather[0].description, [data.weather]); 
  // Only re-compute the description when the weather data changes

  return (
    <div className="weather-display">
      <h2>{data.name}</h2> {/* Display the name of the city */}
      <p>{temperature}°{unit === 'metric' ? 'C' : 'F'}</p> {/* Show temperature with the correct unit */}
      <p>{description}</p> {/* Display the current weather description */}
      <img 
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} 
        alt={description} // Accessibility: describe the image for screen readers
      />
    </div>
  );
});

// Export the memoized WeatherDisplay component
export default WeatherDisplay;
