// Componente molecular SyncStatusBanner - banner de estado de sincronización reutilizable
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WifiOff } from 'lucide-react-native';

interface SyncStatusBannerProps {
  syncPending: number;
  colors: {
    warning: string;
  };
}

export const SyncStatusBanner: React.FC<SyncStatusBannerProps> = ({
  syncPending,
  colors
}) => {
  if (syncPending === 0) return null;

  return (
    <View style={styles.syncStatus}>
      <View style={styles.syncIndicator}>
        <WifiOff size={16} color={colors.warning} />
        <Text style={[styles.syncText, { color: colors.warning }]}>
          {syncPending} pendiente{syncPending > 1 ? 's' : ''} de sincronizar
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  syncStatus: {
    marginTop: 16,
  },
  syncIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  syncText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    letterSpacing: -0.1,
  },
});