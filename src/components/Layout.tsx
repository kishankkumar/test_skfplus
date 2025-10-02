import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ShoppingBag, Home, Info, Phone, Settings } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { path: isLoggedIn ? '/dashboard' : '/', label: 'Home', icon: Home },
    { path: '/meal-builder', label: 'Order Food', icon: ShoppingBag },
    ...(isLoggedIn ? [{ path: '/orders', label: 'My Orders', icon: ShoppingBag }] : []),
    { path: '/about', label: 'About Us', icon: Info },
    { path: '/contact', label: 'Contact', icon: Phone },
    ...(isLoggedIn ? [{ path: '/profile', label: 'Profile', icon: Settings }] : []),
  ];

  const isActivePath = (path: string) => {
    if (path === '/' && isLoggedIn) {
      return location.pathname === '/dashboard';
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={isLoggedIn ? '/dashboard' : '/'} className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <span className="text-white font-bold text-lg">SK</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">SKFood</h1>
                <p className="text-xs text-gray-500">Fresh Home-Style Meals</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-orange-50 text-orange-600 shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Auth Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100/60 rounded-lg border border-gray-200/50">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-lg animate-slide-down">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <div className="border-t border-gray-100 pt-4 mt-4">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">{user?.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full"
                    >
                      <Button variant="ghost" fullWidth>Login</Button>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full"
                    >
                      <Button fullWidth>Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200/50 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold">SK</span>
                </div>
                <span className="text-lg font-bold text-gray-900">SKFood</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Premium homestyle Indian food delivered fresh to your hostel. 
                Authentic flavors, quality ingredients, and exceptional service.
              </p>
              <div className="flex space-x-4 text-sm text-gray-500">
                <span>© 2025 SKFood</span>
                <span>•</span>
                <Link to="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
                <span>•</span>
                <Link to="/terms" className="hover:text-gray-700">Terms of Service</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <Link to="/meal-builder" className="block text-gray-600 hover:text-gray-900">Order Food</Link>
                <Link to="/about" className="block text-gray-600 hover:text-gray-900">About Us</Link>
                <Link to="/contact" className="block text-gray-600 hover:text-gray-900">Contact</Link>
                {isLoggedIn && (
                  <Link to="/orders" className="block text-gray-600 hover:text-gray-900">My Orders</Link>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Contact Info</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📞 +91 98765 43210</p>
                <p>📧 hello@skfood.com</p>
                <p>📍 Campus Area, University</p>
                <p>🕒 12:00 PM - 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};