// EventForm.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from '../types';
import { colors, typography, spacing } from '../styles/theme';

interface EventFormProps {
  name: string;
  setName: (name: string) => void;
  location: string;
  setLocation: (location: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
  selectedCalendarId: string;
  setSelectedCalendarId: (id: string) => void;
  calendars: Calendar[];
}

const EventForm: React.FC<EventFormProps> = ({
  name,
  setName,
  location,
  setLocation,
  duration,
  setDuration,
  selectedCalendarId,
  setSelectedCalendarId,
  calendars,
}) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Event Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="(optional)"
          placeholderTextColor={styles.placeholderTextColor.color}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Duration (hours)</Text>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Calendar</Text>
        <Picker
          selectedValue={selectedCalendarId}
          onValueChange={(itemValue) => setSelectedCalendarId(itemValue)}
          style={styles.picker}
        >
          {calendars.map((calendar) => (
            <Picker.Item
              key={calendar.id}
              label={calendar.title}
              value={calendar.id}
            />
          ))}
        </Picker>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: colors.onSurface,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: spacing.small,
    color: colors.onSurface,
  },
  placeholderTextColor: {
    color: colors.placeholderTextColor, // Define the placeholder text color here
  },
  picker: {
    height: 40,
    marginBottom: spacing.small,
    color: colors.onSurface,
  },
  inputContainer: {
    marginBottom: spacing.medium,
  },
  label: {
    ...typography.body,
    marginBottom: spacing.small,
  },
});

export default EventForm;
