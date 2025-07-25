// Componente organismo MetricsGrid - cuadrícula de métricas reutilizable
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TrendingUp, CheckCircle, Clock, XCircle } from 'lucide-react-native';
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
      icon: <TrendingUp size={20} color="#50A274" />,
      iconBackgroundColor: '#E8F5E8',
    },
    {
      key: 'aprobadas',
      label: 'Aprobadas',
      value: metrics.aprobadas,
      icon: <CheckCircle size={20} color="#50A274" />,
      iconBackgroundColor: '#E8F5E8',
    },
    {
      key: 'revision',
      label: 'En Revisión',
      value: metrics.enRevision,
      icon: <Clock size={20} color="#FF9800" />,
      iconBackgroundColor: '#FFF3E0',
    },
    {
      key: 'rechazadas',
      label: 'Rechazadas',
      value: metrics.rechazadas,
      icon: <XCircle size={20} color="#F44336" />,
      iconBackgroundColor: '#FFEBEE',
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
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  metricsGrid: {
    gap: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
  },
});