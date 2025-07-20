// Componente molecular NewApplicationCard - tarjeta de nueva solicitud reutilizable
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FileText } from 'lucide-react-native';

interface NewApplicationCardProps {
  onPress: () => void;
  colors: {
    card: string;
    cardBorder: string;
    text: string;
    textSecondary: string;
  };
}

export const NewApplicationCard: React.FC<NewApplicationCardProps> = ({
  onPress,
  colors
}) => {
  return (
    <View style={[styles.newApplicationCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
      <View style={styles.newApplicationHeader}>
        <FileText size={24} color={colors.text} />
        <Text style={[styles.newApplicationTitle, { color: colors.text }]}>
          Nueva Solicitud
        </Text>
      </View>
      <Text style={[styles.newApplicationSubtitle, { color: colors.textSecondary }]}>
        Crear una nueva solicitud de crédito
      </Text>
      
      <TouchableOpacity onPress={onPress} style={styles.newApplicationButton}>
        <FileText size={20} color="#FFFFFF" />
        <Text style={styles.newApplicationButtonText}>Comenzar solicitud</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  newApplicationCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  newApplicationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  newApplicationTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    fontWeight: '700',
  },
  newApplicationSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 20,
    fontWeight: '400',
  },
  newApplicationButton: {
    backgroundColor: '#50A274',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  newApplicationButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});