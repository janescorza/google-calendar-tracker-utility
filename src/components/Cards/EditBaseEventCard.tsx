//EditBaseEventCard.tsx
import React from 'react';
import { BaseEvent, Calendar } from '../../types';
import EventForm from '../Event/EventForm';
import { CardContainer } from '../Common/CardContainer';
import { ActionButtons } from '../Common/ActionButtons';
import { useEventForm } from '../../hooks/useEventForm';

interface EditBaseEventCardProps {
  event: BaseEvent;
  calendars: Calendar[];
  onSaveEvent: (updatedEvent: BaseEvent) => void;
  onCancel: () => void;
}

const EditBaseEventCard: React.FC<EditBaseEventCardProps> = ({
  event,
  calendars,
  onSaveEvent,
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
    formRef,
    isFormValid,
    validateForm,
    getEventData,
  } = useEventForm({ initialEvent: event, calendars });

  const handleSaveEventEdit = () => {
    if (!validateForm() || !isFormValid) return;
    onSaveEvent({ ...event, ...getEventData() });
  };

  return (
    <CardContainer title="Edit Base Event">
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
      <ActionButtons
        onCancel={onCancel}
        onSubmit={handleSaveEventEdit}
        submitLabel="Save"
        isSubmitDisabled={!isFormValid}
      />
    </CardContainer>
  );
};

export default EditBaseEventCard;
