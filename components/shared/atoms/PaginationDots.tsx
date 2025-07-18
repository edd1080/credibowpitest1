// Componente atómico PaginationDots - indicadores de paginación reutilizables
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface PaginationDotsProps {
  totalSlides: number;
  currentSlide: number;
  colors: {
    primary: string;
    border: string;
  };
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  totalSlides,
  currentSlide,
  colors
}) => {
  return (
    <View style={styles.pagination}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            {
              backgroundColor: index === currentSlide ? colors.primary : colors.border,
              width: index === currentSlide ? 24 : 8,
            }
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
  },
});