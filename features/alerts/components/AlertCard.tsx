// Componente molecular AlertCard - tarjeta de alerta individual reutilizable
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Info, Wifi, Clock } from 'lucide-react-native';
import { Alert } from '../types';

interface AlertCardProps {
  alert: Alert;
  onPress: (alertId: string) => void;
  formatTimestamp: (timestamp: string) => string;
  colors: {
    card: string;
    cardBorder: string;
    text: string;
    textSecondary: string;
    textTertiary: string;
    success: string;
    warning: string;
    info: string;
    primary: string;
  };
}

export const AlertCard: React.FC<AlertCardProps> = ({
  alert,
  onPress,
  formatTimestamp,
  colors
}) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={24} color={colors.success} />;
      case 'warning':
        return <AlertTriangle size={24} color={colors.warning} />;
      case 'info':
        return <Info size={24} color={colors.info} />;
      case 'sync':
        return <Wifi size={24} color={colors.primary} />;
      default:
        return <Info size={24} color={colors.textSecondary} />;
    }
  };

  const getAlertBorderColor = (type: string) => {
    switch (type) {
      case 'success': return colors.success;
      case 'warning': return colors.warning;
      case 'info': return colors.info;
      case 'sync': return colors.primary;
      default: return colors.cardBorder;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.alertCard,
        {
          backgroundColor: colors.card,
          borderColor: alert.read ? colors.cardBorder : getAlertBorderColor(alert.type),
          borderWidth: alert.read ? 1 : 2,
        }
      ]}
      onPress={() => onPress(alert.id)}
    >
      <View style={styles.alertHeader}>
        <View style={styles.alertIconContainer}>
          {getAlertIcon(alert.type)}
        </View>
        <View style={styles.alertContent}>
          <View style={styles.alertTitleRow}>
            <Text style={[
              styles.alertTitle,
              { 
                color: colors.text,
                fontFamily: alert.read ? 'Inter-Medium' : 'Inter-SemiBold'
              }
            ]}>
              {alert.title}
            </Text>
            {!alert.read && (
              <View style={[styles.unreadDot, { backgroundColor: getAlertBorderColor(alert.type) }]} />
            )}
          </View>
          <Text style={[styles.alertMessage, { color: colors.textSecondary }]}>
            {alert.message}
          </Text>
          <View style={styles.alertFooter}>
            <Clock size={14} color={colors.textTertiary} />
            <Text style={[styles.alertTimestamp, { color: colors.textTertiary }]}>
              {formatTimestamp(alert.timestamp)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  alertCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  alertHeader: {
    flexDirection: 'row',
  },
  alertIconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  alertContent: {
    flex: 1,
  },
  alertTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  alertTitle: {
    fontSize: 16,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  alertMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  alertFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  alertTimestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
});