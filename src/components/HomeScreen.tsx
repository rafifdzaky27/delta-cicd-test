import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  ArrowRight,
  MapPin,
  Timer,
  Activity,
  Zap,
  CloudRain,
  Sun,
  Cloud,
  Play
} from 'lucide-react';
import { getTodaysTrip, mockWeeklyStats, weatherIcons, trafficColors } from '@/lib/mockData';
// Phase 2: Quick Preview Component  
import { PredictiveInsights } from '@/components/analytics/PredictiveInsights';

interface HomeScreenProps {
  onViewHistory: () => void;
  onViewTrip: () => void;
  onStartMockTrip?: () => void;
  onReturnToLiveTrip?: () => void;
  backgroundTripRunning?: boolean;
  backgroundTripProgress?: number;
  onUpdateBackgroundProgress?: (progress: number) => void; // Add callback to sync back
}

export function HomeScreen({ 
  onViewHistory, 
  onViewTrip, 
  onStartMockTrip, 
  onReturnToLiveTrip,
  backgroundTripRunning,
  backgroundTripProgress,
  onUpdateBackgroundProgress
}: HomeScreenProps) {
  const [todaysTrip] = useState(getTodaysTrip());
  const [isLoading, setIsLoading] = useState(true);
  const [liveSpeed, setLiveSpeed] = useState(42);
  const [liveETA, setLiveETA] = useState('--:--');
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);

  useEffect(() => {
    // Check if user has completed setup but no trips yet
    const setupComplete = localStorage.getItem('setupComplete');
    const hasTrips = todaysTrip !== null;
    
    setIsFirstTimeUser(setupComplete === 'true' && !hasTrips);
    
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [todaysTrip]);

  // Real-time timer for HomeScreen - WITH CLEAN LOGGING
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (backgroundTripRunning) {
      // Initialize with background progress
      setCurrentProgress(backgroundTripProgress || 0);
      
      interval = setInterval(() => {
        setCurrentProgress(prev => {
          // Calculate new progress (increment every second)
          const totalDuration = 150000; // 2.5 minutes in milliseconds
          const increment = 1000 / totalDuration; // Progress per second
          const newProgress = Math.min(prev + increment, 1.0);
          
          // Sync progress back to background state
          if (onUpdateBackgroundProgress) {
            onUpdateBackgroundProgress(newProgress);
          }
          
          return newProgress;
        });
        
        // Update other live data
        const baseSpeed = 42;
        const variation = Math.sin(Date.now() / 5000) * 8;
        setLiveSpeed(Math.max(30, baseSpeed + variation));
        
        // Calculate ETA based on current progress - use callback to get latest progress
        setCurrentProgress(currentProg => {
          const remainingTime = (1 - currentProg) * 150000;
          const eta = new Date(Date.now() + remainingTime);
          setLiveETA(eta.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          }));
          return currentProg; // Return same value, just using callback to get latest
        });
      }, 1000);
    } else {
      setCurrentProgress(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, [backgroundTripRunning]); // Remove currentProgress from dependency to avoid infinite loop

  // Calculate elapsed time from progress (sync with LiveTripScreen)
  const calculateElapsedFromProgress = (progress: number) => {
    const totalDuration = 150000; // 2.5 minutes in milliseconds
    return Math.floor(progress * totalDuration);
  };

  // Format elapsed time from milliseconds
  const formatElapsedTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getDeltaColor = (type: 'faster' | 'slower' | 'same') => {
    switch (type) {
      case 'faster': return 'text-success';
      case 'slower': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getDeltaIcon = (type: 'faster' | 'slower' | 'same') => {
    switch (type) {
      case 'faster': return <TrendingDown className="w-4 h-4" />;
      case 'slower': return <TrendingUp className="w-4 h-4" />;
      default: return <Timer className="w-4 h-4" />;
    }
  };

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'sunny': return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'rainy': return <CloudRain className="w-4 h-4 text-blue-500" />;
      case 'cloudy': return <Cloud className="w-4 h-4 text-gray-500" />;
      default: return <Cloud className="w-4 h-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-surface">
        <div className="px-6 pt-12 pb-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-48"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="space-y-3">
              <div className="h-16 bg-muted rounded"></div>
              <div className="h-16 bg-muted rounded"></div>
              <div className="h-16 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!todaysTrip) {
    return (
      <div className="min-h-screen bg-gradient-surface flex items-center justify-center px-6">
        <Card className="p-8 text-center max-w-sm">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No trips today</h2>
          <p className="text-muted-foreground mb-4">Start your commute to see your first trip</p>
          <Button onClick={onViewHistory} variant="outline">
            View History
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Good morning</h1>
            <p className="text-muted-foreground">Here's your commute update</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onViewHistory}>
            <Calendar className="w-4 h-4" />
          </Button>
        </div>

        {/* Today's Summary Card or Live Trip Card */}
        {backgroundTripRunning ? (
          /* Live Trip Card */
          <Card className="p-6 bg-gradient-to-r from-primary to-purple-600 text-white shadow-card animate-pulse-success">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                <span className="font-medium text-white">Live Trip in Progress</span>
              </div>
              <Button 
                onClick={onReturnToLiveTrip}
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                View Live
              </Button>
            </div>

            <div className="space-y-4">
              {/* Live Time Display - Using local progress */}
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-white mb-2">
                  {formatElapsedTime(calculateElapsedFromProgress(currentProgress))}
                </div>
                <div className="flex items-center justify-center gap-1 text-lg font-medium text-white/90">
                  <Activity className="w-4 h-4" />
                  <span>{Math.round(currentProgress * 100)}% completed</span>
                </div>
              </div>

              {/* Live Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/80">Route Progress</span>
                  <span className="text-white font-medium">{Math.round(currentProgress * 100)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div 
                    className="bg-white h-3 rounded-full transition-all duration-1000 relative"
                    style={{ width: `${currentProgress * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-primary shadow-lg"></div>
                  </div>
                </div>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <div className="text-sm text-white/80 mb-1">Current Speed</div>
                  <div className="font-semibold text-white">
                    {Math.round(liveSpeed)} km/h
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-white/80 mb-1">ETA</div>
                  <div className="font-semibold text-white">
                    {liveETA}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-white/80 mb-1">Remaining</div>
                  <div className="font-semibold text-white">
                    {(18.2 * (1 - currentProgress)).toFixed(1)} km
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-white/80 mb-1">Traffic</div>
                  <div className="font-semibold text-yellow-200">Moderate</div>
                </div>
              </div>
            </div>
          </Card>
        ) : isFirstTimeUser ? (
          /* First Time User - Start First Trip */
          <Card className="p-6 bg-gradient-primary shadow-card animate-scale-in">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Ready for your first trip?</h3>
                <p className="text-white/90 text-sm">
                  We'll automatically learn your route to {localStorage.getItem('pendingDestinationType') === 'school' ? 'school' : localStorage.getItem('pendingDestinationType') === 'other' ? 'your destination' : 'office'} during this trip.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span>Auto-detect start and end points</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span>Learn your route preferences</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span>Start getting insights immediately</span>
                </div>
              </div>

              <Button 
                onClick={onStartMockTrip}
                variant="secondary"
                className="w-full h-12 text-base font-medium bg-white text-primary hover:bg-white/90"
                size="lg"
              >
                <Play className="w-4 h-4 mr-2" />
                Start My First Trip
              </Button>
            </div>
          </Card>
        ) : todaysTrip ? (
          /* Regular Today's Commute Card */
          <Card className="p-6 bg-gradient-card shadow-card animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Today's Commute</span>
              </div>
              <div className="flex items-center gap-2">
                {getWeatherIcon(todaysTrip.weather)}
                <span className="text-sm text-muted-foreground capitalize">
                  {todaysTrip.weather}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Main Time Display */}
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-foreground mb-2">
                  {todaysTrip.time}
                </div>
                <div className={`flex items-center justify-center gap-1 text-lg font-medium ${getDeltaColor(todaysTrip.deltaType)}`}>
                  {getDeltaIcon(todaysTrip.deltaType)}
                  <span>{todaysTrip.delta} vs usual</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">You left</div>
                  <div className="font-semibold text-foreground">{todaysTrip.departureTime}</div>
                  <div className="text-xs text-muted-foreground">
                    (usual: {mockWeeklyStats.averageDeparture})
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Best time</div>
                  <div className="font-semibold text-foreground">{mockWeeklyStats.bestTime}</div>
                  <div className="text-xs text-success">Personal record</div>
                </div>
              </div>
            </div>
          </Card>
        ) : null}

        {/* Phase 2: Tomorrow's Prediction Preview */}
        <Card className="p-4 bg-gradient-card shadow-card mt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Tomorrow's Forecast</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('insights')}>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CloudRain className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm font-medium text-foreground">Light rain expected</div>
                <div className="text-xs text-muted-foreground">Leave 5 minutes earlier</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-foreground">23 min</div>
              <div className="text-xs text-muted-foreground">predicted</div>
            </div>
          </div>
        </Card>

        {/* Action Button - Hide when mock trip is running */}
        {!backgroundTripRunning && (
          <Button 
            onClick={onViewTrip}
            variant="soft"
            className="w-full mt-4 h-12"
          >
            View detailed breakdown
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}

        {/* Mock Trip Button */}
        {onStartMockTrip && (
          <Button 
            onClick={onStartMockTrip}
            disabled={backgroundTripRunning}
            variant="default"
            className="w-full mt-3 h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Activity className="w-4 h-4 mr-2" />
            {backgroundTripRunning ? 'Trip Already Running' : 'Start Mock Trip'}
          </Button>
        )}
      </div>

      {/* Sectors Preview */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Route Sectors</h2>
        <div className="space-y-3">
          {todaysTrip.sectors.map((sector, index) => (
            <Card key={index} className="p-4 bg-background shadow-soft animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">{sector.name}</div>
                    <div className="text-xs text-muted-foreground">{sector.time}</div>
                  </div>
                </div>
                <div className={`flex items-center gap-1 ${getDeltaColor(sector.deltaType)}`}>
                  {getDeltaIcon(sector.deltaType)}
                  <span className="text-sm font-medium">{sector.delta}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="px-6 pb-8">
        <Card className="p-6 bg-background shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">This Week</h3>
            <Button variant="ghost" size="sm" onClick={onViewHistory}>
              View all
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Average</div>
              <div className="text-lg font-semibold text-foreground">{mockWeeklyStats.averageTime}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Best</div>
              <div className="text-lg font-semibold text-success">{mockWeeklyStats.bestTime}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Trips</div>
              <div className="text-lg font-semibold text-foreground">{mockWeeklyStats.totalTrips}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
