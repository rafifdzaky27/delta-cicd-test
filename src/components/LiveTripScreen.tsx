import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Square,
  Navigation,
  Clock,
  Gauge,
  MapPin,
  Timer,
  Zap
} from 'lucide-react';

interface LiveTripScreenProps {
  onBack: () => void;
  onTripComplete: (tripData: any) => void;
  backgroundTripState?: {
    isRunning: boolean;
    startTime: number;
    elapsedTime: number;
    progress: number;
  };
  onUpdateBackgroundTrip?: (state: any) => void;
}

interface MockTripData {
  startTime: number;
  totalDuration: number; // in milliseconds
  sectors: {
    name: string;
    duration: number;
    startProgress: number;
    endProgress: number;
  }[];
}

export function LiveTripScreen({ 
  onBack, 
  onTripComplete, 
  backgroundTripState,
  onUpdateBackgroundTrip 
}: LiveTripScreenProps) {
  // Use background state if available, otherwise initialize
  const [isActive, setIsActive] = useState(backgroundTripState?.isRunning || false);
  const [elapsedTime, setElapsedTime] = useState(backgroundTripState?.elapsedTime || 0);
  const [currentProgress, setCurrentProgress] = useState(backgroundTripState?.progress || 0);
  const [currentSector, setCurrentSector] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [tripStartTime] = useState(backgroundTripState?.startTime || Date.now());

  // Accelerated time - 25 minutes becomes 2.5 minutes (10x speed)
  const SPEED_MULTIPLIER = 10;

  // Mock trip data for Telkom University → Menara BJB
  const mockTrip: MockTripData = {
    startTime: tripStartTime,
    totalDuration: (25 * 60 * 1000) / SPEED_MULTIPLIER, // 2.5 minutes for demo
    sectors: [
      {
        name: 'Telkom University to Batununggal Traffic Light',
        duration: (15 * 60 * 1000) / SPEED_MULTIPLIER, // 1.5 minutes
        startProgress: 0,
        endProgress: 0.6
      },
      {
        name: 'Batununggal to BKR Traffic Light',
        duration: (5 * 60 * 1000) / SPEED_MULTIPLIER, // 0.5 minutes
        startProgress: 0.6,
        endProgress: 0.8
      },
      {
        name: 'BKR Traffic Light to Menara BJB',
        duration: (5 * 60 * 1000) / SPEED_MULTIPLIER, // 0.5 minutes
        startProgress: 0.8,
        endProgress: 1.0
      }
    ]
  };

  // Timer simulation with background state sync
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setElapsedTime(prev => {
          const newElapsed = prev + 1000; // Add 1 second
          const progress = Math.min(newElapsed / mockTrip.totalDuration, 1);
          
          setCurrentProgress(progress);
          
          // Update background trip state
          if (onUpdateBackgroundTrip) {
            onUpdateBackgroundTrip({
              isRunning: true,
              startTime: tripStartTime,
              elapsedTime: newElapsed,
              progress: progress
            });
          }
          
          // Determine current sector
          const sector = mockTrip.sectors.findIndex(s => 
            progress >= s.startProgress && progress < s.endProgress
          );
          setCurrentSector(sector === -1 ? mockTrip.sectors.length - 1 : sector);
          
          // Simulate varying speed (35-50 km/h)
          const baseSpeed = 42;
          const variation = Math.sin(newElapsed / 5000) * 8; // Faster variation for demo
          setCurrentSpeed(Math.max(30, baseSpeed + variation));
          
          // Check if trip is complete
          if (progress >= 1) {
            setIsActive(false);
            const tripData = {
              duration: newElapsed,
              distance: '18.2 km',
              averageSpeed: '42.1 km/h',
              status: 'completed',
              sectors: mockTrip.sectors
            };
            
            // Clear background trip
            if (onUpdateBackgroundTrip) {
              onUpdateBackgroundTrip({
                isRunning: false,
                startTime: 0,
                elapsedTime: 0,
                progress: 0
              });
            }
            
            onTripComplete(tripData);
          }
          
          return newElapsed;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, mockTrip.totalDuration, onTripComplete, onUpdateBackgroundTrip, tripStartTime]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getETA = () => {
    const remainingTime = mockTrip.totalDuration - elapsedTime;
    const eta = new Date(Date.now() + remainingTime);
    return eta.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getRemainingDistance = () => {
    const totalDistance = 18.2; // km
    const remaining = totalDistance * (1 - currentProgress);
    return remaining.toFixed(1);
  };

  const handleStopTrip = () => {
    setIsActive(false);
    
    // Create trip data even for stopped trips
    const tripData = {
      duration: elapsedTime,
      distance: `${(18.2 * currentProgress).toFixed(1)} km`,
      averageSpeed: `${currentSpeed.toFixed(1)} km/h`,
      status: 'stopped',
      progress: currentProgress,
      sectors: mockTrip.sectors
    };
    
    // Clear background trip
    if (onUpdateBackgroundTrip) {
      onUpdateBackgroundTrip({
        isRunning: false,
        startTime: 0,
        elapsedTime: 0,
        progress: 0
      });
    }
    
    // Still show completion screen even for stopped trips
    onTripComplete(tripData);
  };

  const handleBackWithBackground = () => {
    // Update background state before going back
    if (onUpdateBackgroundTrip) {
      onUpdateBackgroundTrip({
        isRunning: isActive,
        startTime: tripStartTime,
        elapsedTime: elapsedTime,
        progress: currentProgress
      });
    }
    onBack();
  };

  const toggleTrip = () => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);
    
    // Update background state
    if (onUpdateBackgroundTrip) {
      onUpdateBackgroundTrip({
        isRunning: newActiveState,
        startTime: tripStartTime,
        elapsedTime: elapsedTime,
        progress: currentProgress
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <div className="relative flex items-center p-6 pb-4">
        <Button variant="ghost" size="sm" onClick={handleBackWithBackground} className="absolute left-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="w-full text-center">
          <h1 className="text-lg font-bold text-foreground">Trip in Progress</h1>
          <p className="text-sm text-muted-foreground">To Menara BJB</p>
        </div>
        <div className="absolute right-6 flex items-center">
          <Zap className="w-4 h-4 text-primary mr-1" />
          <span className="text-xs text-primary font-medium">10x</span>
        </div>
      </div>

      {/* Demo Speed Notice */}
      <div className="px-6 mb-4">
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 text-center">
            ⚡ Demo mode: 25-minute trip accelerated to 2.5 minutes
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-6">{/* Reduced padding since navbar is now present */}
        {/* Elapsed Time Display */}
        <Card className="p-6 bg-gradient-card shadow-card mb-6 text-center">
          <div className="text-4xl font-bold text-foreground mb-2">
            {formatTime(elapsedTime)}
          </div>
          <div className="text-sm text-muted-foreground">
            Elapsed Time
          </div>
        </Card>

        {/* Progress Bar */}
        <Card className="p-6 bg-background shadow-soft mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Route Progress</h2>
          
          {/* Overall Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Overall Progress</span>
              <span className="text-sm font-medium text-foreground">
                {Math.round(currentProgress * 100)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-primary h-3 rounded-full transition-all duration-1000 relative"
                style={{ width: `${currentProgress * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg"></div>
              </div>
            </div>
          </div>

          {/* Sectors */}
          <div className="space-y-3">
            {mockTrip.sectors.map((sector, index) => (
              <div key={index} className={`p-3 rounded-lg border-2 transition-all ${
                index === currentSector 
                  ? 'border-primary bg-primary-light' 
                  : index < currentSector 
                    ? 'border-success bg-success-light' 
                    : 'border-muted bg-muted'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === currentSector 
                        ? 'bg-primary text-primary-foreground' 
                        : index < currentSector 
                          ? 'bg-success text-success-foreground' 
                          : 'bg-muted-foreground text-muted'
                    }`}>
                      {index < currentSector ? '✓' : index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm">{sector.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatTime(sector.duration)} estimated
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {index === currentSector && (
                      <div className="text-xs text-primary font-medium">Current</div>
                    )}
                    {index < currentSector && (
                      <div className="text-xs text-success font-medium">Complete</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Live Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 bg-background shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Speed</span>
            </div>
            <div className="text-xl font-bold text-foreground">
              {currentSpeed.toFixed(0)} km/h
            </div>
          </Card>

          <Card className="p-4 bg-background shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">ETA</span>
            </div>
            <div className="text-xl font-bold text-foreground">
              {getETA()}
            </div>
          </Card>

          <Card className="p-4 bg-background shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Remaining</span>
            </div>
            <div className="text-xl font-bold text-foreground">
              {getRemainingDistance()} km
            </div>
          </Card>

          <Card className="p-4 bg-background shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <Navigation className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Traffic</span>
            </div>
            <div className="text-xl font-bold text-warning">
              Moderate
            </div>
          </Card>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={toggleTrip}
            variant={isActive ? "secondary" : "default"}
            className="flex-1 h-12"
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause Trip
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {elapsedTime > 0 ? 'Resume Trip' : 'Start Trip'}
              </>
            )}
          </Button>
          
          <Button
            onClick={handleStopTrip}
            variant="destructive"
            className="h-12"
          >
            <Square className="w-4 h-4 mr-2" />
            Stop
          </Button>
        </div>
      </div>
    </div>
  );
}
