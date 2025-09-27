import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Clock, Star, Users, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useAuth } from '../contexts/AuthContext';

export const Home: React.FC = () => {
  const { isLoggedIn } = useAuth();

  // Redirect logged-in users to dashboard
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Hero Section */}
      <main className="px-4 py-12 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Today's Fresh<br />
            <span className="text-orange-500">Home-Style Meal</span>
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Authentic Indian thali delivered to your hostel
          </p>
        </div>

        {/* Hero Image */}
        <Card className="overflow-hidden max-w-2xl mx-auto">
          <img 
            src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" 
            alt="Fresh Indian Thali" 
            className="w-full h-64 md:h-80 object-cover"
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
        <div className="space-y-6 max-w-2xl mx-auto">
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
        <div className="pt-4 max-w-md mx-auto">
          <Link to="/meal-builder">
            <Button size="lg" fullWidth className="text-lg py-4">
              Build Your Thali
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm mb-2">
              Already have an account?
            </p>
            <Link to="/login" className="text-orange-600 hover:text-orange-700 font-medium">
              Sign in to order faster
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 max-w-2xl mx-auto">
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
        <div className="bg-orange-50 rounded-xl p-6 border border-orange-100 max-w-2xl mx-auto">
          <p className="text-sm italic text-gray-700 mb-2">
            "Best homestyle food in campus. Tastes just like mom's cooking!"
          </p>
          <p className="text-xs text-gray-600 font-medium">- Priya, Hostel A</p>
        </div>
      </main>
    </div>
  );
};