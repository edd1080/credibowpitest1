// Alerts feature types
export interface Alert {
  id: string;
  type: 'success' | 'warning' | 'info' | 'sync';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface AlertsData {
  alerts: Alert[];
  unreadCount: number;
}