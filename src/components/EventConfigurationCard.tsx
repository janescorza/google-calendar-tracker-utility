// EventConfigurationCard.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DefaultEvent, Calendar } from '../types';
import EventForm from './EventForm';
import TimeSelector from './TimeSelector';
import { typography, layout, spacing, buttons, colors } from '../styles/theme';

interface EventConfigurationCardProps {
  event: DefaultEvent;
  calendars: Calendar[];
  onCreateEvent: (
    event: DefaultEvent,
    calendarId: string,
    startTime: Date,
    endTime: Date,
  ) => void;
  onCancel: () => void;
}

const roundToNext15Minutes = (date: Date): Date => {
  const minutes = date.getMinutes();
  const roundedMinutes = Math.ceil(minutes / 15) * 15;
  const roundedDate = new Date(date);
  roundedDate.setMinutes(roundedMinutes);
  roundedDate.setSeconds(0);
  roundedDate.setMilliseconds(0);
  return roundedDate;
};

const calculateEndTime = (start: Date, durationInMinutes: number): Date => {
  const end = new Date(start.getTime() + durationInMinutes * 60000);
  return roundToNext15Minutes(end);
};

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
  const [startTime, setStartTime] = useState(roundToNext15Minutes(new Date()));
  const [endTime, setEndTime] = useState(
    calculateEndTime(startTime, event.duration),
  );

  useEffect(() => {
    updateEndTime();
  }, [startTime, duration]);

  const updateEndTime = () => {
    const durationInMinutes = parseFloat(duration) * 60;
    setEndTime(calculateEndTime(startTime, durationInMinutes));
  };

  const handleStartTimeChange = (time: Date) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time: Date) => {
    setEndTime(time);
    const durationInMinutes = (time.getTime() - startTime.getTime()) / 60000;
    setDuration((durationInMinutes / 60).toFixed(2));
  };

  const handleDurationChange = (newDuration: string) => {
    setDuration(newDuration);
    const durationInMinutes = parseFloat(newDuration) * 60;
    setEndTime(calculateEndTime(startTime, durationInMinutes));
  };

  const isValidDuration = (): boolean => {
    const durationInMinutes = parseFloat(duration) * 60;
    return durationInMinutes % 15 === 0 && durationInMinutes > 0;
  };

  const handleCreate = () => {
    const updatedEvent: DefaultEvent = {
      name,
      location,
      duration: parseFloat(duration) * 60, // Convert hours to minutes
      calendarId: selectedCalendarId,
    };
    onCreateEvent(updatedEvent, selectedCalendarId, startTime, endTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Creation from Default</Text>

      <EventForm
        name={name}
        setName={setName}
        location={location}
        setLocation={setLocation}
        duration={duration}
        setDuration={handleDurationChange}
        selectedCalendarId={selectedCalendarId}
        setSelectedCalendarId={setSelectedCalendarId}
        calendars={calendars}
      />

      <Text style={styles.label}>Start time</Text>
      <TimeSelector
        onTimeSelected={handleStartTimeChange}
        initialTime={startTime}
      />

      <Text style={styles.label}>End time</Text>
      <TimeSelector
        onTimeSelected={handleEndTimeChange}
        initialTime={endTime}
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
            styles.createButton,
            !isValidDuration() && styles.disabledButton,
          ]}
          onPress={handleCreate}
          disabled={!isValidDuration()}
        >
          <Text
            style={[
              styles.buttonText,
              !isValidDuration() && styles.disabledButtonText,
            ]}
          >
            Create Instance
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
  label: {
    ...typography.body,
    marginBottom: spacing.small,
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
  disabledButton: {
    backgroundColor: colors.surface,
    borderColor: colors.onSurfaceDisabled,
    borderWidth: 1,
  },
  disabledButtonText: {
    color: colors.onSurfaceDisabled,
  },
});

export default EventConfigurationCard;
