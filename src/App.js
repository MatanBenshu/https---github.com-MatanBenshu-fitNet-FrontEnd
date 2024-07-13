import React, { useContext } from 'react';
import Register from './components/Pages/Register/Register.jsx';
import Home from './components/Pages/Home/Home.jsx'
import Login from './components/Pages/Login/Login.jsx';
import About from './components/Pages/About/About.jsx'
import Navbar from './components/Pages/navBar/navBar.jsx';
import './App.css'
import { AuthContext } from './context/AuthContext.js';
import {  Route, Routes ,Link, Navigate} from 'react-router-dom';
import './App.css'
function App() {
  const { authState } = useContext(AuthContext);
  return (
    <>
       <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={authState.isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/about" element={authState.isAuthenticated ? <About /> : <Navigate to="/login" />} />
                </Routes>
            </div>
</>
  );
}

export default App;
