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
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    backgroundColor: '#FFFFFF',
  },
  metricIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 16,
    fontWeight: '500',
  },
  metricValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '700',
  },
});