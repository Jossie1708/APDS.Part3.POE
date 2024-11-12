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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Password validation regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Validation function for form fields
  function validateForm() {
    const newErrors = {};

    if (!form.username) newErrors.username = 'Username is required.';
    if (!form.idNumber) newErrors.idNumber = 'ID Number is required.';
    if (!form.accountNumber) newErrors.accountNumber = 'Account Number is required.';
    if (!form.password) {
      newErrors.password = 'Password is required.';
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password = 'Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;  // Stop submission if there are validation errors
    }

    const newUser = { 
      username: form.username,
      idNumber: form.idNumber,
      accountNumber: form.accountNumber,
      password: form.password 
    };

    try {
      const response = await fetch('https://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        setForm({ username: '', idNumber: '', accountNumber: '', password: '' });
        navigate('/');
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
              {errors.username && <p className="error-message">{errors.username}</p>}

              <label className="label">ID Number</label>
              <input
                type="text"
                placeholder="Type your ID number"
                className="input-field"
                value={form.idNumber}
                onChange={(e) => updateForm({ idNumber: e.target.value })}
              />
              {errors.idNumber && <p className="error-message">{errors.idNumber}</p>}

              <label className="label">Account Number</label>
              <input
                type="text"
                placeholder="Type your account number"
                className="input-field"
                value={form.accountNumber}
                onChange={(e) => updateForm({ accountNumber: e.target.value })}
              />
              {errors.accountNumber && <p className="error-message">{errors.accountNumber}</p>}

              <label className="label">Password</label>
              <input
                type="password"
                placeholder="Type your password"
                className="input-field"
                value={form.password}
                onChange={(e) => updateForm({ password: e.target.value })}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
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
