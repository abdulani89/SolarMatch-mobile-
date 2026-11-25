import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, radius, typography } from '../theme';

type Variant = 'primary' | 'accent' | 'outline' | 'outlineLight';
type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};

const variants: Record<Variant, { bg: string; fg: string; border: string }> = {
  primary: { bg: colors.primary, fg: colors.textOnPrimary, border: colors.primary },
  accent: { bg: colors.accent, fg: colors.textOnAccent, border: colors.accent },
  outline: { bg: 'transparent', fg: colors.primary, border: colors.primary },
  outlineLight: { bg: 'transparent', fg: colors.textOnPrimary, border: colors.textOnPrimary },
};

export const Button = ({ title, onPress, variant = 'primary', loading, disabled, style }: Props) => {
  const v = variants[variant];
  const inactive = disabled || loading; // blocks duplicate taps while submitting
  return (
    <Pressable
      accessibilityRole="button"
      onPress={inactive ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: v.bg, borderColor: v.border, opacity: inactive ? 0.6 : pressed ? 0.85 : 1 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.fg} />
      ) : (
        <Text style={[styles.text, { color: v.fg }]}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: radius.md,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: { ...typography.button },
});
