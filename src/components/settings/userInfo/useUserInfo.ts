
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface UserInfoData {
  fullName: string;
  email: string;
  role: string;
  department: string;
  phoneNumber: string;
  location: string;
  workShift: string;
  notifications: {
    emailAlerts: boolean;
    lowStockAlerts: boolean;
    expiryAlerts: boolean;
    systemUpdates: boolean;
  };
  preferences: {
    defaultView: string;
    itemsPerPage: string;
    autoRefresh: boolean;
    predictiveAnalytics: boolean;
    lowStockAlerts: boolean;
    reorderPrompts: boolean;
    dataExport: string;
  };
}

export const useUserInfo = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [userInfo, setUserInfo] = useState<UserInfoData>({
    fullName: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    role: user?.role || 'staff',
    department: user?.department || 'Operations',
    phoneNumber: '+1 (555) 123-4567',
    location: 'Building A, Room 101',
    workShift: 'day',
    notifications: {
      emailAlerts: true,
      lowStockAlerts: true,
      expiryAlerts: true,
      systemUpdates: false
    },
    preferences: {
      defaultView: 'dashboard',
      itemsPerPage: '25',
      autoRefresh: true,
      predictiveAnalytics: true,
      lowStockAlerts: true,
      reorderPrompts: true,
      dataExport: 'pdf'
    }
  });

  // Load saved user info on component mount
  useEffect(() => {
    const savedUserInfo = localStorage.getItem('user-info');
    if (savedUserInfo) {
      try {
        const parsed = JSON.parse(savedUserInfo);
        setUserInfo(prev => ({
          ...prev,
          ...parsed,
          // Ensure user info from auth context takes precedence for core fields
          fullName: user?.name || parsed.fullName || prev.fullName,
          email: user?.email || parsed.email || prev.email,
          role: user?.role || parsed.role || prev.role,
          department: user?.department || parsed.department || prev.department,
          // Ensure all preference properties exist with defaults
          preferences: {
            defaultView: 'dashboard',
            itemsPerPage: '25',
            autoRefresh: true,
            predictiveAnalytics: true,
            lowStockAlerts: true,
            reorderPrompts: true,
            dataExport: 'pdf',
            ...parsed.preferences
          }
        }));
      } catch (error) {
        console.error('Error loading user info:', error);
      }
    } else if (user) {
      // Set initial values from auth context
      setUserInfo(prev => ({
        ...prev,
        fullName: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      }));
    }
  }, [user]);

  // Auto-save user info when it changes (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('user-info', JSON.stringify(userInfo));
      
      // Dispatch events for system-wide updates
      window.dispatchEvent(new CustomEvent('userInfoChange', { 
        detail: userInfo 
      }));
      
      // Update notification preferences globally
      window.dispatchEvent(new CustomEvent('notificationPreferencesChange', { 
        detail: userInfo.notifications 
      }));
      
      // Update system preferences globally
      window.dispatchEvent(new CustomEvent('systemPreferencesChange', { 
        detail: userInfo.preferences 
      }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [userInfo]);

  const updateUserInfo = (updates: Partial<UserInfoData>) => {
    setUserInfo(prev => ({ ...prev, ...updates }));
  };

  const updateNotification = (key: string, value: boolean) => {
    setUserInfo(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  const updatePreference = (key: string, value: string | boolean) => {
    setUserInfo(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value }
    }));
  };

  const saveUserInfo = () => {
    // Force save immediately
    localStorage.setItem('user-info', JSON.stringify(userInfo));
    
    // Dispatch all relevant events
    window.dispatchEvent(new CustomEvent('userInfoChange', { 
      detail: userInfo 
    }));
    window.dispatchEvent(new CustomEvent('notificationPreferencesChange', { 
      detail: userInfo.notifications 
    }));
    window.dispatchEvent(new CustomEvent('systemPreferencesChange', { 
      detail: userInfo.preferences 
    }));
    
    toast({ 
      title: "Success", 
      description: "User information and preferences saved successfully!" 
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'manager': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'staff': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return {
    userInfo,
    updateUserInfo,
    updateNotification,
    updatePreference,
    saveUserInfo,
    getRoleBadgeColor
  };
};
