// App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CalendarEventsManager from './src/components/CalendarEventsManager';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>The Calendarinator</Text>
        <Text style={styles.subtitle}>My utility for Calendar Creation</Text>
      </View>
      <CalendarEventsManager />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default App;
