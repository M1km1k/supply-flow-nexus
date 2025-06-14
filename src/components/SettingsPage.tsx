
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useTheme } from '@/components/ThemeProvider';
import { useSupply } from '@/contexts/SupplyContext';
import { useToast } from '@/hooks/use-toast';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { lowStockThreshold, setLowStockThreshold } = useSupply();
  const { toast } = useToast();
  
  const [userInfo, setUserInfo] = useState({
    fullName: 'John Doe',
    role: 'Supply Manager',
    department: 'Operations'
  });
  
  const [systemPreferences, setSystemPreferences] = useState({
    defaultUnit: 'pieces',
    dateFormat: 'MM/DD/YYYY'
  });
  
  const [fontSize, setFontSize] = useState([16]);

  const handleSaveUserInfo = () => {
    toast({ title: "Success", description: "User information updated successfully!" });
  };

  const handleSaveSystemPreferences = () => {
    toast({ title: "Success", description: "System preferences updated successfully!" });
  };

  const handleThresholdChange = (value: number[]) => {
    setLowStockThreshold(value[0]);
  };

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value);
    document.documentElement.style.fontSize = `${value[0]}px`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Information */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={userInfo.fullName}
                onChange={(e) => setUserInfo(prev => ({ ...prev, fullName: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={userInfo.role}
                onChange={(e) => setUserInfo(prev => ({ ...prev, role: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={userInfo.department}
                onChange={(e) => setUserInfo(prev => ({ ...prev, department: e.target.value }))}
              />
            </div>

            <Button onClick={handleSaveUserInfo} className="w-full">
              Save User Information
            </Button>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
              Appearance Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Theme</Label>
                <p className="text-sm text-gray-500">Choose your preferred theme</p>
              </div>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Font Size: {fontSize[0]}px</Label>
              <Slider
                value={fontSize}
                onValueChange={handleFontSizeChange}
                max={24}
                min={12}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-gray-500">Adjust the font size for better readability</p>
            </div>
          </CardContent>
        </Card>

        {/* System Preferences */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
              System Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="defaultUnit">Default Unit</Label>
              <Select 
                value={systemPreferences.defaultUnit} 
                onValueChange={(value) => setSystemPreferences(prev => ({ ...prev, defaultUnit: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pieces">Pieces</SelectItem>
                  <SelectItem value="bottles">Bottles</SelectItem>
                  <SelectItem value="sheets">Sheets</SelectItem>
                  <SelectItem value="boxes">Boxes</SelectItem>
                  <SelectItem value="kg">Kilograms</SelectItem>
                  <SelectItem value="liters">Liters</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Low Stock Threshold: {lowStockThreshold}</Label>
              <Slider
                value={[lowStockThreshold]}
                onValueChange={handleThresholdChange}
                max={100}
                min={1}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-gray-500">Items below this quantity will be marked as low stock</p>
            </div>
            
            <div>
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select 
                value={systemPreferences.dateFormat} 
                onValueChange={(value) => setSystemPreferences(prev => ({ ...prev, dateFormat: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSaveSystemPreferences} className="w-full">
              Save System Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Help & Information */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
              Help & Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">System Version</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">SMS v2.1.0</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">Last Updated</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{new Date().toLocaleDateString()}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">Support</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  For technical support, contact: support@sms.com
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Export System Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
