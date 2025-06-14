
// Reset all dashboard data to empty/minimal values

export const inventoryFlowData = [
  { month: 'Jan', inbound: 0, outbound: 0, value: 0, stockLevel: 0 },
  { month: 'Feb', inbound: 0, outbound: 0, value: 0, stockLevel: 0 },
  { month: 'Mar', inbound: 0, outbound: 0, value: 0, stockLevel: 0 },
  { month: 'Apr', inbound: 0, outbound: 0, value: 0, stockLevel: 0 },
  { month: 'May', inbound: 0, outbound: 0, value: 0, stockLevel: 0 },
  { month: 'Jun', inbound: 0, outbound: 0, value: 0, stockLevel: 0 },
];

export const stockStatusData = [
  { name: 'In Stock', value: 0, color: '#10B981', count: 0, trend: '+0%' },
  { name: 'Low Stock', value: 0, color: '#F59E0B', count: 0, trend: '+0%' },
  { name: 'Out of Stock', value: 0, color: '#EF4444', count: 0, trend: '+0%' },
];

export const categoryPerformanceData = [
  { category: 'Electronics', inStock: 0, lowStock: 0, outOfStock: 0 },
  { category: 'Office Supplies', inStock: 0, lowStock: 0, outOfStock: 0 },
  { category: 'Cleaning', inStock: 0, lowStock: 0, outOfStock: 0 },
  { category: 'Furniture', inStock: 0, lowStock: 0, outOfStock: 0 },
  { category: 'Medical', inStock: 0, lowStock: 0, outOfStock: 0 },
];

export const supplierPerformanceData = [
  { name: 'No Suppliers', onTimeDelivery: 0, qualityScore: 0, costEfficiency: 0, totalOrders: 0 },
];

export const weeklyTransactionData = [
  { day: 'Mon', inbound: 0, outbound: 0, netChange: 0 },
  { day: 'Tue', inbound: 0, outbound: 0, netChange: 0 },
  { day: 'Wed', inbound: 0, outbound: 0, netChange: 0 },
  { day: 'Thu', inbound: 0, outbound: 0, netChange: 0 },
  { day: 'Fri', inbound: 0, outbound: 0, netChange: 0 },
  { day: 'Sat', inbound: 0, outbound: 0, netChange: 0 },
  { day: 'Sun', inbound: 0, outbound: 0, netChange: 0 },
];
