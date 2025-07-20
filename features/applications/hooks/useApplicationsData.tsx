// Hook personalizado para gestión de datos de solicitudes - extraído de lógica de negocio
import { useMemo } from 'react';
import { Clock, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle, RefreshCw } from 'lucide-react-native';
import { ApplicationStatus, Application, TabOption } from '../types';

export const useApplicationsData = (searchQuery: string, selectedTab: ApplicationStatus) => {
  // Mock data - en una app real vendría de API/local storage
  const applications: Application[] = useMemo(() => [
    { 
      id: '1', 
      applicationId: 'SCP_971390',
      clientName: 'Greta Alejandra Álvarez Salguero', 
      amount: 15000, 
      status: 'pending', 
      date: '2025-06-20', 
      syncStatus: 'synced', 
      location: 'Antigua Guatemala',
      currentStep: 'Información Personal',
      progressPercentage: 67,
      steps: [
        { id: '1', name: 'Información Personal', completed: true },
        { id: '2', name: 'Documentos', completed: true },
        { id: '3', name: 'Referencias', completed: true },
        { id: '4', name: 'Firma', completed: false },
        { id: '5', name: 'Envío', completed: false }
      ]
    },
    { 
      id: '2', 
      applicationId: 'SCP_971389',
      clientName: 'María Esperanza López García', 
      amount: 8000, 
      status: 'approved', 
      date: '2025-06-19', 
      syncStatus: 'synced', 
      location: 'Chimaltenango',
      currentStep: 'Completado',
      progressPercentage: 100,
      steps: [
        { id: '1', name: 'Información Personal', completed: true },
        { id: '2', name: 'Documentos', completed: true },
        { id: '3', name: 'Referencias', completed: true },
        { id: '4', name: 'Firma', completed: true },
        { id: '5', name: 'Envío', completed: true }
      ]
    },
    { 
      id: '3', 
      applicationId: 'SCP_971388',
      clientName: 'Carlos Eduardo Ruiz Hernández', 
      amount: 12000, 
      status: 'sent', 
      date: '2025-06-18', 
      syncStatus: 'pending', 
      location: 'San Lucas Sacatepéquez',
      currentStep: 'Revisión de Documentos',
      progressPercentage: 85,
      steps: [
        { id: '1', name: 'Información Personal', completed: true },
        { id: '2', name: 'Documentos', completed: true },
        { id: '3', name: 'Referencias', completed: true },
        { id: '4', name: 'Firma', completed: true },
        { id: '5', name: 'Envío', completed: false }
      ]
    },
    { 
      id: '4', 
      applicationId: 'SCP_971387',
      clientName: 'Ana Cristina Rodríguez Silva', 
      amount: 20000, 
      status: 'rejected', 
      date: '2025-06-17', 
      syncStatus: 'synced', 
      location: 'Mixco',
      currentStep: 'Rechazado',
      progressPercentage: 100,
      steps: [
        { id: '1', name: 'Información Personal', completed: true },
        { id: '2', name: 'Documentos', completed: true },
        { id: '3', name: 'Referencias', completed: true },
        { id: '4', name: 'Firma', completed: true },
        { id: '5', name: 'Envío', completed: true }
      ]
    },
    { 
      id: '5', 
      applicationId: 'SCP_971386',
      clientName: 'Pedro Antonio González Mejía', 
      amount: 5000, 
      status: 'pending', 
      date: '2025-06-16', 
      syncStatus: 'error', 
      location: 'Villa Nueva',
      currentStep: 'Carga de Documentos',
      progressPercentage: 40,
      steps: [
        { id: '1', name: 'Información Personal', completed: true },
        { id: '2', name: 'Documentos', completed: true },
        { id: '3', name: 'Referencias', completed: false },
        { id: '4', name: 'Firma', completed: false },
        { id: '5', name: 'Envío', completed: false }
      ]
    },
    { 
      id: '6', 
      applicationId: 'SCP_971385',
      clientName: 'Lucía Fernanda Martínez Cruz', 
      amount: 18000, 
      status: 'approved', 
      date: '2025-06-15', 
      syncStatus: 'synced', 
      location: 'Escuintla',
      currentStep: 'Completado',
      progressPercentage: 100,
      steps: [
        { id: '1', name: 'Información Personal', completed: true },
        { id: '2', name: 'Documentos', completed: true },
        { id: '3', name: 'Referencias', completed: true },
        { id: '4', name: 'Firma', completed: true },
        { id: '5', name: 'Envío', completed: true }
      ]
    },
  ], []);

  // Configuración de tabs con conteos dinámicos
  const tabs: TabOption[] = useMemo(() => [
    { key: 'all', label: 'Todas', count: applications.length },
    { key: 'pending', label: 'Pendientes', count: applications.filter(a => a.status === 'pending').length },
    { key: 'sent', label: 'Enviadas', count: applications.filter(a => a.status === 'sent').length },
    { key: 'approved', label: 'Aprobadas', count: applications.filter(a => a.status === 'approved').length },
    { key: 'rejected', label: 'Rechazadas', count: applications.filter(a => a.status === 'rejected').length },
    { key: 'sync_error', label: 'Error Sync', count: applications.filter(a => a.syncStatus === 'error').length },
  ], [applications]);

  // Filtrado de aplicaciones basado en tab seleccionado y búsqueda
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesFilter = selectedTab === 'all' || 
        (selectedTab === 'sync_error' ? app.syncStatus === 'error' : app.status === selectedTab);
      const matchesSearch = app.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.applicationId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [applications, selectedTab, searchQuery]);

  // Funciones utilitarias para UI
  const getStatusIcon = (status: ApplicationStatus, syncStatus: string, colors: any) => {
    if (syncStatus === 'error') return <XCircle size={16} color={colors.error} />;
    if (syncStatus === 'pending') return <RefreshCw size={16} color={colors.warning} />;
    
    switch (status) {
      case 'approved': return <CheckCircle size={16} color={colors.success} />;
      case 'rejected': return <XCircle size={16} color={colors.error} />;
      case 'sent': return <AlertCircle size={16} color={colors.info} />;
      case 'pending': return <Clock size={16} color={colors.warning} />;
      default: return <Clock size={16} color={colors.textSecondary} />;
    }
  };

  const getStatusText = (status: ApplicationStatus, syncStatus: string) => {
    if (syncStatus === 'error') return 'Error Sync';
    if (syncStatus === 'pending') return 'Pendiente Sync';
    
    switch (status) {
      case 'approved': return 'Aprobado';
      case 'rejected': return 'Rechazado';
      case 'sent': return 'En Revisión';
      case 'pending': return 'Activo';
      default: return status;
    }
  };

  const getStatusColor = (status: ApplicationStatus, syncStatus: string, colors: any) => {
    if (syncStatus === 'error') return colors.error;
    if (syncStatus === 'pending') return colors.warning;
    
    switch (status) {
      case 'approved': return colors.success;
      case 'rejected': return colors.error;
      case 'sent': return colors.info;
      case 'pending': return '#1976D2';
      default: return colors.textSecondary;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-GT', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  return {
    applications,
    tabs,
    filteredApplications,
    getStatusIcon,
    getStatusText,
    getStatusColor,
    formatDate
  };
};