// EventInstanceCreationCard.tsx
import React, { useState, useRef, useMemo, useCallback } from 'react';
import { Text, StyleSheet } from 'react-native';
import { BaseEvent, Calendar } from '../../types';
import EventForm, { EventFormRef } from '../Event/EventForm';
import TimeSelector from '../Event/TimeSelector';
import { ActionButtons } from '../Common/ActionButtons';
import { typography, spacing } from '../../styles/theme';
import { CardContainer } from '../Common/CardContainer';
import { useEventTime } from '../../hooks/useEventTime';

interface EventInstanceCreationCardProps {
  event: BaseEvent;
  calendars: Calendar[];
  onCreateEvent: (
    event: BaseEvent,
    calendarId: string,
    startTime: Date,
    endTime: Date,
  ) => void;
  onCancel: () => void;
}

const EventInstanceCreationCard: React.FC<EventInstanceCreationCardProps> = ({
  event,
  calendars,
  onCreateEvent,
  onCancel,
}) => {
  const [name, setName] = useState(event.name);
  const [location, setLocation] = useState(event.location);
  const [selectedCalendarId, setSelectedCalendarId] = useState(
    event.calendarId || calendars.find((cal) => cal.isPrimary)?.id || '',
  );

  const formRef = useRef<EventFormRef>(null);

  const {
    startTime,
    endTime,
    duration,
    durationError,
    setDurationError,
    handleStartTimeChange,
    handleEndTimeChange,
    handleDurationChange,
  } = useEventTime({ initialDuration: event.duration });

  const isFormValid = useMemo(() => name.trim() !== '', [name]);

  const handleEventCreation = useCallback(() => {
    if (!isFormValid) return;

    const updatedEvent: BaseEvent = {
      name,
      location,
      duration: parseFloat(duration) * 60,
      calendarId: selectedCalendarId,
    };
    onCreateEvent(updatedEvent, selectedCalendarId, startTime, endTime);
  }, [
    name,
    location,
    duration,
    selectedCalendarId,
    startTime,
    endTime,
    onCreateEvent,
    isFormValid,
  ]);

  return (
    <CardContainer title="Instance creation">
      <Text style={styles.subtitle}>
        Create an instance of an event on your calendar from a previously
        configured Base Event
      </Text>
      <EventForm
        ref={formRef}
        name={name}
        setName={setName}
        location={location}
        setLocation={setLocation}
        duration={duration}
        durationError={durationError}
        setDurationError={setDurationError}
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

      <ActionButtons
        onCancel={onCancel}
        onSubmit={handleEventCreation}
        submitLabel="Create Instance"
        isSubmitDisabled={!isFormValid}
      />
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    ...typography.body,
    marginBottom: spacing.small,
  },
  subtitle: {
    ...typography.body,
    marginBottom: spacing.medium,
    fontStyle: 'italic',
  },
});

export default EventInstanceCreationCard;
