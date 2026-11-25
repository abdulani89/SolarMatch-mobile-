import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

export const ErrorBanner = ({ message }: { message: string }) => (
  <View style={styles.box} accessibilityRole="alert">
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.errorBackground,
    borderRadius: radius.sm,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  text: { ...typography.caption, color: colors.error },
});
