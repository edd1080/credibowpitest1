// Onboarding feature types
export interface OnboardingSlideData {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string[];
}

export interface OnboardingNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onSkip: () => void;
  onDemoMode: () => void;
}