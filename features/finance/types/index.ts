// Finance feature types
export interface FinanceMetric {
  id: string;
  title: string;
  dateRange: string;
  value: number;
  percentageChange: number;
  isPositiveTrend: boolean;
}

export interface FinanceData {
  metrics: FinanceMetric[];
  userName: string;
  welcomeSubtitle: string;
}