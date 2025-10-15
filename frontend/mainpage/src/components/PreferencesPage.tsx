import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface PreferencesPageProps {
  onNavigate: (page: string) => void;
}

export function PreferencesPage({ onNavigate }: PreferencesPageProps) {
  const [step, setStep] = useState(1);
  const [selectedVendorTypes, setSelectedVendorTypes] = useState<string[]>([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);

  const vendorTypes = [
    { id: 'catering', name: 'Catering & Food Services', icon: '🍽️' },
    { id: 'photography', name: 'Photography & Videography', icon: '📸' },
    { id: 'entertainment', name: 'Entertainment & Music', icon: '🎵' },
    { id: 'venues', name: 'Venues & Locations', icon: '🏛️' },
    { id: 'decoration', name: 'Decoration & Florals', icon: '🌸' },
    { id: 'lighting', name: 'Lighting & AV Equipment', icon: '💡' },
    { id: 'transportation', name: 'Transportation', icon: '🚗' },
    { id: 'security', name: 'Security Services', icon: '🔒' },
    { id: 'printing', name: 'Printing & Signage', icon: '🖨️' },
    { id: 'rentals', name: 'Equipment Rentals', icon: '🎪' },
    { id: 'planning', name: 'Event Planning', icon: '📋' },
    { id: 'cleanup', name: 'Cleaning Services', icon: '🧹' }
  ];

  const eventTypes = [
    { id: 'corporate', name: 'Corporate Events', icon: '🏢' },
    { id: 'weddings', name: 'Weddings', icon: '💍' },
    { id: 'birthdays', name: 'Birthday Parties', icon: '🎂' },
    { id: 'conferences', name: 'Conferences & Seminars', icon: '🎤' },
    { id: 'trade-shows', name: 'Trade Shows', icon: '🏪' },
    { id: 'fundraisers', name: 'Fundraisers & Galas', icon: '🎗️' },
    { id: 'festivals', name: 'Festivals & Fairs', icon: '🎡' },
    { id: 'sports', name: 'Sports Events', icon: '⚽' },
    { id: 'concerts', name: 'Concerts & Shows', icon: '🎭' },
    { id: 'graduations', name: 'Graduations', icon: '🎓' },
    { id: 'baby-showers', name: 'Baby Showers', icon: '🍼' },
    { id: 'reunions', name: 'Reunions', icon: '👥' }
  ];

  const toggleSelection = (item: string, list: string[], setList: (items: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Complete onboarding
      onNavigate('home');
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSkip = () => {
    onNavigate('home');
  };

  const getProgressValue = () => {
    return (step / 2) * 100;
  };

  return (
    <div className="min-h-screen bg-amber-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 border-2 border-gray-800 rounded-full"></div>
            <h1 className="text-2xl">event sense</h1>
          </div>
          <p className="text-gray-600 mb-6">Let's personalize your experience</p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
              <span>Step {step} of 2</span>
              <span>{Math.round(getProgressValue())}% complete</span>
            </div>
            <Progress value={getProgressValue()} className="h-2" />
          </div>
        </div>

        {/* Step 1: Vendor Types */}
        {step === 1 && (
          <Card className="p-8 border-2 border-gray-800 bg-white">
            <div className="text-center mb-8">
              <h2 className="mb-2">What types of vendors do you typically work with?</h2>
              <p className="text-gray-600">Select all that apply to help us show you relevant vendors</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {vendorTypes.map((vendor) => (
                <Card
                  key={vendor.id}
                  className={`p-4 border-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedVendorTypes.includes(vendor.id)
                      ? 'border-gray-800 bg-gray-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  onClick={() => toggleSelection(vendor.id, selectedVendorTypes, setSelectedVendorTypes)}
                >
                  <div className="text-center space-y-2">
                    <div className="text-2xl">{vendor.icon}</div>
                    <div className="text-sm">{vendor.name}</div>
                    {selectedVendorTypes.includes(vendor.id) && (
                      <div className="flex justify-center">
                        <Check size={16} className="text-gray-800" />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Badge variant="outline" className="mb-4">
                {selectedVendorTypes.length} vendor types selected
              </Badge>
            </div>
          </Card>
        )}

        {/* Step 2: Event Types */}
        {step === 2 && (
          <Card className="p-8 border-2 border-gray-800 bg-white">
            <div className="text-center mb-8">
              <h2 className="mb-2">What types of events do you organize?</h2>
              <p className="text-gray-600">This helps us tailor recommendations and AI assistance</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {eventTypes.map((event) => (
                <Card
                  key={event.id}
                  className={`p-4 border-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedEventTypes.includes(event.id)
                      ? 'border-gray-800 bg-gray-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  onClick={() => toggleSelection(event.id, selectedEventTypes, setSelectedEventTypes)}
                >
                  <div className="text-center space-y-2">
                    <div className="text-2xl">{event.icon}</div>
                    <div className="text-sm">{event.name}</div>
                    {selectedEventTypes.includes(event.id) && (
                      <div className="flex justify-center">
                        <Check size={16} className="text-gray-800" />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Badge variant="outline" className="mb-4">
                {selectedEventTypes.length} event types selected
              </Badge>
            </div>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-4">
            {step === 2 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2 border-2 border-gray-300"
              >
                <ArrowLeft size={16} />
                Back
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700"
            >
              Skip for now
            </Button>
          </div>

          <Button
            onClick={handleNext}
            className="bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-2"
            disabled={step === 1 && selectedVendorTypes.length === 0}
          >
            {step === 1 ? (
              <>
                Next
                <ArrowRight size={16} />
              </>
            ) : (
              <>
                Get Started
                <Check size={16} />
              </>
            )}
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center mt-6 text-sm text-gray-500">
          You can always update these preferences later in your account settings
        </div>
      </div>
    </div>
  );
}