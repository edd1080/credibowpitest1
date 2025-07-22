// Componente ApplicationCard rediseñado según especificaciones de Figma
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CheckCircle, X, Clock, Grid3X3 } from 'lucide-react-native';
import { Application, ApplicationStatus } from '../types';

interface ApplicationCardProps {
  application: Application;
  onPress: (id: string) => void;
  formatDate: (dateString: string) => string;
  colors: {
    card: string;
    cardBorder: string;
    text: string;
    textSecondary: string;
    textTertiary: string;
    border: string;
  };
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  onPress,
  formatDate,
  colors
}) => {
  // Mapear status interno a status de UI
  const getUIStatus = (status: ApplicationStatus): 'activa' | 'en_revision' | 'aprobada' | 'rechazada' => {
    switch (status) {
      case 'pending':
        return 'activa';
      case 'sent':
        return 'en_revision';
      case 'approved':
        return 'aprobada';
      case 'rejected':
        return 'rechazada';
      default:
        return 'activa';
    }
  };

  // Configuración de iconos y colores por estado
  const getStatusConfig = (uiStatus: 'activa' | 'en_revision' | 'aprobada' | 'rechazada') => {
    switch (uiStatus) {
      case 'activa':
        return {
          icon: <Grid3X3 size={32} color="#2563EB" />,
          badgeText: 'Activa',
          badgeBackgroundColor: '#2563EB',
          badgeTextColor: '#FFFFFF',
          progressColor: '#3B82F6',
        };
      case 'en_revision':
        return {
          icon: <Clock size={32} color="#F97316" />,
          badgeText: 'En Revisión',
          badgeBackgroundColor: '#F97316',
          badgeTextColor: '#FFFFFF',
          progressColor: '#F97316',
        };
      case 'aprobada':
        return {
          icon: <CheckCircle size={32} color="#22C55E" />,
          badgeText: 'Aprobada',
          badgeBackgroundColor: '#22C55E',
          badgeTextColor: '#FFFFFF',
          progressColor: '#22C55E',
        };
      case 'rechazada':
        return {
          icon: <X size={32} color="#EF4444" />,
          badgeText: 'Rechazada',
          badgeBackgroundColor: '#EF4444',
          badgeTextColor: '#FFFFFF',
          progressColor: '#EF4444',
        };
    }
  };

  const uiStatus = getUIStatus(application.status);
  const statusConfig = getStatusConfig(uiStatus);

  // Formatear monto
  const formatAmount = (amount: number) => {
    return `Q${amount.toLocaleString('es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={() => onPress(application.id)}
      activeOpacity={0.7}
    >
      {/* Línea 1: Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {statusConfig.icon}
          <Text style={styles.applicationId}>
            {application.applicationId}
          </Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: statusConfig.badgeBackgroundColor }
        ]}>
          <Text style={[
            styles.statusBadgeText,
            { color: statusConfig.badgeTextColor }
          ]}>
            {statusConfig.badgeText}
          </Text>
        </View>
      </View>

      {/* Línea 2: Nombre del solicitante */}
      <Text style={styles.clientName} numberOfLines={1}>
        {application.clientName}
      </Text>

      {/* Línea 3: Etapa actual */}
      <Text style={styles.currentStage}>
        {application.currentStep}
      </Text>

      {/* Línea 4: Barra de progreso */}
      <View style={styles.progressSection}>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill,
                { 
                  backgroundColor: statusConfig.progressColor,
                  width: `${application.progressPercentage}%`
                }
              ]} 
            />
          </View>
        </View>
        <Text style={styles.progressPercentage}>
          {application.progressPercentage}%
        </Text>
      </View>

      {/* Línea 5: Información adicional */}
      <View style={styles.additionalInfo}>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>Etapa</Text>
          <Text style={styles.infoValue}>{application.currentStep}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>Monto solicitado</Text>
          <Text style={styles.infoValue}>{formatAmount(application.amount)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  applicationId: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  statusBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
  },
  clientName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  currentStage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 12,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  progressBarContainer: {
    flex: 1,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 8,
  },
  progressPercentage: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    color: '#111827',
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoColumn: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    color: '#374151',
  },
});