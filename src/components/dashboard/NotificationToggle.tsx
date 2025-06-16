
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NotificationToggleProps {
  onClick: () => void;
  notificationCount?: number;
}

export const NotificationToggle: React.FC<NotificationToggleProps> = ({
  onClick,
  notificationCount = 0
}) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="relative hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20"
    >
      <Bell className="w-4 h-4" />
      <span className="hidden sm:inline ml-2">Notifications</span>
      {notificationCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {notificationCount > 99 ? '99+' : notificationCount}
        </Badge>
      )}
    </Button>
  );
};
