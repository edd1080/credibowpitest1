// Componente organismo QuickAccessGrid - cuadrícula de acceso rápido a secciones
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User, DollarSign, Briefcase, Users, FileText, CircleCheck as CheckCircle } from 'lucide-react-native';
import { QuickAccessCard } from './QuickAccessCard';

interface QuickAccessGridProps {
  colors: {
    card: string;
    cardBorder: string;
    text: string;
    surfaceSecondary: string;
    border: string;
    textSecondary: string;
  };
}

export const QuickAccessGrid: React.FC<QuickAccessGridProps> = ({ colors }) => {
  const quickAccessSections = [
    {
      id: 'identification',
      title: 'Identificación y Contacto',
      subtitle: 'Datos básicos',
      icon: <User size={24} color="#1976D2" />,
      completed: false,
    },
    {
      id: 'finances',
      title: 'Finanzas y Patrimonio',
      subtitle: 'Información financiera',
      icon: <DollarSign size={24} color="#1976D2" />,
      completed: false,
    },
    {
      id: 'business',
      title: 'Negocio y Perfil Económico',
      subtitle: 'Perfil económico',
      icon: <Briefcase size={24} color="#1976D2" />,
      completed: false,
    },
    {
      id: 'guarantors',
      title: 'Garantías, Fiadores y Referencias',
      subtitle: 'Fiadores y referencias',
      icon: <Users size={24} color="#1976D2" />,
      completed: false,
    },
    {
      id: 'documents',
      title: 'Documentos y Cierre',
      subtitle: 'Documentos y cierre',
      icon: <FileText size={24} color="#1976D2" />,
      completed: false,
    },
    {
      id: 'review',
      title: 'Revisión Final',
      subtitle: 'Revisión final',
      icon: <CheckCircle size={24} color="#1976D2" />,
      completed: false,
    },
  ];

  const handleSectionPress = (sectionId: string) => {
    // TODO: Implementar navegación a sección específica
    console.log('Navigate to section:', sectionId);
  };

  return (
    <View style={[styles.quickAccessContainer, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
      <Text style={[styles.quickAccessTitle, { color: colors.text }]}>
        Acceso Rápido a Secciones
      </Text>
      
      <View style={styles.quickAccessGrid}>
        {quickAccessSections.map((section) => (
          <QuickAccessCard
            key={section.id}
            icon={section.icon}
            title={section.title}
            subtitle={section.subtitle}
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
  quickAccessContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  quickAccessTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 16,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});