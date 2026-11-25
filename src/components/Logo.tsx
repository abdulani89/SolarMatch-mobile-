import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../theme';

type Props = { size?: number; showName?: boolean; nameColor?: string };

// Placeholder logo (sun icon). Replace with the real asset when design delivers it.
export const Logo = ({ size = 72, showName = true, nameColor = colors.textOnPrimary }: Props) => (
  <View style={styles.wrap}>
    <View style={[styles.badge, { width: size, height: size, borderRadius: size / 3 }]}>
      <Ionicons name="sunny" size={size * 0.6} color={colors.textOnAccent} />
    </View>
    {showName && <Text style={[styles.name, { color: nameColor }]}>SolarMatch</Text>}
  </View>
);

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  badge: { backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  name: { ...typography.title, marginTop: 12, letterSpacing: 0.5 },
});
