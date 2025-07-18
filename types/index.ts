// Global shared types
export interface ThemeColors {
  // Primary colors
  primary: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  success: string;
  
  // Background colors
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceSecondary: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  
  // Border colors
  border: string;
  borderLight: string;
  
  // Status colors
  error: string;
  warning: string;
  info: string;
  
  // Card colors
  card: string;
  cardBorder: string;
  shadow: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
}

// Common component props
export interface BaseComponentProps {
  colors: ThemeColors;
}