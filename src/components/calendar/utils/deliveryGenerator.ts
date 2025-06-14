
import { DeliveryEvent } from '../types';

export const generateDeliveryEvents = (
  transactions: any[],
  suppliers: any[],
  inventory: any[]
): DeliveryEvent[] => {
  const events: DeliveryEvent[] = [];
  
  // Get recent inbound transactions
  const recentInboundTransactions = transactions
    .filter(t => t.type === "inbound")
    .slice(0, 10); // Get last 10 transactions
  
  recentInboundTransactions.forEach((transaction, index) => {
    // Find the supplier for this transaction
    const supplier = suppliers.find(s => 
      s.productsSupplied.some(product => 
        product.toLowerCase().includes(transaction.itemName.toLowerCase())
      )
    );
    
    if (supplier) {
      // Calculate delivery dates based on supplier lead time
      const baseDate = new Date();
      const deliveryDate = new Date();
      deliveryDate.setDate(baseDate.getDate() + (index * 2) - 5); // Spread deliveries across dates
      
      const estimatedArrival = new Date();
      estimatedArrival.setDate(baseDate.getDate() + supplier.leadTime + (index * 2) - 5);
      
      // Get unit from inventory item
      const inventoryItem = inventory.find(item => item.id === transaction.itemId);
      const unit = inventoryItem?.unit || 'units';
      
      // Determine status based on date
      let status: 'pending' | 'in-progress' | 'completed';
      const today = new Date();
      const daysDiff = Math.floor((deliveryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff < -2) {
        status = 'completed';
      } else if (daysDiff <= 0) {
        status = 'in-progress';
      } else {
        status = 'pending';
      }
      
      events.push({
        id: `${transaction.id}-${supplier.id}`,
        date: deliveryDate,
        supplierName: supplier.name,
        supplierContact: supplier.contact,
        itemName: transaction.itemName,
        quantity: transaction.quantity,
        unit: unit,
        status: status,
        leadTime: supplier.leadTime,
        estimatedArrival: estimatedArrival
      });
    }
  });
  
  // Add some upcoming deliveries based on suppliers
  suppliers.slice(0, 3).forEach((supplier, index) => {
    if (supplier.productsSupplied.length > 0) {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + supplier.leadTime + (index * 3));
      
      // Pick a random product from supplier
      const randomProduct = supplier.productsSupplied[Math.floor(Math.random() * supplier.productsSupplied.length)];
      const randomQuantity = Math.floor(Math.random() * 100) + 20;
      
      events.push({
        id: `future-${supplier.id}-${index}`,
        date: futureDate,
        supplierName: supplier.name,
        supplierContact: supplier.contact,
        itemName: randomProduct,
        quantity: randomQuantity,
        unit: 'units',
        status: 'pending',
        leadTime: supplier.leadTime,
        estimatedArrival: futureDate
      });
    }
  });
  
  return events.sort((a, b) => a.date.getTime() - b.date.getTime());
};
