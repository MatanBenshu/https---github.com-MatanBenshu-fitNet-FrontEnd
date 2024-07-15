import React, { useContext } from 'react';
import Register from './components/Pages/Register/Register.jsx';
import Home from './components/Pages/Home/Home.jsx';
import Login from './components/Pages/Login/Login.jsx';
import About from './components/Pages/About/About.jsx';
import Navbar from './components/Pages/navBar/navBar.jsx';
import Profile from './components/Pages/Profile/Profile.jsx';
import Search from './components/Search/Search.jsx'; // Import Search component
import './App.css';
import { AuthContext } from './context/AuthContext.js';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

function App() {
  const { authState } = useContext(AuthContext);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={authState.isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/about" element={authState.isAuthenticated ? <About /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authState.isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/search" element={authState.isAuthenticated ? <Search /> : <Navigate to="/login" />} /> {/* Add this line */}
        
      </Routes>
    </div>
  );
}

export default App;
