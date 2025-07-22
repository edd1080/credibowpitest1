import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface AlertCardProps {
  alert: Alert;
  onPress: (id: string) => void;
  formatTimestamp: (timestamp: string) => string;
  colors: any;
}

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'warning':
      return AlertTriangle;
    case 'success':
      return CheckCircle;
    case 'error':
      return AlertTriangle;
    default:
      return Info;
  }
};

const getAlertColor = (type: string, colors: any) => {
  switch (type) {
    case 'warning':
      return colors.warning;
    case 'success':
      return colors.success;
    case 'error':
      return colors.error;
    default:
      return colors.primary;
  }
};

export function AlertCard({ alert, onPress, formatTimestamp, colors }: AlertCardProps) {
  const { tokens } = useTheme();
  const IconComponent = getAlertIcon(alert.type);
  const iconColor = getAlertColor(alert.type, colors);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: alert.read ? 0.7 : 1,
        },
      ]}
      onPress={() => onPress(alert.id)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <IconComponent size={20} color={iconColor} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
                fontFamily: tokens.typography.fontFamily.semiBold,
              },
            ]}
            numberOfLines={1}
          >
            {alert.title}
          </Text>
          {!alert.read && (
            <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />
          )}
        </View>
        
        <Text
          style={[
            styles.message,
            {
              color: colors.textSecondary,
              fontFamily: tokens.typography.fontFamily.regular,
            },
          ]}
          numberOfLines={2}
        >
          {alert.message}
        </Text>
        
        <Text
          style={[
            styles.timestamp,
            {
              color: colors.textTertiary,
              fontFamily: tokens.typography.fontFamily.regular,
            },
          ]}
        >
          {formatTimestamp(alert.timestamp)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    marginRight: 12,
    paddingTop: 2,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
  },
});