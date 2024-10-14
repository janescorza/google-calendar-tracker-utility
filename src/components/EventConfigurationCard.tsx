// EventConfigurationCard.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DefaultEvent, Calendar } from '../types';
import EventForm from './EventForm';
import TimeSelector from './TimeSelector';
import { typography, layout, spacing, buttons } from '../styles/theme';

interface EventConfigurationCardProps {
  event: DefaultEvent;
  calendars: Calendar[];
  onCreateEvent: (
    event: DefaultEvent,
    calendarId: string,
    startTime: Date,
  ) => void;
  onCancel: () => void;
}

const EventConfigurationCard: React.FC<EventConfigurationCardProps> = ({
  event,
  calendars,
  onCreateEvent,
  onCancel,
}) => {
  const [name, setName] = useState(event.name);
  const [location, setLocation] = useState(event.location);
  const [duration, setDuration] = useState((event.duration / 60).toString());
  const [selectedCalendarId, setSelectedCalendarId] = useState(
    event.calendarId || calendars.find((cal) => cal.isPrimary)?.id || '',
  );
  const [startTime, setStartTime] = useState(new Date());

  const handleCreate = () => {
    const updatedEvent: DefaultEvent = {
      name,
      location,
      duration: parseFloat(duration) * 60, // Convert hours to minutes
      calendarId: selectedCalendarId,
    };
    onCreateEvent(updatedEvent, selectedCalendarId, startTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Configuration</Text>

      <EventForm
        name={name}
        setName={setName}
        location={location}
        setLocation={setLocation}
        duration={duration}
        setDuration={setDuration}
        selectedCalendarId={selectedCalendarId}
        setSelectedCalendarId={setSelectedCalendarId}
        calendars={calendars}
      />

      <TimeSelector onTimeSelected={setStartTime} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.createButton]}
          onPress={handleCreate}
        >
          <Text style={styles.buttonText}>Create</Text>
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
    marginHorizontal: spacing.small,
  },
  cancelButton: {
    ...buttons.secondary,
  },
  cancelButtonText: {
    ...buttons.secondaryText,
  },
  createButton: {
    ...buttons.primary,
  },
  buttonText: {
    ...buttons.primaryText,
  },
});

export default EventConfigurationCard;
