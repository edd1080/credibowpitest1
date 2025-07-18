// Componente organismo LoginForm - formulario de inicio de sesión completo
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Mail, Lock } from 'lucide-react-native';
import { AuthInput } from './AuthInput';
import { PrimaryButton } from '@/components/shared/atoms/PrimaryButton';

interface LoginFormProps {
  email: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onTogglePassword: () => void;
  onSignIn: () => void;
  onForgotPassword: () => void;
  colors: {
    text: string;
    textSecondary: string;
    primary: string;
  };
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  showPassword,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSignIn,
  onForgotPassword,
  colors
}) => {
  return (
    <View style={styles.form}>
      <AuthInput
        icon={<Mail size={20} color={colors.textSecondary} />}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={onEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        colors={colors}
      />

      <AuthInput
        icon={<Lock size={20} color={colors.textSecondary} />}
        placeholder="Contraseña"
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry={!showPassword}
        showPasswordToggle={true}
        onTogglePassword={onTogglePassword}
        colors={colors}
      />

      <TouchableOpacity 
        onPress={onForgotPassword}
        style={styles.forgotPassword}
      >
        <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
          ¿Olvidaste tu contraseña?
        </Text>
      </TouchableOpacity>

      <PrimaryButton
        title="Iniciar Sesión"
        onPress={onSignIn}
        disabled={isLoading}
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 32,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    padding: 4,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});