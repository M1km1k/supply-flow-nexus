
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';
import { useSupply } from '@/contexts/SupplyContext';
import { useToast } from '@/hooks/use-toast';
import { Notification } from './notifications/types';
import { generateNotifications } from './notifications/utils/notificationGenerator';
import { NotificationHeader } from './notifications/NotificationHeader';
import { NotificationItem } from './notifications/NotificationItem';

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { inventory, suppliers, auditLogs } = useSupply();
  const { toast } = useToast();

  // Generate notifications based on system status
  useEffect(() => {
    const newNotifications = generateNotifications(inventory, suppliers, auditLogs);
    setNotifications(newNotifications);
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
          <div 
            className="fixed inset-0 z-[99999] bg-black/20" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl z-[100000] max-h-96 overflow-hidden">
            <NotificationHeader
              unreadCount={unreadCount}
              dismissibleCount={notifications.filter(n => n.dismissible).length}
              onMarkAllAsRead={markAllAsRead}
              onClearAll={clearAllNotifications}
              onClose={() => setIsOpen(false)}
            />

            <div className="max-h-64 overflow-y-auto bg-white dark:bg-gray-800">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDismiss={dismissNotification}
                  />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
