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
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    // Enhanced shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    // Enhanced shadow for Android
    elevation: 6,
  },
  newApplicationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  newApplicationIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  newApplicationText: {
    flex: 1,
  },
  newApplicationTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    marginBottom: 6,
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  newApplicationSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 20,
    opacity: 0.8,
  },
  newApplicationButton: {
    borderRadius: 16,
  },
  newApplicationButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 8,
  },
  newApplicationButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
});