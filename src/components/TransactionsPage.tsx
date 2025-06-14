
import React from 'react';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';

export const TransactionsPage: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Inbound/Outbound Transactions
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 w-full">
        <TransactionForm />
        <TransactionList />
      </div>
    </div>
  );
};
