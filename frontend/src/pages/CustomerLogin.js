
import React from 'react';
import './CustomerLogin.css'; // Custom styles for the login page

function Login() {
  return (
    <div className="app-container">
      
      {/* Main Login Section */}
      <div className="login-section">
        <div className="login-form">
          <div className="login-title">
            <h1>Login</h1>
          </div>
          <label>Employee Email</label>
          <input type="Email" placeholder="Type your email" className="input-field" />
          <label>Password</label>
          <input type="password" placeholder="Type your password" className="input-field" />
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember"> Remember this device</label>
          </div>
          <a href="#" className="forgot-password">Forgot Password? Click Here!</a>
          <a href="/register" className="Register-new-account">Register new account</a>
          <button className="login-button">Log in</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
