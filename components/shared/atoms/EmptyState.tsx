// Componente atómico EmptyState - estado vacío reutilizable
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';

interface EmptyStateProps {
  title: string;
  subtitle: string;
  colors: {
    textTertiary: string;
    textSecondary: string;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  colors
}) => {
  return (
    <View style={styles.emptyState}>
      <View style={[styles.emptyStateIcon, { backgroundColor: `${colors.textTertiary}20` }]}>
        <Search size={32} color={colors.textTertiary} />
      </View>
      <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
        {title}
      </Text>
      <Text style={[styles.emptyStateSubtext, { color: colors.textTertiary }]}>
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
    paddingTop: 80,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyStateText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
});