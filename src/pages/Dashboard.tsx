import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Users, ArrowRight, ShoppingBag, Heart, TrendingUp, Award, Zap, Target, Calendar, Wallet, TrendingDown, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { StatCard } from '../components/StatCard';
import { Badge } from '../components/Badge';
import { Chart, PieChart } from '../components/Chart';
import { Tabs, Tab } from '../components/Tabs';
import { useAuth } from '../contexts/AuthContext';
import { useOrder } from '../contexts/OrderContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { orders } = useOrder();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const recentOrders = orders.slice(0, 3);
  const activeOrders = orders.filter(order => ['pending', 'on-the-way'].includes(order.status));
  const completedOrders = orders.filter(order => order.status === 'delivered');

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = orders.length > 0 ? Math.round(totalSpent / orders.length) : 0;
  const loyaltyPoints = Math.floor(totalSpent / 10);
  const savingsFromOffers = Math.round(totalSpent * 0.12);

  const ordersByDay = [
    { label: 'Mon', value: Math.floor(Math.random() * 10) },
    { label: 'Tue', value: Math.floor(Math.random() * 10) },
    { label: 'Wed', value: Math.floor(Math.random() * 10) },
    { label: 'Thu', value: Math.floor(Math.random() * 10) },
    { label: 'Fri', value: Math.floor(Math.random() * 10) },
    { label: 'Sat', value: Math.floor(Math.random() * 10) },
    { label: 'Sun', value: Math.floor(Math.random() * 10) }
  ];

  const favoriteDishes = [
    { label: 'Dal Tadka', value: 12 },
    { label: 'Paneer Butter', value: 8 },
    { label: 'Rajma', value: 6 },
    { label: 'Aloo Gobi', value: 5 }
  ];

  const achievements = [
    { id: 1, title: 'First Order', description: 'Completed your first order', icon: '🎉', unlocked: true },
    { id: 2, title: 'Regular Customer', description: '10 orders completed', icon: '⭐', unlocked: orders.length >= 10 },
    { id: 3, title: 'Food Explorer', description: 'Tried all dishes', icon: '🍽️', unlocked: false },
    { id: 4, title: 'Weekly Streak', description: '7 days in a row', icon: '🔥', unlocked: false }
  ];

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
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-2 tracking-tight">
            {getGreeting()}, {user?.name}!
          </h1>
          <p className="text-primary-600 text-base md:text-lg">
            Ready for some delicious homestyle food?
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Orders"
            value={orders.length}
            icon={ShoppingBag}
            colorScheme="blue"
            trend={{ value: '+12%', isPositive: true }}
          />
          <StatCard
            title="Total Spent"
            value={`₹${totalSpent}`}
            icon={Wallet}
            colorScheme="green"
          />
          <StatCard
            title="Loyalty Points"
            value={loyaltyPoints}
            icon={Award}
            colorScheme="purple"
          />
          <StatCard
            title="You Saved"
            value={`₹${savingsFromOffers}`}
            icon={TrendingDown}
            colorScheme="orange"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Analytics Tabs */}
            <Tabs
              tabs={[
                {
                  id: 'overview',
                  label: 'Overview',
                  icon: <TrendingUp className="w-4 h-4" />,
                  content: (
                    <div className="space-y-6">
                      <Chart data={ordersByDay} title="Order Activity This Week" />
                      <PieChart data={favoriteDishes} title="Your Favorite Dishes" />
                    </div>
                  )
                },
                {
                  id: 'achievements',
                  label: 'Achievements',
                  icon: <Award className="w-4 h-4" />,
                  content: (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {achievements.map(achievement => (
                        <Card key={achievement.id} className={`p-6 ${achievement.unlocked ? 'bg-gradient-to-br from-orange-50 to-white' : 'opacity-50'}`}>
                          <div className="text-4xl mb-3">{achievement.icon}</div>
                          <h4 className="font-bold text-primary-900 mb-1">{achievement.title}</h4>
                          <p className="text-sm text-primary-600">{achievement.description}</p>
                          {achievement.unlocked && (
                            <Badge variant="success" size="sm" className="mt-3">
                              Unlocked
                            </Badge>
                          )}
                        </Card>
                      ))}
                    </div>
                  )
                }
              ]}
            />

            {/* Active Orders */}
            {activeOrders.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-primary-900 mb-6">Active Orders</h2>
                <div className="space-y-4">
                  {activeOrders.map((order) => (
                    <Card key={order.id} className="p-6 border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50/30 to-transparent">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-primary-900">Order #{order.id}</h3>
                          <p className="text-sm text-primary-600">
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
                        <div className="flex items-center space-x-2 text-sm text-primary-600">
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
              <h2 className="text-2xl font-bold text-primary-900 mb-6">Today's Special</h2>
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
                      <h3 className="text-xl font-semibold text-primary-900 mb-1">Premium Thali</h3>
                      <p className="text-primary-600">Dal Tadka • Paneer Butter Masala • Fresh Roti • Rice</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-orange-600">₹120</span>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-primary-600">4.8 (284 reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-primary-600">
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
                  <h2 className="text-2xl font-bold text-primary-900">Recent Orders</h2>
                  <Link to="/orders">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <Card key={order.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-primary-900">Order #{order.id}</h3>
                          <p className="text-sm text-primary-600">
                            {order.items.selectedSabjis.map(s => s.name).join(', ')}
                          </p>
                          <p className="text-xs text-primary-500 mt-1">
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
              <h3 className="font-bold text-primary-900 mb-4">Quick Actions</h3>
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
              <h3 className="font-bold text-primary-900 mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="w-4 h-4 text-primary-600" />
                    <span className="text-sm text-primary-600">Total Orders</span>
                  </div>
                  <span className="font-semibold text-primary-900">{orders.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-primary-600">Favorite</span>
                  </div>
                  <span className="font-semibold text-primary-900">Dal Tadka</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-primary-600">Saved</span>
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
                <p className="text-sm italic text-primary-700 mb-3">
                  "SKFood has been a game-changer for my hostel life. Fresh, tasty, and always on time!"
                </p>
                <p className="text-xs text-primary-600 font-medium">- Priya, Hostel A</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};