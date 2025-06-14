
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupply } from '@/contexts/SupplyContext';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const TransactionList: React.FC = () => {
  const { transactions } = useSupply();

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-2 md:pb-4">
        <CardTitle className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 md:space-y-3 max-h-[calc(100vh-20rem)] overflow-y-auto pr-1">
          {transactions.slice(0, 10).map((transaction) => (
            <div key={transaction.id} className="p-2 md:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-1 md:mb-2">
                <div className="flex items-center space-x-2">
                  {transaction.type === 'inbound' ? (
                    <ArrowDown className="w-4 h-4 text-green-600 flex-shrink-0" />
                  ) : (
                    <ArrowUp className="w-4 h-4 text-red-600 flex-shrink-0" />
                  )}
                  <span className="font-medium text-gray-900 dark:text-white truncate">
                    {transaction.itemName}
                  </span>
                </div>
                <span className="text-xs md:text-sm text-gray-500 flex-shrink-0">
                  {new Date(transaction.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                {transaction.type === 'inbound' ? 'Received' : 'Dispatched'} {transaction.quantity} units
              </p>
              <p className="text-xs text-gray-500 truncate">Ref: {transaction.reference}</p>
              {transaction.notes && (
                <p className="text-xs text-gray-500 mt-1 truncate">{transaction.notes}</p>
              )}
            </div>
          ))}
          
          {transactions.length === 0 && (
            <div className="text-center py-6 md:py-8">
              <p className="text-gray-500">No transactions recorded yet.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
