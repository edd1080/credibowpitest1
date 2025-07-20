// Componente molecular UserHeader - header de usuario reutilizable
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface User {
  name?: string;
  avatar?: string;
}

interface UserHeaderProps {
  user: User | null;
  colors: {
    text: string;
    textSecondary: string;
    primary: string;
    textInverse: string;
  };
}

export const UserHeader: React.FC<UserHeaderProps> = ({
  user,
  colors
}) => {
  return (
    <View style={styles.headerContent}>
      <View style={styles.headerText}>
        <Text style={[styles.greeting, { color: colors.text }]}>
          ¡Hola, {user?.name || 'Usuario'}!
        </Text>
        <Text style={[styles.userRole, { color: colors.textSecondary }]}>
          Asesor de Créditos | Agencia Central
        </Text>
      </View>
      <TouchableOpacity style={styles.avatarContainer}>
        {user?.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatarPlaceholder, { backgroundColor: colors.primary }]}>
            <Text style={[styles.avatarText, { color: colors.textInverse }]}>
              {user?.name?.charAt(0) || 'U'}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    marginBottom: 6,
    letterSpacing: -0.8,
    lineHeight: 38,
  },
  userRole: {
    fontFamily: 'Inter-Regular',
    fontSize: 17,
    lineHeight: 22,
    opacity: 0.8,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    marginLeft: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
});