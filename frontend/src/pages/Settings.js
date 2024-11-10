import React, { useEffect } from 'react';
import '../App.css';  // Correct relative path to App.css
import ThemeToggle from './ThemeToggle';  // Import the ThemeToggle component

function Settings() {
  // On component mount, check the saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, []);

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
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
