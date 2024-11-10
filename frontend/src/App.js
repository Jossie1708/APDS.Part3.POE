import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css'; 
import { useTheme } from './ThemeContext';

import EmployeeLogin from './pages/EmployeeLogin';
import CustomerLogin from './pages/CustomerLogin';
import Register from './pages/Register';
import PaymentHub from './pages/CustomerPaymentHub';
import Settings from './pages/Settings';

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
  const { isDarkMode } = useTheme(); // Access theme state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const handleNavClick = () => {
    setIsSidebarCollapsed(true); // Close the sidebar when a nav link is clicked
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Set to true after successful login
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Reset login status on logout
  };

  return (
    <Router>
      <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          ☰
        </button>

        <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="logo-container">
            <h2 className={`logo-text ${isSidebarCollapsed ? 'hidden' : ''}`}>APDS part 3</h2>
          </div>
          <nav className="nav-links">
            {isLoggedIn ? (
              <>
                <NavLink to="/settings" onClick={handleNavClick}>Settings</NavLink>
                <NavLink to="/" onClick={() => { handleLogout(); handleNavClick(); }}>Log Out</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/" onClick={handleNavClick}>User Login</NavLink>
                <NavLink to="/employeeLogin" onClick={handleNavClick}>Employee Login</NavLink>
                <NavLink to="/register" onClick={handleNavClick}>Register</NavLink>
                <NavLink to="/settings" onClick={handleNavClick}>Settings</NavLink>
              </>
            )}
          </nav>
        </div>

        <div className={`main-section ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <Routes>
            <Route path="/" element={<CustomerLogin onLogin={handleLogin} />} />
            <Route path="/employeeLogin" element={<EmployeeLogin onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/paymentHub" element={<PaymentHub />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
