import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Register.css'; // Custom styles for the Register page

function Register() {
  return (
    <div className="register-app-container">
      {/* Main Register Section */}
      <div className="register-section">
        <div className="register-form">
        <div class="employee-card">
          <div className="register-title">
            <h1>Register</h1>
          </div>
          <div className="label-input-group">
          <label className="register-label">Email</label>
          <input type="email" placeholder="Type your email"className="register-input-field" />
          <label className="register-label">Password</label>
          <input type="password" placeholder="Type your password" className="register-input-field" />
          <label className="register-label">Confirm</label>
          <input type="password" placeholder="Confirm your password" className="register-input-field" />
          </div>
          <button className="register-button">Sign up</button>
          <Link to="/" className="register-button" style={{ textDecoration: 'none', color: 'white' }}>
            Back
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
