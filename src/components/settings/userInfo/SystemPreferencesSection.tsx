
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface SystemPreferencesSectionProps {
  preferences: {
    defaultView: string;
    itemsPerPage: string;
    autoRefresh: boolean;
  };
  onPreferenceChange: (key: string, value: string | boolean) => void;
}

export const SystemPreferencesSection: React.FC<SystemPreferencesSectionProps> = ({
  preferences,
  onPreferenceChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">System Preferences</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="defaultView">Default Landing Page</Label>
          <Select value={preferences.defaultView} onValueChange={(value) => onPreferenceChange('defaultView', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dashboard">Dashboard</SelectItem>
              <SelectItem value="inventory">Inventory</SelectItem>
              <SelectItem value="transactions">Transactions</SelectItem>
              <SelectItem value="suppliers">Suppliers</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="itemsPerPage">Items Per Page</Label>
          <Select value={preferences.itemsPerPage} onValueChange={(value) => onPreferenceChange('itemsPerPage', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 items</SelectItem>
              <SelectItem value="25">25 items</SelectItem>
              <SelectItem value="50">50 items</SelectItem>
              <SelectItem value="100">100 items</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <Label>Auto-refresh Data</Label>
          <p className="text-xs text-gray-500">Automatically update data every 30 seconds</p>
        </div>
        <Switch
          checked={preferences.autoRefresh}
          onCheckedChange={(checked) => onPreferenceChange('autoRefresh', checked)}
        />
      </div>
    </div>
  );
};
