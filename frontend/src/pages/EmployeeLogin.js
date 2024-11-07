
import React from 'react';
import './EmployeeLogin.css'; // Custom styles for the login page

function Login() {
  return (
    <div className="app-container">
      
      {/* Main Login Section */}
      <div className="login-section">
        <div className="login-form">
          <div className="login-title">
            <h1>Employee Login</h1>
          </div>
          <label>Employee Email</label>
          <input type="Employee email" placeholder="Type your employee email" className="input-field" />
          <label>Password</label>
          <input type="password" placeholder="Type your password" className="input-field" />
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember"> Remember this device</label>
          </div>
          <a href="#" className="forgot-password">Forgot Password? Click Here!</a>
          <button className="login-button">Log in</button>
        </div>
      </div>

      
    </div>
  );
}

export default Login;
