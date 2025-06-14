
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSupply } from '@/contexts/SupplyContext';
import { useToast } from '@/hooks/use-toast';

interface SupplierDetailsDialogProps {
  supplierId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SupplierDetailsDialog: React.FC<SupplierDetailsDialogProps> = ({ supplierId, open, onOpenChange }) => {
  const { suppliers, updateSupplier, deleteSupplier } = useSupply();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    leadTime: '',
    productsSupplied: '',
    address: ''
  });

  const supplier = supplierId ? suppliers.find(s => s.id === supplierId) : null;

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name,
        contact: supplier.contact,
        email: supplier.email,
        leadTime: supplier.leadTime.toString(),
        productsSupplied: supplier.productsSupplied.join(', '),
        address: supplier.address || ''
      });
    }
  }, [supplier]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplier) return;

    updateSupplier(supplier.id, {
      name: formData.name,
      contact: formData.contact,
      email: formData.email,
      leadTime: parseInt(formData.leadTime),
      productsSupplied: formData.productsSupplied.split(',').map(p => p.trim()).filter(p => p),
      address: formData.address || undefined
    });

    toast({ title: "Success", description: "Supplier updated successfully!" });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!supplier) return;
    
    if (window.confirm(`Are you sure you want to delete ${supplier.name}?`)) {
      deleteSupplier(supplier.id);
      toast({ title: "Success", description: "Supplier deleted successfully!" });
      onOpenChange(false);
    }
  };

  if (!supplier) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Supplier Details: {supplier.name}</DialogTitle>
        </DialogHeader>
        
        {!isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Contact</Label>
                <p className="text-base">{supplier.contact}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Lead Time</Label>
                <p className="text-base">{supplier.leadTime} days</p>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-500">Email</Label>
              <p className="text-base">{supplier.email}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-500">Address</Label>
              <p className="text-base">{supplier.address || 'Not specified'}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-500">Products Supplied</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {supplier.productsSupplied.map((product, index) => (
                  <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full">
                    {product}
                  </span>
                ))}
              </div>
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
              <Label htmlFor="edit-name">Supplier Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-contact">Contact</Label>
                <Input
                  id="edit-contact"
                  value={formData.contact}
                  onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="edit-leadTime">Lead Time (days)</Label>
                <Input
                  id="edit-leadTime"
                  type="number"
                  value={formData.leadTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, leadTime: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="edit-products">Products Supplied</Label>
              <Input
                id="edit-products"
                value={formData.productsSupplied}
                onChange={(e) => setFormData(prev => ({ ...prev, productsSupplied: e.target.value }))}
                placeholder="Product 1, Product 2, Product 3"
              />
            </div>

            <div>
              <Label htmlFor="edit-address">Address</Label>
              <Textarea
                id="edit-address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                rows={3}
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
