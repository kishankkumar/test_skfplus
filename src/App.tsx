import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { MealBuilder } from './pages/MealBuilder';
import { OrderSummary } from './pages/OrderSummary';
import { Checkout } from './pages/Checkout';
import { Payment } from './pages/Payment';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { Orders } from './pages/Orders';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { PublishMenu } from './pages/admin/PublishMenu';
import { AdminOrders } from './pages/admin/AdminOrders';
import { OrderProvider } from './contexts/OrderContext';
import { Toast } from './components/Toast';

function App() {
  return (
    <OrderProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/meal-builder" element={<MealBuilder />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/orders" element={<Orders />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/publish-menu" element={<PublishMenu />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Routes>
          <Toast />
        </div>
      </Router>
    </OrderProvider>
  );
}

export default App;