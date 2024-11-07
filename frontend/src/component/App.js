import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css'; 

import EmployeeLogin from '../pages/EmployeeLogin';
import CustomerLogin from '../pages/CustomerLogin';
import Register from '../pages/Register';

const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={isActive ? 'active' : ''} onClick={onClick}>
      {children}
    </Link>
  );
};

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const handleNavClick = () => {
    setIsSidebarCollapsed(true); // Close the sidebar when a nav link is clicked
  };

  // Dynamic button style
  const buttonStyle = {
    background: 'transparent',
    border: 'none',
    color: isSidebarCollapsed ? '#005bdb' : 'white', // Keep color change
    fontSize: '30px',
    cursor: 'pointer',
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: 1001, // Ensure it's above everything
  };

  useEffect(() => {
    const link = document.createElement('link');
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link); // Cleanup
    };
  }, []);

  return (
    <Router>
      <div className="app-container">
        <button className="toggle-button" onClick={toggleSidebar} style={buttonStyle}>
          ☰
        </button>

        <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="logo-container">
            <h2 className={`logo-text ${isSidebarCollapsed ? 'hidden' : ''}`}>APDS cash app</h2>
          </div>
          <nav className="nav-links">
            <NavLink to="/" onClick={handleNavClick}>User Login</NavLink>
            <NavLink to="/employeeLogin" onClick={handleNavClick}>Employee Login</NavLink>
            <NavLink to="/register" onClick={handleNavClick}>Register</NavLink>
          </nav>
        </div>

        <div className={`main-section ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <Routes>
            <Route path="/" element={<CustomerLogin />} />
            <Route path="/employeeLogin" element={<EmployeeLogin />} />
            <Route path="/register" element={<Register />} />
           
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
