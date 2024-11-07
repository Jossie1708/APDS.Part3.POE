import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Assuming this is still in the src folder
import App from './component/App'; // Now importing from 'components/App'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
