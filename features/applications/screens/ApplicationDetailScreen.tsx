// Application detail screen refactorizado - arquitectura atómica aplicada
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/features/auth/AuthContext';
import { useLocalSearchParams, router } from 'expo-router';
import { User, DollarSign, Briefcase, Users, FileText, CreditCard as Edit3, Send } from 'lucide-react-native';

// Componentes compartidos
import { SegmentedControl } from '@/components/shared/molecules/SegmentedControl';

// Hooks personalizados
import { useApplicationDetailsData } from '../hooks/useApplicationDetailsData';
import { TabType } from '../types';

// Componentes nuevos
import { ApplicationHeaderTopBar } from '../components/ApplicationHeaderTopBar';
import { Breadcrumbs } from '@/components/shared/molecules/Breadcrumbs';
import { SecondaryButton } from '@/components/shared/atoms/SecondaryButton';
import { PrimaryButton } from '@/components/shared/atoms/PrimaryButton';

// Componentes existentes
import { QuickAccessGrid } from '../components/QuickAccessGrid';
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

  const handleBackPress = () => {
    router.back();
  };

  const handleEditPress = () => {
    // TODO: Navegar a edición de solicitud
    console.log('Edit application');
  };

  const handleSendPress = () => {
    if (applicationData.progressPercentage === 100) {
      Alert.alert('Enviar Solicitud', 'La solicitud será enviada para revisión.');
    } else {
      Alert.alert('Solicitud Incompleta', 'Completa todas las secciones antes de enviar.');
    }
  };

  const isComplete = applicationData.progressPercentage === 100;
  const completedSections = Math.round((applicationData.progressPercentage / 100) * 6);

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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Barra superior de navegación */}
        <ApplicationHeaderTopBar
          applicationId={applicationData.applicationId}
          status={applicationData.status}
          onBackPress={handleBackPress}
          colors={colors}
        />

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Solicitudes', onPress: () => router.back() },
            { label: 'Solicitud' }
          ]}
          colors={colors}
        />

        {/* Header de la solicitud */}
        <View style={styles.applicationHeader}>
          <Text style={[styles.clientName, { color: colors.text }]}>
            {applicationData.clientName}
          </Text>
          
          {/* Botones de acción */}
          <View style={styles.actionButtons}>
            <View style={styles.editButtonContainer}>
              <SecondaryButton
                title="Editar"
                onPress={handleEditPress}
                icon={<Edit3 size={18} color={colors.text} />}
                colors={colors}
              />
            </View>
            
            <View style={styles.sendButtonContainer}>
              <PrimaryButton
                title="Enviar Solicitud"
                onPress={handleSendPress}
                disabled={!isComplete}
                icon={<Send size={18} color="#FFFFFF" />}
                gradientColors={isComplete ? ['#50A274', '#6BB77B'] : ['#94A3B8', '#CBD5E1']}
              />
            </View>
          </View>
          
          {/* Barra de progreso */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
                Progreso:
              </Text>
              <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                {completedSections}/6 secciones completadas
              </Text>
            </View>
            
            <View style={[styles.progressBarBackground, { backgroundColor: colors.border }]}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    backgroundColor: colors.primary,
                    width: `${applicationData.progressPercentage}%`
                  }
                ]} 
              />
            </View>
          </View>
        </View>

        {/* Componente Quick Access Grid reutilizable */}
        <View style={[styles.section, { marginBottom: DesignTokens.spacing['2xl'] }]}>
          <QuickAccessGrid colors={colors} />
        </View>

        {/* Segmented Control Navigation */}
        <View style={[styles.section, { marginBottom: DesignTokens.spacing['2xl'] }]}>
          <SegmentedControl
            options={tabs}
            selectedValue={activeTab}
            onValueChange={setActiveTab}
            colors={colors}
          />
        </View>

        {/* Tab Content */}
        <View style={[styles.section, { marginBottom: DesignTokens.spacing['2xl'] }]}>
          {renderTabContent()}
        </View>

        {/* Componente Financial Overview Card reutilizable */}
        <View style={[styles.section, { marginBottom: DesignTokens.spacing['2xl'] }]}>
          <FinancialOverviewCard
            financialData={applicationData.financialInfo}
            colors={colors}
          />
        </View>
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
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 14,
  },
  applicationHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: DesignTokens.spacing['2xl'],
  },
  clientName: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    letterSpacing: -0.025,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  editButtonContainer: {
    flex: 1,
  },
  sendButtonContainer: {
    flex: 2,
  },
  progressSection: {
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 16,
    fontWeight: '500',
  },
  progressText: {
    fontFamily: 'DM-Sans-Regular',
    fontSize: 16,
    fontWeight: '400',
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: DesignTokens.spacing.xl,
  },
  tabContent: {
    paddingTop: 0,
  },
  infoSection: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: DesignTokens.spacing['2xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 16,
  },
  documentsColumn: {
    gap: 16,
  },
});