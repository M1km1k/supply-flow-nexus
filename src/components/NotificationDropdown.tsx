
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, X, Package, Users, ArrowUpDown, FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useSupply } from '@/contexts/SupplyContext';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  page: string;
  read: boolean;
  dismissible?: boolean;
}

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { inventory, suppliers, auditLogs } = useSupply();
  const location = useLocation();
  const { toast } = useToast();

  // Generate notifications based on system status
  useEffect(() => {
    const generateNotifications = () => {
      const newNotifications: Notification[] = [];

      // Inventory notifications
      const lowStockItems = inventory.filter(item => item.quantity < 50);
      const outOfStockItems = inventory.filter(item => item.quantity === 0);

      if (lowStockItems.length > 0) {
        newNotifications.push({
          id: 'low-stock',
          type: 'warning',
          title: 'Low Stock Alert',
          message: `${lowStockItems.length} items are running low`,
          timestamp: new Date(),
          page: 'inventory',
          read: false,
          dismissible: true
        });
      }

      if (outOfStockItems.length > 0) {
        newNotifications.push({
          id: 'out-of-stock',
          type: 'error',
          title: 'Out of Stock',
          message: `${outOfStockItems.length} items are out of stock`,
          timestamp: new Date(),
          page: 'inventory',
          read: false,
          dismissible: true
        });
      }

      // Supplier notifications - removed status check since it doesn't exist
      if (suppliers.length > 0) {
        newNotifications.push({
          id: 'suppliers-info',
          type: 'info',
          title: 'Supplier Status',
          message: `${suppliers.length} suppliers in system`,
          timestamp: new Date(),
          page: 'suppliers',
          read: false,
          dismissible: true
        });
      }

      // Recent audit activity
      const recentAudits = auditLogs.slice(0, 3);
      if (recentAudits.length > 0) {
        newNotifications.push({
          id: 'recent-activity',
          type: 'info',
          title: 'Recent Activity',
          message: `${recentAudits.length} recent transactions recorded`,
          timestamp: new Date(),
          page: 'audit',
          read: false,
          dismissible: true
        });
      }

      // System status
      newNotifications.push({
        id: 'system-status',
        type: 'success',
        title: 'System Status',
        message: 'All systems operational',
        timestamp: new Date(),
        page: 'dashboard',
        read: false,
        dismissible: false
      });

      setNotifications(newNotifications);
    };

    generateNotifications();
  }, [inventory, suppliers, auditLogs]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const dismissNotification = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const notification = notifications.find(n => n.id === id);
    
    setNotifications(prev => prev.filter(n => n.id !== id));
    
    if (notification) {
      toast({
        title: "Notification dismissed",
        description: `"${notification.title}" has been removed`,
      });
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "Your notifications have been updated",
    });
  };

  const clearAllNotifications = () => {
    const dismissibleCount = notifications.filter(n => n.dismissible).length;
    setNotifications(prev => prev.filter(n => !n.dismissible));
    
    toast({
      title: "Notifications cleared",
      description: `${dismissibleCount} notifications have been removed`,
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  const getPageIcon = (page: string) => {
    switch (page) {
      case 'inventory': return <Package className="w-3 h-3" />;
      case 'suppliers': return <Users className="w-3 h-3" />;
      case 'transactions': return <ArrowUpDown className="w-3 h-3" />;
      case 'audit': return <FileText className="w-3 h-3" />;
      default: return <Bell className="w-3 h-3" />;
    }
  };

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center space-x-1 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0 animate-pulse"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop overlay for better visibility */}
          <div 
            className="fixed inset-0 z-[9998] bg-black/10 dark:bg-black/20" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl z-[9999] max-h-96 overflow-hidden backdrop-blur-sm">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
              <div className="flex items-center space-x-2">
                {notifications.filter(n => n.dismissible).length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearAllNotifications}
                    className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Clear all
                  </Button>
                )}
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto bg-white dark:bg-gray-800">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer group ${
                      !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {notification.title}
                          </p>
                          <div className="flex items-center space-x-1">
                            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                              {getPageIcon(notification.page)}
                              <span className="capitalize">{notification.page}</span>
                            </div>
                            {notification.dismissible && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => dismissNotification(notification.id, e)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6 hover:bg-red-100 dark:hover:bg-red-900/20"
                              >
                                <X className="w-3 h-3 text-red-500" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3 mr-1" />
                          {notification.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
