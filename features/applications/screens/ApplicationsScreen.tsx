// Applications list screen refactorizado - arquitectura atómica aplicada
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/features/auth/AuthContext';
import { router } from 'expo-router';

// Hooks personalizados
import { useApplicationsData } from '../hooks/useApplicationsData';
import { ApplicationStatus } from '../types';

// Componentes atómicos y moleculares
import { SearchBar } from '@/components/shared/atoms/SearchBar';
import { TabNavigation } from '../components/TabNavigation';
import { ApplicationCard } from '../components/ApplicationCard';
import { EmptyState } from '@/components/shared/atoms/EmptyState';

export default function ApplicationsScreen() {
  const { colors } = useTheme();
  const { isDemoMode } = useAuth();
  const [selectedTab, setSelectedTab] = useState<ApplicationStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Hook personalizado que encapsula toda la lógica de datos
  const {
    tabs,
    filteredApplications,
    getStatusIcon,
    getStatusText,
    getStatusColor,
    formatDate
  } = useApplicationsData(searchQuery, selectedTab);

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
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Solicitudes
        </Text>
        
        {/* Componente SearchBar reutilizable */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar por nombre o ID..."
          colors={colors}
        />
      </View>

      {/* Componente TabNavigation reutilizable */}
      <TabNavigation
        tabs={tabs}
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
        colors={colors}
      />

      {/* Applications List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredApplications.length === 0 ? (
          <EmptyState
            title="No se encontraron solicitudes"
            subtitle={searchQuery ? 'Intenta con otro término de búsqueda' : 'No hay solicitudes en esta categoría'}
            colors={colors}
          />
        ) : (
          filteredApplications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onPress={handleApplicationPress}
              getStatusIcon={getStatusIcon}
              getStatusText={getStatusText}
              getStatusColor={getStatusColor}
              formatDate={formatDate}
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
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    marginBottom: 16,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 12,
  },
});