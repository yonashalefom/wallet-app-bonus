import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import type { Transaction, CardData } from '../types';
import { TransactionCard } from '../components/TransactionCard';
import { ThemeToggle } from '../components/ThemeToggle';
import { calculateDailyPoints } from '../utils/calculateDailyPoints';
import { generateRandomBalance } from '../utils/balanceUtils';
import transactionsData from '../data/transactions.json';

export const TransactionsList: React.FC = () => {
  const navigate = useNavigate();
  const cardData: CardData = {
    balance: generateRandomBalance(transactionsData.limit),
    limit: transactionsData.limit,
    transactions: transactionsData.transactions as Transaction[]
  };
  const dailyPoints = calculateDailyPoints();
  
  const handleTransactionClick = (transaction: Transaction) => {
    navigate(`/transaction/${transaction.id}`);
  };

  const availableAmount = cardData.limit - cardData.balance;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with theme controls */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">Wallet</h1>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Cards Grid - Mobile: 2 columns, Desktop: 3 columns */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {/* Card Balance Block */}
          <div className="bg-card border border-border/50 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-card to-card/50">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-card-foreground">Card Balance</div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-card-foreground mb-2">
              ${cardData.balance.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">
              ${availableAmount.toFixed(2)} Available
            </div>
          </div>
          
          {/* Daily Points Block */}
          <div className="bg-card border border-border/50 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-card to-card/50">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-card-foreground">Daily Points</div>
              <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">★</span>
              </div>
            </div>
            <div className="text-xl md:text-2xl font-bold text-card-foreground mb-1">
              {dailyPoints.formattedPoints}
            </div>
            <div className="text-sm text-muted-foreground">
              Today's reward points
            </div>
          </div>
          
          {/* No Payment Due Block - Mobile: spans both columns, Desktop: single column */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1 bg-card border border-border/50 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-card to-card/50">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="text-sm font-semibold text-card-foreground mb-3">No Payment Due</div>
                <div className="text-sm text-muted-foreground leading-tight">
                  You've paid your September balance.
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-sm">
                  <FontAwesomeIcon icon={faCheck} className="text-white text-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Latest Transactions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Latest Transactions</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Recent Activity</span>
            </div>
          </div>
          
          <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
            {cardData.transactions.slice(0, 10).map((transaction, index) => (
              <div key={transaction.id}>
                <TransactionCard
                  transaction={transaction}
                  onClick={handleTransactionClick}
                />
                {index < cardData.transactions.slice(0, 10).length - 1 && (
                  <div className="mx-6 border-b border-border"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
