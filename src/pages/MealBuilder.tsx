import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Plus, Minus, ChevronRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useOrder } from '../contexts/OrderContext';

const SABJIS = [
  { id: '1', name: 'Dal Tadka', image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: '2', name: 'Paneer Butter Masala', image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: '3', name: 'Rajma', image: 'https://images.pexels.com/photos/5560662/pexels-photo-5560662.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: '4', name: 'Aloo Gobi', image: 'https://images.pexels.com/photos/5560735/pexels-photo-5560735.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: '5', name: 'Bhindi Masala', image: 'https://images.pexels.com/photos/5560748/pexels-photo-5560748.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: '6', name: 'Chole', image: 'https://images.pexels.com/photos/5560756/pexels-photo-5560756.jpeg?auto=compress&cs=tinysrgb&w=150' },
];

export const MealBuilder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { currentOrder, setCurrentOrder, showToast } = useOrder();
  const navigate = useNavigate();

  const handleSabjiSelect = (sabji: typeof SABJIS[0]) => {
    const isSelected = currentOrder.selectedSabjis.find(s => s.id === sabji.id);
    
    if (isSelected) {
      setCurrentOrder({
        ...currentOrder,
        selectedSabjis: currentOrder.selectedSabjis.filter(s => s.id !== sabji.id),
      });
      showToast(`${sabji.name} removed`);
    } else if (currentOrder.selectedSabjis.length < 2) {
      setCurrentOrder({
        ...currentOrder,
        selectedSabjis: [...currentOrder.selectedSabjis, sabji],
      });
      showToast(`${sabji.name} added`, 'success');
    } else {
      showToast('Maximum 2 dishes allowed', 'error');
    }
  };

  const handleBaseOptionChange = (option: typeof currentOrder.baseOption) => {
    const baseRoti = option === 'roti-only' ? 5 : option === 'both' ? 3 : 0;
    setCurrentOrder({
      ...currentOrder,
      baseOption: option,
      extraRoti: Math.max(0, currentOrder.extraRoti - (5 - baseRoti)),
    });
  };

  const handleExtraRotiChange = (change: number) => {
    const maxExtra = currentOrder.baseOption === 'rice-only' ? 5 : 3;
    const newExtra = Math.max(0, Math.min(maxExtra, currentOrder.extraRoti + change));
    setCurrentOrder({
      ...currentOrder,
      extraRoti: newExtra,
    });
  };

  const handleUpgradeToggle = (upgrade: keyof typeof currentOrder.upgrades) => {
    setCurrentOrder({
      ...currentOrder,
      upgrades: {
        ...currentOrder.upgrades,
        [upgrade]: !currentOrder.upgrades[upgrade],
      },
    });
  };

  const handleNext = () => {
    if (currentStep === 0 && currentOrder.selectedSabjis.length === 0) {
      showToast('Please select at least one dish', 'error');
      return;
    }

    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/order-summary');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = ['Dishes', 'Base', 'Extras'];

  return (
    <div className="min-h-screen bg-primary-50">
      <header className="sticky top-16 z-30 bg-white border-b border-primary-200/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold text-primary-900">Build Your Thali</h1>
            <div className="w-20" />
          </div>

          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-250 ${
                    index <= currentStep
                      ? 'bg-primary-900 text-white'
                      : 'bg-primary-200 text-primary-600'
                  }`}>
                    {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className={`text-xs mt-1.5 font-medium ${
                    index <= currentStep ? 'text-primary-900' : 'text-primary-500'
                  }`}>{step}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-2 transition-all duration-250 ${
                    index < currentStep ? 'bg-primary-900' : 'bg-primary-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-32">
        {currentStep === 0 && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-2">Choose Your Dishes</h2>
              <p className="text-primary-600">Select up to 2 delicious dishes for your thali</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {SABJIS.map((sabji) => {
                const isSelected = currentOrder.selectedSabjis.find(s => s.id === sabji.id);
                return (
                  <Card
                    key={sabji.id}
                    hoverable
                    selected={!!isSelected}
                    onClick={() => handleSabjiSelect(sabji)}
                    className="p-4 cursor-pointer group"
                  >
                    <div className="relative mb-3 overflow-hidden rounded-lg">
                      <img
                        src={sabji.image}
                        alt={sabji.name}
                        className="w-full h-28 sm:h-32 object-cover group-hover:scale-105 transition-transform duration-250"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary-900 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium text-sm text-primary-900">{sabji.name}</h3>
                  </Card>
                );
              })}
            </div>

            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-white rounded-lg border border-primary-200 text-sm font-medium text-primary-900">
                {currentOrder.selectedSabjis.length} of 2 selected
              </span>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-2">Choose Your Base</h2>
              <p className="text-primary-600">Select your preferred combination</p>
            </div>

            <div className="space-y-3 mb-8">
              <Card
                hoverable
                selected={currentOrder.baseOption === 'roti-only'}
                onClick={() => handleBaseOptionChange('roti-only')}
                className="p-5 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-1">Roti Only</h3>
                    <p className="text-sm text-primary-600">5 fresh rotis</p>
                  </div>
                  {currentOrder.baseOption === 'roti-only' && <Check className="w-5 h-5 text-primary-900" />}
                </div>
              </Card>

              <Card
                hoverable
                selected={currentOrder.baseOption === 'both'}
                onClick={() => handleBaseOptionChange('both')}
                className="p-5 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-1">Roti + Rice</h3>
                    <p className="text-sm text-primary-600">3 rotis + rice bowl</p>
                  </div>
                  {currentOrder.baseOption === 'both' && <Check className="w-5 h-5 text-primary-900" />}
                </div>
              </Card>

              <Card
                hoverable
                selected={currentOrder.baseOption === 'rice-only'}
                onClick={() => handleBaseOptionChange('rice-only')}
                className="p-5 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-1">Rice Only</h3>
                    <p className="text-sm text-primary-600">Generous rice bowl</p>
                  </div>
                  {currentOrder.baseOption === 'rice-only' && <Check className="w-5 h-5 text-primary-900" />}
                </div>
              </Card>
            </div>

            {currentOrder.baseOption !== 'rice-only' && (
              <Card className="p-5">
                <h4 className="font-semibold text-primary-900 mb-4">Extra Roti</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-600">Add extra rotis (+₹5 each)</span>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExtraRotiChange(-1)}
                      disabled={currentOrder.extraRoti === 0}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold text-lg text-primary-900 min-w-[2rem] text-center">
                      {currentOrder.extraRoti}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExtraRotiChange(1)}
                      disabled={currentOrder.extraRoti >= 3}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-2">Extras & Upgrades</h2>
              <p className="text-primary-600">Customize your thali with premium add-ons</p>
            </div>

            <Card className="p-5 mb-6">
              <h4 className="font-semibold text-primary-900 mb-3">Included Free</h4>
              <div className="space-y-2 text-sm text-primary-700">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Fresh Raita</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Garden Salad</span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Card className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary-900 mb-1">Special Paneer</h4>
                    <p className="text-sm text-primary-600">Premium paneer upgrade · +₹30</p>
                  </div>
                  <button
                    onClick={() => handleUpgradeToggle('specialPaneer')}
                    className={`relative w-12 h-7 rounded-full transition-colors duration-250 ${
                      currentOrder.upgrades.specialPaneer ? 'bg-primary-900' : 'bg-primary-300'
                    }`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-250 ${
                      currentOrder.upgrades.specialPaneer ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </Card>

              <Card className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary-900 mb-1">Extra Raita</h4>
                    <p className="text-sm text-primary-600">Double portion · +₹15</p>
                  </div>
                  <button
                    onClick={() => handleUpgradeToggle('extraRaita')}
                    className={`relative w-12 h-7 rounded-full transition-colors duration-250 ${
                      currentOrder.upgrades.extraRaita ? 'bg-primary-900' : 'bg-primary-300'
                    }`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-250 ${
                      currentOrder.upgrades.extraRaita ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </Card>

              <Card className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary-900 mb-1">Salad Add-ons</h4>
                    <p className="text-sm text-primary-600">Extra veggies & dressing · +₹20</p>
                  </div>
                  <button
                    onClick={() => handleUpgradeToggle('saladAddons')}
                    className={`relative w-12 h-7 rounded-full transition-colors duration-250 ${
                      currentOrder.upgrades.saladAddons ? 'bg-primary-900' : 'bg-primary-300'
                    }`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-250 ${
                      currentOrder.upgrades.saladAddons ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary-200/60 p-4 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handleBack} className="flex-1 sm:flex-none sm:px-8">
              Back
            </Button>
          )}
          <Button onClick={handleNext} className="flex-1">
            {currentStep === 2 ? (
              <>
                Review Order
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};