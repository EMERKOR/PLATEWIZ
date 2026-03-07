import type { TextStyle } from "react-native";

export type FontWeight = TextStyle["fontWeight"];

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  accent: string;
  background: string;
  backgroundLight: string;
  surface: string;
  surfaceElevated: string;
  text: string;
  textDark: string;
  textMuted: string;
  success: string;
  error: string;
  warning: string;
  timerNormal: string;
  timerWarning: string;
  timerDanger: string;
}

export interface ThemeTypography {
  fontFamily: {
    heading: string;
    body: string;
    plate: string;
    mono: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    "2xl": number;
    "3xl": number;
    "4xl": number;
  };
  fontWeight: {
    normal: FontWeight;
    medium: FontWeight;
    semibold: FontWeight;
    bold: FontWeight;
    black: FontWeight;
  };
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}

export interface ThemeBorderRadius {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface ThemeAnimation {
  plateRevealDuration: number;
  scoreUpdateDuration: number;
  timerTickInterval: number;
  correctAnswerDelay: number;
  wrongAnswerShake: number;
  transitionDuration: number;
}

export interface ThemePlate {
  width: number;
  height: number;
  borderWidth: number;
  borderColor: string;
  borderRadius: number;
  textColor: string;
  backgroundColor: string;
  embossedShadow: boolean;
  fontSize: number;
}

export interface ThemeGame {
  timerHeight: number;
  scoreDisplaySize: number;
  optionButtonHeight: number;
  optionSpacing: number;
  headerHeight: number;
}

export interface Theme {
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  animation: ThemeAnimation;
  plate: ThemePlate;
  game: ThemeGame;
}
