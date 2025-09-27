import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Copy, MessageCircle, Share2, Clock } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useOrder } from '../contexts/OrderContext';

export const OrderConfirmation: React.FC = () => {
  const { orders, showToast } = useOrder();
  const [otpCopied, setOtpCopied] = useState(false);
  
  // Get the latest order
  const latestOrder = orders[0];

  const handleCopyOTP = async () => {
    try {
      await navigator.clipboard.writeText(latestOrder.otp);
      setOtpCopied(true);
      showToast('OTP copied to clipboard!', 'success');
      setTimeout(() => setOtpCopied(false), 2000);
    } catch (err) {
      showToast('Could not copy OTP', 'error');
    }
  };

  const handleShareOrder = async () => {
    const shareData = {
      title: 'SKFood Order Confirmation',
      text: `Order confirmed! OTP: ${latestOrder.otp}. Estimated delivery: ${latestOrder.estimatedDelivery.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(shareData.text);
        showToast('Order details copied to clipboard!', 'success');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!latestOrder) {
    return <div>Order not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-center px-4 py-4">
          <h1 className="text-lg font-semibold text-gray-900">Order Confirmed</h1>
        </div>
      </header>

      <div className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* Success Animation */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600">Your delicious thali is being prepared</p>
          </div>
        </div>

        {/* Order Details */}
        <Card className="p-6 text-center">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Order #{latestOrder.id}</h3>
              <p className="text-sm text-gray-600">Placed at {formatTime(latestOrder.createdAt)}</p>
            </div>
            
            <div className="bg-orange-50 rounded-xl p-4">
              <div className="text-3xl font-bold text-orange-600 mb-1">₹{latestOrder.total}</div>
              <div className="text-sm text-gray-600">{latestOrder.items.quantity} Thali(s)</div>
            </div>
          </div>
        </Card>

        {/* OTP Card */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Your OTP</h3>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-4xl font-mono font-bold text-gray-900 tracking-widest mb-3">
                {latestOrder.otp}
              </div>
              <p className="text-sm text-gray-600">Show this to delivery partner</p>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyOTP}
                className="flex-1"
              >
                <Copy className="w-4 h-4 mr-1" />
                {otpCopied ? 'Copied!' : 'Copy OTP'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShareOrder}
                className="flex-1"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </Card>

        {/* Delivery Info */}
        <Card className="p-6">
          <div className="flex items-start space-x-3">
            <Clock className="w-6 h-6 text-orange-500 mt-1" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">Estimated Delivery</h4>
              <p className="text-lg font-semibold text-orange-600">
                {formatTime(latestOrder.estimatedDelivery)}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                We'll call you when we're near your location
              </p>
            </div>
          </div>
        </Card>

        {/* Order Items Summary */}
        <Card className="p-6">
          <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Sabjis</span>
              <span className="text-gray-900">
                {latestOrder.items.selectedSabjis.map(s => s.name).join(', ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Base</span>
              <span className="text-gray-900">
                {latestOrder.items.baseOption === 'roti-only' && 'Roti Only'}
                {latestOrder.items.baseOption === 'both' && 'Roti + Rice'}
                {latestOrder.items.baseOption === 'rice-only' && 'Rice Only'}
                {latestOrder.items.extraRoti > 0 && ` (+${latestOrder.items.extraRoti} extra)`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Included</span>
              <span className="text-gray-900">Raita • Salad</span>
            </div>
            {(latestOrder.items.upgrades.specialPaneer || 
              latestOrder.items.upgrades.extraRaita || 
              latestOrder.items.upgrades.saladAddons) && (
              <div className="flex justify-between">
                <span className="text-gray-600">Upgrades</span>
                <span className="text-gray-900">
                  {[
                    latestOrder.items.upgrades.specialPaneer && 'Special Paneer',
                    latestOrder.items.upgrades.extraRaita && 'Extra Raita',
                    latestOrder.items.upgrades.saladAddons && 'Salad Add-ons'
                  ].filter(Boolean).join(', ')}
                </span>
              </div>
            )}
          </div>
        </Card>

        {/* WhatsApp Integration */}
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-6 h-6 text-green-600" />
            <div className="flex-1">
              <h4 className="font-medium text-green-800">Send OTP to Owner</h4>
              <p className="text-sm text-green-700">Quick WhatsApp share</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const message = `Hi! My order OTP is: ${latestOrder.otp}. Order ID: ${latestOrder.id}`;
                const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              Send
            </Button>
          </div>
        </Card>

        {/* Live Updates */}
        <Card className="p-4 border-l-4 border-l-orange-500">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 animate-pulse"></div>
            <div>
              <p className="font-medium text-gray-900">Order being prepared</p>
              <p className="text-sm text-gray-600">We'll update you once it's ready for delivery</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto space-y-3">
          <Link to="/orders">
            <Button size="lg" fullWidth className="text-lg py-4">
              Track Your Order
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="sm" fullWidth>
              Order Again
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};