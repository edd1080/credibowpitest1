// Componente molecular ApplicationHeaderTopBar - barra superior de navegación para detalles de solicitud
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

interface ApplicationHeaderTopBarProps {
  applicationId: string;
  status: string;
  onBackPress: () => void;
  colors: {
    background: string;
    border: string;
    text: string;
    primary: string;
    textInverse: string;
    info: string;
  };
}

export const ApplicationHeaderTopBar: React.FC<ApplicationHeaderTopBarProps> = ({
  applicationId,
  status,
  onBackPress,
  colors
}) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'en revisión':
      case 'sent':
        return {
          backgroundColor: '#E3F2FD',
          textColor: '#1976D2',
          text: 'En revisión'
        };
      case 'aprobado':
      case 'approved':
        return {
          backgroundColor: '#E8F5E8',
          textColor: '#50A274',
          text: 'Aprobado'
        };
      case 'rechazado':
      case 'rejected':
        return {
          backgroundColor: '#FFEBEE',
          textColor: '#F44336',
          text: 'Rechazado'
        };
      case 'borrador':
      case 'pending':
      default:
        return {
          backgroundColor: '#F3E5F5',
          textColor: '#9C27B0',
          text: 'Borrador'
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <View style={[styles.topBar, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <View style={[styles.backButtonContainer, { backgroundColor: '#F3E5F5' }]}>
          <ArrowLeft size={20} color="#9C27B0" />
        </View>
      </TouchableOpacity>
      
      <Text style={[styles.applicationId, { color: colors.primary }]}>
        {applicationId}
      </Text>
      
      <View style={[
        styles.statusBadge, 
        { backgroundColor: statusConfig.backgroundColor }
      ]}>
        <Text style={[styles.statusText, { color: statusConfig.textColor }]}>
          {statusConfig.text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applicationId: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    fontWeight: '600',
  },
});