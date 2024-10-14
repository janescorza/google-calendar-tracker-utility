import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing } from '../styles/theme';

interface TimeSelectorProps {
  onTimeSelected: (time: Date) => void;
  initialTime: Date;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  onTimeSelected,
  initialTime,
}) => {
  const [selectedTime, setSelectedTime] = useState<Date>(initialTime);

  useEffect(() => {
    setSelectedTime(initialTime);
  }, [initialTime]);

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
      <View style={styles.buttonContainer}>
        {generateTimeOptions().map((time, index) => (
          <TouchableOpacity
            key={time.getTime()}
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
