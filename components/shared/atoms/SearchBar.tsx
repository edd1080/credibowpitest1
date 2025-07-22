// Componente atómico SearchBar - UI reutilizable para búsqueda
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { DesignTokens } from '@/constants/designTokens';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  colors: {
    surfaceSecondary: string;
    border: string;
    textSecondary: string;
    text: string;
  };
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Buscar...",
  colors
}) => {
  return (
    <View style={[
      styles.searchContainer, 
      { 
        backgroundColor: colors.surfaceSecondary, 
        borderColor: colors.border,
        borderRadius: DesignTokens.borderRadius.md,
        paddingHorizontal: DesignTokens.spacing.md,
        paddingVertical: DesignTokens.spacing.sm,
        minHeight: DesignTokens.heights.input,
      }
    ]}>
      <Search size={DesignTokens.widths.icon.md} color={colors.textSecondary} />
      <TextInput
        style={[
          styles.searchInput, 
          { 
            color: colors.text,
            fontFamily: DesignTokens.typography.fontFamily.regular,
            fontSize: DesignTokens.typography.fontSize.base,
          }
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    gap: DesignTokens.spacing.sm,
  },
  searchInput: {
    flex: 1,
  },
});