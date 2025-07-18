// Dashboard feature types
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