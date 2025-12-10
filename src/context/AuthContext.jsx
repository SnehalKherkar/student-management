import React, { createContext, useState, useEffect, useCallback } from "react";
import { storage, keys } from "../api/storage";
import { createAuthUser } from "../types";

import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useUsers } from "../hooks/useUsers";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const {
    state: user,
    setState: setUserState,
    clearState: clearUserState,
  } = useLocalStorageState(keys.AUTH_USER_KEY, null);

  const { users, findUserByEmail } = useUsers();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (email, password) => {
      const foundUser = findUserByEmail(email);

      if (foundUser && foundUser.password === password) {
        const authUser = createAuthUser(foundUser);
        setUserState(authUser);
        return true;
      }

      return false;
    },
    [users]
  );

  const logout = useCallback(() => {
    clearUserState();
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
