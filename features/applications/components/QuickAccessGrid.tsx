// Componente organismo QuickAccessGrid - panel de navegación rápida rediseñado según Figma
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User, DollarSign, MapPin, Users, FileText, CircleCheck as CheckCircle } from 'lucide-react-native';
import { QuickAccessCard } from './QuickAccessCard';

interface QuickAccessGridProps {
  colors: {
    card: string;
    cardBorder: string;
    text: string;
    surfaceSecondary: string;
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
      icon: <User size={24} color="#6366F1" />,
      completed: false,
    },
    {
      id: 'finances',
      title: 'Finanzas y Patrimonio',
      icon: <DollarSign size={24} color="#6366F1" />,
      completed: false,
    },
    {
      id: 'business',
      title: 'Negocio y Perfil Económico',
      icon: <MapPin size={24} color="#6366F1" />,
      completed: false,
    },
    {
      id: 'guarantors',
      title: 'Fiadores y Referencias',
      icon: <Users size={24} color="#6366F1" />,
      completed: false,
    },
    {
      id: 'documents',
      title: 'Documentos',
      icon: <FileText size={24} color="#6366F1" />,
      completed: false,
    },
    {
      id: 'review',
      title: 'Revisión Final',
      icon: <CheckCircle size={24} color="#6366F1" />,
      completed: false,
    },
  ];

  const handleSectionPress = (sectionId: string) => {
    // TODO: Implementar navegación a sección específica
    console.log('Navigate to section:', sectionId);
  };

  return (
    <View style={styles.quickAccessContainer}>
      {/* Header con ícono y título */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <FileText size={20} color="#6366F1" />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>
          Acceso Rápido
        </Text>
      </View>
      
      {/* Grid 2x3 de tarjetas */}
      <View style={styles.grid}>
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
  quickAccessContainer: {
    backgroundColor: '#F8FAFC', // Fondo verde claro/gris muy claro
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  headerIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
});