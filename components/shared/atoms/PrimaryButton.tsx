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
  gradientColors = ['#50A274', '#6BB77B']
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 40,
  },
  primaryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#FFFFFF',
  },
  disabledButton: {
    opacity: 0.6,
  },
});