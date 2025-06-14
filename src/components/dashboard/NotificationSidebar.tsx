
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Bell } from 'lucide-react';
import { NotificationPanel } from '@/components/NotificationPanel';

interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationSidebar: React.FC<NotificationSidebarProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar - slides in from the right */}
      <div className={`
        fixed top-0 right-0 h-full w-96 bg-white dark:bg-gray-900 shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        border-l border-gray-200 dark:border-gray-700
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notifications
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-gray-100 dark:hover:bg-gray-700 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 h-full">
          <NotificationPanel />
        </div>
      </div>
    </>
  );
};
