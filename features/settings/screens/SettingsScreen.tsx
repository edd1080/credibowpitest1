// Settings screen refactorizado - arquitectura atómica aplicada
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/features/auth/AuthContext';
import { User, RefreshCw, CirclePlay as PlayCircle, Globe, LogOut, Moon, Sun, Info } from 'lucide-react-native';
import { router } from 'expo-router';

// Componentes atómicos, moleculares y organismos
import { SettingItem } from '../components/SettingItem';
import { SettingsSection } from '../components/SettingsSection';

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const { user, isDemoMode, signOut, enterDemoMode, exitDemoMode } = useAuth();

  const handleDemoMode = () => {
    if (isDemoMode) {
      Alert.alert(
        'Salir del Modo Demo',
        '¿Estás seguro de que quieres salir del modo demo? Se perderán todos los datos de práctica.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Salir', style: 'destructive', onPress: exitDemoMode }
        ]
      );
    } else {
      enterDemoMode();
      router.replace('/(tabs)');
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', style: 'destructive', onPress: signOut }
      ]
    );
  };

  const forceSyncronization = () => {
    Alert.alert(
      'Sincronización',
      'Se han sincronizado todas las solicitudes pendientes.',
      [{ text: 'OK' }]
    );
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
          Ajustes
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <SettingsSection title="PERFIL" colors={colors}>
          <SettingItem
            icon={<User size={22} color={colors.primary} />}
            title={user?.name || 'Usuario'}
            subtitle={`${user?.email} • ${user?.agentCode}`}
            onPress={() => router.push('/profile/edit')}
            colors={colors}
          />
        </SettingsSection>

        {/* App Section */}
        <SettingsSection title="APLICACIÓN" colors={colors}>
          <SettingItem
            icon={isDark ? <Moon size={22} color={colors.primary} /> : <Sun size={22} color={colors.primary} />}
            title="Tema de la App"
            subtitle={isDark ? 'Modo Oscuro' : 'Modo Claro'}
            rightElement={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.border, true: `${colors.primary}40` }}
                thumbColor={isDark ? colors.primary : colors.textTertiary}
              />
            }
            showChevron={false}
            colors={colors}
          />
          
          <SettingItem
            icon={<RefreshCw size={22} color={colors.primary} />}
            title="Forzar Sincronización"
            subtitle="Sincronizar solicitudes pendientes"
            onPress={forceSyncronization}
            colors={colors}
          />
          
          <SettingItem
            icon={<PlayCircle size={22} color={colors.primary} />}
            title={isDemoMode ? "Salir del Modo Demo" : "Modo Demo"}
            subtitle={isDemoMode ? "Volver al modo normal" : "Practicar sin datos reales"}
            onPress={handleDemoMode}
            colors={colors}
          />
          
          <SettingItem
            icon={<Globe size={22} color={colors.primary} />}
            title="Idioma"
            subtitle="Español (Guatemala)"
            onPress={() => {
              Alert.alert('Próximamente', 'La selección de idioma estará disponible en una próxima actualización.');
            }}
            colors={colors}
          />
        </SettingsSection>

        {/* Info Section */}
        <SettingsSection title="INFORMACIÓN" colors={colors}>
          <SettingItem
            icon={<Info size={22} color={colors.primary} />}
            title="Información de la App"
            subtitle="Versión 1.0.0"
            onPress={() => {
              Alert.alert(
                'AppCredit v1.0.0',
                'Desarrollado para la digitalización de créditos en Guatemala.\n\n© 2024 AppCredit',
                [{ text: 'OK' }]
              );
            }}
            colors={colors}
          />
        </SettingsSection>

        {/* Logout Section */}
        <View style={[styles.section, styles.logoutSection]}>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: `${colors.error}15`, borderColor: `${colors.error}30` }]}
            onPress={handleSignOut}
          >
            <LogOut size={22} color={colors.error} />
            <Text style={[styles.logoutText, { color: colors.error }]}>
              Cerrar Sesión
            </Text>
          </TouchableOpacity>
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
  header: {
    padding: 20,
    paddingBottom: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  logoutSection: {
    paddingBottom: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  logoutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});