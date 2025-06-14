
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  supplier: string;
  dateReceived: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  category?: string;
  minThreshold?: number;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  leadTime: number;
  productsSupplied: string[];
  address?: string;
}

export interface Transaction {
  id: string;
  type: 'inbound' | 'outbound';
  itemId: string;
  itemName: string;
  quantity: number;
  date: string;
  reference: string;
  supplier?: string;
  notes?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  itemAffected?: string;
  category: 'inventory' | 'supplier' | 'transaction' | 'system';
}

interface SupplyContextType {
  inventory: InventoryItem[];
  suppliers: Supplier[];
  transactions: Transaction[];
  auditLogs: AuditLog[];
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryItem: (id: string, item: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  lowStockThreshold: number;
  setLowStockThreshold: (threshold: number) => void;
  triggerAutomationRules: (trigger: string, context: any) => void;
  generatePredictiveReport: () => any;
  getInventoryTrends: () => any[];
}

const SupplyContext = createContext<SupplyContextType | undefined>(undefined);

export const useSupply = () => {
  const context = useContext(SupplyContext);
  if (!context) {
    throw new Error('useSupply must be used within a SupplyContextProvider');
  }
  return context;
};

// Start with empty arrays - no sample data
const initialInventory: InventoryItem[] = [];
const initialSuppliers: Supplier[] = [];

export const SupplyContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [lowStockThreshold, setLowStockThreshold] = useState(20);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addAuditLog = (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const newLog: AuditLog = {
      ...log,
      id: generateId(),
      timestamp: new Date().toISOString(),
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const triggerAutomationRules = (trigger: string, context: any) => {
    console.log(`Automation trigger: ${trigger}`, context);
    
    // Add audit log for automation events
    addAuditLog({
      action: 'Automation Triggered',
      user: 'System',
      details: `Automation rule triggered: ${trigger}`,
      category: 'system'
    });

    // Simulate automation actions
    if (trigger === 'low_stock' && context.item) {
      // Auto-generate reorder recommendation
      console.log(`Low stock alert for ${context.item.name} - Current: ${context.item.quantity}`);
    }
  };

  const generatePredictiveReport = () => {
    const trends = getInventoryTrends();
    const lowStockPredictions = inventory
      .filter(item => item.quantity <= lowStockThreshold * 1.5)
      .map(item => ({
        itemId: item.id,
        itemName: item.name,
        currentStock: item.quantity,
        predictedStockout: calculateStockoutDate(item),
        recommendedReorderDate: calculateReorderDate(item),
        riskLevel: item.quantity <= 5 ? 'High' : item.quantity <= 15 ? 'Medium' : 'Low'
      }));

    return {
      trends,
      predictions: lowStockPredictions,
      generatedAt: new Date().toISOString()
    };
  };

  const getInventoryTrends = () => {
    // Simulate trend analysis based on transactions
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthTransactions = transactions.filter(t => 
        new Date(t.date).getMonth() === date.getMonth()
      );

      return {
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        inbound: monthTransactions.filter(t => t.type === 'inbound').length,
        outbound: monthTransactions.filter(t => t.type === 'outbound').length,
        value: Math.floor(Math.random() * 10000) + 5000 // Mock value
      };
    }).reverse();

    return last6Months;
  };

  const calculateStockoutDate = (item: InventoryItem): string => {
    // Simple prediction based on average consumption
    const avgConsumption = Math.max(1, Math.floor(item.quantity / 30)); // Mock calculation
    const daysUntilStockout = Math.floor(item.quantity / avgConsumption);
    const stockoutDate = new Date();
    stockoutDate.setDate(stockoutDate.getDate() + daysUntilStockout);
    return stockoutDate.toISOString().split('T')[0];
  };

  const calculateReorderDate = (item: InventoryItem): string => {
    const stockoutDate = new Date(calculateStockoutDate(item));
    const leadTime = 7; // Default 7 days lead time
    const reorderDate = new Date(stockoutDate);
    reorderDate.setDate(reorderDate.getDate() - leadTime);
    return reorderDate.toISOString().split('T')[0];
  };

  const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = { ...item, id: generateId() };
    setInventory(prev => [...prev, newItem]);
    addAuditLog({
      action: 'Item Added',
      user: 'Current User',
      details: `Added new item: ${item.name}`,
      itemAffected: item.name,
      category: 'inventory'
    });

