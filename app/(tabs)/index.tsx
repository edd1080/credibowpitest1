// Home/Dashboard screen refactorizado - arquitectura atómica aplicada
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';

// Hook personalizado de la feature dashboard
import { useDashboardData } from '@/features/dashboard/hooks/useDashboardData';

// Componentes compartidos
import { UserHeader } from '@/components/shared/molecules/UserHeader';
import { SyncStatusBanner } from '@/components/shared/molecules/SyncStatusBanner';

// Componentes de la feature dashboard
import { MetricsGrid } from '@/features/dashboard/components/MetricsGrid';
import { NewApplicationCard } from '@/features/dashboard/components/NewApplicationCard';
import { RecentApplicationItem } from '@/features/dashboard/components/RecentApplicationItem';

export default function HomeScreen() {
  const { colors } = useTheme();
  
  // Hook personalizado que encapsula toda la lógica de datos
  const {
    user,
    isDemoMode,
    metrics,
    recentApplications,
    getStatusColor,
    getStatusText,
    formatDate
  } = useDashboardData();

  const handleNewApplication = () => {
    router.push('/application/new');
  };

  const handleApplicationPress = (id: string) => {
    router.push(`/application/${id}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {isDemoMode && (
        <View style={[styles.demoBanner, { backgroundColor: colors.warning }]}>
          <Text style={[styles.demoText, { color: colors.textInverse }]}>
            MODO DEMO - Los datos no son reales
          </Text>
        </View>
      )}
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {/* Header con componente UserHeader reutilizable */}
        <View style={styles.header}>
          <UserHeader user={user} colors={colors} />
          
          {/* Componente SyncStatusBanner reutilizable */}
          <SyncStatusBanner syncPending={metrics.syncPending} colors={colors} />
        </View>

        {/* Componente MetricsGrid reutilizable */}
        <MetricsGrid metrics={metrics} colors={colors} />

        {/* Componente NewApplicationCard reutilizable */}
        <View style={styles.newApplicationContainer}>
          <NewApplicationCard onPress={handleNewApplication} colors={colors} />
        </View>

        {/* Recent Applications */}
        {recentApplications.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Solicitudes Recientes
            </Text>
            
            {recentApplications.map((app) => (
              <RecentApplicationItem
                key={app.id}
                application={app}
                onPress={handleApplicationPress}
                getStatusColor={getStatusColor}
                getStatusText={getStatusText}
                formatDate={formatDate}
                colors={colors}
              />
            ))}
          </View>
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
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    padding: 24,
    paddingBottom: 20,
  },
  newApplicationContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
});