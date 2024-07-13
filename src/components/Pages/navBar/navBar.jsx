
import React, { useContext } from 'react';
import {Link,NavLink} from 'react-router-dom';
import './navBar.css'
import { AuthContext } from '../../../context/AuthContext.js';

function NavBar ()  {
  const { authState, logout } = useContext(AuthContext);

  return (
      <nav className="navbar">
          <h1 className="navbar-logo">FitNet</h1>
          {authState.isAuthenticated && (
              <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li>{authState.user.email}</li>
                  <li>{authState.user.username}</li>
                  <li><button onClick={logout}>Logout</button></li>
              </ul>
          )}
      </nav>
  );
}

export default NavBar