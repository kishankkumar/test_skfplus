import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Users, ArrowRight, ShoppingBag, Heart, TrendingUp } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import { useOrder } from '../contexts/OrderContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { orders } = useOrder();

  const recentOrders = orders.slice(0, 2);
  const activeOrders = orders.filter(order => ['pending', 'on-the-way'].includes(order.status));

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            {getGreeting()}, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Ready for some delicious homestyle food?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Orders */}
            {activeOrders.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Orders</h2>
                <div className="space-y-4">
                  {activeOrders.map((order) => (
                    <Card key={order.id} className="p-6 border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50/30 to-transparent">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                          <p className="text-sm text-gray-600">
                            {order.items.quantity} Thali(s) • ₹{order.total}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'pending' 
                            ? 'bg-orange-100 text-orange-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {order.status === 'pending' ? 'Preparing' : 'On the way'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>ETA: {order.estimatedDelivery.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <Link to="/orders">
                          <Button size="sm" variant="outline">Track Order</Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Today's Special */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Special</h2>
              <Card className="overflow-hidden">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=700&h=300&fit=crop"
                    alt="Today's Special Thali"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                      Today's Special
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">Premium Thali</h3>
                      <p className="text-gray-600">Dal Tadka • Paneer Butter Masala • Fresh Roti • Rice</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-orange-600">₹120</span>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">4.8 (284 reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>30-40 min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>Popular choice</span>
                      </div>
                    </div>
                    <Link to="/meal-builder">
                      <Button>
                        Order Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Orders */}
            {recentOrders.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
                  <Link to="/orders">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <Card key={order.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Order #{order.id}</h3>
                          <p className="text-sm text-gray-600">
                            {order.items.selectedSabjis.map(s => s.name).join(', ')}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {order.createdAt.toLocaleDateString()} • ₹{order.total}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'delivered' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {order.status === 'delivered' ? 'Delivered' : 'On the way'}
                          </span>
                          <Button size="sm" variant="outline">
                            Reorder
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/meal-builder">
                  <Button fullWidth variant="outline" className="justify-start">
                    <ShoppingBag className="w-4 h-4 mr-3" />
                    Order Food
                  </Button>
                </Link>
                <Link to="/orders">
                  <Button fullWidth variant="outline" className="justify-start">
                    <Clock className="w-4 h-4 mr-3" />
                    Track Orders
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button fullWidth variant="outline" className="justify-start">
                    <Users className="w-4 h-4 mr-3" />
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Stats */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Total Orders</span>
                  </div>
                  <span className="font-semibold text-gray-900">{orders.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-600">Favorite</span>
                  </div>
                  <span className="font-semibold text-gray-900">Dal Tadka</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Saved</span>
                  </div>
                  <span className="font-semibold text-green-600">₹240</span>
                </div>
              </div>
            </Card>

            {/* Testimonial */}
            <Card className="p-6 bg-gradient-to-br from-orange-50/50 to-orange-50/30 border-orange-200/50">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm italic text-gray-700 mb-3">
                  "SKFood has been a game-changer for my hostel life. Fresh, tasty, and always on time!"
                </p>
                <p className="text-xs text-gray-600 font-medium">- Priya, Hostel A</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};