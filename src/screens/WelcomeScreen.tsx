import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { colors, radius, spacing, typography } from '../theme';

const HIGHLIGHTS: { icon: keyof typeof Ionicons.glyphMap; text: string }[] = [
  { icon: 'calculator-outline', text: 'Size your solar system with confidence' },
  { icon: 'shield-checkmark-outline', text: 'Get quotes from verified installers' },
  { icon: 'documents-outline', text: 'Keep installation & warranty records' },
];


type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      {/* decorative shapes – delete or replace when designs arrive */}
      <View style={styles.circleLarge} />
      <View style={styles.circleSmall} />

      <View style={styles.top}>
        <Logo size={80} />
        <Text style={styles.headline}>Making solar simple for every Nigerian home and business.</Text>
      </View>

      <View style={styles.highlights}>
        {HIGHLIGHTS.map((h) => (
          <View key={h.text} style={styles.row}>
            <Ionicons name={h.icon} size={22} color={colors.accent} />
            <Text style={styles.rowText}>{h.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <Button title="Create account" variant="accent" onPress={() => navigation.navigate('SignUp')} />
        <Button title="Sign in" variant="outlineLight" onPress={() => navigation.navigate('Login')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.welcomeBackground, padding: spacing.lg, justifyContent: 'space-between' },
  circleLarge: {
    position: 'absolute', top: -80, right: -80, width: 260, height: 260,
    borderRadius: 130, backgroundColor: colors.primaryDark, opacity: 0.6,
  },
  circleSmall: {
    position: 'absolute', bottom: 140, left: -50, width: 120, height: 120,
    borderRadius: 60, backgroundColor: colors.secondary, opacity: 0.25,
  },
  top: { alignItems: 'center', marginTop: spacing.xxl },
  headline: {
    ...typography.heading, color: colors.textOnPrimary, textAlign: 'center',
    marginTop: spacing.lg, lineHeight: 30,
  },
  highlights: { gap: spacing.md },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.primaryDark, padding: spacing.md, borderRadius: radius.md,
  },
  rowText: { ...typography.body, color: colors.textOnPrimary, flex: 1 },
  actions: { gap: spacing.md, marginBottom: spacing.sm },
});
