
// Enhanced inventory flow data with more realistic patterns
export const inventoryFlowData = [
  { 
    month: 'Jan', 
    inbound: 120, 
    outbound: 80, 
    stockLevel: 1200, 
    value: 48000,
    reorderTriggers: 5,
    supplier1: 45, 
    supplier2: 35, 
    supplier3: 40 
  },
  { 
    month: 'Feb', 
    inbound: 150, 
    outbound: 90, 
    stockLevel: 1260, 
    value: 52000,
    reorderTriggers: 3,
    supplier1: 60, 
    supplier2: 45, 
    supplier3: 45 
  },
  { 
    month: 'Mar', 
    inbound: 180, 
    outbound: 120, 
    stockLevel: 1320, 
    value: 55000,
    reorderTriggers: 7,
    supplier1: 70, 
    supplier2: 55, 
    supplier3: 55 
  },
  { 
    month: 'Apr', 
    inbound: 140, 
    outbound: 110, 
    stockLevel: 1350, 
    value: 51000,
    reorderTriggers: 4,
    supplier1: 50, 
    supplier2: 45, 
    supplier3: 45 
  },
  { 
    month: 'May', 
    inbound: 200, 
    outbound: 95, 
    stockLevel: 1455, 
    value: 62000,
    reorderTriggers: 2,
    supplier1: 80, 
    supplier2: 60, 
    supplier3: 60 
  },
  { 
    month: 'Jun', 
    inbound: 250, 
    outbound: 130, 
    stockLevel: 1575, 
    value: 68000,
    reorderTriggers: 6,
    supplier1: 95, 
    supplier2: 75, 
    supplier3: 80 
  },
  { 
    month: 'Jul', 
    inbound: 220, 
    outbound: 140, 
    stockLevel: 1655, 
    value: 65000,
    reorderTriggers: 8,
    supplier1: 85, 
    supplier2: 70, 
    supplier3: 65 
  },
  { 
    month: 'Aug', 
    inbound: 280, 
    outbound: 160, 
    stockLevel: 1775, 
    value: 72000,
    reorderTriggers: 3,
    supplier1: 105, 
    supplier2: 85, 
    supplier3: 90 
  },
];

// Enhanced category performance data
export const categoryPerformanceData = [
  { 
    category: 'Electronics', 
    inStock: 156, 
    lowStock: 23, 
    outOfStock: 8, 
    total: 187,
    value: 125000,
    turnoverRate: 2.4,
    avgDaysToRestock: 5.2
  },
  { 
    category: 'Office Supplies', 
    inStock: 234, 
    lowStock: 45, 
    outOfStock: 12, 
    total: 291,
    value: 45000,
    turnoverRate: 4.1,
    avgDaysToRestock: 3.1
  },
  { 
    category: 'Laboratory Equipment', 
    inStock: 89, 
    lowStock: 15, 
    outOfStock: 6, 
    total: 110,
    value: 280000,
    turnoverRate: 1.2,
    avgDaysToRestock: 12.5
  },
  { 
    category: 'Maintenance', 
    inStock: 145, 
    lowStock: 28, 
    outOfStock: 9, 
    total: 182,
    value: 32000,
    turnoverRate: 3.7,
    avgDaysToRestock: 4.8
  },
  { 
    category: 'Food & Beverage', 
    inStock: 67, 
    lowStock: 18, 
    outOfStock: 5, 
    total: 90,
    value: 18000,
    turnoverRate: 8.2,
    avgDaysToRestock: 2.1
  }
];

// Enhanced supplier performance with more metrics
export const supplierPerformanceData = [
  { 
    name: 'TechCorp Solutions', 
    onTimeDelivery: 94, 
    qualityScore: 96, 
    costEfficiency: 88, 
    responseTime: 1.2,
    totalOrders: 45,
    completedOrders: 43,
    avgDeliveryDays: 3.2
  },
  { 
    name: 'Global Supplies Inc', 
    onTimeDelivery: 89, 
    qualityScore: 92, 
    costEfficiency: 95, 
    responseTime: 2.1,
    totalOrders: 38,
    completedOrders: 36,
    avgDeliveryDays: 4.1
  },
  { 
    name: 'QuickDelivery Co', 
    onTimeDelivery: 97, 
    qualityScore: 85, 
    costEfficiency: 92, 
    responseTime: 0.8,
    totalOrders: 52,
    completedOrders: 51,
    avgDeliveryDays: 2.1
  },
  { 
    name: 'Premium Equipment Ltd', 
    onTimeDelivery: 91, 
    qualityScore: 98, 
    costEfficiency: 82, 
    responseTime: 3.5,
    totalOrders: 28,
    completedOrders: 27,
    avgDeliveryDays: 7.2
  }
];

// Enhanced stock status data
export const stockStatusData = [
  { name: 'In Stock', value: 65, color: '#10B981', count: 691, trend: '+5.2%' },
  { name: 'Low Stock', value: 25, color: '#F59E0B', count: 129, trend: '-2.1%' },
  { name: 'Out of Stock', value: 6, color: '#EF4444', count: 40, trend: '-8.3%' },
  { name: 'Overstocked', value: 4, color: '#8B5CF6', count: 25, trend: '+1.1%' },
];

// Weekly transaction patterns
export const weeklyTransactionData = [
  { day: 'Mon', inbound: 25, outbound: 18, netChange: 7 },
  { day: 'Tue', inbound: 32, outbound: 24, netChange: 8 },
  { day: 'Wed', inbound: 28, outbound: 31, netChange: -3 },
  { day: 'Thu', inbound: 35, outbound: 22, netChange: 13 },
  { day: 'Fri', inbound: 41, outbound: 28, netChange: 13 },
  { day: 'Sat', inbound: 15, outbound: 12, netChange: 3 },
  { day: 'Sun', inbound: 8, outbound: 6, netChange: 2 },
];
