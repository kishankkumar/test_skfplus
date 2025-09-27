import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Plus, Minus } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { StepCard } from '../components/StepCard';
import { useOrder } from '../contexts/OrderContext';

const SABJIS = [
  { id: '1', name: 'Dal Tadka', image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=150', type: 'veg' as const, taste: 'mild' as const },
  { id: '2', name: 'Paneer Butter Masala', image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=150', type: 'veg' as const, taste: 'mild' as const },
  { id: '3', name: 'Rajma', image: 'https://images.pexels.com/photos/5560662/pexels-photo-5560662.jpeg?auto=compress&cs=tinysrgb&w=150', type: 'veg' as const, taste: 'mild' as const },
  { id: '4', name: 'Aloo Gobi', image: 'https://images.pexels.com/photos/5560735/pexels-photo-5560735.jpeg?auto=compress&cs=tinysrgb&w=150', type: 'veg' as const, taste: 'spicy' as const },
  { id: '5', name: 'Bhindi Masala', image: 'https://images.pexels.com/photos/5560748/pexels-photo-5560748.jpeg?auto=compress&cs=tinysrgb&w=150', type: 'veg' as const, taste: 'mild' as const },
  { id: '6', name: 'Chole', image: 'https://images.pexels.com/photos/5560756/pexels-photo-5560756.jpeg?auto=compress&cs=tinysrgb&w=150', type: 'veg' as const, taste: 'spicy' as const },
];

const STEP_LABELS = ['Choose your sabjis', 'Select base & roti', 'Add extras & review'];

export const MealBuilder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'up' | 'down' | null>(null);
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
      showToast(`${currentOrder.selectedSabjis.length + 1}/2 chosen`, 'success');
    } else {
      showToast('Pick up to 2 sabjis only', 'error');
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
      showToast('Please select at least one sabji', 'error');
      return;
    }

    if (currentStep < 2) {
      setSlideDirection('up');
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setSlideDirection(null);
      }, 200);
    } else {
      navigate('/order-summary');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setSlideDirection('down');
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setSlideDirection(null);
      }, 200);
    }
  };

  const getStepTransform = (stepIndex: number) => {
    if (slideDirection === 'up' && stepIndex === currentStep) {
      return 'transform -translate-y-full opacity-30';
    }
    if (slideDirection === 'down' && stepIndex === currentStep) {
      return 'transform translate-y-full opacity-30';
    }
    if (stepIndex === currentStep) {
      return 'transform translate-y-0 opacity-100';
    }
    if (stepIndex < currentStep) {
      return 'transform -translate-y-32 opacity-30';
    }
    return 'transform translate-y-full opacity-0';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Build Your Thali</h1>
          <div className="w-10" />
        </div>
      </header>

      <ProgressBar currentStep={currentStep} totalSteps={3} labels={STEP_LABELS} />

      <div className="relative px-4 py-6 max-w-md mx-auto overflow-hidden">
        {/* Step 1: Sabji Selection */}
        <StepCard 
          className={`absolute inset-x-0 p-6 transition-all duration-400 ${getStepTransform(0)}`}
          isActive={currentStep === 0}
          isCompleted={currentStep > 0}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Sabjis</h2>
          <p className="text-sm text-gray-600 mb-6">Pick up to 2 delicious dishes</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {SABJIS.map((sabji) => {
              const isSelected = currentOrder.selectedSabjis.find(s => s.id === sabji.id);
              return (
                <Card
                  key={sabji.id}
                  hoverable
                  selected={!!isSelected}
                  onClick={() => handleSabjiSelect(sabji)}
                  className="p-3 cursor-pointer"
                >
                  <div className="relative mb-3">
                    <img 
                      src={sabji.image} 
                      alt={sabji.name} 
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium text-sm text-gray-900 mb-1">{sabji.name}</h3>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-green-600">🥬 Veg</span>
                    {sabji.taste === 'spicy' && <span className="text-xs text-red-500">🌶️ Spicy</span>}
                  </div>
                </Card>
              );
            })}
          </div>
          
          <div className="text-center text-sm text-gray-500 mb-6">
            {currentOrder.selectedSabjis.length}/2 selected
          </div>
        </StepCard>

        {/* Step 2: Base Selection */}
        <StepCard 
          className={`absolute inset-x-0 p-6 transition-all duration-400 ${getStepTransform(1)}`}
          isActive={currentStep === 1}
          isCompleted={currentStep > 1}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Base</h2>
          <p className="text-sm text-gray-600 mb-6">Select your preferred combination</p>
          
          <div className="space-y-4 mb-6">
            <Card
              hoverable
              selected={currentOrder.baseOption === 'roti-only'}
              onClick={() => handleBaseOptionChange('roti-only')}
              className="p-4 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🫓</span>
                  <div>
                    <h3 className="font-medium text-gray-900">Only Roti</h3>
                    <p className="text-sm text-gray-600">5 fresh rotis</p>
                  </div>
                </div>
                {currentOrder.baseOption === 'roti-only' && <Check className="w-5 h-5 text-orange-500" />}
              </div>
            </Card>
            
            <Card
              hoverable
              selected={currentOrder.baseOption === 'both'}
              onClick={() => handleBaseOptionChange('both')}
              className="p-4 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🍛</span>
                  <div>
                    <h3 className="font-medium text-gray-900">Both</h3>
                    <p className="text-sm text-gray-600">3 rotis + rice bowl</p>
                  </div>
                </div>
                {currentOrder.baseOption === 'both' && <Check className="w-5 h-5 text-orange-500" />}
              </div>
            </Card>
            
            <Card
              hoverable
              selected={currentOrder.baseOption === 'rice-only'}
              onClick={() => handleBaseOptionChange('rice-only')}
              className="p-4 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🍚</span>
                  <div>
                    <h3 className="font-medium text-gray-900">Only Rice</h3>
                    <p className="text-sm text-gray-600">1 generous bowl</p>
                  </div>
                </div>
                {currentOrder.baseOption === 'rice-only' && <Check className="w-5 h-5 text-orange-500" />}
              </div>
            </Card>
          </div>

          {/* Extra Roti Selector */}
          {currentOrder.baseOption !== 'rice-only' && (
            <div className="bg-orange-50 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 mb-3">Extra Roti</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExtraRotiChange(-1)}
                    disabled={currentOrder.extraRoti === 0}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="font-medium text-lg px-3">{currentOrder.extraRoti}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExtraRotiChange(1)}
                    disabled={currentOrder.extraRoti >= 3}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-600">+₹5 each</span>
              </div>
            </div>
          )}
        </StepCard>

        {/* Step 3: Extras */}
        <StepCard 
          className={`absolute inset-x-0 p-6 transition-all duration-400 ${getStepTransform(2)}`}
          isActive={currentStep === 2}
          isCompleted={currentStep > 2}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Extras & Upgrades</h2>
          <p className="text-sm text-gray-600 mb-6">Customize your thali</p>

          {/* Default Included Items */}
          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <h4 className="font-medium text-green-800 mb-2">Included Free</h4>
            <div className="space-y-1 text-sm text-green-700">
              <div className="flex items-center space-x-2">
                <span>✓</span>
                <span>Fresh Raita</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✓</span>
                <span>Garden Salad</span>
              </div>
            </div>
          </div>

          {/* Upgrade Options */}
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Special Paneer</h4>
                  <p className="text-sm text-gray-600">Premium paneer upgrade</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">+₹30</span>
                  <button
                    onClick={() => handleUpgradeToggle('specialPaneer')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      currentOrder.upgrades.specialPaneer ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      currentOrder.upgrades.specialPaneer ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Extra Raita</h4>
                  <p className="text-sm text-gray-600">Double portion</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">+₹15</span>
                  <button
                    onClick={() => handleUpgradeToggle('extraRaita')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      currentOrder.upgrades.extraRaita ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      currentOrder.upgrades.extraRaita ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Salad Add-ons</h4>
                  <p className="text-sm text-gray-600">Extra veggies & dressing</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">+₹20</span>
                  <button
                    onClick={() => handleUpgradeToggle('saladAddons')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      currentOrder.upgrades.saladAddons ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      currentOrder.upgrades.saladAddons ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </StepCard>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-3 max-w-md mx-auto">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              Back
            </Button>
          )}
          <Button onClick={handleNext} className="flex-1">
            {currentStep === 2 ? 'Review Order' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};