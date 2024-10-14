// AddDefaultEventCard.tsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DefaultEvent, Calendar } from '../types';
import { colors, typography, layout, spacing, buttons } from '../styles/theme';

interface AddDefaultEventCardProps {
  calendars: Calendar[];
  onAddEvent: (event: DefaultEvent) => void;
  onCancel: () => void;
}

const AddDefaultEventCard: React.FC<AddDefaultEventCardProps> = ({
  calendars,
  onAddEvent,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedCalendarId, setSelectedCalendarId] = useState(
    calendars.find((cal) => cal.isPrimary)?.id ?? '',
  );

  const isFormValid = useMemo(() => {
    const durationValue = parseFloat(duration);
    return name.trim() !== '' && !isNaN(durationValue) && durationValue > 0;
  }, [name, duration]);

  const handleAdd = () => {
    if (!isFormValid) return;

    const newEvent: DefaultEvent = {
      name,
      location,
      duration: parseFloat(duration) * 60, // Convert hours to minutes
      calendarId: selectedCalendarId,
    };
    onAddEvent(newEvent);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Default Event</Text>

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
        <Text style={styles.label}>Default Calendar</Text>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.createButton,
            !isFormValid && styles.disabledButton,
          ]}
          onPress={handleAdd}
          disabled={!isFormValid}
        >
          <Text
            style={[
              styles.addButtonText,
              !isFormValid && styles.disabledButtonText,
            ]}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...layout.card,
    marginTop: spacing.large,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.medium,
  },
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.large,
  },
  button: {
    flex: 1,
    padding: spacing.medium,
    borderRadius: 5,
    marginHorizontal: spacing.small,
  },
  cancelButton: {
    ...buttons.secondary,
  },
  createButton: {
    ...buttons.primary,
  },
  disabledButton: {
    backgroundColor: colors.surface,
    borderColor: colors.onSurfaceDisabled,
    borderWidth: 1,
  },
  disabledButtonText: {
    color: colors.onSurfaceDisabled,
  },
  cancelButtonText: {
    ...buttons.secondaryText,
  },
  addButtonText: {
    ...buttons.primaryText,
  },
  inputContainer: {
    marginBottom: spacing.medium,
  },
  label: {
    ...typography.body,
    marginBottom: spacing.small,
  },
});

export default AddDefaultEventCard;
