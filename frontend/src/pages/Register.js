import React from 'react';
import '../App.css';  

function Register() {
  return (
    <div className="app-container">
      <div className="login-section">
        <div className="login-form">
        <div class="card">
          <div className="login-title">
            <h1>Register</h1>
          </div>
          <div className="label-input-group">
          <label className="label">Email</label>
          <input type="email" placeholder="Type your email"className="input-field" />
          <label className="label">Password</label>
          <input type="password" placeholder="Type your password" className="input-field" />
          <label className="label">Confirm</label>
          <input type="password" placeholder="Confirm your password" className="input-field" />
          </div>
          <button className="login-button">Sign up</button>
          <button className="login-button" onClick={() => window.location.href = "/"}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
