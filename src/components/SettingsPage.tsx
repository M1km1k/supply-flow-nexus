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
import { Download, FileText, Mail, Play, BookOpen, Settings as SettingsIcon, FileDown } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { lowStockThreshold, setLowStockThreshold, inventory, suppliers, transactions } = useSupply();
  const { toast } = useToast();
  
  const [userInfo, setUserInfo] = useState({
    fullName: 'John Doe',
    role: 'Supply Manager',
    department: 'Operations'
  });
  
  const [systemPreferences, setSystemPreferences] = useState({
    defaultUnit: 'pieces',
    dateFormat: 'MM/DD/YYYY',
    animationStyle: 'smooth',
    fontFamily: 'inter'
  });

  const [reportFormat, setReportFormat] = useState<'txt' | 'csv'>('txt');
  
  const [fontSize, setFontSize] = useState([16]);
  const [showTutorial, setShowTutorial] = useState(false);

  const handleSaveUserInfo = () => {
    toast({ title: "Success", description: "User information updated successfully!" });
  };

  const handleSaveSystemPreferences = () => {
    // Apply font family to document
    document.documentElement.style.fontFamily = getFontFamily(systemPreferences.fontFamily);
    // Apply animation style
    document.documentElement.setAttribute('data-animation-style', systemPreferences.animationStyle);
    toast({ title: "Success", description: "System preferences updated successfully!" });
  };

  const handleThresholdChange = (value: number[]) => {
    setLowStockThreshold(value[0]);
  };

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value);
    document.documentElement.style.fontSize = `${value[0]}px`;
  };

  const getFontFamily = (font: string) => {
    const fonts = {
      'inter': 'Inter, system-ui, -apple-system, sans-serif',
      'roboto': 'Roboto, system-ui, -apple-system, sans-serif',
      'poppins': 'Poppins, system-ui, -apple-system, sans-serif',
      'montserrat': 'Montserrat, system-ui, -apple-system, sans-serif',
      'opensans': 'Open Sans, system-ui, -apple-system, sans-serif'
    };
    return fonts[font as keyof typeof fonts] || fonts.inter;
  };

  // Quick Actions Functions
  const handleExportData = () => {
    const data = {
      inventory,
      suppliers,
      transactions,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventomatic-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Success", description: "System data exported successfully!" });
  };

  const handleGenerateReport = () => {
    if (reportFormat === 'txt') {
      generateTextReport();
    } else {
      generateCsvReport();
    }
  };
  
  const generateTextReport = () => {
    const reportContent = `
InventOMatic System Report
Generated: ${new Date().toLocaleString()}

=== INVENTORY SUMMARY ===
Total Items: ${inventory.reduce((sum, item) => sum + item.quantity, 0)}
Unique Products: ${inventory.length}
In Stock: ${inventory.filter(item => item.status === 'In Stock').length}
Low Stock: ${inventory.filter(item => item.status === 'Low Stock').length}

=== SUPPLIER SUMMARY ===
Active Suppliers: ${suppliers.length}

=== TRANSACTION SUMMARY ===
Total Transactions: ${transactions.length}
Recent Activity: ${transactions.slice(0, 5).map(t => `${t.type} - ${t.itemName} (${t.quantity} ${t.unitOfMeasure})`).join('\n')}
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventomatic-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Success", description: "Text report generated and downloaded!" });
  };
  
  const generateCsvReport = () => {
    // Generate CSV for Inventory
    const inventoryHeaders = ["Item Name", "Quantity", "Unit", "Supplier", "Status"];
    const inventoryRows = inventory.map(item => [
      item.name,
      item.quantity.toString(),
      item.unit,
      item.supplier,
      item.status
    ]);
    
    const csvInventory = [
      inventoryHeaders.join(','),
      ...inventoryRows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvInventory], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventomatic-inventory-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Success", description: "CSV report generated and downloaded!" });
  };

  const handleContactSupport = () => {
    const emailBody = encodeURIComponent(`
Hello InventOMatic Support Team,

I need assistance with:
[Please describe your issue here]

System Information:
- User: ${userInfo.fullName}
- Role: ${userInfo.role}
- Department: ${userInfo.department}
- Total Items: ${inventory.length}
- Suppliers: ${suppliers.length}

Best regards,
${userInfo.fullName}
    `);
    
    window.open(`mailto:support@inventomatic.com?subject=InventOMatic Support Request&body=${emailBody}`);
    toast({ title: "Opening Email", description: "Support email template opened in your default email client." });
  };

  const tutorialSteps = [
    {
      title: "Getting Started",
      content: "Welcome to InventOMatic! Navigate through different sections using the sidebar menu."
    },
    {
      title: "Dashboard",
      content: "View your inventory overview, analytics, and recent activities. Toggle widgets using the eye buttons."
    },
    {
      title: "Inventory Management",
      content: "Add, edit, and track your inventory items. Use filters and export options for better management."
    },
    {
      title: "Supplier Management",
      content: "Manage your suppliers' information, contact details, and lead times."
    },
    {
      title: "Transactions",
      content: "Log inbound and outbound items to automatically update your inventory levels."
    },
    {
      title: "Audit Trail",
      content: "Monitor all system activities and changes with detailed logs and analytics."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <Button onClick={() => setShowTutorial(!showTutorial)} variant="outline" className="animate-bounce-in">
          <BookOpen className="w-4 h-4 mr-2" />
          {showTutorial ? 'Hide Tutorial' : 'Show Tutorial'}
        </Button>
      </div>

      {showTutorial && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 animate-slide-down">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-blue-800 dark:text-blue-300 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              InventOMatic Tutorial Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tutorialSteps.map((step, index) => (
                <div key={index} className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">
                      {index + 1}
                    </div>
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{step.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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

        {/* Enhanced Appearance Settings */}
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
            </div>

            <div className="space-y-3">
              <Label>Font Family</Label>
              <Select 
                value={systemPreferences.fontFamily} 
                onValueChange={(value) => setSystemPreferences(prev => ({ ...prev, fontFamily: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inter">Inter</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="poppins">Poppins</SelectItem>
                  <SelectItem value="montserrat">Montserrat</SelectItem>
                  <SelectItem value="opensans">Open Sans</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Animation Style</Label>
              <Select 
                value={systemPreferences.animationStyle} 
                onValueChange={(value) => setSystemPreferences(prev => ({ ...prev, animationStyle: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smooth">Smooth</SelectItem>
                  <SelectItem value="bouncy">Bouncy</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="energetic">Energetic</SelectItem>
                </SelectContent>
              </Select>
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

        {/* Enhanced Help & Information */}
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
                <p className="text-sm text-gray-600 dark:text-gray-300">InventOMatic v2.1.0</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">Last Updated</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{new Date().toLocaleDateString()}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">Support</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  For technical support, contact: support@inventomatic.com
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:scale-105 transition-transform"
                  onClick={handleExportData}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export System Data
                </Button>
                
                <div className="space-y-2">
                  <Label>Report Format</Label>
                  <div className="flex space-x-2 mb-2">
                    <Button 
                      variant={reportFormat === 'txt' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setReportFormat('txt')}
                      className="flex-1"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Text File (.txt)
                    </Button>
                    <Button 
                      variant={reportFormat === 'csv' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setReportFormat('csv')}
                      className="flex-1"
                    >
                      <FileDown className="w-4 h-4 mr-2" />
                      CSV File (.csv)
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover:scale-105 transition-transform"
                    onClick={handleGenerateReport}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Generate {reportFormat.toUpperCase()} Report
                  </Button>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:scale-105 transition-transform"
                  onClick={handleContactSupport}
                >
                  <Mail className="w-4 h-4 mr-2" />
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
