// Auth feature types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  agentCode: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isDemoMode: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  enterDemoMode: () => void;
  exitDemoMode: () => void;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ForgotPasswordFormData {
  email: string;
}