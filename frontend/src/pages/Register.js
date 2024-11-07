import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Register.css'; // Custom styles for the Register page

function Register() {
  return (
    <div className="app-container">
      {/* Main Register Section */}
      <div className="register-section">
        <div className="register-form">
          <div className="register-title">
            <h1>Register</h1>
          </div>
          <label>Email</label>
          <input type="email" placeholder="Type your email"className="input-field-register" />
          <label>Password</label>
          <input type="password" placeholder="Type your password" className="input-field-register" />
          <label>Confirm</label>
          <input type="password" placeholder="Confirm your password" className="input-field-register" />
          
          <button className="signup-button">Sign up</button>
          <Link to="/" className="signup-button" style={{ textDecoration: 'none', color: 'white' }}>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
