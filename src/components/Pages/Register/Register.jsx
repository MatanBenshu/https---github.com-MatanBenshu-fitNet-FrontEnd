import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext.js';
import './Register.css';
import { FaUser,FaEnvelope,FaLock } from "react-icons/fa";
import { Link} from 'react-router-dom';
function Register () {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const minLength = /.{8,}/;
        const uppercase = /[A-Z]/;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (!minLength.test(password)) {
            return 'Password must be at least 8 characters long.';
        }
        if (!uppercase.test(password)) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (!specialChar.test(password)) {
            return 'Password must contain at least one special character.';
        }
        return null;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const passwordError = validatePassword(password);
        if (passwordError) {
            setMessage(passwordError);
            return;
        }

        const response = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({ username, email, password, firstName, lastName, birthDate }),
            
        });

        const data = await response.json();
        
        if (data.success) {
            login({ username, email });
            navigate('/');
        } else {
            setMessage('Registration failed: ' + data.message);
        }
    };

    return (
        <div className="register">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <label>Username:</label>
                <input 
                    type="text" 
                    required 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <label>Email:</label>
                <input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <label>Password:</label>
                <input 
                    type="password" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    
                />
                <label>First Name:</label>
                <input 
                    type="text" 
                    required 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                />
                <label>Last Name:</label>
                <input 
                    type="text" 
                    required 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                />
                <label>Birth Date:</label>
                <input 
                    type="date" 
                    required 
                    value={birthDate} 
                    onChange={(e) => setBirthDate(e.target.value)} 
                />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
            <p>Already have an account? <Link to="/Login">Login here</Link></p>
        </div>
    );
};

export default Register