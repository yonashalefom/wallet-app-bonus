import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'motion/react';
import type { Transaction } from '../types';
import { format } from 'date-fns';

interface TransactionDetailMobileProps {
  transaction: Transaction;
}

export const TransactionDetailMobile: React.FC<TransactionDetailMobileProps> = ({ transaction }) => {
  const navigate = useNavigate();

  const formatAmount = (amount: number, type: string) => {
    const prefix = type === 'Payment' ? '+' : '';
    return `${prefix}$${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'M/d/yy, H:mm');
  };

  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Header with back button */}
      <motion.div 
        className="sticky top-0 z-10 bg-background/95 backdrop-blur-md shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.05 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center h-16">
            <div className="flex items-center gap-3">
              <motion.button 
                onClick={() => navigate('/')}
                className="flex items-center text-card-foreground hover:text-blue-500 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-blue-500/10">
                  <FontAwesomeIcon icon={faChevronLeft} className="text-lg group-hover:text-blue-500" />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto py-6">
        {/* Transaction Summary */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <div>
            <div className="text-4xl sm:text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              {formatAmount(transaction.amount, transaction.type)}
            </div>
          </div>
          <div className="text-xl sm:text-2xl text-muted-foreground mb-2 font-medium">
            {transaction.name}
          </div>
          <div className="text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full inline-block">
            {formatDate(transaction.date)}
          </div>
        </motion.div>
        
        {/* Transaction Details Card */}
        <motion.div 
          className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm bg-gradient-to-br from-card to-card/50"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.15 }}
        >
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
        </motion.div>
      </div>
    </motion.div>
  );
};