    // Trigger automation for new items
    triggerAutomationRules('new_item', { item: newItem });
  };

  const updateInventoryItem = (id: string, itemUpdate: Partial<InventoryItem>) => {
    const oldItem = inventory.find(i => i.id === id);
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, ...itemUpdate } : item
    ));
    
    if (oldItem) {
      const updatedItem = { ...oldItem, ...itemUpdate };
      
      addAuditLog({
        action: 'Item Updated',
        user: 'Current User',
        details: `Updated item: ${oldItem.name}`,
        itemAffected: oldItem.name,
        category: 'inventory'
      });

      // Check for low stock automation triggers
      if (updatedItem.quantity <= lowStockThreshold && oldItem.quantity > lowStockThreshold) {
        triggerAutomationRules('low_stock', { item: updatedItem });
      }

      // Check for out of stock triggers
      if (updatedItem.quantity === 0 && oldItem.quantity > 0) {
        triggerAutomationRules('out_of_stock', { item: updatedItem });
      }
    }
  };

  const deleteInventoryItem = (id: string) => {
    const item = inventory.find(i => i.id === id);
    setInventory(prev => prev.filter(item => item.id !== id));
    if (item) {
      addAuditLog({
        action: 'Item Deleted',
        user: 'Current User',
        details: `Deleted item: ${item.name}`,
        itemAffected: item.name,
        category: 'inventory'
      });
    }
  };

  const addSupplier = (supplier: Omit<Supplier, 'id'>) => {
    const newSupplier: Supplier = { ...supplier, id: generateId() };
    setSuppliers(prev => [...prev, newSupplier]);
    addAuditLog({
      action: 'Supplier Added',
      user: 'Current User',
      details: `Added new supplier: ${supplier.name}`,
      category: 'supplier'
    });
  };

  const updateSupplier = (id: string, supplierUpdate: Partial<Supplier>) => {
    setSuppliers(prev => prev.map(supplier => 
      supplier.id === id ? { ...supplier, ...supplierUpdate } : supplier
    ));
    const supplier = suppliers.find(s => s.id === id);
    if (supplier) {
      addAuditLog({
        action: 'Supplier Updated',
        user: 'Current User',
        details: `Updated supplier: ${supplier.name}`,
        category: 'supplier'
      });
    }
  };

  const deleteSupplier = (id: string) => {
    const supplier = suppliers.find(s => s.id === id);
    setSuppliers(prev => prev.filter(supplier => supplier.id !== id));
    if (supplier) {
      addAuditLog({
        action: 'Supplier Deleted',
        user: 'Current User',
        details: `Deleted supplier: ${supplier.name}`,
        category: 'supplier'
      });
    }
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = { ...transaction, id: generateId() };
    setTransactions(prev => [newTransaction, ...prev]);

    // Update inventory based on transaction
    if (transaction.type === 'inbound') {
      updateInventoryItem(transaction.itemId, {
        quantity: inventory.find(i => i.id === transaction.itemId)?.quantity! + transaction.quantity,
        dateReceived: transaction.date
      });
    } else {
      const item = inventory.find(i => i.id === transaction.itemId);
      if (item) {
        const newQuantity = item.quantity - transaction.quantity;
        updateInventoryItem(transaction.itemId, {
          quantity: Math.max(0, newQuantity),
          status: newQuantity <= lowStockThreshold ? 'Low Stock' : newQuantity === 0 ? 'Out of Stock' : 'In Stock'
        });
      }
    }

    addAuditLog({
      action: `${transaction.type === 'inbound' ? 'Inbound' : 'Outbound'} Transaction`,
      user: 'Current User',
      details: `${transaction.type === 'inbound' ? 'Received' : 'Dispatched'} ${transaction.quantity} ${transaction.itemName}`,
      itemAffected: transaction.itemName,
      category: 'transaction'
    });
  };

  // Update item status based on quantity changes
  useEffect(() => {
    setInventory(prev => prev.map(item => ({
      ...item,
      status: item.quantity === 0 ? 'Out of Stock' : 
              item.quantity <= lowStockThreshold ? 'Low Stock' : 'In Stock'
    })));
  }, [lowStockThreshold]);

  return (
    <SupplyContext.Provider value={{
      inventory,
      suppliers,
      transactions,
      auditLogs,
      addInventoryItem,
      updateInventoryItem,
      deleteInventoryItem,
      addSupplier,
      updateSupplier,
      deleteSupplier,
      addTransaction,
      addAuditLog,
      lowStockThreshold,
      setLowStockThreshold,
      triggerAutomationRules,
      generatePredictiveReport,
      getInventoryTrends,
    }}>
      {children}
    </SupplyContext.Provider>
  );
};
