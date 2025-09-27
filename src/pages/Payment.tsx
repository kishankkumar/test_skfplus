import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Shield, Smartphone } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useOrder } from '../contexts/OrderContext';

export const Payment: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wallet'>('upi');
  const [processing, setProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [upiId, setUpiId] = useState('');

  const { currentOrder, savedAddresses, addOrder, showToast } = useOrder();
  const navigate = useNavigate();

  // Calculate total (same logic as OrderSummary)
  const basePrice = 120;
  const extraRotiPrice = currentOrder.extraRoti * 5;
  const upgradesPrice = 
    (currentOrder.upgrades.specialPaneer ? 30 : 0) +
    (currentOrder.upgrades.extraRaita ? 15 : 0) +
    (currentOrder.upgrades.saladAddons ? 20 : 0);
  
  const perThaliTotal = basePrice + extraRotiPrice + upgradesPrice;
  const subtotal = perThaliTotal * currentOrder.quantity;
  const deliveryFee = subtotal >= 200 ? 0 : 20;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;
  const finalTotal = currentOrder.quantity >= 3 ? total - Math.round(subtotal * 0.05) : total;

  const handlePayment = async () => {
    setProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Create order
    const newOrder = {
      id: Date.now().toString(),
      items: currentOrder,
      address: savedAddresses[0], // For demo, using first saved address
      total: finalTotal,
      otp,
      status: 'pending' as const,
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 40 * 60 * 1000), // 40 minutes from now
    };

    addOrder(newOrder);
    setProcessing(false);
    showToast('Payment successful!', 'success');
    navigate('/order-confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-4">
          <Link to="/checkout">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Payment</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* Order Summary */}
        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Order Total</h3>
              <p className="text-sm text-gray-600">{currentOrder.quantity} Thali(s)</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-orange-600">₹{finalTotal}</span>
              {currentOrder.quantity >= 3 && (
                <p className="text-sm text-green-600">5% discount applied!</p>
              )}
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Select Payment Method</h3>
          
          <div className="space-y-3">
            {/* UPI */}
            <Card
              hoverable
              selected={paymentMethod === 'upi'}
              onClick={() => setPaymentMethod('upi')}
              className="p-4 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">UPI</h4>
                    <p className="text-sm text-gray-600">Pay using UPI apps</p>
                  </div>
                </div>
                <div className="text-sm text-green-600 font-medium">Recommended</div>
              </div>
            </Card>

            {/* Credit/Debit Card */}
            <Card
              hoverable
              selected={paymentMethod === 'card'}
              onClick={() => setPaymentMethod('card')}
              className="p-4 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Credit/Debit Card</h4>
                  <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
                </div>
              </div>
            </Card>

            {/* Wallet */}
            <Card
              hoverable
              selected={paymentMethod === 'wallet'}
              onClick={() => setPaymentMethod('wallet')}
              className="p-4 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">₹</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Digital Wallet</h4>
                  <p className="text-sm text-gray-600">Paytm, PhonePe, etc.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Payment Details */}
        {paymentMethod === 'upi' && (
          <Card className="p-4">
            <h4 className="font-medium text-gray-900 mb-3">Enter UPI ID</h4>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="yourname@upi"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </Card>
        )}

        {paymentMethod === 'card' && (
          <Card className="p-4 space-y-4">
            <h4 className="font-medium text-gray-900">Card Details</h4>
            
            <div>
              <input
                type="text"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                placeholder="Card Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                placeholder="MM/YY"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="text"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                placeholder="CVV"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <input
                type="text"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                placeholder="Cardholder Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </Card>
        )}

        {paymentMethod === 'wallet' && (
          <Card className="p-4 text-center">
            <p className="text-gray-600">You will be redirected to your wallet app</p>
          </Card>
        )}

        {/* Security Info */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Shield className="w-4 h-4" />
          <span>256-bit SSL encrypted & secure</span>
        </div>

        {/* Razorpay Branding */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200">
            <span>Powered by</span>
            <span className="font-bold text-blue-600">Razorpay</span>
          </div>
        </div>
      </div>

      {/* Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <Button
            size="lg"
            fullWidth
            onClick={handlePayment}
            loading={processing}
            className="text-lg py-4"
          >
            {processing ? 'Processing Payment...' : `Pay ₹${finalTotal}`}
          </Button>
        </div>
      </div>
    </div>
  );
};