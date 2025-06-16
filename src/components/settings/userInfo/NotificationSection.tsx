
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';

interface NotificationSectionProps {
  notifications: {
    emailAlerts: boolean;
    lowStockAlerts: boolean;
    expiryAlerts: boolean;
    systemUpdates: boolean;
  };
  onNotificationChange: (key: string, value: boolean) => void;
}

export const NotificationSection: React.FC<NotificationSectionProps> = ({
  notifications,
  onNotificationChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
        <Settings className="w-4 h-4 mr-2" />
        Notification Preferences
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <Label>Email Notifications</Label>
            <p className="text-xs text-gray-500">Receive email alerts for important updates</p>
          </div>
          <Switch
            checked={notifications.emailAlerts}
            onCheckedChange={(checked) => onNotificationChange('emailAlerts', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label>Low Stock Alerts</Label>
            <p className="text-xs text-gray-500">Get notified when items are running low</p>
          </div>
          <Switch
            checked={notifications.lowStockAlerts}
            onCheckedChange={(checked) => onNotificationChange('lowStockAlerts', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label>Expiry Alerts</Label>
            <p className="text-xs text-gray-500">Receive alerts for items nearing expiry</p>
          </div>
          <Switch
            checked={notifications.expiryAlerts}
            onCheckedChange={(checked) => onNotificationChange('expiryAlerts', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label>System Updates</Label>
            <p className="text-xs text-gray-500">Get notified about system maintenance</p>
          </div>
          <Switch
            checked={notifications.systemUpdates}
            onCheckedChange={(checked) => onNotificationChange('systemUpdates', checked)}
          />
        </div>
      </div>
    </div>
  );
};
