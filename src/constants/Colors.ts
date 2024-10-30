/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

// src/constants/Colors.ts

export const Colors = {
  light: {
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  primary: '#30D5C8', // Turquoise blue
  primaryDark: '#218F86',
  primaryLight: '#7EEAE0',
  water: '#4FB5FF', // Water blue
  waterDark: '#3B8AC2',
  waterLight: '#8FD3FF',
  background: '#FFFFFF',
  backgroundDark: '#1A1A1A',
  text: '#2C2C2C',
  textLight: '#FFFFFF',
  textGrey: '#6B6B6B',
  border: '#E0E0E0',
  error: '#FF6B6B',
  success: '#2A9D8F',
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
