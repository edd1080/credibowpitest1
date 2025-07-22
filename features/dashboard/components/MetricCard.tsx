// Componente molecular MetricCard - tarjeta de métrica individual reutilizable
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DesignTokens } from '@/constants/designTokens';

interface MetricCardProps {
  icon: React.ReactNode;
  iconBackgroundColor: string;
  label: string;
  value: number;
  colors: {
    card: string;
    cardBorder: string;
    textSecondary: string;
    text: string;
  };
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  iconBackgroundColor,
  label,
  value,
  colors
}) => {
  return (
    <View style={[
      styles.metricCard, 
      { 
        backgroundColor: colors.card, 
        borderColor: colors.cardBorder,
        borderRadius: DesignTokens.borderRadius.lg,
        padding: DesignTokens.spacing.md,
        ...DesignTokens.shadows.sm,
      }
    ]}>
      <View style={[
        styles.metricIconContainer, 
        { 
          backgroundColor: iconBackgroundColor,
          width: 36,
          height: 36,
          borderRadius: 18,
          marginBottom: DesignTokens.spacing.sm,
        }
      ]}>
        {icon}
      </View>
      <Text style={[
        styles.metricLabel, 
        { 
          color: colors.textSecondary,
          fontFamily: DesignTokens.typography.fontFamily.medium,
          fontSize: DesignTokens.typography.fontSize.sm,
          marginBottom: DesignTokens.spacing.xs + 2, // 6px
        }
      ]}>
        {label}
      </Text>
      <Text style={[
        styles.metricValue, 
        { 
          color: colors.text,
          fontFamily: DesignTokens.typography.fontFamily.bold,
          fontSize: DesignTokens.typography.fontSize['3xl'],
        }
      ]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  metricCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    borderWidth: 1,
  },
  metricIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricLabel: {
    textAlign: 'center',
    fontWeight: DesignTokens.typography.fontWeight.medium,
  },
  metricValue: {
    textAlign: 'center',
    fontWeight: DesignTokens.typography.fontWeight.bold,
  },
});