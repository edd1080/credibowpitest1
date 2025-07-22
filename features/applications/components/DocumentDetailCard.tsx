// Componente molecular DocumentDetailCard - tarjeta detallada de documento individual
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Upload, Camera, CreditCard, Receipt, Chrome as Home, UserCheck, FileImage } from 'lucide-react-native';

interface DocumentDetailCardProps {
  type: string;
  description: string;
  status: 'pending' | 'uploaded' | 'verified';
  required: boolean;
  onUploadPress: () => void;
  onCameraPress: () => void;
  colors: {
    surfaceSecondary: string;
    border: string;
    text: string;
    textSecondary: string;
    primary: string;
    error: string;
    textInverse: string;
    background: string;
  };
}

export const DocumentDetailCard: React.FC<DocumentDetailCardProps> = ({
  type,
  description,
  status,
  required,
  onUploadPress,
  onCameraPress,
  colors
}) => {
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'DPI Frontal':
      case 'DPI Trasero':
        return <CreditCard size={20} color={colors.primary} />;
      case 'Fotografía del Solicitante':
      case 'Fotografía con Solicitante':
        return <UserCheck size={20} color={colors.primary} />;
      case 'Recibos de Servicios':
        return <Receipt size={20} color={colors.primary} />;
      case 'Fotografía del Negocio/Vivienda':
        return <Home size={20} color={colors.primary} />;
      default:
        return <FileImage size={20} color={colors.primary} />;
    }
  };

  return (
    <View style={[styles.documentCard, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
      <View style={styles.documentCardContent}>
        <View style={styles.documentCardLeft}>
          <View style={styles.documentCardHeader}>
            <View style={styles.documentIconAndTitle}>
              {getDocumentIcon(type)}
              <Text style={[styles.documentCardTitle, { color: colors.text }]}>
                {type}
              </Text>
            </View>
            {required && (
              <View style={[styles.requiredBadge, { backgroundColor: colors.error }]}>
                <Text style={[styles.requiredBadgeText, { color: colors.textInverse }]}>
                  Requerido
                </Text>
              </View>
            )}
          </View>
          
          <Text style={[styles.documentCardDescription, { color: colors.textSecondary }]}>
            {description}
          </Text>
        </View>
        
        <View style={styles.documentActions}>
          <TouchableOpacity 
            style={[styles.documentActionButton, { backgroundColor: colors.primary }]}
            onPress={onUploadPress}
          >
            <Upload size={18} color={colors.textInverse} />
            <Text style={[styles.documentActionText, { color: colors.textInverse }]}>
              Subir
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.documentActionButtonSecondary, { backgroundColor: colors.background, borderColor: colors.border }]}
            onPress={onCameraPress}
          >
            <Camera size={18} color={colors.text} />
            <Text style={[styles.documentActionTextSecondary, { color: colors.text }]}>
              Cámara
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  documentCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  documentCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  documentCardLeft: {
    flex: 1,
  },
  documentCardHeader: {
    marginBottom: 12,
  },
  documentIconAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  documentCardTitle: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 16,
    lineHeight: 20,
    flex: 1,
  },
  requiredBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  requiredBadgeText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 11,
  },
  documentCardDescription: {
    fontFamily: 'DM-Sans-Regular',
    fontSize: 13,
    lineHeight: 18,
  },
  documentActions: {
    gap: 12,
    minWidth: 100,
  },
  documentActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 8,
  },
  documentActionButtonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  documentActionText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 14,
  },
  documentActionTextSecondary: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 14,
  },
});