
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface SystemPreferencesSectionProps {
  preferences: {
    defaultView: string;
    itemsPerPage: string;
    autoRefresh: boolean;
    predictiveAnalytics: boolean;
    lowStockAlerts: boolean;
    reorderPrompts: boolean;
    dataExport: string;
  };
  onPreferenceChange: (key: string, value: string | boolean) => void;
}

export const SystemPreferencesSection: React.FC<SystemPreferencesSectionProps> = ({
  preferences,
  onPreferenceChange
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">System Preferences</h3>
      
      {/* Core System Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="defaultView">Default Landing Page</Label>
          <Select value={preferences.defaultView} onValueChange={(value) => onPreferenceChange('defaultView', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dashboard">Dashboard</SelectItem>
              <SelectItem value="inventory">Inventory Tracking</SelectItem>
              <SelectItem value="transactions">Transaction Automation</SelectItem>
              <SelectItem value="suppliers">Supplier Management</SelectItem>
              <SelectItem value="analytics">Predictive Analytics</SelectItem>
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

      {/* Automated Workflow Features */}
      <div className="space-y-4 border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Automated Workflow Settings</h4>
        
        <div className="flex items-center justify-between">
          <div>
            <Label>Low-Inventory Stock Alerts</Label>
            <p className="text-xs text-gray-500">Prompt timely reordering for low inventory items</p>
          </div>
          <Switch
            checked={preferences.lowStockAlerts}
            onCheckedChange={(checked) => onPreferenceChange('lowStockAlerts', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Automated Reorder Prompts</Label>
            <p className="text-xs text-gray-500">Generate automated workflow triggers for reordering</p>
          </div>
          <Switch
            checked={preferences.reorderPrompts}
            onCheckedChange={(checked) => onPreferenceChange('reorderPrompts', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Predictive Analytics Module</Label>
            <p className="text-xs text-gray-500">Enable decision-making tree algorithm for inventory forecasting</p>
          </div>
          <Switch
            checked={preferences.predictiveAnalytics}
            onCheckedChange={(checked) => onPreferenceChange('predictiveAnalytics', checked)}
          />
        </div>
      </div>

      {/* Data Management */}
      <div className="space-y-4 border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Data Management</h4>
        
        <div>
          <Label htmlFor="dataExport">Exportable Report Format</Label>
          <Select value={preferences.dataExport} onValueChange={(value) => onPreferenceChange('dataExport', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF Reports</SelectItem>
              <SelectItem value="excel">Excel Spreadsheets</SelectItem>
              <SelectItem value="csv">CSV Files</SelectItem>
              <SelectItem value="json">JSON Data</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Auto-refresh Data</Label>
            <p className="text-xs text-gray-500">Real-time inventory tracking updates</p>
          </div>
          <Switch
            checked={preferences.autoRefresh}
            onCheckedChange={(checked) => onPreferenceChange('autoRefresh', checked)}
          />
        </div>
      </div>

      {/* System Security */}
      <div className="space-y-2 border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Security & Access Control</h4>
        <p className="text-xs text-gray-500">
          Role-based access control (RBAC) is enabled to restrict system functions based on user roles.
          Contact your administrator to modify access permissions.
        </p>
      </div>
    </div>
  );
};
