import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  MapPin,
  Timer,
  Calendar,
  Route,
  Share,
  Sun,
  CloudRain,
  Cloud,
  Zap
} from 'lucide-react';
import { mockTrips, getPersonalBest, mockWeeklyStats } from '@/lib/mockData';
import { InsightHeroCard } from '@/components/insights/InsightHeroCard';
import { SmartSuggestions } from '@/components/insights/SmartSuggestions';
import { getTripInsights, getRouteOptimizationInsights } from '@/lib/mockInsights';

interface TripSummaryScreenProps {
  onBack: () => void;
  tripId?: string; // Add tripId prop to show specific trip
}

export function TripSummaryScreen({ onBack, tripId }: TripSummaryScreenProps) {
  // Get specific trip by ID, or default to today's trip
  const tripData = tripId 
    ? mockTrips.find(trip => trip.id === tripId) 
    : mockTrips.find(trip => trip.day === 'Today');
    
  const personalBest = getPersonalBest();
  
  // Generate insights for this trip (BELOW trip data)
  const tripInsights = tripData ? getTripInsights(
    parseInt(tripData.time.split(':')[0]) * 60 + parseInt(tripData.time.split(':')[1]),
    25 * 60 // average 25 minutes
  ) : [];
  
  const routeOptimizationInsights = getRouteOptimizationInsights();
  
  // Create suggestions based on trip performance
  const tripSuggestions = tripData ? [
    {
      id: 'timing-1',
      type: 'timing' as const,
      title: 'Optimal departure time',
      description: `Based on this trip, try leaving at ${tripData.departureTime === '8:30 AM' ? '8:25 AM' : '8:30 AM'}`,
      savings: '2-3 min'
    },
    {
      id: 'pattern-1', 
      type: 'pattern' as const,
      title: 'Day-of-week insight',
      description: `${tripData.day} trips are typically ${tripData.deltaType === 'faster' ? 'faster' : 'slower'} than average`,
      savings: tripData.delta
    }
  ] : [];

  if (!tripData) {
    return (
      <div className="min-h-screen bg-gradient-surface flex items-center justify-center px-6">
        <Card className="p-8 text-center max-w-sm">
          <Timer className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Trip not found</h2>
          <p className="text-muted-foreground mb-4">The selected trip could not be loaded</p>
          <Button onClick={onBack}>Go Back</Button>
        </Card>
      </div>
    );
  }

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
      case 'sunny': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'rainy': return <CloudRain className="w-5 h-5 text-blue-500" />;
      case 'cloudy': return <Cloud className="w-5 h-5 text-gray-500" />;
      default: return <Cloud className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button variant="ghost" size="sm">
          <Share className="w-4 h-4" />
        </Button>
      </div>

      {/* Trip Overview */}
      <div className="px-6 pb-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">{tripData.day}</h1>
          <p className="text-muted-foreground">{tripData.date} • {tripData.departureTime} - {tripData.arrivalTime}</p>
          <div className="mt-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              tripData.direction === 'to-office' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-purple-100 text-purple-800'
            }`}>
              {tripData.direction === 'to-office' ? '🏢 To Office' : '🏠 To Home'}
            </span>
          </div>
        </div>

        {/* Main Trip Card */}
        <Card className="p-6 bg-gradient-card shadow-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Route className="w-5 h-5 text-primary" />
              <span className="font-medium">Trip Summary</span>
            </div>
            <div className="flex items-center gap-2">
              {getWeatherIcon(tripData.weather)}
              <span className="text-sm text-muted-foreground capitalize">{tripData.weather}</span>
            </div>
          </div>

          {/* Main Time Display */}
          <div className="text-center py-6 border-b border-border mb-6">
            <div className="text-5xl font-bold text-foreground mb-3">
              {tripData.time}
            </div>
            <div className={`flex items-center justify-center gap-2 text-xl font-medium ${getDeltaColor(tripData.deltaType)}`}>
              {getDeltaIcon(tripData.deltaType)}
              <span>{tripData.delta} vs usual</span>
            </div>
            {tripData.notes && (
              <p className="text-sm text-muted-foreground mt-2 italic">
                {tripData.notes}
              </p>
            )}
          </div>

          {/* Trip Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Distance</div>
              <div className="text-lg font-semibold text-foreground">{tripData.distance}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Avg Speed</div>
              <div className="text-lg font-semibold text-foreground">{tripData.averageSpeed}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Traffic</div>
              <div className={`text-lg font-semibold capitalize ${
                tripData.traffic === 'light' ? 'text-green-600' :
                tripData.traffic === 'moderate' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {tripData.traffic}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Departure</div>
              <div className="text-lg font-semibold text-foreground">{tripData.departureTime}</div>
            </div>
          </div>
        </Card>

        {/* Sector Breakdown */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Route Sectors</h2>
          <div className="space-y-3">
            {tripData.sectors.map((sector, index) => (
              <Card key={sector.id} className="p-4 bg-background shadow-soft animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm">{sector.name}</div>
                      <div className="text-xs text-muted-foreground">{sector.distance}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">{sector.time}</div>
                    <div className={`flex items-center gap-1 text-xs ${getDeltaColor(sector.deltaType)}`}>
                      {getDeltaIcon(sector.deltaType)}
                      <span>{sector.delta}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Traffic:</span>
                  <span className={`capitalize font-medium ${
                    sector.traffic === 'light' ? 'text-green-600' :
                    sector.traffic === 'moderate' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {sector.traffic}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-4 bg-background shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">vs Personal Best</div>
                <div className="font-semibold text-foreground">{personalBest.time}</div>
                <div className="text-xs text-muted-foreground">{personalBest.date}</div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${
                  tripData.duration <= personalBest.duration ? 'text-success' : 'text-warning'
                }`}>
                  {tripData.duration <= personalBest.duration ? '🏆' : 
                    `+${Math.floor((tripData.duration - personalBest.duration) / 60000)}:${String(Math.floor(((tripData.duration - personalBest.duration) % 60000) / 1000)).padStart(2, '0')}`
                  }
                </div>
                <div className="text-xs text-muted-foreground">
                  {tripData.duration <= personalBest.duration ? 'New best!' : 'slower'}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-background shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">vs Weekly Average</div>
                <div className="font-semibold text-foreground">{mockWeeklyStats.averageTime}</div>
                <div className="text-xs text-muted-foreground">This week</div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${getDeltaColor(tripData.deltaType)}`}>
                  {tripData.delta}
                </div>
                <div className="text-xs text-muted-foreground">{tripData.deltaType}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
