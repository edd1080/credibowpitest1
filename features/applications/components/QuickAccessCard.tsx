// Componente molecular QuickAccessCard - tarjeta individual rediseñada según Figma
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface QuickAccessCardProps {
  icon: React.ReactNode;
  title: string;
  completed: boolean;
  onPress: () => void;
  colors: {
    surfaceSecondary: string;
    border: string;
    text: string;
    textSecondary: string;
  };
}

export const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  icon,
  title,
  completed,
  onPress,
  colors
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.card}
      activeOpacity={0.7}
    >
      {/* Ícono circular con fondo lavanda */}
      <View style={styles.iconContainer}>
        {icon}
      </View>
      
      {/* Título de la sección */}
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%', // Para grid 2 columnas con gap
    minHeight: 100,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFEAFE', // Fondo lavanda como en Figma
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    lineHeight: 18,
  },
});