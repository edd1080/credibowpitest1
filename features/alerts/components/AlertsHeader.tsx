// Componente molecular AlertsHeader - header de alertas con contador y acción
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AlertsHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
  colors: {
    text: string;
    textSecondary: string;
    primary: string;
  };
}

export const AlertsHeader: React.FC<AlertsHeaderProps> = ({
  unreadCount,
  onMarkAllAsRead,
  colors
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Alertas
        </Text>
        {unreadCount > 0 && (
          <TouchableOpacity 
            onPress={onMarkAllAsRead}
            style={styles.markAllButton}
          >
            <Text style={[styles.markAllText, { color: colors.primary }]}>
              Marcar todas como leídas
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      {unreadCount > 0 && (
        <Text style={[styles.unreadCount, { color: colors.textSecondary }]}>
          {unreadCount} nueva{unreadCount > 1 ? 's' : ''} notificación{unreadCount > 1 ? 'es' : ''}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 28,
  },
  markAllButton: {
    padding: 4,
  },
  markAllText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
  },
  unreadCount: {
    fontFamily: 'DM-Sans-Regular',
    fontSize: 14,
  },
});