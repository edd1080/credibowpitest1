// Componente atómico SecondaryButton - botón secundario con borde reutilizable
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { CreditCard as Edit3 } from 'lucide-react-native';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
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
        <Edit3 size={16} color={disabled ? colors.textTertiary : colors.text} />
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
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
});