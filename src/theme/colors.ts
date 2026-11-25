/**
 * RAW PALETTE – sampled from the SolarMatch team brief PDF.
 * When the Figma handoff arrives, change the hex values here
 * (and, if needed, re-map the semantic tokens below).
 */
export const palette = {
  navy900: '#0F2A43',
  navy700: '#17405F',
  teal500: '#1B7F79',
  amber500: '#F5A623',
  white: '#FFFFFF',
  slate50: '#F4F7FA',
  slate200: '#D9E1E8',
  slate400: '#7C838A',
  slate700: '#474F58',
  red500: '#D64545',
  red50: '#FDECEC',
  green500: '#2E9E6B',
} as const;

/**
 * SEMANTIC TOKENS – the ONLY colors screens/components should use.
 * Never import `palette` inside a component.
 */
export const colors = {
  primary: palette.navy900,
  primaryDark: palette.navy700,
  secondary: palette.teal500,
  accent: palette.amber500,

  background: palette.white,
  surface: palette.slate50,
  border: palette.slate200,

  textPrimary: palette.navy900,
  textSecondary: palette.slate700,
  textMuted: palette.slate400,
  textOnPrimary: palette.white,
  textOnAccent: palette.navy900,

  inputBorder: palette.slate200,
  inputBorderFocus: palette.teal500,
  inputBackground: palette.white,
  placeholder: palette.slate400,

  error: palette.red500,
  errorBackground: palette.red50,
  success: palette.green500,

  splashBackground: palette.navy900,
  welcomeBackground: palette.navy900,
} as const;

export type AppColors = typeof colors;
