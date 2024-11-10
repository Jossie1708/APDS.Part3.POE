
import React from 'react';
import '../App.css';  


function Login() {
  return (
    <div className="app-container">
      
      {/* Main Login Section */}
      <div className="login-section">
        <div className="login-form">
        <div className="card">
          <div className="login-title">
            <h1>Login</h1>
          </div>
          <div className="label-input-group">
          <label className="label"> Email</label>
          <input type="Email" placeholder="Type your email" className="input-field" />
          <label className="label">Password</label>
          <input type="password" placeholder="Type your password" className="input-field" />
         
          
        </div>
        <a href="/register" className="Register-new-account">Don't have an account? Register here</a>
        <button className="login-button" onClick={() => window.location.href = "/paymentHub"}>Log in</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
