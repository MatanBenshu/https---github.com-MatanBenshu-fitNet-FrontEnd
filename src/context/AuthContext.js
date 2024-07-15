import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
       
    });

    const login = (user,following) => {
        setAuthState({
            isAuthenticated: true,
            user,
            
        });
    };

    const logout = () => {
        setAuthState({
            isAuthenticated: false,
            user: null,
            following:null,
        });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
