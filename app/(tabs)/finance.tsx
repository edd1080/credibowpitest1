// Finance dashboard screen - pantalla de dashboard financiero moderno
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/features/auth/AuthContext';

// Hook personalizado que encapsula toda la lógica de datos
import { useFinanceData } from '@/features/finance/hooks/useFinanceData';

// Componentes de la feature finance
import { FinanceHeader } from '@/features/finance/components/FinanceHeader';
import { FinanceMetricCard } from '@/features/finance/components/FinanceMetricCard';

export default function FinanceScreen() {
  const { colors } = useTheme();
  const { isDemoMode } = useAuth();
  
  // Hook personalizado que encapsula toda la lógica de datos
  const {
    financeData,
    formatCurrency,
    formatPercentage,
  } = useFinanceData();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {isDemoMode && (
        <View style={[styles.demoBanner, { backgroundColor: colors.warning }]}>
          <Text style={[styles.demoText, { color: colors.textInverse }]}>
            MODO DEMO - Los datos no son reales
          </Text>
        </View>
      )}
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Componente FinanceHeader reutilizable */}
        <FinanceHeader colors={colors} />

        {/* Welcome Section */}
        <View style={[styles.welcomeSection, { backgroundColor: colors.background }]}>
          <Text style={[styles.welcomeMessage, { color: colors.text }]}>
            Bienvenido de nuevo, {financeData.userName}
          </Text>
          <Text style={[styles.welcomeSubtitle, { color: colors.textSecondary }]}>
            {financeData.welcomeSubtitle}
          </Text>
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricsGrid}>
            {financeData.metrics.map((metric) => (
              <FinanceMetricCard
                key={metric.id}
                metric={metric}
                formatCurrency={formatCurrency}
                formatPercentage={formatPercentage}
                colors={colors}
              />
            ))}
          </View>
        </View>
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
    paddingBottom: 20,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  welcomeMessage: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 22,
  },
  metricsContainer: {
    paddingHorizontal: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});