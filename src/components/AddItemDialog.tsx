
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSupply, InventoryItem } from '@/contexts/SupplyContext';
import { useToast } from '@/hooks/use-toast';

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddItemDialog: React.FC<AddItemDialogProps> = ({ open, onOpenChange }) => {
  const { addInventoryItem, suppliers } = useSupply();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: '',
    supplier: '',
    category: '',
    minThreshold: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.quantity || !formData.unit || !formData.supplier) {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    const newItem: Omit<InventoryItem, 'id'> = {
      name: formData.name,
      quantity: parseInt(formData.quantity),
      unit: formData.unit,
      supplier: formData.supplier,
      dateReceived: new Date().toISOString().split('T')[0],
      status: parseInt(formData.quantity) > (parseInt(formData.minThreshold) || 20) ? 'In Stock' : 'Low Stock',
      category: formData.category || undefined,
      minThreshold: parseInt(formData.minThreshold) || 20
    };

    addInventoryItem(newItem);
    toast({ title: "Success", description: "Item added successfully!" });
    
    setFormData({
      name: '',
      quantity: '',
      unit: '',
      supplier: '',
      category: '',
      minThreshold: ''
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Inventory Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Item Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter item name"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                placeholder="0"
                required
              />
            </div>
            <div>
              <Label htmlFor="unit">Unit *</Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
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
          </div>

          <div>
            <Label htmlFor="supplier">Supplier *</Label>
            <Select value={formData.supplier} onValueChange={(value) => setFormData(prev => ({ ...prev, supplier: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map(supplier => (
                  <SelectItem key={supplier.id} value={supplier.name}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              placeholder="e.g., Office Supplies, Electronics"
            />
          </div>

          <div>
            <Label htmlFor="minThreshold">Minimum Stock Threshold</Label>
            <Input
              id="minThreshold"
              type="number"
              value={formData.minThreshold}
              onChange={(e) => setFormData(prev => ({ ...prev, minThreshold: e.target.value }))}
              placeholder="20"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Item</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
