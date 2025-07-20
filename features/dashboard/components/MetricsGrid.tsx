// Componente organismo MetricsGrid - cuadrícula de métricas reutilizable
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TrendingUp, CircleCheck as CheckCircle, Clock, Circle as XCircle } from 'lucide-react-native';
import { MetricCard } from './MetricCard';
import { DashboardMetrics } from '../hooks/useDashboardData';

interface MetricsGridProps {
  metrics: DashboardMetrics;
  colors: {
    card: string;
    cardBorder: string;
    textSecondary: string;
    text: string;
  };
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({
  metrics,
  colors
}) => {
  const metricsData = [
    {
      key: 'activas',
      label: 'Solicitudes Activas',
      value: metrics.solicitudesActivas,
      icon: <TrendingUp size={24} color="#1976D2" />,
      iconBackgroundColor: `${colors.primary}12`,
    },
    {
      key: 'aprobadas',
      label: 'Aprobadas',
      value: metrics.aprobadas,
      icon: <CheckCircle size={24} color="#4CAF50" />,
      iconBackgroundColor: `${colors.success}12`,
    },
    {
      key: 'revision',
      label: 'En Revisión',
      value: metrics.enRevision,
      icon: <Clock size={24} color="#FF9800" />,
      iconBackgroundColor: `${colors.warning}12`,
    },
    {
      key: 'rechazadas',
      label: 'Rechazadas',
      value: metrics.rechazadas,
      icon: <XCircle size={24} color="#F44336" />,
      iconBackgroundColor: `${colors.error}12`,
    },
  ];

  return (
    <View style={styles.metricsContainer}>
      <View style={styles.metricsGrid}>
        <View style={styles.metricsRow}>
          <MetricCard
            icon={metricsData[0].icon}
            iconBackgroundColor={metricsData[0].iconBackgroundColor}
            label={metricsData[0].label}
            value={metricsData[0].value}
            colors={colors}
          />
          <MetricCard
            icon={metricsData[1].icon}
            iconBackgroundColor={metricsData[1].iconBackgroundColor}
            label={metricsData[1].label}
            value={metricsData[1].value}
            colors={colors}
          />
        </View>
        <View style={styles.metricsRow}>
          <MetricCard
            icon={metricsData[2].icon}
            iconBackgroundColor={metricsData[2].iconBackgroundColor}
            label={metricsData[2].label}
            value={metricsData[2].value}
            colors={colors}
          />
          <MetricCard
            icon={metricsData[3].icon}
            iconBackgroundColor={metricsData[3].iconBackgroundColor}
            label={metricsData[3].label}
            value={metricsData[3].value}
            colors={colors}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  metricsContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  metricsGrid: {
    gap: 16,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 16,
  },
});