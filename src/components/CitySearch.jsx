import React, { useState, useCallback } from 'react';

// Wrap CitySearch with React.memo for performance optimization
const CitySearch = React.memo(({ fetchWeather, city, setCity, clearSearch }) => {
  // Initialize local state with the city prop
  const [inputValue, setInputValue] = useState(city);

  // Update input value and keep the parent state updated
  const handleChange = (e) => {
    setInputValue(e.target.value); // Update local input value
    setCity(e.target.value); // Sync with the parent component's city state
  };

  // Handle the search action
  const handleSearch = useCallback(() => {
    if (inputValue.trim()) {
      fetchWeather(inputValue); // Fetch weather for the input city
    } else {
      alert("Please enter a city name."); // Alert if input is empty
    }
  }, [fetchWeather, inputValue]); // Dependencies: only re-create if fetchWeather or inputValue changes

  // Clear the search input and reset city data
  const handleClear = () => {
    setInputValue(''); // Clear the local input field
    setCity(''); // Clear the city in the parent state
    clearSearch(); // Call clearSearch function for additional logic if necessary
  };

  // Log the current input value for debugging
  console.log("inputValue", inputValue);

  return (
    <div className="city-search">
      <input
        type="text"
        value={inputValue} // Use local state for input
        onChange={handleChange} // Update input and parent state
        placeholder="Search for a city"
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClear} className="clear-button">Clear</button>
    </div>
  );
});

// Memoization helps avoid unnecessary re-renders when the props haven't changed
export default CitySearch;
