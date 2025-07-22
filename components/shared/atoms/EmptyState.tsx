// Componente atómico EmptyState - estado vacío reutilizable
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { DesignTokens } from '@/constants/designTokens';

interface EmptyStateProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  colors: {
    textTertiary: string;
    textSecondary: string;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  icon,
  colors
}) => {
  return (
    <View style={[styles.emptyState, { paddingTop: DesignTokens.spacing['5xl'] + DesignTokens.spacing['3xl'] }]}>
      <View style={[
        styles.emptyStateIcon, 
        { 
          backgroundColor: `${colors.textTertiary}20`,
          width: DesignTokens.spacing['5xl'] + DesignTokens.spacing['3xl'], // 80px
          height: DesignTokens.spacing['5xl'] + DesignTokens.spacing['3xl'], // 80px
          borderRadius: DesignTokens.spacing['4xl'], // 40px
          marginBottom: DesignTokens.spacing.lg,
        }
      ]}>
        {icon || <Search size={DesignTokens.widths.icon.xl} color={colors.textTertiary} />}
      </View>
      <Text style={[
        styles.emptyStateText, 
        { 
          color: colors.textSecondary,
          fontFamily: DesignTokens.typography.fontFamily.semiBold,
          fontSize: DesignTokens.typography.fontSize.xl,
          marginBottom: DesignTokens.spacing.sm,
        }
      ]}>
        {title}
      </Text>
      <Text style={[
        styles.emptyStateSubtext, 
        { 
          color: colors.textTertiary,
          fontFamily: DesignTokens.typography.fontFamily.regular,
          fontSize: DesignTokens.typography.fontSize.base,
        }
      ]}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    textAlign: 'center',
  },
  emptyStateSubtext: {
    textAlign: 'center',
  },
});