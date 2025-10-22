import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { 
  faCreditCard, 
  faHome, 
  faBullseye, 
  faWifi, 
  faCoffee, 
  faShoppingCart 
} from '@fortawesome/free-solid-svg-icons';

interface IconBadgeProps {
  iconName: string;
  iconColor: string;
  className?: string;
}

const iconMap: Record<string, IconDefinition> = {
  faApple: faCreditCard, // Using credit card icon as fallback for Apple
  faCreditCard,
  faHome,
  faBullseye,
  faWifi,
  faCoffee,
  faShoppingCart
};

export const IconBadge: React.FC<IconBadgeProps> = ({ 
  iconName, 
  iconColor, 
  className = '' 
}) => {
  const icon = iconMap[iconName] || faCreditCard;
  
  return (
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconColor} ${className}`}>
      <FontAwesomeIcon 
        icon={icon} 
        className="text-white text-lg" 
      />
    </div>
  );
};
