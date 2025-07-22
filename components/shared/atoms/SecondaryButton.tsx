// Componente atómico SecondaryButton - botón secundario con borde reutilizable
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { DesignTokens } from '@/constants/designTokens';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  size?: 'default' | 'large';
  colors: {
    background: string;
    border: string;
    text: string;
    textTertiary: string;
  };
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  icon,
  size = 'default',
  colors
}) => {
  const buttonHeight = size === 'large' ? DesignTokens.heights.buttonLarge : DesignTokens.heights.button;

  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled}
      style={[
        styles.secondaryButton,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
          borderRadius: DesignTokens.borderRadius.md,
          paddingVertical: DesignTokens.spacing.sm,
          paddingHorizontal: DesignTokens.spacing.lg,
          minHeight: buttonHeight,
        },
        disabled && { opacity: 0.5 }
      ]}
    >
      <View style={[styles.buttonContent, { gap: DesignTokens.spacing.sm }]}>
        {icon}
        <Text style={[
          styles.secondaryButtonText, 
          { 
            color: disabled ? colors.textTertiary : colors.text,
            fontFamily: DesignTokens.typography.fontFamily.medium,
            fontSize: DesignTokens.typography.fontSize.base,
          }
        ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  secondaryButton: {
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontWeight: DesignTokens.typography.fontWeight.medium,
    lineHeight: 20,
  },
});