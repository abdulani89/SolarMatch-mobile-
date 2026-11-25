import React, { forwardRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../theme';

type Props = TextInputProps & {
  label: string;
  error?: string;
  isPassword?: boolean;
};

export const AppInput = forwardRef<TextInput, Props>(
  ({ label, error, isPassword, onFocus, onBlur, ...rest }, ref) => {
    const [focused, setFocused] = useState(false);
    const [hidden, setHidden] = useState(true);

    const borderColor = error ? colors.error : focused ? colors.inputBorderFocus : colors.inputBorder;

    return (
      <View style={styles.wrap}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.field, { borderColor }]}>
          <TextInput
            ref={ref}
            style={styles.input}
            placeholderTextColor={colors.placeholder}
            secureTextEntry={isPassword && hidden}
            autoCapitalize="none"
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            {...rest}
          />
          {isPassword && (
            <Pressable
              hitSlop={10}
              onPress={() => setHidden((h) => !h)}
              accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
            >
              <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={22} color={colors.textMuted} />
            </Pressable>
          )}
        </View>
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.md },
  label: { ...typography.label, color: colors.textPrimary, marginBottom: 6 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.inputBackground,
  },
  input: { flex: 1, ...typography.body, color: colors.textPrimary, height: '100%' },
  error: { ...typography.caption, color: colors.error, marginTop: 4 },
});
