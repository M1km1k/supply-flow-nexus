
import React from 'react';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';

export const TransactionsPage: React.FC = () => {
  return (
    <div className="w-full max-w-none space-y-4 sm:space-y-6 animate-fade-in">
      <div className="mb-4 sm:mb-6 animate-slide-down">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white hover:scale-105 transition-transform duration-300 hover:text-blue-600">
          Inbound/Outbound Transactions
        </h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 w-full">
        <div className="animate-slide-right">
          <TransactionForm />
        </div>
        <div className="animate-slide-left">
          <TransactionList />
        </div>
      </div>
    </div>
  );
};
