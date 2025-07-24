// Componente molecular InfoSectionCard - tarjeta genérica para secciones de información
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight, CircleAlert as AlertCircle } from 'lucide-react-native';

export interface InfoRow {
  label: string;
  value: string;
  isRequired?: boolean;
  isPlaceholder?: boolean;
  action?: 'Editar' | 'Agregar' | 'Completar';
}

interface InfoSectionCardProps {
  icon: React.ReactNode;
  title: string;
  rows: InfoRow[];
  onRowPress?: (rowIndex: number) => void;
  colors: {
    card: string;
    cardBorder: string;
    text: string;
    textSecondary: string;
    textTertiary: string;
    primary: string;
    warning: string;
  };
}

export const InfoSectionCard: React.FC<InfoSectionCardProps> = ({
  icon,
  title,
  rows,
  onRowPress,
  colors
}) => {
  return (
    <View style={[styles.infoSection, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
      <View style={styles.sectionHeader}>
        {icon}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {title}
        </Text>
      </View>
      
      {rows.map((row, index) => (
        <View key={index} style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
            {row.label}
          </Text>
          <View style={styles.infoValueContainer}>
            {row.isRequired ? (
              <View style={styles.warningContainer}>
                <AlertCircle size={16} color={colors.warning} />
                <Text style={[styles.requiredField, { color: colors.warning }]}>
                  Requerido - {row.value}
                </Text>
              </View>
            ) : (
              <Text style={[
                styles.infoValue, 
                { 
                  color: row.isPlaceholder ? colors.textTertiary : colors.text,
                  fontFamily: DesignTokens.typography.fontFamily.bold,
                  fontSize: DesignTokens.typography.fontSize.lg,
                }
              ]}>
                {row.value}
              </Text>
            )}
            {onRowPress && (
              <TouchableOpacity 
                style={styles.editButtonContainer}
                onPress={() => onRowPress(index)}
              >
                <Text style={[
                  styles.editButton, 
                  { color: row.isRequired ? colors.warning : colors.primary }
                ]}>
                  {row.action || 'Editar'}
                </Text>
                <ChevronRight size={16} color={row.isRequired ? colors.warning : colors.primary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  infoSection: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  sectionTitle: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    fontWeight: '600',
  },
  infoRow: {
    marginBottom: 12,
  },
  infoLabel: {
    fontFamily: 'DM-Sans-Regular',
    fontSize: 12,
    marginBottom: 2,
  },
  infoValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoValue: {
    fontWeight: DesignTokens.typography.fontWeight.bold,
    flex: 1,
  },
  editButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editButton: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 12,
    fontWeight: '500',
  },
  requiredField: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
});