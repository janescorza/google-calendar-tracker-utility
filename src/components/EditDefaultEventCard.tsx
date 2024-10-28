import React, { useState, useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DefaultEvent, Calendar } from '../types';
import EventForm, { EventFormRef } from './EventForm';
import { colors, typography, layout, spacing, buttons } from '../styles/theme';

interface EditDefaultEventCardProps {
  event: DefaultEvent;
  calendars: Calendar[];
  onSaveEvent: (updatedEvent: DefaultEvent) => void;
  onCancel: () => void;
}

const EditDefaultEventCard: React.FC<EditDefaultEventCardProps> = ({
  event,
  calendars,
  onSaveEvent,
  onCancel,
}) => {
  const [name, setName] = useState(event.name);
  const [location, setLocation] = useState(event.location);
  const [duration, setDuration] = useState((event.duration / 60).toString());
  const [selectedCalendarId, setSelectedCalendarId] = useState(
    event.calendarId,
  );
  const [durationError, setDurationError] = useState<string | null>(null);
  const formRef = useRef<EventFormRef>(null);

  const isFormValid = useMemo(() => {
    return name.trim() !== '' && !durationError;
  }, [name, durationError]);

  const handleSave = () => {
    const isDurationValid = formRef.current?.validateForm() ?? false;
    if (!isDurationValid || !isFormValid) return;

    const updatedEvent: DefaultEvent = {
      ...event,
      name,
      location,
      duration: parseFloat(duration) * 60, // Convert hours to minutes
      calendarId: selectedCalendarId,
    };
    onSaveEvent(updatedEvent);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Default Event</Text>

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
            styles.saveButton,
            !isFormValid && styles.disabledButton,
          ]}
          onPress={handleSave}
          disabled={!isFormValid}
        >
          <Text
            style={[
              styles.saveButtonText,
              !isFormValid && styles.disabledButtonText,
            ]}
          >
            Save
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
  saveButton: {
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
  saveButtonText: {
    ...buttons.primaryText,
  },
});

export default EditDefaultEventCard;
