//CardContainer.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { layout, typography, spacing } from '../../styles/theme';

interface CardContainerProps {
  title: string;
  children: React.ReactNode;
}

export const CardContainer: React.FC<CardContainerProps> = ({
  title,
  children,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...layout.card,
    marginTop: spacing.large,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.medium,
  },
});
