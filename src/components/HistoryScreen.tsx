import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Calendar, 
  Filter,
  TrendingUp, 
  TrendingDown,
  Clock,
  Activity,
  BarChart3,
  Sun,
  CloudRain,
  Cloud
} from 'lucide-react';
import { mockTrips, mockWeeklyStats } from '@/lib/mockData';

interface HistoryScreenProps {
  onBack: () => void;
  onSelectTrip: (tripId: string) => void;
  onViewAnalytics?: () => void;
  onViewSettings?: () => void;
}

export function HistoryScreen({ onBack, onSelectTrip }: HistoryScreenProps) {
  const [viewMode, setViewMode] = useState<'list' | 'week'>('list');
  
  const trips = mockTrips;

  const getDeltaColor = (type: 'faster' | 'slower' | 'same') => {
    switch (type) {
      case 'faster': return 'text-success';
      case 'slower': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getDeltaIcon = (type: 'faster' | 'slower' | 'same') => {
    switch (type) {
      case 'faster': return <TrendingDown className="w-3 h-3" />;
      case 'slower': return <TrendingUp className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
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

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Trip History</h1>
            <p className="text-sm text-muted-foreground">{trips.length} trips recorded</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* View Toggle */}
      <div className="px-6 mb-6">
        <div className="flex bg-muted rounded-lg p-1">
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="flex-1"
          >
            <Activity className="w-4 h-4 mr-2" />
            List
          </Button>
          <Button
            variant={viewMode === 'week' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('week')}
            className="flex-1"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Weekly
          </Button>
        </div>
      </div>

      {viewMode === 'list' ? (
        /* Trip List View */
        <div className="px-6 pb-6">
          <div className="space-y-3">
            {trips.map((trip, index) => (
              <Card 
                key={trip.id} 
                className="p-4 bg-background shadow-soft cursor-pointer hover:shadow-card transition-shadow animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => onSelectTrip(trip.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{trip.day}</span>
                        {getWeatherIcon(trip.weather)}
                      </div>
                      <div className="text-sm text-muted-foreground">{trip.date} • {trip.departureTime}</div>
                      <div className="text-xs text-primary font-medium">
                        {trip.direction === 'to-office' ? '🏢 To Office' : '🏠 To Home'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">{trip.time}</div>
                    <div className={`flex items-center gap-1 text-sm ${getDeltaColor(trip.deltaType)}`}>
                      {getDeltaIcon(trip.deltaType)}
                      <span>{trip.delta}</span>
                    </div>
                  </div>
                </div>
                
                {/* Trip Details */}
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">
                        Distance: <span className="text-foreground font-medium">{trip.distance}</span>
                      </span>
                      <span className="text-muted-foreground">
                        Speed: <span className="text-foreground font-medium">{trip.averageSpeed}</span>
                      </span>
                    </div>
                    <span className={`capitalize font-medium ${
                      trip.traffic === 'light' ? 'text-green-600' :
                      trip.traffic === 'moderate' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {trip.traffic} traffic
                    </span>
                  </div>
                  {trip.notes && (
                    <p className="text-xs text-muted-foreground mt-2 italic">
                      {trip.notes}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* Weekly Stats View */
        <div className="px-6 pb-6">
          <Card className="p-6 bg-gradient-card shadow-card mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">This Week's Performance</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{mockWeeklyStats.totalTrips}</div>
                <div className="text-sm text-muted-foreground">Total Trips</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{mockWeeklyStats.averageTime}</div>
                <div className="text-sm text-muted-foreground">Average Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{mockWeeklyStats.bestTime}</div>
                <div className="text-sm text-muted-foreground">Best Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{mockWeeklyStats.worstTime}</div>
                <div className="text-sm text-muted-foreground">Worst Time</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Consistency Score</span>
                <span className="font-semibold text-foreground">{mockWeeklyStats.consistency}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${mockWeeklyStats.consistency}%` }}
                ></div>
              </div>
            </div>
          </Card>

          {/* Daily Breakdown */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Daily Breakdown</h3>
            {trips.map((trip, index) => (
              <Card key={trip.id} className="p-4 bg-background shadow-soft">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground uppercase">{trip.day.slice(0, 3)}</div>
                      <div className="text-sm font-semibold text-foreground">{trip.date.split(' ')[1]}</div>
                    </div>
                    <div className="w-px h-8 bg-border"></div>
                    <div>
                      <div className="font-medium text-foreground">{trip.time}</div>
                      <div className="text-xs text-muted-foreground">{trip.departureTime}</div>
                      <div className="text-xs text-primary font-medium">
                        {trip.direction === 'to-office' ? '🏢 To Office' : '🏠 To Home'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getWeatherIcon(trip.weather)}
                    <div className={`flex items-center gap-1 ${getDeltaColor(trip.deltaType)}`}>
                      {getDeltaIcon(trip.deltaType)}
                      <span className="text-sm font-medium">{trip.delta}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
