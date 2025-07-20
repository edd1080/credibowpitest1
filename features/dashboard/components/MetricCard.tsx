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
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
  },
  metricIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 18,
  },
  metricValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    textAlign: 'center',
  },
});