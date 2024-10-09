import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthResponse } from '../types/auth';
import Constants from 'expo-constants';

interface AuthContextData {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Constants.expoConfig?.extra?.clientId as string,
    androidClientId: Constants.expoConfig?.extra?.androidClientId as string,
    scopes: ['https://www.googleapis.com/auth/calendar']
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      handleAuthResponse(response);
    }
  }, [response]);

  const checkAuth = async () => {
    const token = await SecureStore.getItemAsync('accessToken');
    if (token) {
      setAccessToken(token);
      setIsAuthenticated(true);
    }
  };

  const handleAuthResponse = async (response: GoogleAuthResponse) => {
    const { authentication } = response;
    if (authentication) {
      await SecureStore.setItemAsync('accessToken', authentication.accessToken);
      setAccessToken(authentication.accessToken);
      setIsAuthenticated(true);
    }
  };

  const login = async () => {
    if (request) {
      await promptAsync();
    } else {
      console.error('Auth request is not ready');
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    setAccessToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);