import React from 'react';
import { useTheme } from '../ThemeContext';  // Ensure the path is correct

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Use the context to access the theme state and toggle function

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={isDarkMode} // Set the checkbox state based on the theme
        onChange={toggleTheme} // Call the toggle function on change
      />
      <span className="toggle-slider" />
    </label>
  );
};

export default ThemeToggle;
