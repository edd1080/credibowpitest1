// Componente atómico SecondaryButton - botón secundario con borde reutilizable
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  colors: {
    background: string;
    border: string;
    text: string;
    textTertiary: string;
  };
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  icon,
  colors
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled}
      style={[
        styles.secondaryButton,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
        },
        disabled && { opacity: 0.5 }
      ]}
    >
      <View style={styles.buttonContent}>
        {icon}
        <Text style={[
          styles.secondaryButtonText, 
          { color: disabled ? colors.textTertiary : colors.text }
        ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  secondaryButton: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    minHeight: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    fontWeight: '600',
  },
});