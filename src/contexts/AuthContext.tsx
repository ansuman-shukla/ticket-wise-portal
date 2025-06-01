
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'USER' | 'IT_AGENT' | 'HR_AGENT' | 'ADMIN';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  department?: 'IT' | 'HR';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app start
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response based on username for demo
      let mockUser: User;
      if (credentials.username === 'admin') {
        mockUser = {
          id: '1',
          username: 'admin',
          email: 'admin@company.com',
          role: 'ADMIN'
        };
      } else if (credentials.username === 'itagent') {
        mockUser = {
          id: '2',
          username: 'itagent',
          email: 'it@company.com',
          role: 'IT_AGENT',
          department: 'IT'
        };
      } else if (credentials.username === 'hragent') {
        mockUser = {
          id: '3',
          username: 'hragent',
          email: 'hr@company.com',
          role: 'HR_AGENT',
          department: 'HR'
        };
      } else {
        mockUser = {
          id: '4',
          username: credentials.username,
          email: `${credentials.username}@company.com`,
          role: 'USER'
        };
      }

      const mockToken = 'mock-jwt-token-' + mockUser.id;
      
      setUser(mockUser);
      setToken(mockToken);
      
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
