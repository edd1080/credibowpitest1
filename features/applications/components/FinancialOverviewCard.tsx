// Componente molecular FinancialOverviewCard - resumen financiero de la solicitud
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FileText } from 'lucide-react-native';

interface FinancialData {
  requestedAmount: number;
  termMonths: number;
  creditType: string;
  purpose: string;
}

interface FinancialOverviewCardProps {
  financialData: FinancialData;
  colors: {
    card: string;
    cardBorder: string;
    text: string;
    textSecondary: string;
    primary: string;
  };
}

export const FinancialOverviewCard: React.FC<FinancialOverviewCardProps> = ({
  financialData,
  colors
}) => {
  return (
    <View style={[styles.financialCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
      <View style={styles.financialHeader}>
        <FileText size={20} color={colors.primary} />
        <Text style={[styles.financialTitle, { color: colors.text }]}>
          Solicitud de Crédito
        </Text>
      </View>
      
      <View style={styles.financialGrid}>
        <View style={styles.financialRow}>
          <View style={styles.financialItem}>
            <Text style={[styles.financialLabel, { color: colors.textSecondary }]}>
              Monto Solicitado
            </Text>
            <Text style={[styles.financialValue, { color: colors.text }]}>
              {financialData.requestedAmount > 0 
                ? `Q${financialData.requestedAmount.toLocaleString()}`
                : 'Por definir'
              }
            </Text>
          </View>
          
          <View style={styles.financialItem}>
            <Text style={[styles.financialLabel, { color: colors.textSecondary }]}>
              Plazo
            </Text>
            <Text style={[styles.financialValue, { color: colors.text }]}>
              {financialData.termMonths > 0 
                ? `${financialData.termMonths} meses`
                : 'Por definir'
              }
            </Text>
          </View>
        </View>
        
        <View style={styles.financialRow}>
          <View style={styles.financialItem}>
            <Text style={[styles.financialLabel, { color: colors.textSecondary }]}>
              Tipo de Crédito
            </Text>
            <Text style={[styles.financialValue, { color: colors.text }]}>
              {financialData.creditType}
            </Text>
          </View>
          
          <View style={styles.financialItem}>
            <Text style={[styles.financialLabel, { color: colors.textSecondary }]}>
              Propósito
            </Text>
            <Text style={[styles.financialValue, { color: colors.text }]}>
              {financialData.purpose}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  financialCard: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  financialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  financialTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  financialGrid: {
    gap: 16,
  },
  financialRow: {
    flexDirection: 'row',
    gap: 16,
  },
  financialItem: {
    flex: 1,
  },
  financialLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  financialValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
});