import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Clock, CheckCircle, Copy } from 'lucide-react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { useOrder } from '../../contexts/OrderContext';

export const AdminOrders: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'on-the-way' | 'delivered'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [otpInputs, setOtpInputs] = useState<{ [key: string]: string }>({});

  const { orders, updateOrderStatus, showToast } = useOrder();

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      order.id.includes(searchTerm) ||
      order.address.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOtpChange = (orderId: string, value: string) => {
    setOtpInputs(prev => ({ ...prev, [orderId]: value }));
  };

  const handleMarkDelivered = (orderId: string, correctOtp: string) => {
    const enteredOtp = otpInputs[orderId];
    
    if (!enteredOtp) {
      showToast('Please enter OTP', 'error');
      return;
    }

    if (enteredOtp !== correctOtp) {
      showToast('Incorrect OTP', 'error');
      return;
    }

    updateOrderStatus(orderId, 'delivered');
    setOtpInputs(prev => ({ ...prev, [orderId]: '' }));
    showToast('Order marked as delivered!', 'success');
  };

  const handleCopyOtp = async (otp: string) => {
    try {
      await navigator.clipboard.writeText(otp);
      showToast('OTP copied to clipboard!', 'success');
    } catch (err) {
      showToast('Could not copy OTP', 'error');
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

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const onTheWayCount = orders.filter(o => o.status === 'on-the-way').length;
  const deliveredCount = orders.filter(o => o.status === 'delivered').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/20">
      {/* Header */}
      <header className="glass border-b border-primary-200/50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <Link to="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg md:text-xl font-bold text-primary-900">Order Management</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
        {/* Search and Filter */}
        <Card className="p-4">
          <div className="flex space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Order ID or address..."
                className="w-full pl-10 pr-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
          </div>

          {/* Status Tabs */}
          <div className="flex space-x-2 overflow-x-auto">
            {[
              { key: 'all', label: 'All', count: orders.length },
              { key: 'pending', label: 'Preparing', count: pendingCount },
              { key: 'on-the-way', label: 'On the way', count: onTheWayCount },
              { key: 'delivered', label: 'Delivered', count: deliveredCount },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  statusFilter === tab.key
                    ? 'bg-orange-50 text-orange-600 shadow-xs'
                    : 'text-primary-600 hover:text-primary-900 hover:bg-primary-50'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-primary-900 mb-2">No orders found</h3>
              <p className="text-primary-600">
                {statusFilter === 'all' 
                  ? 'No orders match your search criteria'
                  : `No ${statusFilter} orders found`}
              </p>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Order Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-primary-900">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-primary-600">
                          {order.createdAt.toLocaleDateString()} at {order.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium text-primary-900 mb-2">Order Details</h4>
                        <div className="space-y-1 text-primary-600">
                          <p><strong>Items:</strong> {order.items.quantity} Thali(s)</p>
                          <p><strong>Sabjis:</strong> {order.items.selectedSabjis.map(s => s.name).join(', ')}</p>
                          <p><strong>Base:</strong> {
                            order.items.baseOption === 'roti-only' ? 'Roti Only' :
                            order.items.baseOption === 'both' ? 'Roti + Rice' : 'Rice Only'
                          }</p>
                          <p><strong>Total:</strong> ₹{order.total}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-primary-900 mb-2">Delivery Info</h4>
                        <div className="space-y-1 text-primary-600">
                          <p><strong>Address:</strong></p>
                          <p className="text-sm bg-primary-50 p-2 rounded">
                            {order.address.address}
                          </p>
                          {order.status !== 'delivered' && (
                            <p><strong>ETA:</strong> {order.estimatedDelivery.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* OTP Section */}
                  <div className="bg-primary-50/50 border border-primary-200/50 rounded-lg p-4">
                    <h4 className="font-medium text-primary-900 mb-3">Delivery OTP</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <code className="bg-white px-3 py-2 rounded border font-mono text-lg font-bold text-primary-900">
                          {order.otp}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopyOtp(order.otp)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>

                      {order.status !== 'delivered' && (
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-primary-700">
                            Verify OTP to mark delivered:
                          </label>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={otpInputs[order.id] || ''}
                              onChange={(e) => handleOtpChange(order.id, e.target.value)}
                              placeholder="Enter OTP"
                              className="flex-1 px-3 py-2 border border-primary-300 rounded-lg text-center font-mono text-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                              maxLength={4}
                            />
                            <Button
                              size="sm"
                              onClick={() => handleMarkDelivered(order.id, order.otp)}
                              disabled={!otpInputs[order.id]}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {order.status === 'pending' && (
                        <Button
                          size="sm"
                          fullWidth
                          onClick={() => updateOrderStatus(order.id, 'on-the-way')}
                          variant="outline"
                        >
                          Mark as On the Way
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};