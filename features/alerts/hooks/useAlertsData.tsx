// Hook personalizado para gestión de datos de alertas - extraído de lógica de negocio
import { useState, useMemo } from 'react';
import { Alert } from '../types';

export const useAlertsData = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'success',
      title: 'Solicitud Aprobada',
      message: 'La solicitud de María López García por Q8,000 ha sido aprobada.',
      timestamp: '2024-01-15T10:30:00Z',
      read: false,
    },
    {
      id: '2',
      type: 'sync',
      title: 'Sincronización Completada',
      message: '3 solicitudes se han sincronizado exitosamente con el servidor.',
      timestamp: '2024-01-15T09:15:00Z',
      read: false,
    },
    {
      id: '3',
      type: 'warning',
      title: 'Documento Faltante',
      message: 'La solicitud de Juan Pérez requiere documentos adicionales.',
      timestamp: '2024-01-14T16:20:00Z',
      read: true,
    },
    {
      id: '4',
      type: 'info',
      title: 'Nueva Actualización',
      message: 'AppCredit v1.2 ya está disponible. Incluye mejoras en la captura de firma.',
      timestamp: '2024-01-14T08:00:00Z',
      read: true,
    },
    {
      id: '5',
      type: 'warning',
      title: 'Error de Sincronización',
      message: 'La solicitud de Pedro González no pudo sincronizarse. Revisa tu conexión.',
      timestamp: '2024-01-13T14:45:00Z',
      read: false,
    },
  ]);

  const unreadCount = useMemo(() => 
    alerts.filter(alert => !alert.read).length, 
    [alerts]
  );

  const markAsRead = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  };

  const markAllAsRead = () => {
    setAlerts(prev => 
      prev.map(alert => ({ ...alert, read: true }))
    );
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `Hace ${diffMinutes} min`;
    } else if (diffHours < 24) {
      return `Hace ${diffHours}h`;
    } else {
      return date.toLocaleDateString('es-GT', { 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  return {
    alerts,
    unreadCount,
    markAsRead,
    markAllAsRead,
    formatTimestamp
  };
};