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
          <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(application.status, colors)}20` }]}>
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
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  clientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  applicationDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  applicationRight: {
    alignItems: 'flex-end',
  },
  applicationAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
});