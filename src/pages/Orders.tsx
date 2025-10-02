import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useOrder } from '../contexts/OrderContext';

export const Orders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'on-the-way' | 'delivered'>('on-the-way');
  const [showOTP, setShowOTP] = useState<{ [key: string]: boolean }>({});
  const { orders } = useOrder();

  const onTheWayOrders = orders.filter(order => ['pending', 'on-the-way'].includes(order.status));
  const deliveredOrders = orders.filter(order => order.status === 'delivered');

  const toggleOTP = (orderId: string) => {
    setShowOTP(prev => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'on-the-way': return 'text-blue-600 bg-blue-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      default: return 'text-primary-600 bg-primary-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Preparing';
      case 'on-the-way': return 'On the way';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  const renderOrderCard = (order: any) => (
    <Card key={order.id} className="p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-primary-900">Order #{order.id}</h3>
          <p className="text-sm text-primary-600">{formatDate(order.createdAt)} at {formatTime(order.createdAt)}</p>
        </div>
        <div className="text-right">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
            {getStatusText(order.status)}
          </span>
          <p className="text-lg font-bold text-primary-900 mt-1">₹{order.total}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-primary-600">Items</span>
          <span className="text-primary-900">{order.items.quantity} Thali(s)</span>
        </div>
        <div className="flex items-start justify-between text-sm">
          <span className="text-primary-600">Sabjis</span>
          <span className="text-primary-900 text-right">
            {order.items.selectedSabjis.map((s: any) => s.name).join(', ')}
          </span>
        </div>
        {order.status !== 'delivered' && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-primary-600">Delivery ETA</span>
            <span className="text-orange-600 font-medium">{formatTime(order.estimatedDelivery)}</span>
          </div>
        )}
      </div>

      {order.status !== 'delivered' && (
        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-blue-800">Delivery OTP</span>
              <p className="text-xs text-blue-600">Show this to delivery partner</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-lg font-bold text-blue-900">
                {showOTP[order.id] ? order.otp : '••••'}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => toggleOTP(order.id)}
              >
                {showOTP[order.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        <Button size="sm" variant="outline" className="flex-1">
          <RotateCcw className="w-4 h-4 mr-1" />
          Reorder
        </Button>
        {order.status === 'delivered' && (
          <Button size="sm" variant="ghost">
            Rate Order
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header */}
      <header className="bg-white border-b border-primary-200">
        <div className="flex items-center justify-between px-4 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-primary-900">My Orders</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-primary-200">
        <div className="flex max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('on-the-way')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'on-the-way'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-primary-500 hover:text-primary-700'
            }`}
          >
            <div className="flex items-center justify-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>On the way ({onTheWayOrders.length})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'delivered'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-primary-500 hover:text-primary-700'
            }`}
          >
            <div className="flex items-center justify-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>Delivered ({deliveredOrders.length})</span>
            </div>
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 py-6 max-w-md mx-auto space-y-4">
        {activeTab === 'on-the-way' && (
          <>
            {onTheWayOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-primary-900 mb-2">No active orders</h3>
                <p className="text-primary-600 mb-6">Your current orders will appear here</p>
                <Link to="/">
                  <Button>Order Now</Button>
                </Link>
              </div>
            ) : (
              onTheWayOrders.map(renderOrderCard)
            )}
          </>
        )}

        {activeTab === 'delivered' && (
          <>
            {deliveredOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-primary-900 mb-2">No delivered orders</h3>
                <p className="text-primary-600 mb-6">Your past orders will appear here</p>
                <Link to="/">
                  <Button>Place Your First Order</Button>
                </Link>
              </div>
            ) : (
              deliveredOrders.map(renderOrderCard)
            )}
          </>
        )}
      </div>

      {/* Quick Order Button */}
      <div className="fixed bottom-6 right-4">
        <Link to="/">
          <Button size="lg" className="rounded-full shadow-lg">
            + New Order
          </Button>
        </Link>
      </div>
    </div>
  );
};