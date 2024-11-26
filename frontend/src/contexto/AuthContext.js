import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import AccesoDenegado from '../componentes/paginas/AccesoDenegado';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Cookies.get('isAuthenticated') === 'true';
  });

  const login = () => {
    setIsAuthenticated(true);
    Cookies.set('isAuthenticated', 'true', { expires: 7 }); // Cookie expira en 7 días
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AccesoDenegado />;
  }

  return children;
}; 