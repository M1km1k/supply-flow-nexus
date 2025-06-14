
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
}

const SupplyContext = createContext<SupplyContextType | undefined>(undefined);

export const useSupply = () => {
  const context = useContext(SupplyContext);
  if (!context) {
    throw new Error('useSupply must be used within a SupplyContextProvider');
  }
  return context;
};

const initialInventory: InventoryItem[] = [
  { id: '1', name: 'Office Paper A4', quantity: 500, unit: 'sheets', supplier: 'Office Supplies Co', dateReceived: '2024-06-10', status: 'In Stock', category: 'Office Supplies', minThreshold: 100 },
  { id: '2', name: 'Ink Cartridges', quantity: 15, unit: 'pieces', supplier: 'Tech Solutions', dateReceived: '2024-06-12', status: 'Low Stock', category: 'Electronics', minThreshold: 20 },
  { id: '3', name: 'Cleaning Supplies', quantity: 8, unit: 'bottles', supplier: 'Clean Pro', dateReceived: '2024-06-08', status: 'Low Stock', category: 'Cleaning', minThreshold: 10 },
  { id: '4', name: 'Laptops', quantity: 25, unit: 'pieces', supplier: 'Tech Solutions', dateReceived: '2024-06-05', status: 'In Stock', category: 'Electronics', minThreshold: 5 },
];

const initialSuppliers: Supplier[] = [
  { id: '1', name: 'Office Supplies Co', contact: '+1-555-0123', email: 'contact@officesupplies.com', leadTime: 5, productsSupplied: ['Paper', 'Pens', 'Folders'], address: '123 Business Ave' },
  { id: '2', name: 'Tech Solutions', contact: '+1-555-0456', email: 'sales@techsolutions.com', leadTime: 7, productsSupplied: ['Computers', 'Printers', 'Ink'], address: '456 Tech Street' },
  { id: '3', name: 'Clean Pro', contact: '+1-555-0789', email: 'orders@cleanpro.com', leadTime: 3, productsSupplied: ['Cleaning Supplies', 'Paper Towels'], address: '789 Clean Blvd' },
];

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
  };

  const updateInventoryItem = (id: string, itemUpdate: Partial<InventoryItem>) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, ...itemUpdate } : item
    ));
    const item = inventory.find(i => i.id === id);
    if (item) {
      addAuditLog({
        action: 'Item Updated',
        user: 'Current User',
        details: `Updated item: ${item.name}`,
        itemAffected: item.name,
        category: 'inventory'
      });
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
    }}>
      {children}
    </SupplyContext.Provider>
  );
};
