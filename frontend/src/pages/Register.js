import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Register() {
  const [form, setForm] = useState({
    username: '',
    idNumber: '',
    accountNumber: '',
    password: '',
  });

  const navigate = useNavigate();

  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newUser = { 
      username: form.username,
      idNumber: form.idNumber,
      accountNumber: form.accountNumber,
      password: form.password 
    };

    try {
      const response = await fetch('https://localhost:3000/user/register', {  // Ensure this URL matches your backend route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        setForm({ username: '', idNumber: '', accountNumber: '', password: '' });
        navigate('/');  // Redirect after successful registration
      } else {
        const errorData = await response.json();
        window.alert(errorData.message || 'Signup failed!');
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
              <h1>Register</h1>
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
              <label className="label">ID Number</label>
              <input
                type="text"
                placeholder="Type your ID number"
                className="input-field"
                value={form.idNumber}
                onChange={(e) => updateForm({ idNumber: e.target.value })}
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
            <button className="login-button" onClick={onSubmit}>Sign up</button>
            <button className="login-button" onClick={() => navigate('/')}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
