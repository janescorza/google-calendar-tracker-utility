// useEventForm.ts
import { useState, useMemo, useRef } from 'react';
import { EventFormRef } from '../components/Event/EventForm';
import { BaseEvent, Calendar } from '../types';
import { validateAndFormatDuration } from '../utils/eventValidation';
import { useEventTime } from './useEventTime';

interface UseEventFormParams {
  initialEvent?: BaseEvent;
  calendars: Calendar[];
}

export const useEventForm = ({
  initialEvent,
  calendars,
}: UseEventFormParams) => {
  const [name, setName] = useState(initialEvent?.name ?? '');
  const [location, setLocation] = useState(initialEvent?.location ?? '');
  const [selectedCalendarId, setSelectedCalendarId] = useState(
    initialEvent?.calendarId ??
      calendars.find((cal) => cal.isPrimary)?.id ??
      '',
  );
  const [durationError, setDurationError] = useState<string | null>(null);

  const {
    startTime,
    endTime,
    duration,
    handleStartTimeChange,
    handleEndTimeChange,
    handleDurationChange: handleRawDurationChange,
  } = useEventTime({
    initialDuration: initialEvent?.duration,
  });

  const handleDurationChange = (newDuration: string) => {
    // Allow empty string and don't validate it immediately
    if (newDuration === '') {
      handleRawDurationChange('');
      setDurationError('Duration is required');
      return;
    }

    // Only validate non-empty values
    const validationResult = validateAndFormatDuration(newDuration);
    setDurationError(validationResult.error);

    // Always update the duration, even if invalid
    handleRawDurationChange(newDuration);
  };

  const formRef = useRef<EventFormRef>(null);

  const isFormValid = useMemo(() => {
    return name.trim() !== '' && !durationError && duration !== '';
  }, [name, duration, durationError]);

  const validateForm = () => {
    // Only validate if there's a value
    if (duration === '') {
      setDurationError('Duration is required');
      return false;
    }

    const validationResult = validateAndFormatDuration(duration);
    setDurationError(validationResult.error);
    return validationResult.isValid;
  };

  const getEventData = (): BaseEvent & {
    startTime: Date;
    endTime: Date;
  } => ({
    name,
    location,
    duration: parseFloat(duration || '0') * 60, // Handle empty string case
    calendarId: selectedCalendarId,
    startTime,
    endTime,
  });

  return {
    name,
    setName,
    location,
    setLocation,
    duration,
    setDuration: handleDurationChange,
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
  };
};
