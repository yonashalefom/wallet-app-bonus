import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'motion/react';
import type { Transaction } from '../types';
import { format } from 'date-fns';

interface TransactionDetailDesktopProps {
  transaction: Transaction;
}

export const TransactionDetailDesktop: React.FC<TransactionDetailDesktopProps> = ({ transaction }) => {
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
      className="bg-card border border-border/50 rounded-2xl shadow-sm bg-gradient-to-br from-card to-card/50 overflow-hidden"
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ 
        duration: 0.15, 
        ease: "easeOut",
        layout: { duration: 0.15, ease: "easeOut" }
      }}
    >
      {/* Desktop sidebar close button */}
      <div className="flex justify-end p-4 pb-2">
        <motion.button 
          onClick={() => navigate('/')}
          className="flex items-center text-card-foreground hover:text-red-500 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
        >
          <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-red-500/10">
            <FontAwesomeIcon icon={faTimes} className="text-lg group-hover:text-red-500" />
          </div>
        </motion.button>
      </div>

      {/* Transaction Summary */}
      <div className="text-center px-6 py-4 border-b border-border/50">
        <div>
          <div className="text-4xl font-bold text-card-foreground mb-3 bg-gradient-to-r from-card-foreground to-card-foreground/80 bg-clip-text">
            {formatAmount(transaction.amount, transaction.type)}
          </div>
        </div>
        <div className="text-lg text-muted-foreground mb-2 font-medium">
          {transaction.name}
        </div>
        <div className="text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full inline-block">
          {formatDate(transaction.date)}
        </div>
      </div>
      
      {/* Transaction Details */}
      <div className="px-6 py-4">
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
    </motion.div>
  );
};
