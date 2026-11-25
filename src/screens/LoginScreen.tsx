import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { AppInput } from '../components/AppInput';
import { Button } from '../components/Button';
import { ErrorBanner } from '../components/ErrorBanner';
import { Logo } from '../components/Logo';
import { ScreenContainer } from '../components/ScreenContainer';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/auth';
import { colors, spacing, typography } from '../theme';
import { FieldErrors, LoginValues } from '../types/auth';
import { hasErrors, validateLogin } from '../utils/validation';


type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const passwordRef = useRef<TextInput>(null);

  const [values, setValues] = useState<LoginValues>({ email: '', password: '' });
  const [errors, setErrors] = useState<FieldErrors<LoginValues>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const setField = (key: keyof LoginValues) => (text: string) => {
    setValues((v) => ({ ...v, [key]: text }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async () => {
    if (submitting) return;
    setServerError(null);

    const cleaned = { ...values, email: values.email.trim() };
    const result = validateLogin(cleaned);
    setErrors(result);
    if (hasErrors(result)) return;

    try {
      setSubmitting(true);
      const auth = await login(cleaned);
      signIn(auth); // navigator swaps to the signed-in stack
    } catch (e) {
      setServerError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <ScreenContainer>
      <StatusBar style="dark" />
      <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.back} accessibilityLabel="Go back">
        <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
      </Pressable>

      <View style={styles.header}>
        <Logo size={56} showName={false} />
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to continue to SolarMatch</Text>
      </View>

      {!!serverError && <ErrorBanner message={serverError} />}

      <AppInput
        label="Email"
        placeholder="you@example.com"
        keyboardType="email-address"
        autoComplete="email"
        returnKeyType="next"
        value={values.email}
        onChangeText={setField('email')}
        error={errors.email}
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <AppInput
        ref={passwordRef}
        label="Password"
        placeholder="Enter your password"
        isPassword
        autoComplete="password"
        returnKeyType="done"
        value={values.password}
        onChangeText={setField('password')}
        error={errors.password}
        onSubmitEditing={onSubmit}
      />

      <Button title="Sign in" loading={submitting} onPress={onSubmit} style={{ marginTop: spacing.sm }} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <Pressable onPress={() => navigation.replace('SignUp')} hitSlop={8}>
          <Text style={styles.link}>Sign up</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  back: { width: 40, height: 40, justifyContent: 'center' },
  header: { alignItems: 'center', marginVertical: spacing.lg },
  title: { ...typography.title, color: colors.textPrimary, marginTop: spacing.md },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: 4 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.lg },
  footerText: { ...typography.body, color: colors.textSecondary },
  link: { ...typography.body, color: colors.secondary, fontWeight: '700' },
});
