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
    const newFontSize = value[0];
    const root = document.documentElement;
    
    // Set base font size
    root.style.fontSize = `${newFontSize}px`;
    
    // Calculate responsive scaling factor
    const scaleFactor = newFontSize / 16; // 16 is base font size
    
    // Auto-adjust all spacing and sizing based on font size
    root.style.setProperty('--font-scale', scaleFactor.toString());
    root.style.setProperty('--header-height', `${3.5 * scaleFactor}rem`);
    root.style.setProperty('--sidebar-width', `${16 * scaleFactor}rem`);
    root.style.setProperty('--spacing-xs', `${0.25 * scaleFactor}rem`);
    root.style.setProperty('--spacing-sm', `${0.5 * scaleFactor}rem`);
    root.style.setProperty('--spacing-md', `${1 * scaleFactor}rem`);
    root.style.setProperty('--spacing-lg', `${1.5 * scaleFactor}rem`);
    root.style.setProperty('--spacing-xl', `${2 * scaleFactor}rem`);
    root.style.setProperty('--spacing-2xl', `${3 * scaleFactor}rem`);
    root.style.setProperty('--border-radius-sm', `${0.25 * scaleFactor}rem`);
    root.style.setProperty('--border-radius-md', `${0.375 * scaleFactor}rem`);
    root.style.setProperty('--border-radius-lg', `${0.5 * scaleFactor}rem`);
    
    // Apply scaling to header specifically
    const header = document.querySelector('header');
    if (header) {
      header.style.height = `${3.5 * scaleFactor}rem`;
      header.style.padding = `0 ${1 * scaleFactor}rem`;
    }
    
    // Apply scaling to main content
    const main = document.querySelector('main');
    if (main) {
      const mainContent = main.querySelector('div.flex-1');
      if (mainContent) {
        (mainContent as HTMLElement).style.padding = `${1 * scaleFactor}rem`;
      }
    }
    
    // Apply scaling to cards and components
    const cards = document.querySelectorAll('[class*="bg-white"], [class*="bg-gray"]');
    cards.forEach(card => {
      (card as HTMLElement).style.padding = `${1.5 * scaleFactor}rem`;
      (card as HTMLElement).style.gap = `${1 * scaleFactor}rem`;
    });
    
    // Update CSS custom properties for Tailwind classes
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --font-scale: ${scaleFactor};
      }
      
      /* Auto-adjust spacing classes */
      .space-y-1 > :not([hidden]) ~ :not([hidden]) { margin-top: ${0.25 * scaleFactor}rem; }
      .space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: ${0.5 * scaleFactor}rem; }
      .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: ${0.75 * scaleFactor}rem; }
      .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: ${1 * scaleFactor}rem; }
      .space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: ${1.5 * scaleFactor}rem; }
      .space-y-8 > :not([hidden]) ~ :not([hidden]) { margin-top: ${2 * scaleFactor}rem; }
      
      .space-x-2 > :not([hidden]) ~ :not([hidden]) { margin-left: ${0.5 * scaleFactor}rem; }
      .space-x-3 > :not([hidden]) ~ :not([hidden]) { margin-left: ${0.75 * scaleFactor}rem; }
      .space-x-4 > :not([hidden]) ~ :not([hidden]) { margin-left: ${1 * scaleFactor}rem; }
      
      .gap-2 { gap: ${0.5 * scaleFactor}rem; }
      .gap-3 { gap: ${0.75 * scaleFactor}rem; }
      .gap-4 { gap: ${1 * scaleFactor}rem; }
      .gap-6 { gap: ${1.5 * scaleFactor}rem; }
      
      /* Auto-adjust padding classes */
      .p-2 { padding: ${0.5 * scaleFactor}rem; }
      .p-3 { padding: ${0.75 * scaleFactor}rem; }
      .p-4 { padding: ${1 * scaleFactor}rem; }
      .p-6 { padding: ${1.5 * scaleFactor}rem; }
      
      .px-3 { padding-left: ${0.75 * scaleFactor}rem; padding-right: ${0.75 * scaleFactor}rem; }
      .px-4 { padding-left: ${1 * scaleFactor}rem; padding-right: ${1 * scaleFactor}rem; }
      .px-6 { padding-left: ${1.5 * scaleFactor}rem; padding-right: ${1.5 * scaleFactor}rem; }
      
      .py-2 { padding-top: ${0.5 * scaleFactor}rem; padding-bottom: ${0.5 * scaleFactor}rem; }
      .py-3 { padding-top: ${0.75 * scaleFactor}rem; padding-bottom: ${0.75 * scaleFactor}rem; }
      .py-4 { padding-top: ${1 * scaleFactor}rem; padding-bottom: ${1 * scaleFactor}rem; }
      
      /* Auto-adjust margin classes */
      .m-2 { margin: ${0.5 * scaleFactor}rem; }
      .m-3 { margin: ${0.75 * scaleFactor}rem; }
      .m-4 { margin: ${1 * scaleFactor}rem; }
      
      .mb-2 { margin-bottom: ${0.5 * scaleFactor}rem; }
      .mb-3 { margin-bottom: ${0.75 * scaleFactor}rem; }
      .mb-4 { margin-bottom: ${1 * scaleFactor}rem; }
      .mb-6 { margin-bottom: ${1.5 * scaleFactor}rem; }
      
      /* Auto-adjust border radius */
      .rounded { border-radius: ${0.25 * scaleFactor}rem; }
      .rounded-md { border-radius: ${0.375 * scaleFactor}rem; }
      .rounded-lg { border-radius: ${0.5 * scaleFactor}rem; }
      
      /* Auto-adjust header height */
      header { 
        height: ${3.5 * scaleFactor}rem !important; 
        min-height: ${3.5 * scaleFactor}rem !important;
      }
      
      /* Auto-adjust sidebar width */
      [data-sidebar] {
        width: ${16 * scaleFactor}rem;
      }
      
      /* Auto-adjust button sizes */
      button {
        padding: ${0.5 * scaleFactor}rem ${1 * scaleFactor}rem;
        border-radius: ${0.375 * scaleFactor}rem;
      }
      
      /* Auto-adjust input sizes */
      input, textarea, select {
        padding: ${0.5 * scaleFactor}rem ${0.75 * scaleFactor}rem;
        border-radius: ${0.375 * scaleFactor}rem;
      }
      
      /* Auto-adjust card spacing */
      [class*="card"] {
        padding: ${1.5 * scaleFactor}rem;
      }
      
      /* Ensure responsive behavior */
      @media (max-width: 768px) {
        header { 
          height: ${3 * scaleFactor}rem !important; 
          padding: 0 ${0.75 * scaleFactor}rem !important;
        }
        
        main > div {
          padding: ${0.75 * scaleFactor}rem !important;
        }
      }
    `;
    
    // Remove existing dynamic styles and add new one
    const existingStyle = document.getElementById('dynamic-font-styles');
    if (existingStyle) {
      existingStyle.remove();
    }
    style.id = 'dynamic-font-styles';
    document.head.appendChild(style);
    
    toast({ 
      title: "Font Size Updated", 
      description: `Font size set to ${newFontSize}px with auto-adjusted spacing and layout` 
    });
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
Recent Activity: ${transactions.slice(0, 5).map(t => {
  const inventoryItem = inventory.find(item => item.id === t.itemId);
  const unit = inventoryItem?.unit || 'units';
  return `${t.type} - ${t.itemName} (${t.quantity} ${unit})`;
}).join('\n')}
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

  const generateReport = () => {
    const reportData = transactions.map(t => {
      // Get unit from inventory item or use default
      const inventoryItem = inventory.find(item => item.id === t.itemId);
      const unit = inventoryItem?.unit || 'units';
      
      return `${t.date},${t.type},${t.itemName},${t.quantity} ${unit}`;
    }).join('\n');
    
    const header = 'Date,Type,Item,Quantity\n';
    const content = header + reportData;
    
    const blob = new Blob([content], { 
      type: reportFormat === 'csv' ? 'text/csv' : 'text/plain' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory-report.${reportFormat}`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report Generated",
      description: `Report exported as ${reportFormat.toUpperCase()} file`,
    });
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
              <Label>Font Size: {fontSize[0]}px (Auto-adjusts all spacing & layout)</Label>
              <Slider
                value={fontSize}
                onValueChange={handleFontSizeChange}
                max={24}
                min={12}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Changing font size will automatically adjust header height, spacing, padding, and all layout elements
              </p>
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
                    onClick={generateReport}
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
