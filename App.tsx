import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Button, Text, View } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import CalendarEventsManager from './src/components/CalendarEventsManager';

const App: React.FC = () => {
  const [error, setError] = useState<Error | undefined>();
  const [userInfo, setUserInfo] = useState<any>();

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId:
        '843874562806-sihdthikal5qmefrjtivpauio35q8elg.apps.googleusercontent.com',
      iosClientId:
        '843874562806-ei87dghk76loc13vrgc96vbu2a0kffm9.apps.googleusercontent.com',
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const signIn = async () => {
    console.log('Pressed sign in');

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      setError(undefined);
    } catch (e) {
      setError(e as Error);
    }
  };

  const logout = () => {
    setUserInfo(undefined);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signInContainer}>
        <Text>Google Sign-In Example</Text>
        <GoogleSigninButton onPress={signIn} />
        <Button title="Logout" onPress={logout} />
        {error && <Text style={styles.errorText}>{error.message}</Text>}
      </View>
      <CalendarEventsManager />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signInContainer: {
    padding: 16,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
});

export default App;
