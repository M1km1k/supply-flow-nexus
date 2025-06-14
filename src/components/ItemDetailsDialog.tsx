
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSupply } from '@/contexts/SupplyContext';
import { useToast } from '@/hooks/use-toast';

interface ItemDetailsDialogProps {
  itemId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ItemDetailsDialog: React.FC<ItemDetailsDialogProps> = ({ itemId, open, onOpenChange }) => {
  const { inventory, updateInventoryItem, deleteInventoryItem } = useSupply();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: '',
    supplier: '',
    category: '',
    minThreshold: ''
  });

  const item = itemId ? inventory.find(i => i.id === itemId) : null;

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        quantity: item.quantity.toString(),
        unit: item.unit,
        supplier: item.supplier,
        category: item.category || '',
        minThreshold: item.minThreshold?.toString() || '20'
      });
    }
  }, [item]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    updateInventoryItem(item.id, {
      name: formData.name,
      quantity: parseInt(formData.quantity),
      unit: formData.unit,
      supplier: formData.supplier,
      category: formData.category || undefined,
      minThreshold: parseInt(formData.minThreshold) || 20
    });

    toast({ title: "Success", description: "Item updated successfully!" });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!item) return;
    
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      deleteInventoryItem(item.id);
      toast({ title: "Success", description: "Item deleted successfully!" });
      onOpenChange(false);
    }
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Item Details: {item.name}</DialogTitle>
        </DialogHeader>
        
        {!isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Quantity</Label>
                <p className="text-lg font-semibold">{item.quantity} {item.unit}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Status</Label>
                <p className={`text-lg font-semibold ${
                  item.status === 'In Stock' ? 'text-green-600' : 
                  item.status === 'Low Stock' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {item.status}
                </p>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-500">Supplier</Label>
              <p className="text-base">{item.supplier}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-500">Category</Label>
              <p className="text-base">{item.category || 'Not specified'}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-500">Date Received</Label>
              <p className="text-base">{new Date(item.dateReceived).toLocaleDateString()}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-500">Minimum Threshold</Label>
              <p className="text-base">{item.minThreshold || 20} {item.unit}</p>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Item Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-quantity">Quantity</Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="edit-unit">Unit</Label>
                <Input
                  id="edit-unit"
                  value={formData.unit}
                  onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-supplier">Supplier</Label>
              <Input
                id="edit-supplier"
                value={formData.supplier}
                onChange={(e) => setFormData(prev => ({ ...prev, supplier: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="edit-category">Category</Label>
              <Input
                id="edit-category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="edit-threshold">Minimum Threshold</Label>
              <Input
                id="edit-threshold"
                type="number"
                value={formData.minThreshold}
                onChange={(e) => setFormData(prev => ({ ...prev, minThreshold: e.target.value }))}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
