import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import type { Transaction } from '../types';
import { IconBadge } from './IconBadge';
import { formatTransactionDate } from '../utils/dateUtils';

interface TransactionCardProps {
  transaction: Transaction;
  onClick: (transaction: Transaction) => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ 
  transaction, 
  onClick 
}) => {
  const formatAmount = (amount: number, type: string) => {
    const prefix = type === 'Payment' ? '+' : '';
    return `${prefix}$${amount.toFixed(2)}`;
  };

  const formatDescription = () => {
    let description = transaction.description;
    
    if (transaction.pending) {
      description = `Pending - ${description}`;
    }
    
    if (transaction.authorizedUser) {
      description += ` - ${transaction.authorizedUser}`;
    }
    
    return description;
  };

  return (
    <div 
      className="flex items-center p-4 sm:p-6 bg-card cursor-pointer hover:bg-accent/50 transition-all duration-300 group"
      onClick={() => onClick(transaction)}
    >
      <IconBadge 
        iconName={transaction.iconName} 
        iconColor={transaction.iconColor}
        className="mr-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-card-foreground truncate text-base sm:text-lg">
            {transaction.name}
          </h3>
          <div className="flex items-center">
            <div className="text-right mr-3">
              <div className="font-semibold text-card-foreground text-base sm:text-lg">
                {formatAmount(transaction.amount, transaction.type)}
              </div>
            </div>
            <FontAwesomeIcon 
              icon={faChevronRight} 
              className="text-muted-foreground text-sm" 
            />
          </div>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="text-sm text-muted-foreground truncate mb-1">
              {formatDescription()}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatTransactionDate(transaction.date)}
            </div>
          </div>
          {transaction.cashbackPercentage && (
            <div className="text-xs bg-gradient-to-r from-muted to-muted/50 text-muted-foreground px-2 py-1 rounded-full ml-3 flex-shrink-0 border border-border/50">
              {transaction.cashbackPercentage}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
