import React, { useMemo, useEffect } from 'react';
import { Outlet, useOutlet, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import type { Transaction, CardData } from '../types';
import { TransactionCard } from '../components/TransactionCard';
import { ThemeToggle } from '../components/ThemeToggle';
import { calculateDailyPoints } from '../utils/calculateDailyPoints';
import { generateRandomBalance } from '../utils/balanceUtils';
import transactionsData from '../data/transactions.json';

export const TransactionsLayout: React.FC = () => {
  const navigate = useNavigate();
  const outlet = useOutlet();

  // Force scroll to top on every page load/reload to prevent scroll position conflicts with animations
  useEffect(() => {
    // Immediately scroll to top
    window.scrollTo(0, 0);
    
    // Also prevent any scroll restoration that browsers might do
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  const cardData: CardData = useMemo(() => ({
    balance: generateRandomBalance(transactionsData.limit),
    limit: transactionsData.limit,
    transactions: transactionsData.transactions as Transaction[]
  }), []); // Empty dependency array means this only runs once

  const dailyPoints = calculateDailyPoints();

  const handleTransactionClick = (transaction: Transaction) => {
    navigate(`/transaction/${transaction.id}`);
  };

  const availableAmount = cardData.limit - cardData.balance;

  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Header with theme controls */}
      <motion.div 
        className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
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
      </motion.div>

      {/* Main content area with responsive master-detail */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {/* Cards Grid - Mobile: 2 cols x 2 rows (right card spans rows) | Desktop: 3 cols */}
        <motion.div 
          className={`grid grid-cols-2 grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 gap-4 lg:gap-6 mb-8 ${outlet ? 'hidden lg:grid' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {/* Card Balance Block */}
          <div className="bg-card border border-border/50 rounded-2xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-card to-card/50 col-start-1 row-start-1 lg:col-start-auto lg:row-start-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-card-foreground">Card Balance</div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-card-foreground mb-2">
              ${cardData.balance.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">
              ${availableAmount.toFixed(2)} Available
            </div>
          </div>

          {/* Daily Points Block */}
          <div className="bg-card border border-border/50 rounded-2xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-card to-card/50 col-start-1 row-start-2 lg:col-start-auto lg:row-start-auto">
            <div className="mb-3 text-sm font-semibold text-card-foreground">Daily Points</div>
            <div className="text-xl lg:text-2xl font-bold text-card-foreground mb-1">
              {dailyPoints.formattedPoints}
            </div>
            <div className="text-sm text-muted-foreground">
              Today's reward points
            </div>
          </div>

          {/* No Payment Due Block */}
          <div className="bg-card border border-border/50 rounded-2xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-card to-card/50 col-start-2 row-start-1 row-span-2 lg:col-start-auto lg:row-start-auto lg:row-span-1">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="text-sm font-semibold text-card-foreground mb-3">No Payment Due</div>
                <div className="text-sm text-muted-foreground leading-tight">
                  You've paid your September balance.
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm bg-white dark:bg-muted border border-border/50">
                  <FontAwesomeIcon icon={faCheck} className="text-lg" style={{ color: 'var(--foreground)' }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Latest Transactions Header - Full Width */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className={`flex items-center justify-between ${outlet ? 'hidden lg:flex' : 'flex'}`}>
            <h2 className="text-2xl font-bold text-foreground">Latest Transactions</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Recent Activity</span>
            </div>
          </div>

          {/* Responsive content area */}
          <div className={`${outlet ? 'grid grid-cols-1 lg:grid-cols-3 gap-6' : 'block'}`}>
            {/* List column */}
            <motion.div 
              className={`${outlet ? 'hidden lg:block lg:col-span-2' : 'block'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
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
            </motion.div>

            {/* Detail sidebar (desktop) or full screen (mobile when active) */}
            <div className={`${outlet ? 'block lg:col-span-1' : 'hidden'}`}>
              <AnimatePresence mode="wait">
                {outlet && <Outlet />}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TransactionsLayout;


