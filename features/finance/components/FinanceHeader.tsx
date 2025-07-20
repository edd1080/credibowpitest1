// Componente molecular FinanceHeader - header financiero con logo y navegación
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Bell, User } from 'lucide-react-native';

interface FinanceHeaderProps {
  colors: {
    textInverse: string;
  };
}

export const FinanceHeader: React.FC<FinanceHeaderProps> = ({ colors }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {/* Logo placeholder */}
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText, { color: colors.textInverse }]}>
            FinApp
          </Text>
        </View>
        
        {/* Right side icons */}
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color={colors.textInverse} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.avatarContainer}>
              <User size={20} color="#50A274" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#50A274',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
  },
  logoText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});