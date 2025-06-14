
export type DeliveryEvent = {
  id: string;
  date: Date;
  supplierName: string;
  supplierContact: string;
  itemName: string;
  quantity: number;
  unit: string;
  status: 'pending' | 'in-progress' | 'completed';
  leadTime: number;
  estimatedArrival: Date;
};

export type DeliveryStatus = 'pending' | 'in-progress' | 'completed';
