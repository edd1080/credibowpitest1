// Componente molecular Breadcrumbs - navegación tipo breadcrumb reutilizable
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Home, ChevronRight } from 'lucide-react-native';

interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  colors: {
    textTertiary: string;
    textSecondary: string;
  };
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  colors
}) => {
  return (
    <View style={styles.breadcrumbsContainer}>
      <Home size={16} color={colors.textTertiary} />
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={14} color={colors.textTertiary} style={styles.chevron} />
          
          <TouchableOpacity 
            onPress={item.onPress}
            disabled={!item.onPress}
            style={styles.breadcrumbItem}
          >
            <Text style={[
              styles.breadcrumbText, 
              { 
                color: index === items.length - 1 ? colors.textSecondary : colors.textTertiary 
              }
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  breadcrumbsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 2,
  },
  chevron: {
    marginHorizontal: 1,
  },
  breadcrumbItem: {
    paddingVertical: 1,
    paddingHorizontal: 2,
  },
  breadcrumbText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    fontWeight: '400',
  },
});