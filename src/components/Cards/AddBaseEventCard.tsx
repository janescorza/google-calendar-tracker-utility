// AddBaseEventCard.tsx
import React from 'react';
import { BaseEvent, Calendar } from '../../types';
import EventForm from '../Event/EventForm';
import { CardContainer } from '../Common/CardContainer';
import { ActionButtons } from '../Common/ActionButtons';
import { useEventForm } from '../../hooks/useEventForm';

interface AddBaseEventCardProps {
  calendars: Calendar[];
  onAddEvent: (event: BaseEvent) => void;
  onCancel: () => void;
}

const AddBaseEventCard: React.FC<AddBaseEventCardProps> = ({
  calendars,
  onAddEvent,
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
  } = useEventForm({ calendars });

  const handleAdd = () => {
    if (!validateForm() || !isFormValid) return;
    onAddEvent(getEventData());
  };

  return (
    <CardContainer title="Add New Base Event">
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
        onSubmit={handleAdd}
        submitLabel="Add"
        isSubmitDisabled={!isFormValid}
      />
    </CardContainer>
  );
};

export default AddBaseEventCard;
