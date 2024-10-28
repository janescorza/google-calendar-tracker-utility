// useEventTime.ts
import { useState, useEffect } from 'react';
import {
  roundToNext15Minutes,
  calculateEndTime,
  calculateDurationInMinutes,
} from '../utils/eventUtils';

interface UseEventTimeParams {
  initialDuration?: number; // in minutes
}

export const useEventTime = ({
  initialDuration = 60,
}: UseEventTimeParams = {}) => {
  const [startTime, setStartTime] = useState(roundToNext15Minutes(new Date()));
  const [endTime, setEndTime] = useState(
    calculateEndTime(startTime, initialDuration),
  );
  const [duration, setDuration] = useState((initialDuration / 60).toString());
  const [durationError, setDurationError] = useState<string | null>(null);

  const updateEndTimeFromDuration = (durationHours: number) => {
    if (!isNaN(durationHours) && durationHours > 0) {
      setEndTime(calculateEndTime(startTime, durationHours * 60));
      setDurationError(null);
    }
  };

  const handleStartTimeChange = (time: Date) => {
    setStartTime(time);
    const durationValue = parseFloat(duration);
    if (!isNaN(durationValue) && durationValue > 0) {
      setEndTime(calculateEndTime(time, durationValue * 60));
    }
  };

  const handleEndTimeChange = (time: Date) => {
    setEndTime(time);
    const durationMinutes = calculateDurationInMinutes(startTime, time);
    setDuration((durationMinutes / 60).toFixed(2));
  };

  const handleDurationChange = (newDuration: string) => {
    setDuration(newDuration);
    // Only update end time if we have a valid positive number
    if (newDuration !== '') {
      const durationHours = parseFloat(newDuration);
      if (
        !isNaN(durationHours) &&
        durationHours > 0 &&
        !newDuration.endsWith('.')
      ) {
        updateEndTimeFromDuration(durationHours);
      }
    }
  };

  useEffect(() => {
    if (duration !== '' && !duration.endsWith('.')) {
      const durationValue = parseFloat(duration);
      if (!isNaN(durationValue) && durationValue > 0) {
        updateEndTimeFromDuration(durationValue);
      }
    }
  }, [startTime, duration]);

  return {
    startTime,
    endTime,
    duration,
    durationError,
    setDurationError,
    handleStartTimeChange,
    handleEndTimeChange,
    handleDurationChange,
  };
};
