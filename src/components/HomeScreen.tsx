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
  Cloud
} from 'lucide-react';

interface CommuteData {
  todayTime: string;
  delta: string;
  deltaType: 'faster' | 'slower' | 'same';
  departureTime: string;
  usualDeparture: string;
  sectors: Array<{
    name: string;
    time: string;
    delta: string;
    deltaType: 'faster' | 'slower' | 'same';
  }>;
  weeklyAverage: string;
  bestTime: string;
  weather: 'sunny' | 'cloudy' | 'rainy';
  traffic: 'light' | 'moderate' | 'heavy';
  hasActiveTrip: boolean;
  currentTripProgress?: {
    currentSector: string;
    elapsedTime: string;
    estimatedRemaining: string;
  };
}

interface HomeScreenProps {
  onViewHistory: () => void;
  onViewTrip: () => void;
}

export function HomeScreen({ onViewHistory, onViewTrip }: HomeScreenProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced mock data with more realistic scenarios
  const [commuteData] = useState<CommuteData>({
    todayTime: "21:45",
    delta: "-1:27",
    deltaType: "faster",
    departureTime: "07:52",
    usualDeparture: "08:05",
    sectors: [
      { name: "Home to Dago", time: "6:30", delta: "-0:15", deltaType: "faster" },
      { name: "Dago to Pasteur", time: "8:45", delta: "-0:52", deltaType: "faster" },
      { name: "Pasteur to Office", time: "6:30", delta: "-0:20", deltaType: "faster" }
    ],
    weeklyAverage: "23:12",
    bestTime: "19:33",
    weather: 'sunny',
    traffic: 'light',
    hasActiveTrip: false, // Set to true to test active trip UI
    currentTripProgress: {
      currentSector: "Dago to Pasteur",
      elapsedTime: "14:22",
      estimatedRemaining: "8:15"
    }
  });

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
      case 'cloudy': return <Cloud className="w-4 h-4 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-4 h-4 text-blue-500" />;
      default: return <Sun className="w-4 h-4" />;
    }
  };

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case 'light': return 'text-success';
      case 'moderate': return 'text-warning';
      case 'heavy': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-surface pb-20 md:pb-6">
        <div className="px-6 pt-6 pb-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-48"></div>
            <div className="h-4 bg-muted rounded w-32"></div>
            <div className="h-48 bg-muted rounded-2xl"></div>
            <div className="space-y-3">
              <div className="h-16 bg-muted rounded-xl"></div>
              <div className="h-16 bg-muted rounded-xl"></div>
              <div className="h-16 bg-muted rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface pb-20 md:pb-6">
      {/* Header */}
      <div className="px-6 pt-6 pb-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{getGreeting()}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Here's your commute update</span>
              {getWeatherIcon(commuteData.weather)}
              <span className={`text-xs ${getTrafficColor(commuteData.traffic)}`}>
                {commuteData.traffic} traffic
              </span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onViewHistory}>
            <Calendar className="w-4 h-4" />
          </Button>
        </div>

        {/* Active Trip Progress (if tracking) */}
        {commuteData.hasActiveTrip && commuteData.currentTripProgress && (
          <Card className="p-4 mb-6 bg-gradient-primary shadow-card animate-pulse">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Trip in Progress</span>
              </div>
              <span className="text-white/80 text-sm">
                {commuteData.currentTripProgress.elapsedTime}
              </span>
            </div>
            <div className="space-y-2">
              <div className="text-white/90 text-sm">
                Current: {commuteData.currentTripProgress.currentSector}
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full w-2/3 transition-all duration-300"></div>
              </div>
              <div className="text-white/80 text-xs">
                Est. {commuteData.currentTripProgress.estimatedRemaining} remaining
              </div>
            </div>
          </Card>
        )}

        {/* Today's Summary Card */}
        <Card className="p-6 bg-gradient-card shadow-card animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">
                {commuteData.hasActiveTrip ? "Current Trip" : "Latest Commute"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
              {commuteData.deltaType === 'faster' && (
                <Zap className="w-4 h-4 text-success" />
              )}
            </div>
          </div>

          <div className="space-y-4">
            {/* Main Time Display */}
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-foreground mb-2 transition-all duration-300">
                {commuteData.todayTime}
              </div>
              <div className={`flex items-center justify-center gap-1 text-lg font-medium ${getDeltaColor(commuteData.deltaType)} transition-colors duration-300`}>
                {getDeltaIcon(commuteData.deltaType)}
                <span>{commuteData.delta} vs usual</span>
              </div>
              {commuteData.deltaType === 'faster' && (
                <div className="text-xs text-success mt-1 animate-fade-in">
                  Great job! You beat your average time
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">You left</div>
                <div className="font-semibold text-foreground">{commuteData.departureTime}</div>
                <div className="text-xs text-muted-foreground">
                  (usual: {commuteData.usualDeparture})
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Personal best</div>
                <div className="font-semibold text-foreground">{commuteData.bestTime}</div>
                <div className="text-xs text-success">Your record</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Button */}
        <Button 
          onClick={onViewTrip}
          variant="soft"
          className="w-full mt-4 h-12 transition-all duration-200 hover:scale-[1.02]"
        >
          View detailed breakdown
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Sectors Preview */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Route Sectors</h2>
          <span className="text-xs text-muted-foreground">
            {commuteData.sectors.length} segments
          </span>
        </div>
        <div className="space-y-3">
          {commuteData.sectors.map((sector, index) => (
            <Card 
              key={index} 
              className="p-4 bg-background shadow-soft animate-slide-up transition-all duration-200 hover:shadow-card" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
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
              <div className="text-lg font-semibold text-foreground">{commuteData.weeklyAverage}</div>
              <div className="text-xs text-muted-foreground">5 trips</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Best</div>
              <div className="text-lg font-semibold text-success">{commuteData.bestTime}</div>
              <div className="text-xs text-success">Tuesday</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Consistency</div>
              <div className="text-lg font-semibold text-primary">87%</div>
              <div className="text-xs text-primary">Great!</div>
            </div>
          </div>

          {/* Mini progress bar for consistency */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Consistency Score</span>
              <span>87%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-[87%] transition-all duration-500"></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
