// Alerts/Notifications screen refactorizado - arquitectura atómica aplicada
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/features/auth/AuthContext';

// Hook personalizado que encapsula toda la lógica de datos
import { useAlertsData } from '../hooks/useAlertsData';

// Componentes atómicos, moleculares y organismos
import { AlertCard } from '../components/AlertCard';
import { AlertsHeader } from '../components/AlertsHeader';
import { EmptyState } from '@/components/shared/atoms/EmptyState';

export default function AlertsScreen() {
  const { colors } = useTheme();
  const { isDemoMode } = useAuth();
  
  // Hook personalizado que encapsula toda la lógica de datos
  const {
    alerts,
    unreadCount,
    markAsRead,
    markAllAsRead,
    formatTimestamp
  } = useAlertsData();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {isDemoMode && (
        <View style={[styles.demoBanner, { backgroundColor: colors.warning }]}>
          <Text style={[styles.demoText, { color: colors.textInverse }]}>
            MODO DEMO - Los datos no son reales
          </Text>
        </View>
      )}
      
      {/* Componente AlertsHeader reutilizable */}
      <AlertsHeader
        unreadCount={unreadCount}
        onMarkAllAsRead={markAllAsRead}
        colors={colors}
      />

      {/* Alerts List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {alerts.length === 0 ? (
          <EmptyState
            title="No tienes alertas"
            subtitle="Las notificaciones importantes aparecerán aquí"
            colors={colors}
          />
        ) : (
          alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onPress={markAsRead}
              formatTimestamp={formatTimestamp}
              colors={colors}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  demoBanner: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  demoText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
});