import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, typography } from '../theme';

// PLACEHOLDER: post-login destination has not been agreed. Replace with the real dashboard.
export default function HomeScreen() {
  const { user, signOut } = useAuth();
  return (
    <View style={styles.c}>
      <Text style={styles.t}>Signed in (mock)</Text>
      <Text style={styles.s}>{user?.email}</Text>
      <Button title="Sign out" variant="outline" onPress={signOut} style={{ marginTop: spacing.lg, alignSelf: 'stretch' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  c: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background, padding: spacing.lg },
  t: { ...typography.heading, color: colors.textPrimary },
  s: { ...typography.body, color: colors.textSecondary, marginTop: 8 },
});
