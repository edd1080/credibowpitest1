// Hook personalizado para gestión de datos de detalles de solicitud - extraído de lógica de negocio
import { useState, useMemo } from 'react';
import { ApplicationData, TabType } from '../types';

export const useApplicationDetailsData = (applicationId: string) => {
  const [activeTab, setActiveTab] = useState<TabType>('resumen');

  // Mock application data - en real app vendría de API
  const applicationData: ApplicationData = useMemo(() => ({
    id: applicationId,
    applicationId: 'SCO_459034',
    clientName: 'María Elena Rodríguez García',
    amount: 25000,
    status: 'En revisión',
    date: '2025-01-15',
    currentStep: 'En revisión',
    progressPercentage: 67,
    personalInfo: {
      fullName: 'María Elena Rodríguez García',
      dpi: '1234567890101',
      nit: '12345678',
      phone: '+502 1234-5678',
      email: 'maria.rodriguez@email.com',
      agency: 'Agencia Central',
    },
    financialInfo: {
      requestedAmount: 25000,
      termMonths: 12,
      creditType: 'Crédito Personal',
      purpose: 'Capital de trabajo',
      mainIncome: 8000,
      monthlyExpenses: 3500,
      netWorth: 45000,
      workSituation: 'Empleado',
    },
    businessInfo: {
      businessType: 'Comercio',
      businessAddress: 'Zona 1, Guatemala',
      yearsInBusiness: 3,
    },
    guarantors: [],
    documents: [
      { 
        id: '1', 
        type: 'DPI Frontal', 
        description: 'Documento Personal de Identificación - frente',
        status: 'uploaded',
        required: true
      },
      { 
        id: '2', 
        type: 'DPI Trasero', 
        description: 'Documento Personal de Identificación - reverso',
        status: 'pending',
        required: true
      },
      { 
        id: '3', 
        type: 'Fotografía del Solicitante', 
        description: 'Selfie frontal del solicitante',
        status: 'uploaded',
        required: true
      },
      { 
        id: '4', 
        type: 'Recibos de Servicios', 
        description: 'Luz, agua o teléfono (máximo 3 meses)',
        status: 'pending',
        required: true
      },
      { 
        id: '5', 
        type: 'Fotografía con Solicitante', 
        description: 'Foto del asesor con el solicitante',
        status: 'uploaded',
        required: true
      },
      { 
        id: '6', 
        type: 'Fotografía del Negocio/Vivienda', 
        description: 'Foto del lugar de trabajo o residencia',
        status: 'pending',
        required: true
      },
    ],
  }), [applicationId]);

  const tabs = useMemo(() => [
    { key: 'resumen' as TabType, label: 'Resumen' },
    { key: 'detalles' as TabType, label: 'Detalles' },
    { key: 'fiadores' as TabType, label: 'Fiadores' },
    { key: 'documentos' as TabType, label: 'Documentos' },
  ], []);

  return {
    applicationData,
    activeTab,
    setActiveTab,
    tabs
  };
};