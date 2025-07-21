import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  CheckCircle, 
  Trophy, 
  Clock, 
  MapPin, 
  Gauge,
  TrendingUp,
  TrendingDown,
  Share,
  Home
} from 'lucide-react';

interface TripCompletionScreenProps {
  tripData: {
    duration: number;
    distance: string;
    averageSpeed: string;
    status: 'completed' | 'stopped';
    progress?: number;
    sectors?: any[];
  };
  onBackToHome: () => void;
  onViewDetails: () => void;
}

export function TripCompletionScreen({ tripData, onBackToHome, onViewDetails }: TripCompletionScreenProps) {
  const [showCelebration, setShowCelebration] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    // Celebration animation sequence
    const timer1 = setTimeout(() => setAnimationPhase(1), 500);
    const timer2 = setTimeout(() => setAnimationPhase(2), 1000);
    const timer3 = setTimeout(() => setShowCelebration(false), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getDeltaComparison = () => {
    const actualDuration = tripData.duration;
    const expectedDuration = (25 * 60 * 1000) / 10; // 2.5 minutes for demo
    const delta = actualDuration - expectedDuration;
    
    // For stopped trips, show different messaging
    if (tripData.status === 'stopped') {
      const progress = tripData.progress || 0;
      return { 
        text: `${Math.round(progress * 100)}% completed`, 
        type: 'stopped' as const, 
        icon: Clock 
      };
    }
    
    if (Math.abs(delta) < 5000) { // Within 5 seconds for demo
      return { text: 'Perfect timing!', type: 'same' as const, icon: Clock };
    } else if (delta < 0) {
      const deltaMin = Math.floor(Math.abs(delta) / 60000);
      const deltaSec = Math.floor((Math.abs(delta) % 60000) / 1000);
      return { 
        text: `-${deltaMin}:${deltaSec.toString().padStart(2, '0')}`, 
        type: 'faster' as const, 
        icon: TrendingDown 
      };
    } else {
      const deltaMin = Math.floor(delta / 60000);
      const deltaSec = Math.floor((delta % 60000) / 1000);
      return { 
        text: `+${deltaMin}:${deltaSec.toString().padStart(2, '0')}`, 
        type: 'slower' as const, 
        icon: TrendingUp 
      };
    }
  };

  const delta = getDeltaComparison();
  const DeltaIcon = delta.icon;

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-surface flex items-center justify-center px-6">
        <div className="text-center">
          {/* Celebration Animation */}
          <div className={`transition-all duration-1000 ${animationPhase >= 0 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            <div className="relative">
              <CheckCircle className="w-24 h-24 text-success mx-auto mb-4 animate-bounce-gentle" />
              
              {/* Confetti Effect */}
              {animationPhase >= 1 && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '0ms' }}></div>
                  <div className="absolute top-4 right-1/4 w-2 h-2 bg-success rounded-full animate-ping" style={{ animationDelay: '200ms' }}></div>
                  <div className="absolute top-8 left-1/3 w-2 h-2 bg-warning rounded-full animate-ping" style={{ animationDelay: '400ms' }}></div>
                  <div className="absolute top-2 right-1/3 w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '600ms' }}></div>
                </div>
              )}
            </div>
          </div>

          {animationPhase >= 1 && (
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {tripData.status === 'completed' ? 'Trip Completed!' : 'Trip Stopped'}
              </h1>
              <p className="text-muted-foreground mb-6">
                {tripData.status === 'completed' 
                  ? "You've arrived at Menara BJB" 
                  : `Trip ended at ${Math.round((tripData.progress || 0) * 100)}% progress`
                }
              </p>
            </div>
          )}

          {animationPhase >= 2 && (
            <div className="animate-slide-up">
              <div className="text-5xl font-bold text-primary mb-2">
                {formatDuration(tripData.duration)}
              </div>
              <div className={`flex items-center justify-center gap-2 text-lg font-medium ${
                delta.type === 'faster' ? 'text-success' :
                delta.type === 'slower' ? 'text-warning' : 'text-muted-foreground'
              }`}>
                <DeltaIcon className="w-5 h-5" />
                <span>{delta.text} vs usual</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <div className="text-center p-6 pb-4">
        <div className="w-16 h-16 bg-success-light rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Trip Summary</h1>
        <p className="text-muted-foreground">Telkom University → Menara BJB</p>
      </div>

      {/* Main Stats */}
      <div className="px-6 pb-24">{/* Added pb-24 for navbar space */}
        <Card className="p-6 bg-gradient-card shadow-card mb-6 text-center">
          <div className="text-4xl font-bold text-foreground mb-3">
            {formatDuration(tripData.duration)}
          </div>
          <div className={`flex items-center justify-center gap-2 text-xl font-medium mb-4 ${
            delta.type === 'faster' ? 'text-success' :
            delta.type === 'slower' ? 'text-warning' : 'text-muted-foreground'
          }`}>
            <DeltaIcon className="w-5 h-5" />
            <span>{delta.text} vs usual</span>
          </div>
          
          {delta.type === 'faster' && (
            <div className="p-3 bg-success-light rounded-lg">
              <p className="text-sm text-success-foreground">
                🎉 Great job! You beat your usual time!
              </p>
            </div>
          )}
          
          {delta.type === 'same' && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                ⏰ Perfect timing! Right on schedule.
              </p>
            </div>
          )}
        </Card>

        {/* Trip Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 bg-background shadow-soft text-center">
            <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-lg font-bold text-foreground">{tripData.distance}</div>
            <div className="text-sm text-muted-foreground">Distance</div>
          </Card>

          <Card className="p-4 bg-background shadow-soft text-center">
            <Gauge className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-lg font-bold text-foreground">{tripData.averageSpeed}</div>
            <div className="text-sm text-muted-foreground">Avg Speed</div>
          </Card>
        </div>

        {/* Achievement Badge */}
        <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="font-semibold text-purple-800">Morning Commuter</div>
              <div className="text-sm text-purple-600">Completed trip during peak hours</div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={onViewDetails}
            variant="default"
            className="w-full h-12"
          >
            View Detailed Breakdown
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline"
              className="h-12"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            
            <Button 
              onClick={onBackToHome}
              variant="outline"
              className="h-12"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
