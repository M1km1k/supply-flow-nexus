
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSupply, Supplier } from '@/contexts/SupplyContext';
import { useToast } from '@/hooks/use-toast';

interface AddSupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddSupplierDialog: React.FC<AddSupplierDialogProps> = ({ open, onOpenChange }) => {
  const { addSupplier } = useSupply();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    leadTime: '',
    productsSupplied: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.contact || !formData.email || !formData.leadTime) {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    const newSupplier: Omit<Supplier, 'id'> = {
      name: formData.name,
      contact: formData.contact,
      email: formData.email,
      leadTime: parseInt(formData.leadTime),
      productsSupplied: formData.productsSupplied.split(',').map(p => p.trim()).filter(p => p),
      address: formData.address || undefined
    };

    addSupplier(newSupplier);
    toast({ title: "Success", description: "Supplier added successfully!" });
    
    setFormData({
      name: '',
      contact: '',
      email: '',
      leadTime: '',
      productsSupplied: '',
      address: ''
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Supplier</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Supplier Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter supplier name"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact">Contact Number *</Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                placeholder="+1-555-0123"
                required
              />
            </div>
            <div>
              <Label htmlFor="leadTime">Lead Time (days) *</Label>
              <Input
                id="leadTime"
                type="number"
                value={formData.leadTime}
                onChange={(e) => setFormData(prev => ({ ...prev, leadTime: e.target.value }))}
                placeholder="7"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="contact@supplier.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="productsSupplied">Products Supplied</Label>
            <Input
              id="productsSupplied"
              value={formData.productsSupplied}
              onChange={(e) => setFormData(prev => ({ ...prev, productsSupplied: e.target.value }))}
              placeholder="Product 1, Product 2, Product 3"
            />
            <p className="text-xs text-gray-500 mt-1">Separate multiple products with commas</p>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Enter supplier address"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Supplier</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
