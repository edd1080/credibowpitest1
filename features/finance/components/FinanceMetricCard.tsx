// Componente molecular FinanceMetricCard - tarjeta de métrica financiera individual
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowUp, ArrowDown } from 'lucide-react-native';
import { FinanceMetric } from '../types';

interface FinanceMetricCardProps {
  metric: FinanceMetric;
  formatCurrency: (value: number) => string;
  formatPercentage: (value: number) => string;
  colors: {
    card: string;
    cardBorder: string;
    text: string;
    textSecondary: string;
    success: string;
    error: string;
  };
}

export const FinanceMetricCard: React.FC<FinanceMetricCardProps> = ({
  metric,
  formatCurrency,
  formatPercentage,
  colors
}) => {
  const trendColor = metric.isPositiveTrend ? colors.success : colors.error;
  const TrendIcon = metric.isPositiveTrend ? ArrowUp : ArrowDown;

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {metric.title}
      </Text>
      
      <Text style={[styles.dateRange, { color: colors.textSecondary }]}>
        {metric.dateRange}
      </Text>
      
      <Text style={[styles.value, { color: colors.text }]}>
        {formatCurrency(metric.value)}
      </Text>
      
      <View style={styles.trendContainer}>
        <TrendIcon size={14} color={trendColor} />
        <Text style={[styles.percentage, { color: trendColor }]}>
          {formatPercentage(metric.percentageChange)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginBottom: 4,
  },
  dateRange: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginBottom: 8,
  },
  value: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 8,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  percentage: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
});