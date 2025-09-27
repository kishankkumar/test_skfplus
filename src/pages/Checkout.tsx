import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Navigation, Plus } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { useOrder } from '../contexts/OrderContext';

export const Checkout: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [useGeolocation, setUseGeolocation] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [manualAddress, setManualAddress] = useState({
    hostel: '',
    room: '',
    address: '',
  });

  const { savedAddresses, addSavedAddress, showToast } = useOrder();
  const navigate = useNavigate();

  const handleGetLocation = () => {
    setLocationLoading(true);
    
    if (!navigator.geolocation) {
      showToast('Geolocation not supported by your browser', 'error');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const address = `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
        
        const newAddress = {
          id: `geo_${Date.now()}`,
          type: 'geolocation' as const,
          address,
          coordinates: { lat: latitude, lng: longitude },
        };

        addSavedAddress(newAddress);
        setSelectedAddress(newAddress.id);
        setUseGeolocation(true);
        setLocationLoading(false);
        showToast('Location detected successfully!', 'success');
      },
      (error) => {
        setLocationLoading(false);
        showToast('Location access denied. Please use manual entry.', 'error');
        console.error('Geolocation error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const handleManualAddressSubmit = () => {
    if (!manualAddress.hostel || !manualAddress.room) {
      showToast('Please fill in hostel and room details', 'error');
      return;
    }

    const address = `${manualAddress.hostel}, Room ${manualAddress.room}`;
    const fullAddress = manualAddress.address ? `${address}\n${manualAddress.address}` : address;

    const newAddress = {
      id: `manual_${Date.now()}`,
      type: 'manual' as const,
      address: fullAddress,
      hostel: manualAddress.hostel,
      room: manualAddress.room,
    };

    addSavedAddress(newAddress);
    setSelectedAddress(newAddress.id);
    setShowAddressModal(false);
    setManualAddress({ hostel: '', room: '', address: '' });
    showToast('Address saved successfully!', 'success');
  };

  const handleProceed = () => {
    if (!selectedAddress) {
      showToast('Please select a delivery address', 'error');
      return;
    }
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-4">
          <Link to="/order-summary">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Delivery Address</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* Location Options */}
        <div className="space-y-4">
          <Card className="p-4">
            <Button
              variant="outline"
              fullWidth
              onClick={handleGetLocation}
              loading={locationLoading}
              className="justify-center py-4"
            >
              <Navigation className="w-5 h-5 mr-2" />
              Use My Current Location
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              We'll detect your location automatically
            </p>
          </Card>

          <div className="text-center text-sm text-gray-500">or</div>

          <Card className="p-4">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setShowAddressModal(true)}
              className="justify-center py-4"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Address Manually
            </Button>
          </Card>
        </div>

        {/* Saved Addresses */}
        {savedAddresses.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Saved Addresses</h3>
            <div className="space-y-3">
              {savedAddresses.map((address) => (
                <Card
                  key={address.id}
                  hoverable
                  selected={selectedAddress === address.id}
                  onClick={() => setSelectedAddress(address.id)}
                  className="p-4 cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {address.type === 'geolocation' ? 'Current Location' : address.hostel}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {address.address}
                      </p>
                      {address.type === 'geolocation' && (
                        <p className="text-xs text-blue-600 mt-1">GPS Location</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Delivery Instructions */}
        <Card className="p-4">
          <h4 className="font-medium text-gray-900 mb-2">Delivery Instructions</h4>
          <p className="text-sm text-gray-600 mb-3">
            Our delivery partner will call you upon arrival
          </p>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Be available at your phone for smooth delivery
            </p>
          </div>
        </Card>

        {/* Estimated Delivery Time */}
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⏰</span>
            <div>
              <h4 className="font-medium text-green-800">Estimated Delivery</h4>
              <p className="text-sm text-green-700">30-40 minutes after order confirmation</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Manual Address Modal */}
      <Modal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        title="Add Delivery Address"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hostel Name
            </label>
            <select
              value={manualAddress.hostel}
              onChange={(e) => setManualAddress({ ...manualAddress, hostel: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select Hostel</option>
              <option value="Hostel A">Hostel A</option>
              <option value="Hostel B">Hostel B</option>
              <option value="Hostel C">Hostel C</option>
              <option value="Hostel D">Hostel D</option>
              <option value="Hostel E">Hostel E</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Number
            </label>
            <input
              type="text"
              value={manualAddress.room}
              onChange={(e) => setManualAddress({ ...manualAddress, room: e.target.value })}
              placeholder="e.g., 101, A-205"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Details (Optional)
            </label>
            <textarea
              value={manualAddress.address}
              onChange={(e) => setManualAddress({ ...manualAddress, address: e.target.value })}
              placeholder="Landmarks, floor info, etc."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setShowAddressModal(false)}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              onClick={handleManualAddressSubmit}
            >
              Save Address
            </Button>
          </div>
        </div>
      </Modal>

      {/* Proceed Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <Button
            size="lg"
            fullWidth
            onClick={handleProceed}
            disabled={!selectedAddress}
            className="text-lg py-4"
          >
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};