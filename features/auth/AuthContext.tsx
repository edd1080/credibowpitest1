// Authentication context refactorizado - usando AuthService para lógica de negocio
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from './services/AuthService';
import { User, AuthContextType } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const currentUser = await AuthService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      console.log('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    const result = await AuthService.signIn(email, password);
    if (result.success && result.user) {
      setUser(result.user);
      return true;
    }
    return false;
  };

  const signOut = async () => {
    await AuthService.signOut();
    setUser(null);
    setIsDemoMode(false);
  };

  const enterDemoMode = () => {
    setIsDemoMode(true);
    const demoUser = AuthService.createDemoUser();
    setUser(demoUser);
  };

  const exitDemoMode = () => {
    setIsDemoMode(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isDemoMode,
        signIn,
        signOut,
        enterDemoMode,
        exitDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}