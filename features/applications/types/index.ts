// Applications feature types
export type ApplicationStatus = 'all' | 'pending' | 'sent' | 'approved' | 'rejected' | 'sync_error';

export interface ApplicationStep {
  id: string;
  name: string;
  completed: boolean;
}

export interface Application {
  id: string;
  applicationId: string;
  clientName: string;
  amount: number;
  status: ApplicationStatus;
  date: string;
  syncStatus: 'synced' | 'pending' | 'error';
  location: string;
  currentStep: string;
  steps: ApplicationStep[];
  progressPercentage: number;
}

export interface ApplicationData {
  id: string;
  applicationId: string;
  clientName: string;
  amount: number;
  status: string;
  date: string;
  currentStep: string;
  progressPercentage: number;
  personalInfo: {
    fullName: string;
    dpi: string;
    nit: string;
    phone: string;
    email: string;
    agency: string;
  };
  financialInfo: {
    requestedAmount: number;
    termMonths: number;
    creditType: string;
    purpose: string;
    mainIncome: number;
    monthlyExpenses: number;
    netWorth: number;
    workSituation: string;
  };
  businessInfo: {
    businessType: string;
    businessAddress: string;
    yearsInBusiness: number;
  };
  guarantors: Array<{
    id: string;
    name: string;
    relationship: string;
    phone: string;
  }>;
  documents: Array<{
    id: string;
    type: string;
    description: string;
    status: 'pending' | 'uploaded' | 'verified';
    required: boolean;
  }>;
}

export interface TabOption {
  key: ApplicationStatus;
  label: string;
  count: number;
}

export type TabType = 'resumen' | 'detalles' | 'fiadores' | 'documentos';

export interface InfoRow {
  label: string;
  value: string;
  isRequired?: boolean;
  isPlaceholder?: boolean;
  action?: 'Editar' | 'Agregar' | 'Completar';
}