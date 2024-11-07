import React, { useEffect, useState } from 'react';
import './App.css'; 

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from the backend server
    fetch('http://localhost:5000')
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App;
