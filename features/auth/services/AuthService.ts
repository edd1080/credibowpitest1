// Auth service - lógica de negocio de autenticación separada del contexto
import * as SecureStore from 'expo-secure-store';
import { User } from '../types';

export class AuthService {
  static async signIn(email: string, password: string): Promise<{ success: boolean; user?: User }> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      const userData: User = {
        id: '1',
        name: 'María González',
        email: email,
        agentCode: 'AG001',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      };
      
      await SecureStore.setItemAsync('user', JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (error) {
      console.log('Sign in error:', error);
      return { success: false };
    }
  }

  static async signOut(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync('user');
    } catch (error) {
      console.log('Sign out error:', error);
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    try {
      const savedUser = await SecureStore.getItemAsync('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.log('Error getting current user:', error);
      return null;
    }
  }

  static createDemoUser(): User {
    return {
      id: 'demo',
      name: 'Usuario Demo',
      email: 'demo@appcredit.com',
      agentCode: 'DEMO',
    };
  }
}