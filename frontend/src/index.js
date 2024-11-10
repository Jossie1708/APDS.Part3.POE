import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // Directly reference App.js within the same folder
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './ThemeContext'; // Adjusted path if 'ThemeContext' is inside 'pages'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
