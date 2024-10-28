// AddDefaultEventCard.tsx
import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DefaultEvent, Calendar } from '../types';
import EventForm, { EventFormRef } from './EventForm';
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
  const [durationError, setDurationError] = useState<string | null>(null);
  const formRef = React.useRef<EventFormRef>(null);

  const isFormValid = useMemo(() => {
    return name.trim() !== '' && !durationError && duration !== '';
  }, [name, duration, durationError]);

  const handleAdd = () => {
    const isDurationValid = formRef.current?.validateForm() ?? false;

    if (!isDurationValid || !isFormValid) return;

    const newEvent: DefaultEvent = {
      name,
      location,
      duration: parseFloat(duration) * 60,
      calendarId: selectedCalendarId,
    };
    onAddEvent(newEvent);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Default Event</Text>

      <EventForm
        ref={formRef}
        name={name}
        setName={setName}
        location={location}
        setLocation={setLocation}
        duration={duration}
        setDuration={setDuration}
        selectedCalendarId={selectedCalendarId}
        setSelectedCalendarId={setSelectedCalendarId}
        calendars={calendars}
        durationError={durationError}
        setDurationError={setDurationError}
      />

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
            styles.addButton,
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
  addButton: {
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
});

export default AddDefaultEventCard;
