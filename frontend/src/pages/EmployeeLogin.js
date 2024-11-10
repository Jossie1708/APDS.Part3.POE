import React from 'react';
import './EmployeeLogin.css'; // Custom styles for the login page

function Login() {
  return (
    
      <div className="app-container">
        
        {/* Main Login Section */}
        <div className="employee-login-section">
          <div className="employee-login-form">
          <div class="employee-card">
            <div className="employee-login-title">
              <h1>Employee Login</h1>
            </div>
            <div className="label-input-group">
            <label className="employee-label"> Employee email</label>
            <input type="email" placeholder="Type your email" className="employee-input-field" />
            <label className="employee-label">Password</label>
            <input type="password" placeholder="Type your password" className="employee-input-field" />
            
          </div>
          <button className="employee-login-button">Log in</button>
          </div>
          </div>
        </div>
      </div> 
     
   
  );
}

export default Login;
