import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import type { CardData } from '../types';
import { format } from 'date-fns';
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

  const formatAmount = (amount: number, type: string) => {
    const prefix = type === 'Payment' ? '+' : '';
    return `${prefix}$${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'M/d/yy, H:mm');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center text-card-foreground hover:text-blue-500 transition-all duration-300 group"
            >
              <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors duration-300">
                <FontAwesomeIcon icon={faChevronLeft} className="text-lg group-hover:text-blue-500 transition-colors duration-300" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Transaction Summary */}
        <div className="text-center mb-12">
          <div>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              {formatAmount(transaction.amount, transaction.type)}
            </div>
          </div>
          <div className="text-lg sm:text-xl text-muted-foreground mb-2 font-medium">
            {transaction.name}
          </div>
          <div className="text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full inline-block">
            {formatDate(transaction.date)}
          </div>
        </div>
        
        {/* Transaction Details Card */}
        <div className="bg-card border border-border/50 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-card to-card/50">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-card-foreground mb-2 text-lg">
                  Status: {transaction.status}
                </div>
                <div className="text-muted-foreground">
                  {transaction.paymentMethod}
                </div>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                transaction.pending 
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                  : 'bg-gradient-to-br from-green-400 to-green-600'
              }`}>
                <FontAwesomeIcon 
                  icon={transaction.pending ? faClock : faCheck} 
                  className="text-white text-lg" 
                />
              </div>
            </div>
            
            <div className="border-t border-border/50 pt-6">
              <div className="flex justify-between items-center bg-muted/30 rounded-xl p-4">
                <span className="font-bold text-card-foreground text-lg">Total</span>
                <span className="font-bold text-card-foreground text-lg">
                  {formatAmount(transaction.amount, transaction.type)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
