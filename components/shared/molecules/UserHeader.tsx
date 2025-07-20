// Componente molecular UserHeader - header de usuario reutilizable
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface User {
  name?: string;
  role?: string;
  agency?: string;
}

interface UserHeaderProps {
  user: User | null;
  colors: {
    text: string;
    textSecondary: string;
  };
}

export const UserHeader: React.FC<UserHeaderProps> = ({
  user,
  colors
}) => {
  return (
    <View style={styles.headerContent}>
      <Text style={[styles.greeting, { color: colors.text }]}>
        ¡Hola, {user?.name || 'Usuario'}!
      </Text>
      <Text style={[styles.userRole, { color: colors.textSecondary }]}>
        {user?.role || 'Asesor de Créditos'} | {user?.agency || 'Agencia Central'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContent: {
    marginBottom: 32,
  },
  greeting: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
    fontWeight: '700',
  },
  userRole: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    fontWeight: '400',
  },
});