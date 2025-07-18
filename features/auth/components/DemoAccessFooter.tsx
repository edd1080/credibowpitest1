// Componente molecular DemoAccessFooter - footer de acceso demo reutilizable
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface DemoAccessFooterProps {
  onDemoPress: () => void;
  colors: {
    textSecondary: string;
    primary: string;
  };
}

export const DemoAccessFooter: React.FC<DemoAccessFooterProps> = ({
  onDemoPress,
  colors
}) => {
  return (
    <View style={styles.demoAccess}>
      <Text style={[styles.demoAccessText, { color: colors.textSecondary }]}>
        ¿Quieres probar la app?{' '}
      </Text>
      <TouchableOpacity onPress={onDemoPress}>
        <Text style={[styles.demoAccessLink, { color: colors.primary }]}>
          Modo Demo
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  demoAccess: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  demoAccessText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  demoAccessLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
});