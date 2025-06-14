
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSupply } from '@/contexts/SupplyContext';
import { AddSupplierDialog } from '@/components/AddSupplierDialog';
import { SupplierDetailsDialog } from '@/components/SupplierDetailsDialog';

export const SuppliersPage: React.FC = () => {
  const { suppliers } = useSupply();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.productsSupplied.some(product => 
      product.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const exportToCSV = () => {
    const headers = ['Name', 'Contact', 'Email', 'Lead Time (days)', 'Products Supplied', 'Address'];
    const csvContent = [
      headers.join(','),
      ...filteredSuppliers.map(supplier =>
        [
          supplier.name,
          supplier.contact,
          supplier.email,
          supplier.leadTime,
          supplier.productsSupplied.join(';'),
          supplier.address || ''
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'suppliers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Supplier Management</h1>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setShowAddDialog(true)} className="bg-blue-600 hover:bg-blue-700">
            Add New Supplier
          </Button>
          <Button onClick={exportToCSV} variant="outline">
            Export CSV
          </Button>
          <Button onClick={() => window.print()} variant="outline">
            Print
          </Button>
        </div>
      </div>

      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
              Suppliers ({filteredSuppliers.length})
            </CardTitle>
            <Input
              placeholder="Search suppliers, contacts, or products..."
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
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Contact</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Lead Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Products</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900 dark:text-white">{supplier.name}</p>
                      {supplier.address && <p className="text-sm text-gray-500">{supplier.address}</p>}
                    </td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{supplier.contact}</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{supplier.email}</td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{supplier.leadTime} days</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {supplier.productsSupplied.slice(0, 2).map((product, index) => (
                          <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full">
                            {product}
                          </span>
                        ))}
                        {supplier.productsSupplied.length > 2 && (
                          <span className="text-xs text-gray-500">+{supplier.productsSupplied.length - 2} more</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Button
                        onClick={() => setSelectedSupplier(supplier.id)}
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
          
          {filteredSuppliers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No suppliers found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <AddSupplierDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />

      <SupplierDetailsDialog
        supplierId={selectedSupplier}
        open={!!selectedSupplier}
        onOpenChange={() => setSelectedSupplier(null)}
      />
    </div>
  );
};
