import React from 'react';
import '../App.css';

function Login() {
  return (
    
      <div className="app-container">
        
        {/* Main Login Section */}
        <div className="login-section">
          <div className="login-form">
          <div class="card">
            <div className="login-title">
              <h1>Employee Login</h1>
            </div>
            <div className="label-input-group">
            <label className="label"> Employee email</label>
            <input type="Email" placeholder="Type your email" className="input-field" />
            <label className="label">Password</label>
            <input type="password" placeholder="Type your password" className="input-field" />
            
          </div>
          <button className="login-button">Log in</button>
          </div>
          </div>
        </div>
      </div> 
     
   
  );
}

export default Login;
