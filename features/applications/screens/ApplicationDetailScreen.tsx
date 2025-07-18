// Application detail screen refactorizado - arquitectura atómica aplicada
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/features/auth/AuthContext';
import { useLocalSearchParams, router } from 'expo-router';
import { User, DollarSign, Briefcase, Users, FileText } from 'lucide-react-native';

// Hooks personalizados
import { useApplicationDetailsData } from '../hooks/useApplicationDetailsData';
import { TabType } from '../types';

// Componentes atómicos y moleculares
import { ApplicationDetailHeader } from '../components/ApplicationDetailHeader';
import { ApplicationSummaryCard } from '../components/ApplicationSummaryCard';
import { QuickAccessGrid } from '../components/QuickAccessGrid';
import { ApplicationTabNavigation } from '../components/ApplicationTabNavigation';
import { InfoSectionCard, InfoRow } from '../components/InfoSectionCard';
import { DocumentDetailCard } from '../components/DocumentDetailCard';
import { FinancialOverviewCard } from '../components/FinancialOverviewCard';
import { EmptyState } from '@/components/shared/atoms/EmptyState';

export default function ApplicationDetailScreen() {
  const { colors } = useTheme();
  const { isDemoMode } = useAuth();
  const { id } = useLocalSearchParams();
  
  // Hook personalizado que encapsula toda la lógica de datos
  const {
    applicationData,
    activeTab,
    setActiveTab,
    tabs
  } = useApplicationDetailsData(id as string);

  const handleMenuPress = () => {
    Alert.alert(
      'Opciones',
      'Selecciona una opción',
      [
        { text: 'Duplicar solicitud', onPress: () => {} },
        { text: 'Eliminar solicitud', style: 'destructive', onPress: () => {} },
        { text: 'Exportar PDF', onPress: () => {} },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const handleEditPress = () => {
    // TODO: Navegar a edición de solicitud
    console.log('Edit application');
  };

  const handleRowPress = (sectionType: string, rowIndex: number) => {
    // TODO: Navegar a edición específica
    console.log('Edit row:', sectionType, rowIndex);
  };

  const handleDocumentUpload = (documentId: string) => {
    // TODO: Implementar subida de documento
    console.log('Upload document:', documentId);
  };

  const handleDocumentCamera = (documentId: string) => {
    // TODO: Implementar captura con cámara
    console.log('Camera for document:', documentId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'resumen':
        const resumenRows: InfoRow[] = [
          { 
            label: 'Nombre', 
            value: applicationData.personalInfo.fullName,
            isPlaceholder: false,
            action: 'Editar'
          },
          { 
            label: 'DPI', 
            value: applicationData.personalInfo.dpi,
            isPlaceholder: true,
            action: 'Editar'
          }
        ];

        const financialRows: InfoRow[] = [
          { 
            label: 'Ingresos Principales', 
            value: 'Por ingresar',
            isRequired: true,
            action: 'Completar'
          },
          { 
            label: 'Gastos Mensuales', 
            value: 'Por ingresar',
            isPlaceholder: true,
            action: 'Agregar'
          }
        ];

        const workRows: InfoRow[] = [
          { 
            label: 'Situación Laboral', 
            value: applicationData.financialInfo.workSituation,
            isPlaceholder: true,
            action: 'Editar'
          }
        ];

        return (
          <View style={styles.tabContent}>
            <InfoSectionCard
              icon={<User size={20} color={colors.primary} />}
              title="Identificación"
              rows={resumenRows}
              onRowPress={(index) => handleRowPress('identification', index)}
              colors={colors}
            />
            <InfoSectionCard
              icon={<DollarSign size={20} color={colors.primary} />}
              title="Finanzas"
              rows={financialRows}
              onRowPress={(index) => handleRowPress('finances', index)}
              colors={colors}
            />
            <InfoSectionCard
              icon={<Briefcase size={20} color={colors.primary} />}
              title="Trabajo"
              rows={workRows}
              onRowPress={(index) => handleRowPress('work', index)}
              colors={colors}
            />
          </View>
        );

      case 'detalles':
        const personalInfoRows: InfoRow[] = [
          { label: 'Nombre', value: applicationData.personalInfo.fullName },
          { label: 'DPI', value: applicationData.personalInfo.dpi, isPlaceholder: true },
          { label: 'NIT', value: applicationData.personalInfo.nit, isPlaceholder: true },
          { label: 'Teléfono', value: applicationData.personalInfo.phone, isPlaceholder: true },
          { label: 'Email', value: applicationData.personalInfo.email, isPlaceholder: true },
          { label: 'Agencia', value: applicationData.personalInfo.agency, isPlaceholder: true },
        ];

        const detailedFinancialRows: InfoRow[] = [
          { 
            label: 'Ingresos Principales', 
            value: 'Por ingresar',
            isRequired: true,
            action: 'Completar'
          },
          { label: 'Gastos Mensuales', value: 'Por ingresar', isPlaceholder: true, action: 'Agregar' },
          { label: 'Patrimonio Neto', value: 'Por ingresar', isPlaceholder: true, action: 'Editar' },
        ];

        const detailedWorkRows: InfoRow[] = [
          { 
            label: 'Situación Laboral', 
            value: 'Por ingresar',
            isPlaceholder: true,
            action: 'Editar'
          }
        ];

        return (
          <View style={styles.tabContent}>
            <InfoSectionCard
              icon={<User size={20} color={colors.primary} />}
              title="Identificación"
              rows={personalInfoRows}
              onRowPress={(index) => handleRowPress('personal', index)}
              colors={colors}
            />
            <InfoSectionCard
              icon={<DollarSign size={20} color={colors.primary} />}
              title="Finanzas"
              rows={detailedFinancialRows}
              onRowPress={(index) => handleRowPress('financial', index)}
              colors={colors}
            />
            <InfoSectionCard
              icon={<Briefcase size={20} color={colors.primary} />}
              title="Trabajo"
              rows={detailedWorkRows}
              onRowPress={(index) => handleRowPress('work', index)}
              colors={colors}
            />
          </View>
        );

      case 'fiadores':
        return (
          <View style={styles.tabContent}>
            <View style={[styles.infoSection, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <View style={styles.sectionHeader}>
                <Users size={20} color={colors.primary} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Fiadores y Referencias
                </Text>
              </View>
              
              <EmptyState
                title="No hay fiadores agregados"
                subtitle="Agrega fiadores y referencias para completar la solicitud"
                colors={colors}
              />
            </View>
          </View>
        );

      case 'documentos':
        return (
          <View style={styles.tabContent}>
            <View style={[styles.infoSection, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <View style={styles.sectionHeader}>
                <FileText size={20} color={colors.primary} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Documentos Requeridos
                </Text>
              </View>
              
              <View style={styles.documentsColumn}>
                {applicationData.documents.map((doc) => (
                  <DocumentDetailCard
                    key={doc.id}
                    type={doc.type}
                    description={doc.description}
                    status={doc.status}
                    required={doc.required}
                    onUploadPress={() => handleDocumentUpload(doc.id)}
                    onCameraPress={() => handleDocumentCamera(doc.id)}
                    colors={colors}
                  />
                ))}
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {isDemoMode && (
        <View style={[styles.demoBanner, { backgroundColor: colors.warning }]}>
          <Text style={[styles.demoText, { color: colors.textInverse }]}>
            MODO DEMO - Los datos no son reales
          </Text>
        </View>
      )}

      {/* Componente Header reutilizable */}
      <ApplicationDetailHeader
        title="Kevin"
        subtitle={`Solicitud ${applicationData.applicationId}`}
        onBackPress={() => router.back()}
        onMenuPress={handleMenuPress}
        colors={colors}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Componente Summary Card reutilizable */}
        <ApplicationSummaryCard
          status={applicationData.status}
          applicationId={applicationData.applicationId}
          clientName={applicationData.clientName}
          progressPercentage={applicationData.progressPercentage}
          onEditPress={handleEditPress}
          colors={colors}
        />

        {/* Componente Quick Access Grid reutilizable */}
        <QuickAccessGrid colors={colors} />

        {/* Componente Tab Navigation reutilizable */}
        <ApplicationTabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          colors={colors}
        />

        {/* Tab Content */}
        {renderTabContent()}

        {/* Componente Financial Overview Card reutilizable */}
        <FinancialOverviewCard
          financialData={applicationData.financialInfo}
          colors={colors}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  demoBanner: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  demoText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
    paddingTop: 0,
  },
  infoSection: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  documentsColumn: {
    gap: 16,
  },
});