// Hook personalizado para gestión de datos del dashboard - extraído de lógica de negocio
import { useMemo } from 'react';
import { useAuth } from '@/features/auth/AuthContext';

export interface DashboardMetrics {
  solicitudesActivas: number;
  aprobadas: number;
  enRevision: number;
  rechazadas: number;
  syncPending: number;
}

export interface RecentApplication {
  id: string;
  clientName: string;
  amount: number;
  status: 'pending' | 'approved' | 'in_review' | 'rejected';
  date: string;
}

export interface MetricCardData {
  key: string;
  label: string;
  value: number;
  icon: React.ReactNode;
  iconBackgroundColor: string;
  iconColor: string;
}

export const useDashboardData = () => {
  const { user: authUser, isDemoMode } = useAuth();
  
  // Extender datos del usuario con información adicional
  const user = {
    ...authUser,
    role: 'Asesor de Créditos',
    agency: 'Agencia Central'
  };

  // Mock data - en real app vendría de API/local storage
  const metrics: DashboardMetrics = useMemo(() => ({
    solicitudesActivas: 3,
    aprobadas: 0,
    enRevision: 0,
    rechazadas: 0,
    syncPending: isDemoMode ? 0 : 2,
  }), [isDemoMode]);

  const recentApplications: RecentApplication[] = useMemo(() => [
    { id: '1', clientName: 'Juan Pérez', amount: 15000, status: 'pending', date: '2024-01-15' },
    { id: '2', clientName: 'María López', amount: 8000, status: 'approved', date: '2024-01-14' },
    { id: '3', clientName: 'Carlos Ruiz', amount: 12000, status: 'in_review', date: '2024-01-14' },
  ], []);

  // Funciones utilitarias para UI
  const getStatusColor = (status: string, colors: any) => {
    switch (status) {
      case 'approved': return colors.success;
      case 'pending': return colors.warning;
      case 'in_review': return colors.info;
      default: return colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Aprobado';
      case 'pending': return 'Pendiente';
      case 'in_review': return 'En revisión';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-GT', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return {
    user,
    isDemoMode,
    metrics,
    recentApplications,
    getStatusColor,
    getStatusText,
    formatDate
  };
};