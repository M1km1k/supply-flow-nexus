
import React, { useState, useEffect } from 'react';
import { useSupply } from '@/contexts/SupplyContext';
import { NotificationHeader } from './NotificationHeader';
import { NotificationItem } from './NotificationItem';
import { generateNotifications } from './utils/notificationGenerator';
import { Notification } from './types';

interface ModernNotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModernNotificationSidebar: React.FC<ModernNotificationSidebarProps> = ({
  isOpen,
  onClose
}) => {
  const { inventory, suppliers, auditLogs } = useSupply();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (isOpen) {
      const newNotifications = generateNotifications(inventory, suppliers, auditLogs);
      setNotifications(newNotifications);
    }
  }, [isOpen, inventory, suppliers, auditLogs]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleDismiss = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleClearAll = () => {
    setNotifications(prev => prev.filter(notification => !notification.dismissible));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const dismissibleCount = notifications.filter(n => n.dismissible).length;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-96 bg-white dark:bg-gray-900 shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        border-l border-gray-200 dark:border-gray-700
        flex flex-col
      `}>
        <NotificationHeader
          unreadCount={unreadCount}
          dismissibleCount={dismissibleCount}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClearAll={handleClearAll}
          onClose={onClose}
        />
        
        <div className="flex-1 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onDismiss={handleDismiss}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
              No notifications
            </div>
          )}
        </div>
      </div>
    </>
  );
};
