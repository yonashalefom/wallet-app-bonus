import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { CardData } from '../types';
import { TransactionDetailMobile } from '../components/TransactionDetailMobile';
import { TransactionDetailDesktop } from '../components/TransactionDetailDesktop';
import transactionsData from '../data/transactions.json';

export const TransactionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const cardData = transactionsData as CardData;
  
  const transaction = cardData.transactions.find(t => t.id === id);
  
  if (!transaction) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground mb-2">Transaction Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Back to Transactions
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden">
        <TransactionDetailMobile transaction={transaction} />
      </div>
      
      {/* Desktop View */}
      <div className="hidden lg:block">
        <TransactionDetailDesktop transaction={transaction} />
      </div>
    </>
  );
};
