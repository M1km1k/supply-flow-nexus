
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface NotificationHeaderProps {
  unreadCount: number;
  dismissibleCount: number;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onClose: () => void;
}

export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  unreadCount,
  dismissibleCount,
  onMarkAllAsRead,
  onClearAll,
  onClose
}) => {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800">
      <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
      <div className="flex items-center space-x-2">
        {dismissibleCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearAll}
            className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Clear all
          </Button>
        )}
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onMarkAllAsRead}
            className="text-xs"
          >
            Mark all read
          </Button>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
