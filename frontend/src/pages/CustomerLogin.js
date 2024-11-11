import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const [form, setForm] = useState({
    username: '',
    accountNumber: '',
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

    const loginUser = { 
      username: form.username,
      accountNumber: form.accountNumber,
      password: form.password 
    };

    try {
      const response = await fetch('https://localhost:3000/user/login', {  // Update URL to match your backend route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginUser),
      });

      if (response.ok) {
        setForm({ username: '', accountNumber: '', password: '' });  // Reset the form on successful login
        navigate('/paymentHub');  // Redirect to the payment hub or dashboard
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
              <h1>Login</h1>
            </div>
            <div className="label-input-group">
              <label className="label">Username</label>
              <input
                type="text"
                placeholder="Type your username"
                className="input-field"
                value={form.username}
                onChange={(e) => updateForm({ username: e.target.value })}
              />
              <label className="label">Account Number</label>
              <input
                type="text"
                placeholder="Type your account number"
                className="input-field"
                value={form.accountNumber}
                onChange={(e) => updateForm({ accountNumber: e.target.value })}
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
            <a href="/register" className="Register-new-account">Don't have an account? Register here</a>
            <button className="login-button" onClick={onSubmit}>Log in</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
