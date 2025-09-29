import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hoverable = false, 
  selected = false, 
  onClick 
}) => {
  const baseClasses = "rounded-xl shadow-sm transition-all duration-300';
  const hoverClasses = hoverable ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';
  const selectedClasses = selected ? 'ring-2 ring-orange-500 shadow-lg transform -translate-y-1' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${selectedClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};