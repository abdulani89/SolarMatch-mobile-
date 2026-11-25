import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { AppInput } from '../components/AppInput';
import { Button } from '../components/Button';
import { ErrorBanner } from '../components/ErrorBanner';
import { ScreenContainer } from '../components/ScreenContainer';
import { useAuth } from '../context/AuthContext';
import { register } from '../services/auth';
import { colors, spacing, typography } from '../theme';
import { FieldErrors, SignUpValues } from '../types/auth';
import { hasErrors, PASSWORD_MIN_LENGTH, validateSignUp } from '../utils/validation';

const INITIAL: SignUpValues = { fullName: '', email: '', password: '', confirmPassword: '' };


type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  const [values, setValues] = useState<SignUpValues>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors<SignUpValues>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const setField = (key: keyof SignUpValues) => (text: string) => {
    setValues((v) => ({ ...v, [key]: text }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async () => {
    if (submitting) return;
    setServerError(null);

    const cleaned = { ...values, fullName: values.fullName.trim(), email: values.email.trim() };
    const result = validateSignUp(cleaned);
    setErrors(result);
    if (hasErrors(result)) return;

    try {
      setSubmitting(true);
      const auth = await register(cleaned);
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
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Start your solar journey with SolarMatch</Text>
      </View>

      {!!serverError && <ErrorBanner message={serverError} />}

      <AppInput
        label="Full name"
        placeholder="Your full name"
        autoCapitalize="words"
        autoComplete="name"
        returnKeyType="next"
        value={values.fullName}
        onChangeText={setField('fullName')}
        error={errors.fullName}
        onSubmitEditing={() => emailRef.current?.focus()}
      />
      <AppInput
        ref={emailRef}
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
        placeholder={`At least ${PASSWORD_MIN_LENGTH} characters`}
        isPassword
        autoComplete="new-password"
        returnKeyType="next"
        value={values.password}
        onChangeText={setField('password')}
        error={errors.password}
        onSubmitEditing={() => confirmRef.current?.focus()}
      />
      <AppInput
        ref={confirmRef}
        label="Confirm password"
        placeholder="Re-enter your password"
        isPassword
        autoComplete="new-password"
        returnKeyType="done"
        value={values.confirmPassword}
        onChangeText={setField('confirmPassword')}
        error={errors.confirmPassword}
        onSubmitEditing={onSubmit}
      />

      <Button title="Create account" loading={submitting} onPress={onSubmit} style={{ marginTop: spacing.sm }} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <Pressable onPress={() => navigation.replace('Login')} hitSlop={8}>
          <Text style={styles.link}>Sign in</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  back: { width: 40, height: 40, justifyContent: 'center' },
  header: { marginVertical: spacing.lg },
  title: { ...typography.title, color: colors.textPrimary },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: 4 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.lg },
  footerText: { ...typography.body, color: colors.textSecondary },
  link: { ...typography.body, color: colors.secondary, fontWeight: '700' },
});
