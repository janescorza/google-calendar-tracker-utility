// eventValidation.ts
export const isEmptyInput = (duration: string): boolean => {
  return duration.trim() === '';
};

export const isPartialDecimalInput = (duration: string): boolean => {
  return duration === '0' || duration === '.' || duration === '0.';
};

export const isValidNumber = (duration: string): boolean => {
  const numericValue = parseFloat(duration);
  return !isNaN(numericValue) && numericValue > 0;
};

export const isInFifteenMinuteIncrement = (duration: number): boolean => {
  return (duration * 60) % 15 === 0;
};

export const validateAndFormatDuration = (
  duration: string,
): {
  isValid: boolean;
  formattedValue: string;
  error: string | null;
} => {
  if (isEmptyInput(duration)) {
    return {
      isValid: false,
      formattedValue: '',
      error: 'Duration is required',
    };
  }

  if (isPartialDecimalInput(duration)) {
    return {
      isValid: false,
      formattedValue: duration,
      error: 'Please enter a valid duration',
    };
  }

  // Allow for partial input (like "1.")
  if (duration.endsWith('.')) {
    return {
      isValid: true,
      formattedValue: duration,
      error: null,
    };
  }

  if (!isValidNumber(duration)) {
    return {
      isValid: false,
      formattedValue: duration,
      error: 'Please enter a valid duration',
    };
  }

  const numericValue = parseFloat(duration);
  const roundedValue = Math.round(numericValue * 4) / 4;

  if (!isInFifteenMinuteIncrement(roundedValue)) {
    return {
      isValid: false,
      formattedValue: roundedValue.toString(),
      error: 'Duration must be in 15-minute increments',
    };
  }

  return {
    isValid: true,
    formattedValue: roundedValue.toString(),
    error: null,
  };
};
