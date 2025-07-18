// Hook personalizado para gestión de datos de detalles de solicitud - extraído de lógica de negocio
import { useState, useMemo } from 'react';
import { ApplicationData, TabType } from '../types';

export const useApplicationDetailsData = (applicationId: string) => {
  const [activeTab, setActiveTab] = useState<TabType>('resumen');

  // Mock application data - en real app vendría de API
  const applicationData: ApplicationData = useMemo(() => ({
    id: applicationId,
    applicationId: 'SCO_503838',
    clientName: 'Kevin Edgar Flores Laparra',
    amount: 25000,
    status: 'Borrador',
    date: '2025-01-15',
    currentStep: 'Borrador',
    progressPercentage: 0,
    personalInfo: {
      fullName: 'Kevin Edgar Flores Laparra',
      dpi: 'Por ingresar',
      nit: 'Por ingresar',
      phone: 'Por ingresar',
      email: 'Por ingresar',
      agency: 'Por ingresar',
    },
    financialInfo: {
      requestedAmount: 25000,
      termMonths: 0,
      creditType: 'Por definir',
      purpose: 'Por definir',
      mainIncome: 0,
      monthlyExpenses: 0,
      netWorth: 0,
      workSituation: 'Por ingresar',
    },
    businessInfo: {
      businessType: 'Por ingresar',
      businessAddress: 'Por ingresar',
      yearsInBusiness: 0,
    },
    guarantors: [],
    documents: [
      { 
        id: '1', 
        type: 'DPI Frontal', 
        description: 'Documento Personal de Identificación - frente',
        status: 'pending',
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
        status: 'pending',
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
        status: 'pending',
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