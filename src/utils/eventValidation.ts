// eventValidation.ts
export const validateAndFormatDuration = (
  duration: string,
): {
  isValid: boolean;
  formattedValue: string;
  error: string | null;
} => {
  // Allow for partial input (like "1.") during typing
  if (duration.endsWith('.')) {
    return {
      isValid: true,
      formattedValue: duration,
      error: null,
    };
  }

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

  // Only round and validate on blur or form submission
  // This allows for partial input during typing
  if (!duration.includes('.') || duration.split('.')[1]?.length === 2) {
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
  }

  // Allow partial decimal input
  return {
    isValid: true,
    formattedValue: duration,
    error: null,
  };
};
