import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { MealBuilder } from './pages/MealBuilder';
import { OrderSummary } from './pages/OrderSummary';
import { Checkout } from './pages/Checkout';
import { Payment } from './pages/Payment';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { Orders } from './pages/Orders';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { PublishMenu } from './pages/admin/PublishMenu';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AnalyticsDashboard } from './pages/admin/AnalyticsDashboard';
import { AuthProvider } from './contexts/AuthContext';
import { OrderProvider } from './contexts/OrderContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toast } from './components/Toast';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <OrderProvider>
          <Router>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/meal-builder" element={<MealBuilder />} />
              <Route path="/order-summary" element={<OrderSummary />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/orders" element={<Orders />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
              <Route path="/admin/publish-menu" element={<PublishMenu />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
            </Routes>
            <Toast />
          </Layout>
          </Router>
        </OrderProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;