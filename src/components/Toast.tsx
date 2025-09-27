import React from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import { useOrder } from '../contexts/OrderContext';

export const Toast: React.FC = () => {
  const { toast } = useOrder();

  if (!toast.show) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <XCircle className="w-5 h-5 text-red-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <div className={`${bgColors[toast.type]} border rounded-xl p-4 shadow-lg animate-slide-up`}>
        <div className="flex items-center space-x-3">
          {icons[toast.type]}
          <p className="text-sm font-medium text-gray-900">{toast.message}</p>
        </div>
      </div>
    </div>
  );
};