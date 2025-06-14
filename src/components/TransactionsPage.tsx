import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useSupply } from '@/contexts/SupplyContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const { inventory, transactions, addTransaction } = useSupply();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: 'inbound' as 'inbound' | 'outbound',
    itemId: '',
    quantity: '',
    reference: '',
    supplier: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.itemId || !formData.quantity || !formData.reference) {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    const selectedItem = inventory.find(item => item.id === formData.itemId);
    if (!selectedItem) {
      toast({ title: "Error", description: "Selected item not found.", variant: "destructive" });
      return;
    }

    const quantity = parseInt(formData.quantity);
    if (formData.type === 'outbound' && quantity > selectedItem.quantity) {
      toast({ title: "Error", description: "Insufficient stock for outbound transaction.", variant: "destructive" });
      return;
    }

    addTransaction({
      type: formData.type,
      itemId: formData.itemId,
      itemName: selectedItem.name,
      quantity: quantity,
      date: new Date().toISOString().split('T')[0],
      reference: formData.reference,
      supplier: formData.supplier || undefined,
      notes: formData.notes || undefined
    });

    toast({ 
      title: "Success", 
      description: `${formData.type === 'inbound' ? 'Inbound' : 'Outbound'} transaction recorded successfully!` 
    });
    
    setFormData({
      type: 'inbound',
      itemId: '',
      quantity: '',
      reference: '',
      supplier: '',
      notes: ''
    });
  };

  const printForm = () => {
    const printContent = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <h2>Transaction Form</h2>
        <p><strong>Type:</strong> ${formData.type}</p>
        <p><strong>Item:</strong> ${inventory.find(i => i.id === formData.itemId)?.name || 'N/A'}</p>
        <p><strong>Quantity:</strong> ${formData.quantity}</p>
        <p><strong>Reference:</strong> ${formData.reference}</p>
        <p><strong>Supplier:</strong> ${formData.supplier}</p>
        <p><strong>Notes:</strong> ${formData.notes}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
      </div>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Inbound/Outbound Transactions
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 w-full">
        {/* Transaction Form */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg h-fit">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
              New Transaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div className="w-full">
                <Label htmlFor="type">Transaction Type *</Label>
                <Select value={formData.type} onValueChange={(value: 'inbound' | 'outbound') => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inbound">
                      <div className="flex items-center space-x-2">
                        <ArrowDown className="w-4 h-4 text-green-600" />
                        <span>Inbound (Receiving)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="outbound">
                      <div className="flex items-center space-x-2">
                        <ArrowUp className="w-4 h-4 text-red-600" />
                        <span>Outbound (Dispatching)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full">
                <Label htmlFor="itemId">Item *</Label>
                <Select value={formData.itemId} onValueChange={(value) => setFormData(prev => ({ ...prev, itemId: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an item" />
                  </SelectTrigger>
                  <SelectContent>
                    {inventory.map(item => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} (Available: {item.quantity} {item.unit})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                  placeholder="Enter quantity"
                  className="w-full"
                  required
                />
              </div>

              <div className="w-full">
                <Label htmlFor="reference">Reference/Order Number *</Label>
                <Input
                  id="reference"
                  value={formData.reference}
                  onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                  placeholder="e.g., PO-2024-001"
                  className="w-full"
                  required
                />
              </div>

              {formData.type === 'inbound' && (
                <div className="w-full">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input
                    id="supplier"
                    value={formData.supplier}
                    onChange={(e) => setFormData(prev => ({ ...prev, supplier: e.target.value }))}
                    placeholder="Supplier name"
                    className="w-full"
                  />
                </div>
              )}

              <div className="w-full">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes or comments"
                  className="w-full"
                  rows={3}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-3 md:pt-4 w-full">
                <Button type="submit" className="flex-1">
                  Record Transaction
                </Button>
                <Button type="button" variant="outline" onClick={printForm} className="flex-1 sm:flex-none">
                  Print Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 md:space-y-3 max-h-[calc(100vh-20rem)] overflow-y-auto pr-1">
              {transactions.slice(0, 10).map((transaction) => (
                <div key={transaction.id} className="p-2 md:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-1 md:mb-2">
                    <div className="flex items-center space-x-2">
                      {transaction.type === 'inbound' ? (
                        <ArrowDown className="w-4 h-4 text-green-600 flex-shrink-0" />
                      ) : (
                        <ArrowUp className="w-4 h-4 text-red-600 flex-shrink-0" />
                      )}
                      <span className="font-medium text-gray-900 dark:text-white truncate">
                        {transaction.itemName}
                      </span>
                    </div>
                    <span className="text-xs md:text-sm text-gray-500 flex-shrink-0">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                    {transaction.type === 'inbound' ? 'Received' : 'Dispatched'} {transaction.quantity} units
                  </p>
                  <p className="text-xs text-gray-500 truncate">Ref: {transaction.reference}</p>
                  {transaction.notes && (
                    <p className="text-xs text-gray-500 mt-1 truncate">{transaction.notes}</p>
                  )}
                </div>
              ))}
              
              {transactions.length === 0 && (
                <div className="text-center py-6 md:py-8">
                  <p className="text-gray-500">No transactions recorded yet.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
