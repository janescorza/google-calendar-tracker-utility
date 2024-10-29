// ActionButtons.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, buttons } from '../../styles/theme';

interface ActionButtonsProps {
  onCancel: () => void;
  onSubmit: () => void;
  submitLabel: string;
  isSubmitDisabled: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCancel,
  onSubmit,
  submitLabel,
  isSubmitDisabled,
}) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      style={[styles.button, styles.cancelButton]}
      onPress={onCancel}
    >
      <Text style={styles.cancelButtonText}>Cancel</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        styles.button,
        styles.submitButton,
        isSubmitDisabled && styles.disabledButton,
      ]}
      onPress={onSubmit}
      disabled={isSubmitDisabled}
    >
      <Text
        style={[
          styles.submitButtonText,
          isSubmitDisabled && styles.disabledButtonText,
        ]}
      >
        {submitLabel}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.large,
  },
  button: {
    flex: 1,
    padding: spacing.medium,
    borderRadius: 5,
    marginHorizontal: spacing.small,
  },
  cancelButton: {
    ...buttons.secondary,
  },
  submitButton: {
    ...buttons.primary,
  },
  disabledButton: {
    backgroundColor: colors.surface,
    borderColor: colors.onSurfaceDisabled,
    borderWidth: 1,
  },
  disabledButtonText: {
    color: colors.onSurfaceDisabled,
  },
  cancelButtonText: {
    ...buttons.secondaryText,
  },
  submitButtonText: {
    ...buttons.primaryText,
  },
});
