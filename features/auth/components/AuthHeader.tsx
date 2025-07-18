// Componente molecular AuthHeader - header de autenticación reutilizable
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  colors: {
    text: string;
    textSecondary: string;
  };
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  colors
}) => {
  return (
    <View style={styles.header}>
      {showBackButton && onBackPress && (
        <TouchableOpacity 
          onPress={onBackPress}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, { color: colors.text }]}>
        {title}
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    padding: 8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});