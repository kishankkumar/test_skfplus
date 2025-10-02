import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, X, Star, Upload } from 'lucide-react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Modal } from '../../components/Modal';
import { useOrder } from '../../contexts/OrderContext';

interface MenuItem {
  id: string;
  name: string;
  image: string;
  isSpecial: boolean;
}

export const PublishMenu: React.FC = () => {
  const [mealType, setMealType] = useState<'lunch' | 'dinner'>('lunch');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Dal Tadka', image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=150', isSpecial: false },
    { id: '2', name: 'Paneer Butter Masala', image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=150', isSpecial: true },
  ]);
  const [basePrice, setBasePrice] = useState(120);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', image: '', isSpecial: false });

  const { showToast } = useOrder();

  const handleAddItem = () => {
    if (!newItem.name) {
      showToast('Please enter sabji name', 'error');
      return;
    }

    const item: MenuItem = {
      id: Date.now().toString(),
      name: newItem.name,
      image: newItem.image || 'https://images.pexels.com/photos/5560735/pexels-photo-5560735.jpeg?auto=compress&cs=tinysrgb&w=150',
      isSpecial: newItem.isSpecial,
    };

    setMenuItems([...menuItems, item]);
    setNewItem({ name: '', image: '', isSpecial: false });
    setShowAddModal(false);
    showToast('Sabji added successfully!', 'success');
  };

  const handleRemoveItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    showToast('Sabji removed', 'info');
  };

  const handleToggleSpecial = (id: string) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, isSpecial: !item.isSpecial } : item
    ));
  };

  const handlePublish = () => {
    if (menuItems.length < 3) {
      showToast('Please add at least 3 sabjis', 'error');
      return;
    }

    showToast('Menu published successfully!', 'success');
    // In a real app, this would save to backend
  };

  const handleSaveTemplate = () => {
    showToast('Menu saved as template!', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/20">
      {/* Header */}
      <header className="glass border-b border-primary-200/50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <Link to="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg md:text-xl font-bold text-primary-900">Publish Menu</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* Meal Type Toggle */}
        <Card className="p-4">
          <h3 className="font-bold text-primary-900 mb-4">Meal Type</h3>
          <div className="flex bg-primary-100 rounded-lg p-1">
            <button
              onClick={() => setMealType('lunch')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                mealType === 'lunch'
                  ? 'bg-white text-primary-900 shadow-sm'
                  : 'text-primary-600 hover:text-primary-900'
              }`}
            >
              Lunch (12-3 PM)
            </button>
            <button
              onClick={() => setMealType('dinner')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                mealType === 'dinner'
                  ? 'bg-white text-primary-900 shadow-sm'
                  : 'text-primary-600 hover:text-primary-900'
              }`}
            >
              Dinner (7-10 PM)
            </button>
          </div>
        </Card>

        {/* Base Price */}
        <Card className="p-4">
          <h3 className="font-bold text-primary-900 mb-4">Base Price</h3>
          <div className="flex items-center space-x-4">
            <label className="text-sm text-primary-600">Thali Price:</label>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold">₹</span>
              <input
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="w-24 px-3 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
            </div>
          </div>
          <p className="text-sm text-primary-500 mt-2">
            Includes 2 sabjis + base + raita + salad
          </p>
        </Card>

        {/* Sabji List */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-primary-900">Today's Sabjis</h3>
            <Button
              size="sm"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Sabji
            </Button>
          </div>

          <div className="space-y-3">
            {menuItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-3 bg-primary-50 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-primary-900">{item.name}</h4>
                  {item.isSpecial && (
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-yellow-600">Special</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant={item.isSpecial ? "primary" : "outline"}
                    onClick={() => handleToggleSpecial(item.id)}
                  >
                    <Star className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {menuItems.length === 0 && (
              <div className="text-center py-8">
                <p className="text-primary-500 mb-4">No sabjis added yet</p>
                <Button onClick={() => setShowAddModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Sabji
                </Button>
              </div>
            )}
          </div>

          {menuItems.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50/50 border border-blue-200/50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>{menuItems.length} sabjis</strong> added. 
                {menuItems.length < 3 && ` Add ${3 - menuItems.length} more to publish.`}
              </p>
            </div>
          )}
        </Card>

        {/* Menu Preview */}
        <Card className="p-4">
          <h3 className="font-bold text-primary-900 mb-4">Menu Preview</h3>
          <div className="bg-gradient-to-r from-orange-50/50 to-orange-50/30 rounded-lg p-4 border border-orange-200/50">
            <h4 className="font-semibold text-primary-900 mb-2">
              Today's {mealType.charAt(0).toUpperCase() + mealType.slice(1)} Special
            </h4>
            <div className="text-2xl font-bold text-orange-600 mb-2">₹{basePrice}</div>
            <div className="text-sm text-primary-700 space-y-1">
              <p><strong>Choose 2 from:</strong></p>
              <div className="grid grid-cols-2 gap-1">
                {menuItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-1">
                    <span>•</span>
                    <span>{item.name}</span>
                    {item.isSpecial && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                  </div>
                ))}
              </div>
              <p className="pt-2"><strong>Includes:</strong> Roti/Rice + Raita + Salad</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Add Item Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Sabji"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1">
              Sabji Name
            </label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="e.g., Aloo Gobi"
              className="w-full px-3 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1">
              Image URL (Optional)
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newItem.image}
                onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-3 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-primary-500 mt-1">
              Leave empty for default image
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="special"
              checked={newItem.isSpecial}
              onChange={(e) => setNewItem({ ...newItem, isSpecial: e.target.checked })}
              className="w-4 h-4 text-orange-600 bg-primary-100 border-primary-300 rounded focus:ring-accent-500"
            />
            <label htmlFor="special" className="text-sm font-medium text-primary-700">
              Mark as Today's Special
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              onClick={handleAddItem}
            >
              Add Sabji
            </Button>
          </div>
        </div>
      </Modal>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 glass border-t border-primary-200/50 p-4 shadow-lg">
        <div className="max-w-2xl mx-auto flex space-x-3">
          <Button
            variant="outline"
            onClick={handleSaveTemplate}
            className="flex-1"
          >
            Save as Template
          </Button>
          <Button
            onClick={handlePublish}
            disabled={menuItems.length < 3}
            className="flex-1"
          >
            Publish Menu
          </Button>
        </div>
      </div>
    </div>
  );
};