import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { StatusBar } from 'expo-status-bar';
import { Logo } from '../components/Logo';
import { SPLASH_DURATION_MS, TAGLINE } from '../constants/app';
import { colors, typography } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
    ]).start();

    // TODO: later, check for a saved session here and route to the dashboard instead.
    const t = setTimeout(() => navigation.replace('Welcome'), SPLASH_DURATION_MS);
    return () => clearTimeout(t);
  }, [opacity, scale, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.View style={{ opacity, transform: [{ scale }], alignItems: 'center' }}>
        <Logo size={92} />
        <Text style={styles.tagline}>{TAGLINE}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.splashBackground, alignItems: 'center', justifyContent: 'center' },
  tagline: { ...typography.body, color: colors.accent, marginTop: 12, textAlign: 'center', paddingHorizontal: 32 },
});
