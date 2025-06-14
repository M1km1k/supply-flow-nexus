
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSupply } from '@/contexts/SupplyContext';
import { AddItemDialog } from '@/components/AddItemDialog';
import { ItemDetailsDialog } from '@/components/ItemDetailsDialog';

export const InventoryPage: React.FC = () => {
  const { inventory } = useSupply();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ['Item Name', 'Quantity', 'Unit', 'Supplier', 'Date Received', 'Status', 'Category'];
    const csvContent = [
      headers.join(','),
      ...filteredInventory.map(item =>
        [item.name, item.quantity, item.unit, item.supplier, item.dateReceived, item.status, item.category || ''].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const printTable = () => {
    window.print();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Out of Stock': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Inventory Management</h1>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setShowAddDialog(true)} className="bg-blue-600 hover:bg-blue-700">
            Add New Item
          </Button>
          <Button onClick={exportToCSV} variant="outline">
            Export CSV
          </Button>
          <Button onClick={printTable} variant="outline">
            Print
          </Button>
        </div>
      </div>

      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
              Inventory Items ({filteredInventory.length})
            </CardTitle>
            <Input
              placeholder="Search items, suppliers, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-80"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Item Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Quantity</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Unit</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Supplier</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Date Received</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                        {item.category && <p className="text-sm text-gray-500">{item.category}</p>}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{item.quantity}</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{item.unit}</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{item.supplier}</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                      {new Date(item.dateReceived).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Button
                        onClick={() => setSelectedItem(item.id)}
                        variant="outline"
                        size="sm"
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredInventory.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No items found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <AddItemDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />

      <ItemDetailsDialog
        itemId={selectedItem}
        open={!!selectedItem}
        onOpenChange={() => setSelectedItem(null)}
      />
    </div>
  );
};
