import React, { createContext, useState, useEffect, useCallback } from 'react';
import { storage, keys } from '../api/storage';

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = storage.get(keys.AUTH_USER_KEY);
      if (storedUser) {
        setUser(storedUser);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    const allUsers = storage.get(keys.USERS_KEY) || [];
    const foundUser = allUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userToAuth } = foundUser;
      setUser(userToAuth);
      storage.set(keys.AUTH_USER_KEY, userToAuth);
      return true;
    }

    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    storage.remove(keys.AUTH_USER_KEY);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
