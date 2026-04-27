import { createTheme } from '@shopify/restyle';

const palette = {
  // Brand colours
  forestGreen: '#2D6A4F',
  forestGreenLight: '#40916C',
  forestGreenDark: '#1B4332',
  warmAmber: '#E9C46A',
  warmAmberDark: '#C9A84C',
  skyBlue: '#48CAE4',
  skyBlueDark: '#0096C7',
  cream: '#FEFAE0',
  creamDark: '#F0EAD6',

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  slate100: '#F8FAFC',
  slate200: '#E2E8F0',
  slate400: '#94A3B8',
  slate600: '#475569',
  slate800: '#1E293B',

  // Dark mode backgrounds
  deepSlate: '#1A1A2E',
  earthyBrown: '#3D2B1F',
  mutedGold: '#C9A84C',
  softWhite: '#F0EAD6',

  // Domain colours
  literacy: '#5E60CE',
  mathReadiness: '#F77F00',
  scienceNature: '#2D6A4F',
  physical: '#E63946',
  socialEmotional: '#FF6B6B',
  creativeArts: '#A8DADC',

  // Semantic
  success: '#52B788',
  warning: '#F4A261',
  error: '#E63946',
  transparent: 'transparent',
};

const theme = createTheme({
  colors: {
    // Surface
    background: palette.cream,
    cardBackground: palette.white,
    surface: palette.slate100,

    // Brand
    primary: palette.forestGreen,
    primaryLight: palette.forestGreenLight,
    primaryDark: palette.forestGreenDark,
    accent: palette.warmAmber,
    accentDark: palette.warmAmberDark,
    highlight: palette.skyBlue,

    // Text
    textPrimary: palette.slate800,
    textSecondary: palette.slate600,
    textMuted: palette.slate400,
    textOnPrimary: palette.white,

    // Borders
    border: palette.slate200,

    // Semantic
    success: palette.success,
    warning: palette.warning,
    error: palette.error,

    // Domains
    domainLiteracy: palette.literacy,
    domainMath: palette.mathReadiness,
    domainScience: palette.scienceNature,
    domainPhysical: palette.physical,
    domainSocial: palette.socialEmotional,
    domainArts: palette.creativeArts,

    // Transparent
    transparent: palette.transparent,
  },
  spacing: {
    xxs: 2,
    xs: 4,
    s: 8,
    sm: 12,
    m: 16,
    ml: 20,
    l: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  borderRadii: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    xxl: 32,
    full: 9999,
  },
  textVariants: {
    displayLarge: {
      fontFamily: 'Nunito-Bold',
      fontSize: 34,
      lineHeight: 40,
      color: 'textPrimary',
    },
    displayMedium: {
      fontFamily: 'Nunito-Bold',
      fontSize: 28,
      lineHeight: 34,
      color: 'textPrimary',
    },
    heading1: {
      fontFamily: 'Nunito-Bold',
      fontSize: 24,
      lineHeight: 30,
      color: 'textPrimary',
    },
    heading2: {
      fontFamily: 'Nunito-SemiBold',
      fontSize: 20,
      lineHeight: 26,
      color: 'textPrimary',
    },
    heading3: {
      fontFamily: 'Nunito-SemiBold',
      fontSize: 17,
      lineHeight: 22,
      color: 'textPrimary',
    },
    body: {
      fontFamily: 'Nunito-Regular',
      fontSize: 16,
      lineHeight: 22,
      color: 'textPrimary',
    },
    bodySmall: {
      fontFamily: 'Nunito-Regular',
      fontSize: 14,
      lineHeight: 20,
      color: 'textSecondary',
    },
    caption: {
      fontFamily: 'Nunito-Regular',
      fontSize: 12,
      lineHeight: 16,
      color: 'textMuted',
    },
    label: {
      fontFamily: 'Nunito-SemiBold',
      fontSize: 13,
      lineHeight: 18,
      color: 'textSecondary',
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
    button: {
      fontFamily: 'Nunito-Bold',
      fontSize: 16,
      lineHeight: 20,
      color: 'textOnPrimary',
    },
    // Child view — oversized for readability
    childDisplay: {
      fontFamily: 'Nunito-Bold',
      fontSize: 36,
      lineHeight: 44,
      color: 'textPrimary',
    },
    childBody: {
      fontFamily: 'Nunito-Regular',
      fontSize: 28,
      lineHeight: 36,
      color: 'textPrimary',
    },
    defaults: {
      fontFamily: 'Nunito-Regular',
      fontSize: 16,
      color: 'textPrimary',
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.deepSlate,
    cardBackground: palette.earthyBrown,
    surface: '#2A2A3E',

    textPrimary: palette.softWhite,
    textSecondary: '#C8BFBF',
    textMuted: '#8A8A9A',

    border: '#3A3A5C',
  },
};

export default theme;
