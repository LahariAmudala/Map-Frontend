//import React from 'react';
//import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import LoginPage from './components/LoginPage';
//import Dashboard from './components/Dashboard';
//import MapView from './components/MapView';

//const App = () => {
  //const isAuthenticated = !!localStorage.getItem('token');

  //return (
    //<Router>
      //<Routes>
        //{/* Public Route - Login Page */}
        //<Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />

        //{/* Protected Routes */}
        //<Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        //<Route path="/map" element={isAuthenticated ? <MapView /> : <Navigate to="/login" />} />

        //{/* Fallback for Unknown Routes */}
        //<Route path="*" element={<Navigate to="/login" />} />
      //</Routes>
    //</Router>
  //);
//};

//export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/map" element={isAuthenticated ? <MapView /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;




