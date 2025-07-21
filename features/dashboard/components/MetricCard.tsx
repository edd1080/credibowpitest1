// Componente molecular MetricCard - tarjeta de métrica individual reutilizable
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
      <View style={[styles.metricIconContainer, { backgroundColor: iconBackgroundColor }]}>
        {icon}
      </View>
      <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
        {label}
      </Text>
      <Text style={[styles.metricValue, { color: colors.text }]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  metricCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  metricIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 6,
    fontWeight: '500',
  },
  metricValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '600',
  },
});