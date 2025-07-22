// Componente atómico PrimaryButton - botón principal con gradiente reutilizable
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DesignTokens } from '@/constants/designTokens';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  size?: 'default' | 'large';
  gradientColors?: string[];
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  icon,
  size = 'default',
  gradientColors = ['#50A274', '#6BB77B']
}) => {
  const buttonHeight = size === 'large' ? DesignTokens.heights.buttonLarge : DesignTokens.heights.button;

  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled || isLoading}
      style={[styles.primaryButton, { marginBottom: DesignTokens.spacing.xl }]}
    >
      <LinearGradient
        colors={gradientColors}
        style={[
          styles.primaryButtonGradient, 
          { 
            minHeight: buttonHeight,
            borderRadius: DesignTokens.borderRadius.md,
            paddingVertical: DesignTokens.spacing.sm,
            paddingHorizontal: DesignTokens.spacing.lg,
          },
          (disabled || isLoading) && styles.disabledButton
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {icon}
        <Text style={[
          styles.primaryButtonText,
          {
            fontFamily: DesignTokens.typography.fontFamily.medium,
            fontSize: DesignTokens.typography.fontSize.base,
          }
        ]}>
          {isLoading ? 'Cargando...' : title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    // marginBottom se aplica dinámicamente
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: DesignTokens.spacing.sm,
  },
  primaryButtonText: {
    fontWeight: DesignTokens.typography.fontWeight.medium,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  disabledButton: {
    opacity: 0.6,
  },
});