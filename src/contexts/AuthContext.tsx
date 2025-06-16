
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'manager' | 'staff' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  permissions: Permission[];
}

export interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (resource: string, action: string) => boolean;
  isAdmin: () => boolean;
  isManager: () => boolean;
  isStaff: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user profiles - passwords should be handled securely via Supabase
const mockUserProfiles: { [email: string]: Omit<User, 'id'> } = {
  'admin@institution.edu': {
    name: 'John Administrator',
    email: 'admin@institution.edu',
    role: 'admin',
    department: 'IT Services',
    permissions: [
      { resource: 'inventory', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'suppliers', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'reports', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'settings', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'audit', actions: ['read'] },
      { resource: 'analytics', actions: ['read'] }
    ]
  },
  'manager@institution.edu': {
    name: 'Sarah Manager',
    email: 'manager@institution.edu',
    role: 'manager',
    department: 'Procurement',
    permissions: [
      { resource: 'inventory', actions: ['create', 'read', 'update'] },
      { resource: 'suppliers', actions: ['create', 'read', 'update'] },
      { resource: 'reports', actions: ['read', 'create'] },
      { resource: 'transactions', actions: ['create', 'read', 'update'] },
      { resource: 'audit', actions: ['read'] },
      { resource: 'analytics', actions: ['read'] }
    ]
  },
  'staff@institution.edu': {
    name: 'Mike Staff',
    email: 'staff@institution.edu',
    role: 'staff',
    department: 'Operations',
    permissions: [
      { resource: 'inventory', actions: ['read'] },
      { resource: 'transactions', actions: ['create'] }
    ]
  }
};

// Security utility functions
const sanitizeEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const SESSION_TIMEOUT = 8 * 60 * 60 * 1000; // 8 hours
const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState<NodeJS.Timeout | null>(null);

  // Security: Check for valid session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('inventomatic_user');
    const sessionTimestamp = localStorage.getItem('inventomatic_session_timestamp');
    
    if (storedUser && sessionTimestamp) {
      const sessionAge = Date.now() - parseInt(sessionTimestamp);
      
      if (sessionAge < SESSION_TIMEOUT) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          startSessionTimer();
        } catch (error) {
          console.error('Invalid session data, clearing session');
          logout();
        }
      } else {
        console.log('Session expired, clearing session');
        logout();
      }
    }
  }, []);

  const startSessionTimer = () => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }
    
    const timeout = setTimeout(() => {
      console.log('Session timeout reached, logging out');
      logout();
    }, SESSION_TIMEOUT);
    
    setSessionTimeout(timeout);
  };

  const getLoginAttempts = (email: string): number => {
    const attempts = localStorage.getItem(`login_attempts_${email}`);
    return attempts ? parseInt(attempts) : 0;
  };

  const incrementLoginAttempts = (email: string): void => {
    const attempts = getLoginAttempts(email) + 1;
    localStorage.setItem(`login_attempts_${email}`, attempts.toString());
    
    if (attempts >= MAX_LOGIN_ATTEMPTS) {
      localStorage.setItem(`lockout_${email}`, Date.now().toString());
    }
  };

  const isAccountLocked = (email: string): boolean => {
    const lockoutTime = localStorage.getItem(`lockout_${email}`);
    if (!lockoutTime) return false;
    
    const timeSinceLockout = Date.now() - parseInt(lockoutTime);
    if (timeSinceLockout > LOCKOUT_DURATION) {
      localStorage.removeItem(`lockout_${email}`);
      localStorage.removeItem(`login_attempts_${email}`);
      return false;
    }
    
    return true;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Input validation
    if (!email || !password) {
      console.error('Email and password are required');
      return false;
    }

    const sanitizedEmail = sanitizeEmail(email);
    
    if (!isValidEmail(sanitizedEmail)) {
      console.error('Invalid email format');
      return false;
    }

    // Check for account lockout
    if (isAccountLocked(sanitizedEmail)) {
      console.error('Account is temporarily locked due to too many failed attempts');
      return false;
    }

    // Find user profile
    const userProfile = mockUserProfiles[sanitizedEmail];
    
    // For demo purposes, accept specific demo passwords
    // In production, this should validate against Supabase authentication
    const demoPasswords: { [key: string]: boolean } = {
      'admin123': sanitizedEmail === 'admin@institution.edu',
      'manager123': sanitizedEmail === 'manager@institution.edu',
      'staff123': sanitizedEmail === 'staff@institution.edu'
    };
    
    if (userProfile && demoPasswords[password]) {
      const authenticatedUser: User = {
        ...userProfile,
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
      
      setUser(authenticatedUser);
      setIsAuthenticated(true);
      
      // Secure session storage
      localStorage.setItem('inventomatic_user', JSON.stringify(authenticatedUser));
      localStorage.setItem('inventomatic_session_timestamp', Date.now().toString());
      localStorage.removeItem(`login_attempts_${sanitizedEmail}`);
      localStorage.removeItem(`lockout_${sanitizedEmail}`);
      
      startSessionTimer();
      
      console.log('Login successful for:', sanitizedEmail);
      return true;
    }
    
    // Log failed attempt
    incrementLoginAttempts(sanitizedEmail);
    console.error('Invalid credentials for:', sanitizedEmail);
    return false;
  };

  const logout = () => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
      setSessionTimeout(null);
    }
    
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('inventomatic_user');
    localStorage.removeItem('inventomatic_session_timestamp');
    
    console.log('User logged out successfully');
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (!user) return false;
    const permission = user.permissions.find(p => p.resource === resource);
    return permission?.actions.includes(action as any) || false;
  };

  const isAdmin = (): boolean => user?.role === 'admin' || false;
  const isManager = (): boolean => user?.role === 'manager' || user?.role === 'admin' || false;
  const isStaff = (): boolean => user?.role === 'staff' || false;

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      hasPermission,
      isAdmin,
      isManager,
      isStaff
    }}>
      {children}
    </AuthContext.Provider>
  );
};
