import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Users, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="px-4 py-6 bg-white shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SK</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">SKFood</h1>
          </div>
          <Link to="/orders" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
            My Orders
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 py-8 max-w-md mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 leading-tight">
            Today's Fresh<br />
            <span className="text-orange-500">Home-Style Meal</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Authentic Indian thali delivered to your hostel
          </p>
        </div>

        {/* Hero Image */}
        <Card className="overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" 
            alt="Fresh Indian Thali" 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold text-gray-900">₹120</span>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-600">4.8 (284 reviews)</span>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
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
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">What's for today?</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <Card hoverable className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌅</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Lunch</h4>
              <p className="text-sm text-gray-600">12:00 PM - 3:00 PM</p>
            </Card>
            
            <Card hoverable className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌙</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Dinner</h4>
              <p className="text-sm text-gray-600">7:00 PM - 10:00 PM</p>
            </Card>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Link to="/meal-builder">
            <Button size="lg" fullWidth className="text-lg py-4">
              Build Your Thali
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-xs text-gray-600">Happy Students</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">4.8</div>
              <div className="text-xs text-gray-600">Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">30min</div>
              <div className="text-xs text-gray-600">Avg Delivery</div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
          <p className="text-sm italic text-gray-700 mb-2">
            "Best homestyle food in campus. Tastes just like mom's cooking!"
          </p>
          <p className="text-xs text-gray-600 font-medium">- Priya, Hostel A</p>
        </div>
      </main>

      {/* Admin Access */}
      <div className="fixed bottom-4 right-4">
        <Link to="/admin">
          <Button variant="ghost" size="sm" className="text-xs opacity-50 hover:opacity-100">
            Admin
          </Button>
        </Link>
      </div>
    </div>
  );
};