// Onboarding screen refactorizado - arquitectura atómica aplicada
import React, { useState } from 'react';
import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/features/auth/AuthContext';
import { Smartphone, FileText, Shield } from 'lucide-react-native';
import { router } from 'expo-router';

// Componentes de la feature
import { OnboardingSlide } from '../components/OnboardingSlide';
import { OnboardingNavigation } from '../components/OnboardingNavigation';

// Componentes compartidos
import { PaginationDots } from '@/components/shared/atoms/PaginationDots';

// Types
import { OnboardingSlideData } from '../types';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const { colors } = useTheme();
  const { enterDemoMode } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: OnboardingSlideData[] = [
    {
      id: 1,
      icon: <Smartphone size={48} color="#FFFFFF" />,
      title: 'Digitaliza tus Créditos',
      description: 'Gestiona todo el proceso de originación de créditos desde tu dispositivo móvil, sin papeles.',
      gradient: ['#50A274', '#6BB77B'],
    },
    {
      id: 2,
      icon: <FileText size={48} color="#FFFFFF" />,
      title: 'Captura Inteligente',
      description: 'Escanea documentos con OCR, captura firmas digitales y registra coordenadas GPS automáticamente.',
      gradient: ['#3B93FF', '#60A5FA'],
    },
    {
      id: 3,
      icon: <Shield size={48} color="#FFFFFF" />,
      title: 'Trabaja Sin Conexión',
      description: 'Todos los datos se guardan de forma segura en tu dispositivo y se sincronizan cuando tengas conexión.',
      gradient: ['#50A274', '#6BB77B'],
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.replace('/auth');
    }
  };

  const handleDemoMode = () => {
    enterDemoMode();
    router.replace('/(tabs)');
  };

  const handleSkip = () => {
    router.replace('/auth');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Slides Container */}
      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentSlide(slideIndex);
        }}
      >
        {slides.map((slide) => (
          <OnboardingSlide
            key={slide.id}
            icon={slide.icon}
            title={slide.title}
            description={slide.description}
            gradient={slide.gradient}
            colors={colors}
          />
        ))}
      </ScrollView>

      {/* Componente PaginationDots reutilizable */}
      <PaginationDots
        totalSlides={slides.length}
        currentSlide={currentSlide}
        colors={colors}
      />

      {/* Componente OnboardingNavigation reutilizable */}
      <OnboardingNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onNext={handleNext}
        onSkip={handleSkip}
        onDemoMode={handleDemoMode}
        colors={colors}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});