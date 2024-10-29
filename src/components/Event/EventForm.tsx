// EventForm.tsx
import React, { forwardRef, useImperativeHandle } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from '../../types';
import { colors, typography, spacing } from '../../styles/theme';
import { validateAndFormatDuration } from '../../utils/eventValidation';

export interface EventFormRef {
  validateForm: () => boolean;
}

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
  durationError: string | null;
  setDurationError: (error: string | null) => void;
}

const EventForm = forwardRef<EventFormRef, EventFormProps>(
  (
    {
      name,
      setName,
      location,
      setLocation,
      duration,
      setDuration,
      selectedCalendarId,
      setSelectedCalendarId,
      calendars,
      durationError,
      setDurationError,
    },
    ref,
  ) => {
    const validateDuration = () => {
      const result = validateAndFormatDuration(duration);
      setDuration(result.formattedValue);
      setDurationError(result.error);
      return result.isValid;
    };

    const handleDurationChange = (value: string) => {
      // Allow empty input or valid numeric input
      if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
        setDuration(value);
      }
    };

    const handleDurationBlur = () => {
      validateDuration();
    };

    useImperativeHandle(ref, () => ({
      validateForm: validateDuration,
    }));

    return (
      <>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Event Name</Text>
          <TextInput
            style={[styles.input]}
            value={name}
            onChangeText={setName}
            placeholder="Enter event name"
            placeholderTextColor={styles.placeholderTextColor.color}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={[styles.input]}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter event location"
            placeholderTextColor={styles.placeholderTextColor.color}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Duration (hours)</Text>
          <TextInput
            style={styles.input}
            value={duration}
            onChangeText={handleDurationChange}
            onBlur={handleDurationBlur}
            keyboardType="numeric"
            placeholder="Enter duration"
            placeholderTextColor={styles.placeholderTextColor.color}
          />
          {durationError && (
            <Text style={styles.errorText}>{durationError}</Text>
          )}
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
  },
);

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
    color: colors.placeholderTextColor,
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
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: spacing.small,
  },
});

export default EventForm;
