import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Building2, 
  GraduationCap, 
  MapPin, 
  ArrowRight, 
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';

interface RouteSetupProps {
  onComplete: () => void;
}

type DestinationType = 'office' | 'school' | 'other' | null;

export function RouteSetup({ onComplete }: RouteSetupProps) {
  const [selectedDestination, setSelectedDestination] = useState<DestinationType>(null);
  const [step, setStep] = useState<'destination' | 'ready' | 'complete'>('destination');

  const destinationOptions = [
    {
      type: 'office' as DestinationType,
      icon: Building2,
      title: 'Office/Work',
      subtitle: 'Your workplace or office building',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      type: 'school' as DestinationType,
      icon: GraduationCap,
      title: 'School/University',
      subtitle: 'Your campus or educational institution',
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      type: 'other' as DestinationType,
      icon: MapPin,
      title: 'Other Location',
      subtitle: 'Any other regular destination',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    }
  ];

  const handleDestinationSelect = (type: DestinationType) => {
    setSelectedDestination(type);
    setStep('ready');
  };

  const handleStartTracking = () => {
    // Store destination type for later use
    localStorage.setItem('pendingDestinationType', selectedDestination || 'office');
    localStorage.setItem('setupComplete', 'true');
    onComplete();
  };

  const getDestinationLabel = (type: DestinationType) => {
    switch (type) {
      case 'office': return 'Office';
      case 'school': return 'School';
      case 'other': return 'Destination';
      default: return 'Destination';
    }
  };

  if (step === 'destination') {
    return (
      <div className="min-h-screen bg-gradient-surface flex flex-col">
        {/* Header */}
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Where do you commute to?
          </h1>
          <p className="text-muted-foreground">
            We'll learn your exact route on your first trip
          </p>
        </div>

        {/* Destination Options */}
        <div className="flex-1 px-6 flex items-center justify-center">
          <div className="w-full max-w-sm space-y-4">
            {destinationOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <Card
                  key={option.type}
                  className={`p-4 cursor-pointer transition-all duration-200 border-2 ${option.color}`}
                  onClick={() => handleDestinationSelect(option.type)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{option.title}</h3>
                      <p className="text-sm text-muted-foreground">{option.subtitle}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Smart Auto-Detection</p>
                <p className="text-xs text-blue-700 mt-1">
                  No need to input addresses. We'll automatically detect your route during your first trip.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'ready') {
    return (
      <div className="min-h-screen bg-gradient-surface flex flex-col">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-success-light rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Ready to Track!
          </h1>
          <p className="text-muted-foreground">
            Your route to {getDestinationLabel(selectedDestination)} will be learned automatically
          </p>
        </div>

        {/* Instructions */}
        <div className="flex-1 px-6 flex items-center justify-center">
          <div className="w-full max-w-sm space-y-6">
            
            {/* How it works */}
            <Card className="p-6 bg-gradient-card">
              <h3 className="font-semibold text-foreground mb-4 text-center">How it works:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Start your trip</p>
                    <p className="text-xs text-muted-foreground">When you're ready to commute</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                  <div>
                    <p className="text-sm font-medium text-foreground">We learn your route</p>
                    <p className="text-xs text-muted-foreground">Automatic detection, no input needed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Get insights</p>
                    <p className="text-xs text-muted-foreground">Optimize your future commutes</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick tip */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Pro Tip</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Start tracking during your normal commute time for the most accurate learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 space-y-3">
          <Button 
            onClick={handleStartTracking}
            className="w-full h-12 text-base font-medium"
            size="lg"
          >
            Start Smart Tracking
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => setStep('destination')}
            className="w-full"
          >
            Back to Destination
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
