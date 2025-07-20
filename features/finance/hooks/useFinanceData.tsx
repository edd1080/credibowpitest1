// Hook personalizado para gestión de datos financieros - extraído de lógica de negocio
import { useMemo } from 'react';
import { FinanceMetric, FinanceData } from '../types';

export const useFinanceData = () => {
  // Mock data - en una app real vendría de API/local storage
  const financeData: FinanceData = useMemo(() => ({
    userName: 'Alex',
    welcomeSubtitle: 'Aquí tienes un resumen de tus finanzas',
    metrics: [
      {
        id: '1',
        title: 'Balance Total',
        dateRange: 'Enero 2024',
        value: 15420.50,
        percentageChange: 12.5,
        isPositiveTrend: true,
      },
      {
        id: '2',
        title: 'Ingresos',
        dateRange: 'Este mes',
        value: 8750.00,
        percentageChange: 8.2,
        isPositiveTrend: true,
      },
      {
        id: '3',
        title: 'Gastos',
        dateRange: 'Este mes',
        value: 3240.75,
        percentageChange: -5.1,
        isPositiveTrend: false,
      },
      {
        id: '4',
        title: 'Ahorros',
        dateRange: 'Acumulado',
        value: 12180.25,
        percentageChange: 15.8,
        isPositiveTrend: true,
      },
    ],
  }), []);

  // Función para formatear valores de moneda
  const formatCurrency = (value: number) => {
    return `Q${value.toLocaleString('es-GT', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  // Función para formatear porcentaje
  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  return {
    financeData,
    formatCurrency,
    formatPercentage,
  };
};