// Componente organismo QuickAccessGrid - cuadrícula de acceso rápido a secciones
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User, DollarSign, MapPin, Users, FileText, CircleCheck as CheckCircle } from 'lucide-react-native';
import { QuickAccessCard } from './QuickAccessCard';
import { DesignTokens } from '@/constants/designTokens';

interface QuickAccessGridProps {
  colors: {
    card: string;
    cardBorder: string;
    text: string;
    border: string;
    textSecondary: string;
    primary: string;
  };
}

export const QuickAccessGrid: React.FC<QuickAccessGridProps> = ({ colors }) => {
  const quickAccessSections = [
    {
      id: 'identification',
      title: 'Identificación y Contacto',
      icon: <User size={DesignTokens.widths.icon.lg} color="#6B7280" />,
      completed: false,
    },
    {
      id: 'finances',
      title: 'Finanzas y Patrimonio',
      icon: <DollarSign size={DesignTokens.widths.icon.lg} color="#6B7280" />,
      completed: false,
    },
    {
      id: 'business',
      title: 'Negocio y Perfil Económico',
      icon: <MapPin size={DesignTokens.widths.icon.lg} color="#6B7280" />,
      completed: false,
    },
    {
      id: 'guarantors',
      title: 'Fiadores y Referencias',
      icon: <Users size={DesignTokens.widths.icon.lg} color="#6B7280" />,
      completed: false,
    },
    {
      id: 'documents',
      title: 'Documentos',
      icon: <FileText size={DesignTokens.widths.icon.lg} color="#6B7280" />,
      completed: false,
    },
    {
      id: 'review',
      title: 'Revisión Final',
      icon: <CircleCheck size={DesignTokens.widths.icon.lg} color="#6B7280" />,
      completed: false,
    },
  ];

  const handleSectionPress = (sectionId: string) => {
    // TODO: Implementar navegación a sección específica
    console.log('Navigate to section:', sectionId);
  };

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: colors.card, 
        borderColor: colors.cardBorder,
        borderRadius: DesignTokens.borderRadius.xl,
        padding: DesignTokens.spacing.lg,
        margin: DesignTokens.spacing.xl,
        ...DesignTokens.shadows.sm,
      }
    ]}>
      <View style={[styles.header, { marginBottom: DesignTokens.spacing.lg }]}>
        <FileText size={DesignTokens.widths.icon.lg} color={colors.primary} />
        <Text style={[
          styles.title, 
          { 
            color: colors.text,
            fontSize: DesignTokens.typography.fontSize.lg,
            fontFamily: DesignTokens.typography.fontFamily.semiBold,
          }
        ]}>
        Acceso Rápido a Secciones
        </Text>
      </View>
      
      <View style={[styles.grid, { gap: DesignTokens.spacing.sm }]}>
        {quickAccessSections.map((section) => (
          <QuickAccessCard
            key={section.id}
            icon={section.icon}
            title={section.title}
            completed={section.completed}
            onPress={() => handleSectionPress(section.id)}
            colors={colors}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DesignTokens.spacing.sm,
  },
  title: {
    fontWeight: DesignTokens.typography.fontWeight.semiBold,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});