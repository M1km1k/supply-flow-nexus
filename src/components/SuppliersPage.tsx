
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
    <div className="w-full max-w-none space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Supplier Management
          </h1>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-2 lg:gap-3">
          <Button 
            onClick={() => setShowAddDialog(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-sm px-3 py-2 sm:px-4"
          >
            Add New Supplier
          </Button>
          <Button 
            onClick={exportToCSV} 
            variant="outline"
            className="text-sm px-3 py-2 sm:px-4"
          >
            Export CSV
          </Button>
          <Button 
            onClick={() => window.print()} 
            variant="outline"
            className="text-sm px-3 py-2 sm:px-4"
          >
            Print
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
              Suppliers ({filteredSuppliers.length})
            </CardTitle>
            <div className="w-full sm:w-72 lg:w-80">
              <Input
                placeholder="Search suppliers, contacts, or products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 sm:px-4 lg:px-6 pb-4 sm:pb-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 dark:border-gray-700">
                  <TableHead className="text-left font-semibold text-gray-700 dark:text-gray-300 min-w-[140px] px-2 sm:px-4">
                    Name
                  </TableHead>
                  <TableHead className="text-left font-semibold text-gray-700 dark:text-gray-300 min-w-[110px] px-2 sm:px-4">
                    Contact
                  </TableHead>
                  <TableHead className="text-left font-semibold text-gray-700 dark:text-gray-300 min-w-[160px] px-2 sm:px-4">
                    Email
                  </TableHead>
                  <TableHead className="text-left font-semibold text-gray-700 dark:text-gray-300 min-w-[90px] px-2 sm:px-4">
                    Lead Time
                  </TableHead>
                  <TableHead className="text-left font-semibold text-gray-700 dark:text-gray-300 min-w-[140px] px-2 sm:px-4">
                    Products
                  </TableHead>
                  <TableHead className="text-left font-semibold text-gray-700 dark:text-gray-300 min-w-[100px] px-2 sm:px-4">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow 
                    key={supplier.id} 
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell className="py-3 sm:py-4 px-2 sm:px-4">
                      <div className="space-y-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {supplier.name}
                        </p>
                        {supplier.address && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                            {supplier.address}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 sm:py-4 px-2 sm:px-4 text-sm text-gray-700 dark:text-gray-300">
                      {supplier.contact}
                    </TableCell>
                    <TableCell className="py-3 sm:py-4 px-2 sm:px-4 text-sm text-gray-700 dark:text-gray-300">
                      {supplier.email}
                    </TableCell>
                    <TableCell className="py-3 sm:py-4 px-2 sm:px-4 text-sm text-gray-700 dark:text-gray-300">
                      {supplier.leadTime} days
                    </TableCell>
                    <TableCell className="py-3 sm:py-4 px-2 sm:px-4">
                      <div className="flex flex-wrap gap-1">
                        {supplier.productsSupplied.slice(0, 2).map((product, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full"
                          >
                            {product}
                          </span>
                        ))}
                        {supplier.productsSupplied.length > 2 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            +{supplier.productsSupplied.length - 2} more
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 sm:py-4 px-2 sm:px-4">
                      <Button
                        onClick={() => setSelectedSupplier(supplier.id)}
                        variant="outline"
                        size="sm"
                        className="text-xs px-2 py-1 sm:px-3 sm:py-2"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredSuppliers.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No suppliers found matching your search.
              </p>
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
