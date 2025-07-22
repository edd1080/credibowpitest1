// Componente molecular QuickAccessCard - tarjeta individual de acceso rápido
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface QuickAccessCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  completed: boolean;
  onPress: () => void;
  colors: {
    surfaceSecondary: string;
    border: string;
    text: string;
    textSecondary: string;
  };
}

export const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  icon,
  title,
  subtitle,
  completed,
  onPress,
  colors
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.quickAccessCard, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}
    >
      <View style={[styles.quickAccessIcon, { backgroundColor: '#E3F2FD' }]}>
        {icon}
      </View>
      <Text style={[styles.quickAccessCardTitle, { color: colors.text }]}>
        {title}
      </Text>
      <Text style={[styles.quickAccessCardSubtitle, { color: colors.textSecondary }]}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  quickAccessCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  quickAccessIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickAccessCardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 18,
  },
  quickAccessCardSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    textAlign: 'center',
  },
});