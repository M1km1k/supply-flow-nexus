
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

// Mock user data - in real implementation, this would come from backend
const mockUsers: User[] = [
  {
    id: '1',
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
  {
    id: '2',
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
  {
    id: '3',
    name: 'Mike Staff',
    email: 'staff@institution.edu',
    role: 'staff',
    department: 'Operations',
    permissions: [
      { resource: 'inventory', actions: ['read'] },
      { resource: 'transactions', actions: ['create'] }
    ]
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('inventomatic_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real implementation, this would validate against backend
    const foundUser = mockUsers.find(u => u.email === email);
    
    // Simple password check (in real app, this would be properly hashed)
    const validPasswords: { [key: string]: string } = {
      'admin@institution.edu': 'admin123',
      'manager@institution.edu': 'manager123',
      'staff@institution.edu': 'staff123'
    };
    
    if (foundUser && validPasswords[email] === password) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('inventomatic_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('inventomatic_user');
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
