import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ShoppingBag, Settings, PlusCircle, BarChart3, Clock } from 'lucide-react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { useOrder } from '../../contexts/OrderContext';

export const AdminDashboard: React.FC = () => {
  const { orders } = useOrder();

  const todayOrders = orders.filter(order => {
    const today = new Date().toDateString();
    return order.createdAt.toDateString() === today;
  });

  const pendingOrders = orders.filter(order => ['pending', 'on-the-way'].includes(order.status));
  const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/20">
      {/* Header */}
      <header className="glass border-b border-primary-200/50 shadow-sm">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary-900 tracking-tight">SKFood Admin</h1>
              <p className="text-sm text-primary-600">Manage your food business</p>
            </div>
            <Link to="/">
              <Button variant="outline" size="sm">
                View App
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4 text-center bg-gradient-to-br from-white to-gray-50">
              <div className="text-2xl md:text-3xl font-bold text-primary-900">{todayOrders.length}</div>
              <div className="text-xs md:text-sm text-primary-500 mt-1">Today's Orders</div>
            </Card>
            <Card className="p-4 text-center bg-gradient-to-br from-orange-50 to-white">
              <div className="text-2xl md:text-3xl font-bold text-orange-600">₹{todayRevenue}</div>
              <div className="text-xs md:text-sm text-primary-500 mt-1">Today's Revenue</div>
            </Card>
            <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-white">
              <div className="text-2xl md:text-3xl font-bold text-blue-600">{pendingOrders.length}</div>
              <div className="text-xs md:text-sm text-primary-500 mt-1">Pending Orders</div>
            </Card>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 max-w-2xl mx-auto space-y-8">
        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-primary-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            <Link to="/admin/publish-menu">
              <Card hoverable className="p-5">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center">
                    <PlusCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary-900">Publish Today's Menu</h3>
                    <p className="text-sm text-primary-600">Add sabjis and set prices for today</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/admin/orders">
              <Card hoverable className="p-5">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary-900">Manage Orders</h3>
                    <p className="text-sm text-primary-600">View and update order status</p>
                  </div>
                  {pendingOrders.length > 0 && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                      {pendingOrders.length} pending
                    </span>
                  )}
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* Menu Management */}
        <div>
          <h2 className="text-xl font-bold text-primary-900 mb-4">Menu Management</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card hoverable className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Settings className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-medium text-primary-900 mb-1">Menu Templates</h3>
              <p className="text-sm text-primary-600">Saved menu combinations</p>
            </Card>

            <Card hoverable className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-primary-900 mb-1">Analytics</h3>
              <p className="text-sm text-primary-600">Sales & order insights</p>
            </Card>
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-primary-900">Recent Orders</h2>
            <Link to="/admin/orders">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>

          <div className="space-y-3">
            {pendingOrders.slice(0, 3).map((order) => (
              <Card key={order.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-primary-900">Order #{order.id}</h3>
                    <p className="text-sm text-primary-600">
                      {order.items.quantity} thali(s) • ₹{order.total}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-primary-500">
                        {order.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {order.status === 'pending' ? 'Preparing' : 'On the way'}
                    </span>
                    <p className="text-sm text-primary-600 mt-1">OTP: {order.otp}</p>
                  </div>
                </div>
              </Card>
            ))}

            {pendingOrders.length === 0 && (
              <Card className="p-8 text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-primary-600">No pending orders</p>
              </Card>
            )}
          </div>
        </div>

        {/* Business Insights */}
        <Card className="p-6 bg-gradient-to-r from-orange-50/50 to-orange-50/30 border-orange-200/50">
          <h3 className="font-semibold text-primary-900 mb-3">Today's Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-primary-600">Total Orders</span>
              <p className="font-semibold text-primary-900">{todayOrders.length}</p>
            </div>
            <div>
              <span className="text-primary-600">Revenue</span>
              <p className="font-semibold text-orange-600">₹{todayRevenue}</p>
            </div>
            <div>
              <span className="text-primary-600">Avg Order Value</span>
              <p className="font-semibold text-primary-900">
                ₹{todayOrders.length > 0 ? Math.round(todayRevenue / todayOrders.length) : 0}
              </p>
            </div>
            <div>
              <span className="text-primary-600">Customer Satisfaction</span>
              <p className="font-semibold text-green-600">98%</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};