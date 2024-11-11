import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function EmployeeLogin({ onLogin }) { 
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // Update state for each form input
  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Handle login form submission
  async function onSubmit(e) {
    e.preventDefault();

    const loginEmployee = { 
      email: form.email,
      password: form.password 
    };

    try {
      const response = await fetch('https://localhost:3000/user/admin/login', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginEmployee),
      });

      if (response.ok) {
        const userData = await response.json();
        onLogin(userData);  
        setForm({ email: '', password: '' }); 
        navigate('/adminPortal');  
      } else {
        const errorData = await response.json();
        window.alert(errorData.message || 'Login failed!');
      }
    } catch (error) {
      window.alert('An error occurred: ' + error.message);
    }
  }

  return (
    <div className="app-container">
      <div className="login-section">
        <div className="login-form">
          <div className="card">
            <div className="login-title">
              <h1>Employee Login</h1>
            </div>
            <div className="label-input-group">
              <label className="label">Email</label>
              <input
                type="email"
                placeholder="Type your email"
                className="input-field"
                value={form.email}
                onChange={(e) => updateForm({ email: e.target.value })}
              />
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="Type your password"
                className="input-field"
                value={form.password}
                onChange={(e) => updateForm({ password: e.target.value })}
              />
            </div>
            <button className="login-button" onClick={onSubmit}>Log in</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLogin;
