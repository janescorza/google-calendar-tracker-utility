// showSnackbar.ts
import Snackbar from 'react-native-snackbar';

export const showSnackbar = (message: string, isError = false): void => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: isError ? 'red' : 'green',
  });
};
