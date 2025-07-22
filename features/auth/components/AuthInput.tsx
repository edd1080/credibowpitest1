// Componente molecular AuthInput - campo de entrada con label encima reutilizable
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { DesignTokens } from '@/constants/designTokens';

interface AuthInputProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  colors: {
    text: string;
    textSecondary: string;
    border: string;
  };
}

export const AuthInput: React.FC<AuthInputProps> = ({
  icon,
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  showPasswordToggle = false,
  onTogglePassword,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  colors
}) => {
  return (
    <View style={[styles.container, { marginBottom: DesignTokens.spacing.lg }]}>
      <Text style={[
        styles.label, 
        { 
          color: colors.text,
          fontFamily: DesignTokens.typography.fontFamily.medium,
          fontSize: DesignTokens.typography.fontSize.sm,
          marginBottom: DesignTokens.spacing.xs,
        }
      ]}>
        {label}
      </Text>
      <View style={[
        styles.inputContainer, 
        { 
          borderColor: colors.border,
          borderRadius: DesignTokens.borderRadius.md,
          paddingVertical: DesignTokens.spacing.sm + 2, // 10px
          paddingHorizontal: DesignTokens.spacing.lg,
          minHeight: DesignTokens.heights.input,
        }
      ]}>
        {icon}
        <TextInput
          style={[
            styles.input, 
            { 
              color: colors.text,
              fontFamily: DesignTokens.typography.fontFamily.regular,
              fontSize: DesignTokens.typography.fontSize.base,
            }
          ]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {showPasswordToggle && onTogglePassword && (
          <TouchableOpacity onPress={onTogglePassword}>
            {secureTextEntry ? (
              <Eye size={DesignTokens.widths.icon.md} color={colors.textSecondary} />
            ) : (
              <EyeOff size={DesignTokens.widths.icon.md} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom se aplica dinámicamente
  },
  label: {
    // Estilos se aplican dinámicamente
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    gap: DesignTokens.spacing.md,
  },
  input: {
    flex: 1,
  },
});