import React from 'react';
import { Button, View } from 'react-native';
import { useAuth } from './src/context/AuthContext';

const GoogleAuth = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <View>
      {isAuthenticated ? (
        <Button title="Logout" onPress={logout} />
      ) : (
        <Button title="Login with Google" onPress={login} />
      )}
    </View>
  );
};

export default GoogleAuth;