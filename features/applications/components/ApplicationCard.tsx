// Componente ApplicationCard rediseñado según especificaciones de Figma
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CircleCheck as CheckCircle, X, Clock, Grid3x3 } from 'lucide-react-native';
import { Application, ApplicationStatus } from '../types';
import { DesignTokens } from '@/constants/designTokens';

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
          icon: <Grid3x3 size={DesignTokens.widths.icon.xl} color="#2563EB" />,
          badgeText: 'Activa',
          badgeBackgroundColor: '#2563EB',
          badgeTextColor: '#FFFFFF',
          progressColor: '#3B82F6',
        };
      case 'en_revision':
        return {
          icon: <Clock size={DesignTokens.widths.icon.xl} color="#F97316" />,
          badgeText: 'En Revisión',
          badgeBackgroundColor: '#F97316',
          badgeTextColor: '#FFFFFF',
          progressColor: '#F97316',
        };
      case 'aprobada':
        return {
          icon: <CheckCircle size={DesignTokens.widths.icon.xl} color="#22C55E" />,
          badgeText: 'Aprobada',
          badgeBackgroundColor: '#22C55E',
          badgeTextColor: '#FFFFFF',
          progressColor: '#22C55E',
        };
      case 'rechazada':
        return {
          icon: <X size={DesignTokens.widths.icon.xl} color="#EF4444" />,
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
      style={[
        styles.card, 
        { 
          backgroundColor: colors.card,
          borderRadius: DesignTokens.borderRadius.xl,
          padding: DesignTokens.spacing.lg,
          marginBottom: DesignTokens.spacing.md,
          ...DesignTokens.shadows.md,
        }
      ]}
      onPress={() => onPress(application.id)}
      activeOpacity={0.7}
    >
      {/* Línea 1: Header */}
      <View style={[styles.header, { marginBottom: DesignTokens.spacing.md }]}>
        <View style={[styles.headerLeft, { gap: DesignTokens.spacing.sm }]}>
          {statusConfig.icon}
          <Text style={[
            styles.applicationId,
            {
              fontSize: DesignTokens.typography.fontSize.sm,
              color: '#6B7280',
              fontFamily: DesignTokens.typography.fontFamily.regular,
            }
          ]}>
            {application.applicationId}
          </Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: statusConfig.badgeBackgroundColor,
            paddingVertical: DesignTokens.spacing.xs,
            paddingHorizontal: DesignTokens.spacing.sm,
            borderRadius: DesignTokens.borderRadius.full,
          }
        ]}>
          <Text style={[
            styles.statusBadgeText,
            { 
              color: statusConfig.badgeTextColor,
              fontSize: DesignTokens.typography.fontSize.sm,
              fontFamily: DesignTokens.typography.fontFamily.bold,
            }
          ]}>
            {statusConfig.badgeText}
          </Text>
        </View>
      </View>

      {/* Línea 2: Nombre del solicitante */}
      <Text style={[
        styles.clientName,
        {
          fontSize: DesignTokens.typography.fontSize.lg,
          fontFamily: DesignTokens.typography.fontFamily.bold,
          color: '#111827',
          marginBottom: DesignTokens.spacing.sm,
        }
      ]} numberOfLines={1}>
        {application.clientName}
      </Text>

      {/* Línea 3: Etapa actual */}
      <Text style={[
        styles.currentStage,
        {
          fontSize: DesignTokens.typography.fontSize.base,
          fontFamily: DesignTokens.typography.fontFamily.regular,
          color: '#6B7280',
          marginBottom: DesignTokens.spacing.md,
        }
      ]}>
        {application.currentStep}
      </Text>

      {/* Línea 4: Barra de progreso */}
      <View style={[styles.progressSection, { marginBottom: DesignTokens.spacing.lg, gap: DesignTokens.spacing.md }]}>
        <View style={styles.progressBarContainer}>
          <View style={[
            styles.progressBarBackground,
            {
              height: 8,
              backgroundColor: '#E5E7EB',
              borderRadius: DesignTokens.borderRadius.lg,
            }
          ]}>
            <View 
              style={[
                styles.progressBarFill,
                { 
                  backgroundColor: statusConfig.progressColor,
                  width: `${application.progressPercentage}%`,
                  height: '100%',
                  borderRadius: DesignTokens.borderRadius.lg,
                }
              ]} 
            />
          </View>
        </View>
        <Text style={[
          styles.progressPercentage,
          {
            fontSize: DesignTokens.typography.fontSize.sm,
            fontFamily: DesignTokens.typography.fontFamily.semiBold,
            color: '#111827',
          }
        ]}>
          {application.progressPercentage}%
        </Text>
      </View>

      {/* Línea 5: Información adicional */}
      <View style={styles.additionalInfo}>
        <View style={styles.infoColumn}>
          <Text style={[
            styles.infoLabel,
            {
              fontSize: DesignTokens.typography.fontSize.sm,
              fontFamily: DesignTokens.typography.fontFamily.regular,
              color: '#6B7280',
              marginBottom: 2,
            }
          ]}>
            Etapa
          </Text>
          <Text style={[
            styles.infoValue,
            {
              fontSize: DesignTokens.typography.fontSize.sm,
              fontFamily: DesignTokens.typography.fontFamily.medium,
              color: '#374151',
            }
          ]}>
            {application.currentStep}
          </Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={[
            styles.infoLabel,
            {
              fontSize: DesignTokens.typography.fontSize.sm,
              fontFamily: DesignTokens.typography.fontFamily.regular,
              color: '#6B7280',
              marginBottom: 2,
            }
          ]}>
            Monto solicitado
          </Text>
          <Text style={[
            styles.infoValue,
            {
              fontSize: DesignTokens.typography.fontSize.sm,
              fontFamily: DesignTokens.typography.fontFamily.medium,
              color: '#374151',
            }
          ]}>
            {formatAmount(application.amount)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    // Estilos dinámicos aplicados arriba
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  applicationId: {
    // Estilos dinámicos aplicados arriba
  },
  statusBadge: {
    // Estilos dinámicos aplicados arriba
  },
  statusBadgeText: {
    fontWeight: DesignTokens.typography.fontWeight.bold,
  },
  clientName: {
    fontWeight: DesignTokens.typography.fontWeight.bold,
  },
  currentStage: {
    // Estilos dinámicos aplicados arriba
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarContainer: {
    flex: 1,
  },
  progressBarBackground: {
    overflow: 'hidden',
  },
  progressBarFill: {
    // Estilos dinámicos aplicados arriba
  },
  progressPercentage: {
    fontWeight: DesignTokens.typography.fontWeight.semiBold,
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoColumn: {
    flex: 1,
  },
  infoLabel: {
    // Estilos dinámicos aplicados arriba
  },
  infoValue: {
    fontWeight: DesignTokens.typography.fontWeight.medium,
  },
});