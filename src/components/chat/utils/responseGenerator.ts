
export const generateResponse = (
  question: string,
  inventory: any[],
  suppliers: any[],
  transactions: any[]
): string => {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('stock') || lowerQuestion.includes('inventory')) {
    const lowStockItems = inventory.filter(item => item.status === 'Low Stock');
    if (lowStockItems.length > 0) {
      return `You have ${lowStockItems.length} items with low stock: ${lowStockItems.map(item => item.name).join(', ')}.`;
    }
    return `All items are well stocked! You have ${inventory.length} different items in inventory.`;
  }
  
  if (lowerQuestion.includes('supplier')) {
    return `You have ${suppliers.length} active suppliers: ${suppliers.map(s => s.name).join(', ')}.`;
  }
  
  if (lowerQuestion.includes('transaction') || lowerQuestion.includes('recent')) {
    const recentCount = Math.min(3, transactions.length);
    return `Your ${recentCount} most recent transactions include ${transactions.slice(0, recentCount).map(t => `${t.type} of ${t.itemName}`).join(', ')}.`;
  }
  
  if (lowerQuestion.includes('analytics') || lowerQuestion.includes('report')) {
    const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
    return `Current analytics: ${totalItems} total items across ${inventory.length} categories, ${suppliers.length} suppliers, ${transactions.length} total transactions.`;
  }
  
  if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi')) {
    return 'Hello! I\'m here to help with your supply management questions. Ask me about inventory, suppliers, or analytics.';
  }
  
  return 'I can help with inventory management questions. Try asking about stock levels, suppliers, transactions, or analytics.';
};
