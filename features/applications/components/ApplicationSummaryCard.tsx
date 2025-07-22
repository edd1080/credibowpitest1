// Componente molecular ApplicationSummaryCard - resumen de solicitud con estado y progreso
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CreditCard as Edit3 } from 'lucide-react-native';

interface ApplicationSummaryCardProps {
  status: string;
  applicationId: string;
  clientName: string;
  progressPercentage: number;
  onEditPress: () => void;
  colors: {
    text: string;
    textSecondary: string;
    primary: string;
    border: string;
    textInverse: string;
  };
}

export const ApplicationSummaryCard: React.FC<ApplicationSummaryCardProps> = ({
  status,
  applicationId,
  clientName,
  progressPercentage,
  onEditPress,
  colors
}) => {
  return (
    <View style={styles.applicationHeader}>
      <View style={styles.applicationTitleRow}>
        <Text style={[styles.applicationStatus, { color: colors.text }]}>
          {status}
        </Text>
        <TouchableOpacity style={[styles.statusBadge, { backgroundColor: '#E3F2FD', borderColor: '#1976D2' }]}>
          <Text style={[styles.statusBadgeText, { color: '#1976D2' }]}>
            {status}
          </Text>
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.applicationId, { color: colors.text }]}>
        #{applicationId}
      </Text>
      <Text style={[styles.clientName, { color: colors.text }]}>
        {clientName}
      </Text>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
            Progreso del formulario
          </Text>
          <Text style={[styles.progressPercentage, { color: colors.text }]}>
            {progressPercentage}%
          </Text>
        </View>
        <View style={[styles.progressBarBackground, { backgroundColor: colors.border }]}>
          <View 
            style={[
              styles.progressBarFill, 
              { 
                backgroundColor: colors.primary,
                width: `${progressPercentage}%`
              }
            ]} 
          />
        </View>
      </View>

      {/* Edit Button */}
      <TouchableOpacity onPress={onEditPress} style={styles.editApplicationButton}>
        <LinearGradient
          colors={['#1976D2', '#1565C0']}
          style={styles.editApplicationButtonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Edit3 size={20} color={colors.textInverse} />
          <Text style={[styles.editApplicationText, { color: colors.textInverse }]}>
            Editar Solicitud
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  applicationHeader: {
    padding: 20,
  },
  applicationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  applicationStatus: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 24,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  statusBadgeText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 12,
  },
  applicationId: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 20,
    marginBottom: 8,
  },
  clientName: {
    fontFamily: 'DM-Sans-Regular',
    fontSize: 18,
    marginBottom: 20,
  },
  progressSection: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontFamily: 'DM-Sans-Regular',
    fontSize: 16,
  },
  progressPercentage: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 16,
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
  editApplicationButton: {
    borderRadius: 12,
  },
  editApplicationButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  editApplicationText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 16,
  },
});