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
  const baseClasses = 'bg-white rounded-xl border border-gray-200/60 shadow-xs transition-all duration-200';
  const hoverClasses = hoverable ? 'hover:shadow-md hover:border-gray-300/60 cursor-pointer active:scale-[0.98]' : '';
  const selectedClasses = selected ? 'ring-2 ring-orange-500 ring-offset-2 border-orange-500 shadow-md' : '';

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${selectedClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};