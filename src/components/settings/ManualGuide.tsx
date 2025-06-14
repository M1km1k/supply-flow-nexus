
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  Home, 
  Package, 
  Users, 
  ArrowUpDown, 
  FileText, 
  Settings,
  Eye,
  Plus,
  Search,
  Filter,
  Download,
  Mail,
  Calendar,
  BarChart3,
  Zap,
  ChevronRight
} from 'lucide-react';

interface ManualGuideProps {
  isVisible: boolean;
}

export const ManualGuide: React.FC<ManualGuideProps> = ({ isVisible }) => {
  const [activeSection, setActiveSection] = useState('getting-started');

  if (!isVisible) return null;

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Home,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Welcome to InventOMatic</h3>
          <p className="text-gray-600 dark:text-gray-300">
            InventOMatic is a comprehensive inventory management system designed for educational institutions, 
            businesses, and organizations to track supplies, manage suppliers, and monitor transactions.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Quick Start Guide:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li>Navigate through sections using the sidebar menu</li>
              <li>Start by adding suppliers in the Suppliers section</li>
              <li>Add inventory items in the Inventory section</li>
              <li>Log transactions to track item movements</li>
              <li>Monitor activities in the Audit Trail</li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Navigation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Use the collapsible sidebar to navigate between different sections. 
                Click the menu icon to expand/collapse the sidebar.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">User Interface</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                The interface adapts to your preferences with light/dark themes and 
                customizable animations available in Settings.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: BarChart3,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Dashboard Overview</h3>
          <p className="text-gray-600 dark:text-gray-300">
            The Dashboard provides a comprehensive overview of your inventory system with real-time statistics and analytics.
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Widget Visibility
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Toggle widget visibility using the eye buttons in the top-right corner of each widget. 
                Hidden widgets are saved in your preferences.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold">Key Metrics</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 mt-1 space-y-1">
                <li>• <strong>Total Items:</strong> Current inventory count</li>
                <li>• <strong>Low Stock Items:</strong> Items below threshold</li>
                <li>• <strong>Active Suppliers:</strong> Number of suppliers</li>
                <li>• <strong>Recent Transactions:</strong> Latest activities</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold">Charts & Analytics</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 mt-1 space-y-1">
                <li>• <strong>Stock Distribution:</strong> Visual breakdown by category</li>
                <li>• <strong>Weekly Transactions:</strong> Transaction trends over time</li>
                <li>• <strong>Supplier Performance:</strong> Supplier reliability metrics</li>
                <li>• <strong>Category Performance:</strong> Most/least active categories</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'inventory',
      title: 'Inventory Management',
      icon: Package,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Managing Your Inventory</h3>
          <p className="text-gray-600 dark:text-gray-300">
            The Inventory section is where you manage all your items, track quantities, and monitor stock levels.
          </p>

          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-300 flex items-center mb-2">
                <Plus className="w-4 h-4 mr-2" />
                Adding New Items
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-green-700 dark:text-green-300">
                <li>Click the "Add Item" button</li>
                <li>Fill in item details (name, quantity, unit, supplier)</li>
                <li>Set reorder level and expiry date if applicable</li>
                <li>Save the item</li>
              </ol>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 flex items-center mb-2">
                <Search className="w-4 h-4 mr-2" />
                Search & Filter
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-700 dark:text-blue-300">
                <li>Use the search bar to find specific items</li>
                <li>Filter by status: All, In Stock, Low Stock, Out of Stock</li>
                <li>Sort by name, quantity, or status</li>
              </ul>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 dark:text-orange-300 flex items-center mb-2">
                <Download className="w-4 h-4 mr-2" />
                Export Options
              </h4>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Export your inventory data in various formats (CSV, JSON) for external analysis or backup purposes.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Item Status Colors</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>In Stock</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span>Low Stock</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span>Out of Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'suppliers',
      title: 'Supplier Management',
      icon: Users,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Managing Suppliers</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Maintain detailed supplier information including contact details, lead times, and performance metrics.
          </p>

          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Adding Suppliers</h4>
              <div className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                <p><strong>Required Information:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Supplier name and contact person</li>
                  <li>Email address and phone number</li>
                  <li>Business address</li>
                  <li>Lead time for orders</li>
                  <li>Categories they supply</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Supplier Actions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700 dark:text-green-300">
                <div>
                  <p><strong>Contact Options:</strong></p>
                  <ul className="list-disc list-inside ml-4">
                    <li>Quick email via "Contact" button</li>
                    <li>Phone number click-to-call</li>
                    <li>View full supplier details</li>
                  </ul>
                </div>
                <div>
                  <p><strong>Management:</strong></p>
                  <ul className="list-disc list-inside ml-4">
                    <li>Edit supplier information</li>
                    <li>View associated inventory items</li>
                    <li>Track supplier performance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Performance Indicators</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Suppliers are automatically rated based on delivery performance, lead times, and item quality. 
                This helps you make informed decisions for future orders.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'transactions',
      title: 'Transaction Management',
      icon: ArrowUpDown,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recording Transactions</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Track all inventory movements with detailed transaction logging that automatically updates stock levels.
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Inbound Transactions</h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• New stock arrivals</li>
                  <li>• Supplier deliveries</li>
                  <li>• Returns to inventory</li>
                  <li>• Stock adjustments (increases)</li>
                </ul>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">Outbound Transactions</h4>
                <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                  <li>• Item distributions</li>
                  <li>• Internal usage</li>
                  <li>• Damaged/expired items</li>
                  <li>• Stock adjustments (decreases)</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Transaction Process</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700 dark:text-blue-300">
                <li>Select transaction type (Inbound/Outbound)</li>
                <li>Choose the inventory item</li>
                <li>Enter quantity and unit</li>
                <li>Add notes or reference numbers</li>
                <li>Confirm transaction - stock levels update automatically</li>
              </ol>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Transaction History</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                All transactions are logged with timestamps, user information, and detailed descriptions. 
                Use filters to view specific date ranges or transaction types.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'audit-trail',
      title: 'Audit Trail',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">System Audit & Monitoring</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor all system activities with comprehensive logging and analytics for compliance and oversight.
          </p>

          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">What's Tracked</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-700 dark:text-purple-300">
                <ul className="space-y-1">
                  <li>• User login/logout activities</li>
                  <li>• Inventory item additions/modifications</li>
                  <li>• Transaction recordings</li>
                  <li>• Supplier changes</li>
                </ul>
                <ul className="space-y-1">
                  <li>• System configuration changes</li>
                  <li>• Data exports and reports</li>
                  <li>• Failed operations and errors</li>
                  <li>• User permission changes</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Activity Analytics</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                View activity trends, peak usage times, and user behavior patterns through interactive charts and graphs.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Filtering & Search</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Filter by date range</li>
                <li>• Search by user or action type</li>
                <li>• Filter by severity level</li>
                <li>• Export audit logs for compliance</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'automation',
      title: 'Automation Rules',
      icon: Zap,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Setting Up Automation</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Create intelligent automation rules to streamline your inventory management processes.
          </p>

          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Available Triggers</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700 dark:text-blue-300">
                <ul className="space-y-1">
                  <li>• <strong>Low Stock:</strong> When items fall below threshold</li>
                  <li>• <strong>Out of Stock:</strong> When items reach zero</li>
                  <li>• <strong>Expiry Alert:</strong> Before items expire</li>
                </ul>
                <ul className="space-y-1">
                  <li>• <strong>Scheduled:</strong> Time-based triggers</li>
                  <li>• <strong>High Usage:</strong> Rapid consumption detection</li>
                  <li>• <strong>Supplier Issues:</strong> Delivery delays</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Automation Actions</h4>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• <strong>Email Alerts:</strong> Notify specific users or groups</li>
                <li>• <strong>Auto Reorder:</strong> Create purchase orders automatically</li>
                <li>• <strong>Generate Reports:</strong> Automated reporting</li>
                <li>• <strong>Update Status:</strong> Change item status automatically</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Creating Rules</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>Click "Add Rule" to create a new automation</li>
                <li>Choose a trigger condition</li>
                <li>Set threshold values or schedule</li>
                <li>Select actions to perform</li>
                <li>Test and activate the rule</li>
              </ol>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'settings',
      title: 'System Settings',
      icon: Settings,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Customizing Your Experience</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Personalize InventOMatic to match your preferences and workflow requirements.
          </p>

          <div className="space-y-4">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-2">Appearance Settings</h4>
              <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                <li>• <strong>Theme:</strong> Light, Dark, or System preference</li>
                <li>• <strong>Background:</strong> Choose from various animated backgrounds</li>
                <li>• <strong>Font Size:</strong> Adjust text size for better readability</li>
                <li>• <strong>Animation Speed:</strong> Control interface animation speed</li>
              </ul>
            </div>

            <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-teal-800 dark:text-teal-300 mb-2">System Preferences</h4>
              <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                <li>• <strong>Notifications:</strong> Enable/disable system notifications</li>
                <li>• <strong>Auto-save:</strong> Automatically save changes</li>
                <li>• <strong>Default Views:</strong> Set preferred page layouts</li>
                <li>• <strong>Export Formats:</strong> Choose default export settings</li>
              </ul>
            </div>

            <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-pink-800 dark:text-pink-300 mb-2">Data Management</h4>
              <ul className="text-sm text-pink-700 dark:text-pink-300 space-y-1">
                <li>• <strong>Backup Data:</strong> Export complete system data</li>
                <li>• <strong>Generate Reports:</strong> Create detailed system reports</li>
                <li>• <strong>Clear Cache:</strong> Reset stored preferences</li>
                <li>• <strong>Contact Support:</strong> Get help when needed</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 animate-slide-down">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-blue-800 dark:text-blue-300 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          InventOMatic System Manual
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-1">
            {sections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="flex flex-col items-center p-2 text-xs data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                <section.icon className="w-4 h-4 mb-1" />
                <span className="hidden sm:inline">{section.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {sections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="mt-4">
              <ScrollArea className="h-[500px] w-full rounded-md border p-4 bg-white/80 dark:bg-gray-800/80">
                {section.content}
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-4 p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white">Need More Help?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Contact our support team for additional assistance
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('mailto:support@inventomatic.com?subject=InventOMatic Support Request')}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
