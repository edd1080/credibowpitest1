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
    <View style={[styles.topBar, { backgroundColor: colors.background }]}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <View style={[styles.backButtonContainer, { backgroundColor: colors.backgroundSecondary }]}>
          <ArrowLeft size={20} color={colors.text} />
        </View>
      </TouchableOpacity>
      
      <Text style={[styles.applicationId, { color: colors.text }]}>
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    padding: 2,
  },
  backButtonContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applicationId: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 6,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  statusText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 12,
    fontWeight: '500',
  },
});