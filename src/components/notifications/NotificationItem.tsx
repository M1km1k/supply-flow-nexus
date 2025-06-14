
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Clock } from 'lucide-react';
import { Notification } from './types';
import { getNotificationIcon, getPageIcon } from './utils/notificationIcons';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string, event: React.MouseEvent) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDismiss
}) => {
  return (
    <div 
      className={`p-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer group ${
        !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
      }`}
      onClick={() => onMarkAsRead(notification.id)}
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
                  onClick={(e) => onDismiss(notification.id, e)}
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
  );
};
