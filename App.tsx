import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CalendarEventsManager from './src/components/CalendarEventsManager';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signInContainer}>
        <Text>Google Calendar Utility</Text>
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
