
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DeliveryEvent } from './types';

interface DeliveryModalProps {
  delivery: DeliveryEvent | null;
  onClose: () => void;
}

export const DeliveryModal: React.FC<DeliveryModalProps> = ({
  delivery,
  onClose
}) => {
  if (!delivery) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full animate-scale-in">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Delivery Details
          </h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
          >
            ×
          </Button>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Item</label>
            <p className="text-base font-medium text-gray-800 dark:text-white">
              {delivery.itemName}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Quantity</label>
              <p className="text-base text-gray-800 dark:text-white">
                {delivery.quantity} {delivery.unit}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
              <Badge 
                variant={delivery.status === 'in-progress' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {delivery.status === 'in-progress' 
                  ? 'In Progress' 
                  : delivery.status === 'completed' 
                    ? 'Completed'
                    : 'Pending'}
              </Badge>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Supplier</label>
            <p className="text-base text-gray-800 dark:text-white">
              {delivery.supplierName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {delivery.supplierContact}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Delivery Date</label>
              <p className="text-base text-gray-800 dark:text-white">
                {delivery.date.toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Lead Time</label>
              <p className="text-base text-gray-800 dark:text-white">
                {delivery.leadTime} days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
