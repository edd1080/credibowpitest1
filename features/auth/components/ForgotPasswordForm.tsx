// Componente organismo ForgotPasswordForm - formulario de recuperación de contraseña
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Mail } from 'lucide-react-native';
import { AuthInput } from './AuthInput';
import { PrimaryButton } from '@/components/shared/atoms/PrimaryButton';

interface ForgotPasswordFormProps {
  email: string;
  onEmailChange: (email: string) => void;
  onSendLink: () => void;
  colors: {
    text: string;
    textSecondary: string;
  };
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  email,
  onEmailChange,
  onSendLink,
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

      <PrimaryButton
        title="Enviar Enlace"
        onPress={onSendLink}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 32,
  },
});