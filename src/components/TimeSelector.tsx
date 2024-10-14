// TimeSelector.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles/theme';

interface TimeSelectorProps {
  onTimeSelected: (time: Date) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ onTimeSelected }) => {
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());

  useEffect(() => {
    // Round to nearest 15 minutes
    const roundedTime = new Date(
      Math.ceil(selectedTime.getTime() / 900000) * 900000,
    );
    setSelectedTime(roundedTime);
    onTimeSelected(roundedTime);
  }, []);

  const generateTimeOptions = () => {
    const options = [];
    for (let i = -2; i <= 2; i++) {
      const time = new Date(selectedTime.getTime() + i * 15 * 60000);
      options.push(time);
    }
    return options;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Start time</Text>
      <View style={styles.buttonContainer}>
        {generateTimeOptions().map((time, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeButton,
              time.getTime() === selectedTime.getTime() &&
                styles.selectedButton,
            ]}
            onPress={() => {
              setSelectedTime(time);
              onTimeSelected(time);
            }}
          >
            <Text
              style={[
                styles.timeText,
                time.getTime() === selectedTime.getTime() &&
                  styles.selectedText,
              ]}
            >
              {formatTime(time)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.medium,
  },
  label: {
    ...typography.body,
    marginBottom: spacing.small,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeButton: {
    padding: spacing.small,
    borderRadius: 5,
    backgroundColor: colors.surface,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  timeText: {
    color: colors.onSurface,
  },
  selectedText: {
    color: colors.onPrimary,
  },
});

export default TimeSelector;
