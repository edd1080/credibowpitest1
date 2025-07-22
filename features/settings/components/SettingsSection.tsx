// Componente organismo SettingsSection - sección de configuración con título
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  colors: {
    textSecondary: string;
  };
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
  colors
}) => {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        {title}
      </Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 14,
    marginBottom: 12,
    marginLeft: 4,
  },
});