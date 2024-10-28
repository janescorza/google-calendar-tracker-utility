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
    } else {
      setDurationError('Invalid duration. Please enter a positive number.');
    }
  };

  const handleStartTimeChange = (time: Date) => {
    setStartTime(time);
    if (!isNaN(parseFloat(duration))) {
      setEndTime(calculateEndTime(time, parseFloat(duration) * 60));
    }
  };

  const handleEndTimeChange = (time: Date) => {
    setEndTime(time);
    const durationMinutes = calculateDurationInMinutes(startTime, time);
    setDuration((durationMinutes / 60).toFixed(2));
  };

  const handleDurationChange = (newDuration: string) => {
    setDuration(newDuration);
    const durationHours = parseFloat(newDuration);
    if (!newDuration.endsWith('.')) {
      updateEndTimeFromDuration(durationHours);
    }
  };

  useEffect(() => {
    if (!duration.endsWith('.')) {
      updateEndTimeFromDuration(parseFloat(duration));
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
