
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useSupply } from '@/contexts/SupplyContext';
import { useToast } from '@/hooks/use-toast';
import { Download, FileText, Mail, FileDown } from 'lucide-react';

export const HelpInfoCard: React.FC = () => {
  const { inventory, suppliers, transactions } = useSupply();
  const { toast } = useToast();
  const [reportFormat, setReportFormat] = useState<'txt' | 'csv'>('txt');

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

  const handleGenerateReport = () => {
    if (reportFormat === 'txt') {
      generateTextReport();
    } else {
      generateCsvReport();
    }
  };

  const handleContactSupport = () => {
    const emailBody = encodeURIComponent(`
Hello InventOMatic Support Team,

I need assistance with:
[Please describe your issue here]

System Information:
- Total Items: ${inventory.length}
- Suppliers: ${suppliers.length}

Best regards
    `);
    
    window.open(`mailto:support@inventomatic.com?subject=InventOMatic Support Request&body=${emailBody}`);
    toast({ title: "Opening Email", description: "Support email template opened in your default email client." });
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-none rounded-none h-full">
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
  );
};
