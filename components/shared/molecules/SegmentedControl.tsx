// Componente molecular SegmentedControl - control segmentado reutilizable
import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { DesignTokens } from '@/constants/designTokens';

interface SegmentedControlOption {
  key: string;
  label: string;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  colors: {
    primary: string;
    textInverse: string;
    textSecondary: string;
    surfaceSecondary: string;
    border: string;
  };
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  selectedValue,
  onValueChange,
  colors
}) => {
  return (
    <View style={[
      styles.container,
      {
        backgroundColor: colors.surfaceSecondary,
        borderRadius: DesignTokens.borderRadius.xl,
        padding: DesignTokens.spacing.xs,
      }
    ]}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option.key}
            onPress={() => onValueChange(option.key)}
            style={[
              styles.segment,
              {
                backgroundColor: selectedValue === option.key ? colors.primary : 'transparent',
                borderRadius: DesignTokens.borderRadius.lg,
                paddingVertical: DesignTokens.spacing.sm,
                paddingHorizontal: DesignTokens.spacing.lg,
              }
            ]}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.segmentText,
              {
                color: selectedValue === option.key ? colors.textInverse : colors.textSecondary,
                fontFamily: DesignTokens.typography.fontFamily.medium,
                fontSize: DesignTokens.typography.fontSize.base,
              }
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Estilos dinámicos aplicados arriba
  },
  scrollContent: {
    flexDirection: 'row',
    gap: DesignTokens.spacing.xs,
  },
  segment: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  segmentText: {
    fontWeight: DesignTokens.typography.fontWeight.medium,
    textAlign: 'center',
  },
});