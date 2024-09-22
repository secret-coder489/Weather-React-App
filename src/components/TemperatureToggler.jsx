import React from 'react';

// Wrap TemperatureToggle with React.memo for performance optimization
const TemperatureToggle = React.memo(({ unit, setUnit }) => {
  // Function to toggle between metric and imperial units
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
    // Update the unit state: if it's 'metric', change to 'imperial', and vice versa
  };

  return (
    <button className="toggle-button" onClick={toggleUnit}>
      {/* Button text changes based on the current unit */}
      Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
    </button>
  );
});

// Memoization helps avoid unnecessary re-renders when the props haven't changed
export default TemperatureToggle;
