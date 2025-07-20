// Componente molecular NewApplicationCard - tarjeta de nueva solicitud reutilizable
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
        <View style={styles.newApplicationIcon}>
          <FileText size={28} color="#1976D2" />
        </View>
        <View style={styles.newApplicationText}>
          <Text style={[styles.newApplicationTitle, { color: colors.text }]}>
            Nueva Solicitud
          </Text>
          <Text style={[styles.newApplicationSubtitle, { color: colors.textSecondary }]}>
            Crear una nueva solicitud de crédito
          </Text>
        </View>
      </View>
      
      <TouchableOpacity onPress={onPress} style={styles.newApplicationButton}>
        <LinearGradient
          colors={['#1976D2', '#1565C0']}
          style={styles.newApplicationButtonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <FileText size={20} color="#FFFFFF" />
          <Text style={styles.newApplicationButtonText}>Comenzar solicitud</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  newApplicationCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  newApplicationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  newApplicationIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  newApplicationText: {
    flex: 1,
  },
  newApplicationTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 4,
  },
  newApplicationSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  newApplicationButton: {
    borderRadius: 12,
  },
  newApplicationButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  newApplicationButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});