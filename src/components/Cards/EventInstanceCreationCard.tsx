// EventInstanceCreationCard.tsx
import React, { useCallback } from 'react';
import { Text, StyleSheet } from 'react-native';
import { BaseEvent, Calendar } from '../../types';
import EventForm from '../Event/EventForm';
import TimeSelector from '../Event/TimeSelector';
import { ActionButtons } from '../Common/ActionButtons';
import { typography, spacing } from '../../styles/theme';
import { CardContainer } from '../Common/CardContainer';
import { useEventForm } from '../../hooks/useEventForm';

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
  const {
    name,
    setName,
    location,
    setLocation,
    duration,
    setDuration,
    selectedCalendarId,
    setSelectedCalendarId,
    durationError,
    setDurationError,
    startTime,
    endTime,
    handleStartTimeChange,
    handleEndTimeChange,
    formRef,
    isFormValid,
    validateForm,
    getEventData,
  } = useEventForm({ initialEvent: event, calendars });

  const handleEventCreation = useCallback(() => {
    if (!validateForm() || !isFormValid) return;
    onCreateEvent(getEventData(), selectedCalendarId, startTime, endTime);
  }, [
    validateForm,
    isFormValid,
    onCreateEvent,
    selectedCalendarId,
    startTime,
    endTime,
    getEventData,
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
        setDuration={setDuration}
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
