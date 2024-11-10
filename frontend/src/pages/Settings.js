import React, { useState, useEffect } from 'react';
import '../App.css';  // Correct relative path to App.css

function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false); // State to track dark mode

  // Toggle the dark mode setting
  const toggleMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);  // Update the state
    // Store the theme in localStorage
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // On component mount, check the saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true); // Set dark mode if saved in localStorage
    } else {
      setIsDarkMode(false); // Otherwise, set to light mode
    }
  }, []);

  // Apply dark mode class conditionally
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className="app-container">
      <div className="login-section">
        <div className="login-form">
          <div className="card">
            <div className="login-title">
              <h1>Settings</h1>
            </div>
            <div className="label-input-group">
              <label className="label">Theme</label>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleMode} // Toggle dark mode on click
                  className="toggle-input"
                  id="theme-switch" // Added an ID for better targeting in CSS
                />
                <span className="toggle-slider" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
