// Applications list screen rediseñado con layout limpio
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
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
  const [selectedTab, setSelectedTab] = useState<ApplicationStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Hook personalizado que encapsula toda la lógica de datos
  const {
    tabs,
    filteredApplications,
    formatDate
  } = useApplicationsData(searchQuery, selectedTab);

  const handleApplicationPress = (id: string) => {
    router.push(`/application/${id}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
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
        <View style={styles.tabContainer}>
          <TabNavigation
            tabs={tabs}
            selectedTab={selectedTab}
            onTabSelect={setSelectedTab}
            colors={colors}
          />
        </View>

        {/* Applications List */}
        <View style={styles.content}>
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
                formatDate={formatDate}
                colors={colors}
              />
            ))
          )}
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
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 16,
    fontWeight: '700',
  },
  tabContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 20,
  },
});