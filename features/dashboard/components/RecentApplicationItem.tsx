// Componente molecular RecentApplicationItem - elemento de solicitud reciente reutilizable
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { RecentApplication } from '../hooks/useDashboardData';

interface RecentApplicationItemProps {
  application: RecentApplication;
  onPress: (id: string) => void;
  getStatusColor: (status: string, colors: any) => string;
  getStatusText: (status: string) => string;
  formatDate: (dateString: string) => string;
  colors: {
    card: string;
    cardBorder: string;
    text: string;
    textSecondary: string;
  };
}

export const RecentApplicationItem: React.FC<RecentApplicationItemProps> = ({
  application,
  onPress,
  getStatusColor,
  getStatusText,
  formatDate,
  colors
}) => {
  return (
    <TouchableOpacity
      style={[styles.applicationCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
      onPress={() => onPress(application.id)}
    >
      <View style={styles.applicationHeader}>
        <View>
          <Text style={[styles.clientName, { color: colors.text }]}>
            {application.clientName}
          </Text>
          <Text style={[styles.applicationDate, { color: colors.textSecondary }]}>
            {formatDate(application.date)}
          </Text>
        </View>
        <View style={styles.applicationRight}>
          <Text style={[styles.applicationAmount, { color: colors.text }]}>
            Q{application.amount.toLocaleString()}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(application.status, colors)}15` }]}>
            <Text style={[styles.statusText, { color: getStatusColor(application.status, colors) }]}>
              {getStatusText(application.status)}
            </Text>
          </View>
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
    // Enhanced shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    // Enhanced shadow for Android
    elevation: 4,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  clientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    marginBottom: 6,
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  applicationDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    lineHeight: 18,
    opacity: 0.8,
  },
  applicationRight: {
    alignItems: 'flex-end',
  },
  applicationAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    letterSpacing: -0.1,
  },
});