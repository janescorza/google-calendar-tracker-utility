// theme.ts
import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#90CAF9',
  primaryVariant: '#1976D2',
  secondary: '#03DAC6',
  background: '#121212',
  surface: '#1E1E1E',
  error: '#CF6679',
  onPrimary: '#000000',
  onSecondary: '#000000',
  onBackground: '#D7DADC',
  onSurface: '#D7DADC',
  onSurfaceSecondary: '#9E9E9E',
  onSurfaceDisabled: '#9E9E9E',
  placeholderTextColor: '#9E9E9E',
  onError: '#000000',
};

export const typography = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.onBackground,
  },
  subtitle: {
    fontSize: 16,
    color: colors.onBackground,
  },
  body: {
    fontSize: 14,
    color: colors.onBackground,
  },
});

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
};

export const layout = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: spacing.medium,
    marginBottom: spacing.medium,
  },
});

export const buttons = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    padding: spacing.medium,
    borderRadius: 5,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
    padding: spacing.medium,
    borderRadius: 5,
  },
  primaryText: {
    color: colors.onPrimary,
    textAlign: 'center',
  },
  secondaryText: {
    color: colors.primary,
    textAlign: 'center',
  },
});
