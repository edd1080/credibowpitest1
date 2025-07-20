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
      <View style={[styles.metricIconContainer, { backgroundColor: `${colors.primary}12` }]}>
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
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
    // Enhanced shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    // Enhanced shadow for Android
    elevation: 6,
  },
  metricIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  metricValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    textAlign: 'center',
    letterSpacing: -1,
    lineHeight: 40,
  },
});