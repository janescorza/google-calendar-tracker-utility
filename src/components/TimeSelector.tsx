// TimeSelector.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  selectedButton: {
    backgroundColor: '#6200ee',
  },
  timeText: {
    color: '#000',
  },
  selectedText: {
    color: '#fff',
  },
});

export default TimeSelector;
