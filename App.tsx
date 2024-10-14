// App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CalendarEventsManager from './src/components/CalendarEventsManager';
import { colors, typography, layout, spacing } from './src/styles/theme';

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
    ...layout.container,
  },
  header: {
    padding: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
    marginTop: 32,
  },
  title: {
    ...typography.title,
  },
  subtitle: {
    ...typography.subtitle,
  },
});

export default App;
