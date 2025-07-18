// Authentication screen refactorizado - arquitectura atómica aplicada
import React, { useState, useEffect } from 'react';
import { View, Alert, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/features/auth/AuthContext';
import { router } from 'expo-router';

// Componentes atómicos, moleculares y organismos
import { AuthHeader } from '../components/AuthHeader';
import { LoginForm } from '../components/LoginForm';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';
import { DemoAccessFooter } from '../components/DemoAccessFooter';

export default function AuthScreen() {
  const { colors } = useTheme();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Auto-fill demo credentials
  useEffect(() => {
    setEmail('maria.gonzalez@bancorural.com.gt');
    setPassword('demo123456');
  }, []);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    setIsLoading(true);
    try {
      const success = await signIn(email, password);
      if (success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Error', 'Credenciales incorrectas. Intenta nuevamente.');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Recuperar Contraseña',
      'Se enviará un enlace de recuperación a tu correo electrónico.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Enviar', onPress: () => {
          Alert.alert('Enviado', 'Revisa tu correo electrónico para las instrucciones de recuperación.');
        }}
      ]
    );
  };

  const handleDemoPress = () => {
    router.push('/onboarding');
  };

  if (showForgotPassword) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <KeyboardAvoidingView 
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Componente AuthHeader reutilizable */}
          <AuthHeader
            title="Recuperar Contraseña"
            subtitle="Ingresa tu correo para recibir un enlace de recuperación"
            showBackButton={true}
            onBackPress={() => setShowForgotPassword(false)}
            colors={colors}
          />

          {/* Componente ForgotPasswordForm reutilizable */}
          <ForgotPasswordForm
            email={email}
            onEmailChange={setEmail}
            onSendLink={handleForgotPassword}
            colors={colors}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Componente AuthHeader reutilizable */}
        <AuthHeader
          title="Bienvenido a AppCredit"
          subtitle="Inicia sesión para gestionar tus solicitudes de crédito"
          colors={colors}
        />

        {/* Componente LoginForm reutilizable */}
        <LoginForm
          email={email}
          password={password}
          showPassword={showPassword}
          isLoading={isLoading}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          onSignIn={handleSignIn}
          onForgotPassword={() => setShowForgotPassword(true)}
          colors={colors}
        />

        {/* Componente DemoAccessFooter reutilizable */}
        <DemoAccessFooter
          onDemoPress={handleDemoPress}
          colors={colors}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});