// Componente molecular ApplicationCard - tarjeta de solicitud con badge de estado
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
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
  const getStatusConfig = (status: ApplicationStatus) => {
    switch (status) {
      case 'approved':
        return {
          backgroundColor: '#E8F5E8',
          textColor: '#50A274',
          borderColor: '#C8E6C9',
          text: 'Aprobado'
        };
      case 'rejected':
        return {
          backgroundColor: '#FFEBEE',
          textColor: '#F44336',
          borderColor: '#FFCDD2',
          text: 'Rechazado'
        };
      case 'sent':
        return {
          backgroundColor: '#FFF3E0',
          textColor: '#FF9800',
          borderColor: '#FFE0B2',
          text: 'En Revisión'
        };
      case 'pending':
      default:
        return {
          backgroundColor: '#E3F2FD',
          textColor: '#2196F3',
          borderColor: '#BBDEFB',
          text: 'Activo'
        };
    }
  };

  const statusConfig = getStatusConfig(application.status);

  return (
    <TouchableOpacity
      style={[styles.applicationCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
      onPress={() => onPress(application.id)}
    >
      {/* Header con nombre y badge de estado */}
      <View style={styles.header}>
        <Text style={[styles.clientName, { color: colors.text }]} numberOfLines={2}>
          {application.clientName}
        </Text>
        <View style={[
          styles.statusBadge, 
          { 
            backgroundColor: statusConfig.backgroundColor,
            borderColor: statusConfig.borderColor
          }
        ]}>
          <Text style={[styles.statusText, { color: statusConfig.textColor }]}>
            {statusConfig.text}
          </Text>
        </View>
      </View>

      {/* ID y Fecha */}
      <Text style={[styles.applicationDetails, { color: colors.textSecondary }]}>
        {application.applicationId} • {formatDate(application.date)}
      </Text>

      {/* Etapa actual */}
      <Text style={[styles.currentStep, { color: colors.textSecondary }]}>
        {application.currentStep}
      </Text>

      {/* Progress section */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressLabel, { color: colors.textTertiary }]}>
            Progreso
          </Text>
          <Text style={[styles.progressPercentage, { color: colors.text }]}>
            {application.progressPercentage}%
          </Text>
        </View>
        <View style={[styles.progressBarBackground, { backgroundColor: colors.border }]}>
          <View 
            style={[
              styles.progressBarFill, 
              { 
                backgroundColor: statusConfig.textColor,
                width: `${application.progressPercentage}%`
              }
            ]} 
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  applicationCard: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 8,
  },
  clientName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    fontWeight: '500',
  },
  applicationDetails: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 6,
  },
  currentStep: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  progressSection: {
    gap: 6,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    fontWeight: '500',
  },
  progressPercentage: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    fontWeight: '600',
  },
  progressBarBackground: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
});