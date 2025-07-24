// Componente molecular QuickAccessCard - tarjeta individual de acceso rápido
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { DesignTokens } from '@/constants/designTokens';

interface QuickAccessCardProps {
  icon: React.ReactNode;
  title: string;
  completed: boolean;
  onPress: () => void;
  colors: {
    card: string;
    border: string;
    text: string;
    textSecondary: string;
  };
}

export const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  icon,
  title,
  completed,
  onPress,
  colors
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card, 
        { 
          backgroundColor: colors.card, 
          backgroundColor: colors.surfaceSecondary,
          borderColor: colors.border,
          borderRadius: DesignTokens.borderRadius.lg,
          padding: DesignTokens.spacing.lg,
          ...DesignTokens.shadows.sm,
        }
      ]}
      activeOpacity={0.7}
    >
      <View style={[
        styles.iconContainer, 
        { 
          backgroundColor: '#F3F4F6',
          width: DesignTokens.spacing['4xl'],
          height: DesignTokens.spacing['4xl'],
          borderRadius: DesignTokens.spacing.xl,
          marginBottom: DesignTokens.spacing.md,
        }
      ]}>
        {icon}
      </View>
      <Text style={[
        styles.title, 
        { 
          color: colors.text,
          fontSize: DesignTokens.typography.fontSize.sm,
          fontFamily: DesignTokens.typography.fontFamily.medium,
        }
      ]} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 90,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: DesignTokens.typography.fontWeight.medium,
    lineHeight: DesignTokens.typography.fontSize.sm * DesignTokens.typography.lineHeight.tight,
  },
});