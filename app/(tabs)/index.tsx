// Home/Dashboard screen rediseñado según mockup
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';

// Hook personalizado de la feature dashboard
import { useDashboardData } from '@/features/dashboard/hooks/useDashboardData';

// Componentes compartidos
import { UserHeader } from '@/components/shared/molecules/UserHeader';

// Componentes de la feature dashboard
import { MetricsGrid } from '@/features/dashboard/components/MetricsGrid';
import { NewApplicationCard } from '@/features/dashboard/components/NewApplicationCard';

export default function HomeScreen() {
  const { colors } = useTheme();
  
  // Hook personalizado que encapsula toda la lógica de datos
  const {
    user,
    metrics
  } = useDashboardData();

  const handleNewApplication = () => {
    // TODO: Implementar navegación a pantalla de nueva solicitud
    console.log('Nueva solicitud - funcionalidad pendiente');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header del usuario */}
        <View style={styles.header}>
          <UserHeader user={user} colors={colors} />
        </View>

        {/* Grid de métricas */}
        <MetricsGrid metrics={metrics} colors={colors} />

        {/* Tarjeta de nueva solicitud */}
        <View style={styles.newApplicationContainer}>
          <NewApplicationCard onPress={handleNewApplication} colors={colors} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  newApplicationContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
});