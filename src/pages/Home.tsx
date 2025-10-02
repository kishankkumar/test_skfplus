import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Clock, Star, Users, ArrowRight, Zap, Heart, Shield, TrendingUp } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { useAuth } from '../contexts/AuthContext';

export const Home: React.FC = () => {
  const { isLoggedIn } = useAuth();

  // Redirect logged-in users to dashboard
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-orange-50/30">
      {/* Hero Section */}
      <main className="px-4 py-16 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-6 animate-fade-in">
          <Badge variant="info" size="lg" className="mb-4 inline-flex">
            <Zap className="w-4 h-4 mr-2" />
            Now delivering to all hostels
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold text-primary-900 leading-tight tracking-tight">
            Fresh, Homestyle<br />
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">Indian Thali</span>
          </h2>
          <p className="text-primary-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Authentic meals made with love, delivered hot to your doorstep in 30 minutes
          </p>
        </div>

        {/* Hero Image */}
        <Card className="overflow-hidden max-w-2xl mx-auto">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600&h=350&fit=crop"
              alt="Fresh Indian Thali"
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold text-primary-900">₹120</span>
              <div className="flex items-center space-x-1.5">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-sm font-semibold text-primary-700">4.8</span>
                <span className="text-sm text-primary-500">(284)</span>
              </div>
            </div>
            <div className="space-y-2 text-sm text-primary-600">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>30-40 min delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Popular with students</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-primary-900 text-center">Available Timings</h3>

          <div className="grid grid-cols-2 gap-4">
            <Card hoverable className="p-8 text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌅</span>
              </div>
              <h4 className="font-bold text-primary-900 mb-2">Lunch</h4>
              <p className="text-sm text-primary-500">12:00 PM - 3:00 PM</p>
            </Card>

            <Card hoverable className="p-8 text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌙</span>
              </div>
              <h4 className="font-bold text-primary-900 mb-2">Dinner</h4>
              <p className="text-sm text-primary-500">7:00 PM - 10:00 PM</p>
            </Card>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-8 max-w-md mx-auto space-y-6">
          <Link to="/meal-builder">
            <Button size="lg" fullWidth className="text-base h-12">
              Build Your Thali
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          
          <div className="mt-4 text-center">
            <p className="text-primary-600 text-sm mb-2">
              Already have an account?
            </p>
            <Link to="/login" className="text-orange-600 hover:text-orange-700 font-medium">
              Sign in to order faster
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="font-bold text-primary-900 mb-2">100% Hygienic</h3>
            <p className="text-sm text-primary-600">Prepared in certified kitchens with strict quality standards</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-7 h-7 text-orange-600" />
            </div>
            <h3 className="font-bold text-primary-900 mb-2">30 Min Delivery</h3>
            <p className="text-sm text-primary-600">Hot and fresh meals delivered right on time, every time</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="font-bold text-primary-900 mb-2">Made with Love</h3>
            <p className="text-sm text-primary-600">Authentic home-style cooking that tastes like mom's food</p>
          </Card>
        </div>

        {/* Trust Indicators */}
        <Card className="p-8 max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-white border-2 border-orange-100">
          <div className="grid grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-1">500+</div>
              <div className="text-sm text-primary-600">Happy Students</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <span className="text-3xl font-bold text-primary-900">4.8</span>
              </div>
              <div className="text-sm text-primary-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">2k+</div>
              <div className="text-sm text-primary-600">Orders Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-1">30min</div>
              <div className="text-sm text-primary-600">Avg Delivery</div>
            </div>
          </div>
        </Card>

        {/* Testimonial */}
        <Card className="bg-gradient-to-br from-orange-50/50 to-orange-50/30 border-orange-200/50 p-8 max-w-2xl mx-auto">
          <p className="text-base italic text-primary-700 mb-3 leading-relaxed">
            "Best homestyle food in campus. Tastes just like mom's cooking!"
          </p>
          <p className="text-sm text-primary-600 font-medium">- Priya, Hostel A</p>
        </Card>
      </main>
    </div>
  );
};