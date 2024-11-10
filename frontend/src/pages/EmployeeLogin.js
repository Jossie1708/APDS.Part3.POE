
import React from 'react';
import './EmployeeLogin.css'; // Custom styles for the login page

function Login() {
  return (
    <div className="app-container">
      
      {/* Main Login Section */}
      <div className="emplopyee-login-section">
        <div className="emplopyee-login-form">
          <div className="emplopyee-login-title">
            <h1>Employee Login</h1>
          </div>
          <label>Employee Email</label>
          <input type="Employee email" placeholder="Type your email" className="emplopyee-input-field" />
          <label>Password</label>
          <input type="password" placeholder="Type your password" className="emplopyee-input-field" />
          <div className="emplopyee-remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember"> Remember this device</label>
          </div>
          <a href="#" className="emplopyee-forgot-password">Forgot Password? Click Here!</a>
          <button className="emplopyee-login-button">Log in</button>
        </div>
      </div>

      
    </div>
  );
}

export default Login;
