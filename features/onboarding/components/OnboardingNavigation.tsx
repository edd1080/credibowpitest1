// Componente organismo OnboardingNavigation - navegación completa de onboarding
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, CirclePlay as PlayCircle } from 'lucide-react-native';

interface OnboardingNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onSkip: () => void;
  onDemoMode: () => void;
  colors: {
    surfaceSecondary: string;
    border: string;
    primary: string;
    textSecondary: string;
  };
}

export const OnboardingNavigation: React.FC<OnboardingNavigationProps> = ({
  currentSlide,
  totalSlides,
  onNext,
  onSkip,
  onDemoMode,
  colors
}) => {
  const isLastSlide = currentSlide === totalSlides - 1;

  return (
    <View style={styles.bottomActions}>
      {/* Demo Mode Button */}
      <TouchableOpacity
        style={[styles.demoButton, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}
        onPress={onDemoMode}
      >
        <PlayCircle size={20} color={colors.primary} />
        <Text style={[styles.demoButtonText, { color: colors.primary }]}>
          Probar en Modo Demo
        </Text>
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
          <Text style={[styles.skipButtonText, { color: colors.textSecondary }]}>
            Omitir
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onNext} style={styles.nextButton}>
          <LinearGradient
            colors={['#50A274', '#6BB77B']}
            style={styles.nextButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.nextButtonText}>
              {isLastSlide ? 'Comenzar' : 'Siguiente'}
            </Text>
            <ChevronRight size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomActions: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  demoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    gap: 8,
  },
  demoButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  skipButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  nextButton: {
    flex: 0.6,
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  nextButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});