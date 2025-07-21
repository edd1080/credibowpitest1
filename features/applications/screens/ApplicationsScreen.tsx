// Applications list screen rediseñado con layout limpio
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated } from 'react-native';
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
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchBarHeight] = useState(new Animated.Value(0));

  // Hook personalizado que encapsula toda la lógica de datos
  const {
    tabs,
    filteredApplications,
    formatDate
  } = useApplicationsData(searchQuery, selectedTab);

  const handleApplicationPress = (id: string) => {
    router.push(`/application/${id}`);
  };

  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    
    // Si el usuario hace pull hacia abajo (scroll negativo)
    if (contentOffset.y < -50 && !showSearchBar) {
      setShowSearchBar(true);
      Animated.timing(searchBarHeight, {
        toValue: 80, // Altura de la barra de búsqueda + padding
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    
    // Si el usuario scrollea hacia abajo y la barra está visible
    if (contentOffset.y > 20 && showSearchBar) {
      setShowSearchBar(false);
      Animated.timing(searchBarHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Solicitudes
        </Text>
      </View>

      {/* Animated Search Bar */}
      <Animated.View style={[styles.searchBarContainer, { height: searchBarHeight }]}>
        <View style={styles.searchBarContent}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar por nombre o ID..."
            colors={colors}
          />
        </View>
      </Animated.View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={true}
      >
        {/* Header */}
        <View style={styles.pullHint}>
          <Text style={[styles.pullHintText, { color: colors.textTertiary }]}>
            {showSearchBar ? 'Suelta para ocultar búsqueda' : 'Desliza hacia abajo para buscar'}
          </Text>
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
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    fontWeight: '700',
  },
  searchBarContainer: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  searchBarContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  pullHint: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  pullHintText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    fontStyle: 'italic',
  },
  tabContainer: {
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 20,
  },
});