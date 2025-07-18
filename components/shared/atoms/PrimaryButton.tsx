// Componente atómico PrimaryButton - botón principal con gradiente reutilizable
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  gradientColors?: string[];
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  icon,
  gradientColors = ['#6A00F4', '#3B93FF']
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled || isLoading}
      style={styles.primaryButton}
    >
      <LinearGradient
        colors={gradientColors}
        style={[styles.primaryButtonGradient, (disabled || isLoading) && styles.disabledButton]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {icon}
        <Text style={styles.primaryButtonText}>
          {isLoading ? 'Cargando...' : title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    marginBottom: 24,
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  disabledButton: {
    opacity: 0.6,
  },
});