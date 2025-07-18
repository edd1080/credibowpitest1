// Theme context for dark/light mode management
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import * as SecureStore from 'expo-secure-store';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof lightColors | typeof darkColors;
}

const lightColors = {
  // Primary colors
  primary: '#6A00F4',
  primaryLight: '#8A2BE2',
  secondary: '#3B93FF',
  accent: '#F6B142',
  success: '#00D7B8',
  
  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSecondary: '#F1F5F9',
  
  // Text colors
  text: '#1E293B',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  textInverse: '#FFFFFF',
  
  // Border colors
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  
  // Status colors
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Card colors
  card: '#FFFFFF',
  cardBorder: '#E2E8F0',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

const darkColors = {
  // Primary colors
  primary: '#7C3AED',
  primaryLight: '#A855F7',
  secondary: '#60A5FA',
  accent: '#FBBF24',
  success: '#34D399',
  
  // Background colors
  background: '#0F172A',
  backgroundSecondary: '#1E293B',
  surface: '#1E293B',
  surfaceSecondary: '#334155',
  
  // Text colors
  text: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textTertiary: '#94A3B8',
  textInverse: '#1E293B',
  
  // Border colors
  border: '#334155',
  borderLight: '#475569',
  
  // Status colors
  error: '#F87171',
  warning: '#FBBF24',
  info: '#60A5FA',
  
  // Card colors
  card: '#1E293B',
  cardBorder: '#334155',
  shadow: 'rgba(0, 0, 0, 0.3)',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await SecureStore.getItemAsync('theme');
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      } else {
        // Default to dark mode if no preference saved
        setIsDark(true);
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await SecureStore.setItemAsync('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}