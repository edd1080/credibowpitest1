// Componente molecular ApplicationCard - tarjeta de solicitud reutilizable
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Hash, Calendar } from 'lucide-react-native';
import { Application, ApplicationStatus } from '../types';

interface ApplicationCardProps {
  application: Application;
  onPress: (id: string) => void;
  getStatusIcon: (status: ApplicationStatus, syncStatus: string, colors: any) => React.ReactNode;
  getStatusText: (status: ApplicationStatus, syncStatus: string) => string;
  getStatusColor: (status: ApplicationStatus, syncStatus: string, colors: any) => string;
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
  getStatusIcon,
  getStatusText,
  getStatusColor,
  formatDate,
  colors
}) => {
  return (
    <TouchableOpacity
      style={[styles.applicationCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
      onPress={() => onPress(application.id)}
    >
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <Text style={[styles.clientName, { color: colors.text }]}>
            {application.clientName}
          </Text>
          <View style={styles.statusBadge}>
            {getStatusIcon(application.status, application.syncStatus, colors)}
            <Text style={[
              styles.statusText, 
              { color: getStatusColor(application.status, application.syncStatus, colors) }
            ]}>
              {getStatusText(application.status, application.syncStatus)}
            </Text>
          </View>
        </View>
        <Text style={[styles.amount, { color: colors.text }]}>
          Q{application.amount.toLocaleString()}
        </Text>
      </View>

      {/* Application Details */}
      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Hash size={14} color={colors.textTertiary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {application.applicationId}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Calendar size={14} color={colors.textTertiary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {formatDate(application.date)}
          </Text>
        </View>
      </View>

      {/* Current Step */}
      <View style={styles.currentStepContainer}>
        <Text style={[styles.currentStepLabel, { color: colors.textSecondary }]}>
          {application.currentStep}
        </Text>
        <Text style={[styles.progressPercentage, { color: colors.text }]}>
          {application.progressPercentage}%
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={[styles.progressLabel, { color: colors.textTertiary }]}>
          Progreso
        </Text>
        <View style={[styles.progressBarBackground, { backgroundColor: colors.border }]}>
          <View 
            style={[
              styles.progressBarFill, 
              { 
                backgroundColor: getStatusColor(application.status, application.syncStatus, colors),
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
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flex: 1,
    marginRight: 16,
  },
  clientName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 8,
    lineHeight: 24,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 6,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  amount: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  currentStepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentStepLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  progressPercentage: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  progressContainer: {
    gap: 8,
  },
  progressLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});