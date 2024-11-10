
import React from 'react';
import './CustomerLogin.css'; // Custom styles for the login page

function Login() {
  return (
    <div className="customer-app-container">
      
      {/* Main Login Section */}
      <div className="customer-login-section">
        <div className="customer-login-form">
        <div class="customer-card">
          <div className="customer-login-title">
            <h1>Login</h1>
          </div>
          <div className="label-input-group">
          <label className="customer-label"> Email</label>
          <input type="Email" placeholder="Type your email" className="customer-input-field" />
          <label className="customer-label">Password</label>
          <input type="password" placeholder="Type your password" className="customer-input-field" />
         
          
        </div>
        <a href="/register" className="customer-Register-new-account">Don't have an account? Register</a>
        <button className="customer-login-button">Log in</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
