// eventValidation.ts
export const validateAndFormatDuration = (
  duration: string,
): {
  isValid: boolean;
  formattedValue: string;
  error: string | null;
} => {
  const numericValue = parseFloat(duration);

  // Empty check
  if (duration.trim() === '') {
    return {
      isValid: false,
      formattedValue: '',
      error: 'Duration is required',
    };
  }

  // Basic numeric validation
  if (isNaN(numericValue) || numericValue <= 0) {
    return {
      isValid: false,
      formattedValue: duration,
      error: 'Please enter a valid duration',
    };
  }

  // Round to nearest quarter hour
  const roundedValue = Math.round(numericValue * 4) / 4;

  // Check if it's in 15-minute increments
  if ((roundedValue * 60) % 15 !== 0) {
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
