// Componente molecular AuthHeader - header de autenticación reutilizable
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { DesignTokens } from '@/constants/designTokens';

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
    <View style={[styles.header, { marginBottom: DesignTokens.spacing['4xl'] }]}>
      {showBackButton && onBackPress && (
        <TouchableOpacity 
          onPress={onBackPress}
          style={[styles.backButton, { marginBottom: DesignTokens.spacing.xl, padding: DesignTokens.spacing.sm }]}
        >
          <ArrowLeft size={DesignTokens.widths.icon.lg} color={colors.text} />
        </TouchableOpacity>
      )}
      <Text style={[
        styles.title, 
        { 
          color: colors.text,
          fontFamily: DesignTokens.typography.fontFamily.bold,
          fontSize: DesignTokens.typography.fontSize['4xl'],
          marginBottom: DesignTokens.spacing.sm,
        }
      ]}>
        {title}
      </Text>
      <Text style={[
        styles.subtitle, 
        { 
          color: colors.textSecondary,
          fontFamily: DesignTokens.typography.fontFamily.regular,
          fontSize: DesignTokens.typography.fontSize.lg,
          lineHeight: DesignTokens.typography.fontSize.lg * DesignTokens.typography.lineHeight.normal,
        }
      ]}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-start',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  title: {
    textAlign: 'left',
  },
  subtitle: {
    textAlign: 'left',
  },
});