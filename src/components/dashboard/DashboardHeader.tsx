
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Calendar, MessageSquare } from 'lucide-react';

interface DashboardHeaderProps {
  widgetVisibility: {
    notifications: boolean;
    chatbot: boolean;
    calendar: boolean;
  };
  toggleWidget: (widget: keyof DashboardHeaderProps['widgetVisibility']) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  widgetVisibility,
  toggleWidget
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white animate-slide-right">
          Supply Management Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Real-time insights and analytics for institutional inventory management
        </p>
      </div>
      <div className="flex space-x-2">
        <Button
          variant={widgetVisibility.notifications ? "default" : "outline"}
          size="sm"
          onClick={() => toggleWidget('notifications')}
          className="animate-bounce-in"
        >
          {widgetVisibility.notifications ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          Notifications
        </Button>
        <Button
          variant={widgetVisibility.chatbot ? "default" : "outline"}
          size="sm"
          onClick={() => toggleWidget('chatbot')}
          className="animate-bounce-in"
        >
          {widgetVisibility.chatbot ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          <MessageSquare className="w-4 h-4 mr-2" />
          Assistant
        </Button>
        <Button
          variant={widgetVisibility.calendar ? "default" : "outline"}
          size="sm"
          onClick={() => toggleWidget('calendar')}
          className="animate-bounce-in"
        >
          {widgetVisibility.calendar ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          <Calendar className="w-4 h-4 mr-2" />
          Calendar
        </Button>
      </div>
    </div>
  );
};
