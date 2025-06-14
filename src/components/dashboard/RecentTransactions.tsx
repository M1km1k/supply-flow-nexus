
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, ShoppingCart } from 'lucide-react';

interface RecentTransactionsProps {
  transactions: any[];
  inventory: any[];
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions, inventory }) => {
  const recentTransactions = transactions.slice(0, 5);

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Recent Transaction Activity
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction, index) => {
            const inventoryItem = inventory.find(item => item.id === transaction.itemId);
            const unit = inventoryItem?.unit || 'units';
            
            return (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 animate-slide-right" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${transaction.type === "inbound" ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                    {transaction.type === "inbound" ? 
                      <Package className="w-5 h-5 text-green-600 dark:text-green-400" /> : 
                      <ShoppingCart className="w-5 h-5 text-red-600 dark:text-red-400" />
                    }
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{transaction.itemName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {transaction.type === "inbound" ? 'Received' : 'Dispatched'} • {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white text-lg">{transaction.quantity} {unit}</p>
                  <p className={`text-sm font-medium ${transaction.type === "inbound" ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {transaction.type === "inbound" ? '+' : '-'}{transaction.quantity} {unit}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
