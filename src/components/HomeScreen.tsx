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
import { getTodaysTrip, mockWeeklyStats, weatherIcons, trafficColors } from '@/lib/mockData';

interface HomeScreenProps {
  onViewHistory: () => void;
  onViewTrip: () => void;
}

export function HomeScreen({ onViewHistory, onViewTrip }: HomeScreenProps) {
  const [todaysTrip] = useState(getTodaysTrip());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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

        {/* Today's Summary Card */}
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

        {/* Action Button */}
        <Button 
          onClick={onViewTrip}
          variant="soft"
          className="w-full mt-4 h-12"
        >
          View detailed breakdown
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
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
