import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Calendar,
  Clock,
  Lightbulb,
  ArrowLeft,
  Route,
  Timer
} from 'lucide-react';
import { mockTrips, mockRoutes, getTripsByDirection, mockWeeklyStats } from '@/lib/mockData';

interface AnalyticsScreenProps {
  onBack: () => void;
}

export function AnalyticsScreen({ onBack }: AnalyticsScreenProps) {
  const [selectedRoute, setSelectedRoute] = useState<string>('route-to-office');
  
  // Get trips by direction for analytics
  const toOfficeTrips = getTripsByDirection('to-office');
  const toHomeTrips = getTripsByDirection('to-home');
  
  // Calculate route-specific stats
  const getRouteStats = (direction: 'to-office' | 'to-home') => {
    const trips = getTripsByDirection(direction);
    if (trips.length === 0) return null;
    
    const durations = trips.map(trip => trip.duration);
    const avgDuration = durations.reduce((sum, d) => sum + d, 0) / durations.length;
    const bestTime = Math.min(...durations);
    const worstTime = Math.max(...durations);
    
    return {
      totalTrips: trips.length,
      averageTime: Math.floor(avgDuration / 60000) + ':' + String(Math.floor((avgDuration % 60000) / 1000)).padStart(2, '0'),
      bestTime: Math.floor(bestTime / 60000) + ':' + String(Math.floor((bestTime % 60000) / 1000)).padStart(2, '0'),
      worstTime: Math.floor(worstTime / 60000) + ':' + String(Math.floor((worstTime % 60000) / 1000)).padStart(2, '0'),
      consistency: Math.round(100 - ((worstTime - bestTime) / avgDuration * 100))
    };
  };
  
  const toOfficeStats = getRouteStats('to-office');
  const toHomeStats = getRouteStats('to-home');
  const selectedStats = selectedRoute === 'route-to-office' ? toOfficeStats : toHomeStats;
  const selectedTrips = selectedRoute === 'route-to-office' ? toOfficeTrips : toHomeTrips;

  return (
    <div className="min-h-screen bg-gradient-surface pb-20 md:pb-6">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
            <p className="text-sm text-muted-foreground">Your commute insights</p>
          </div>
        </div>

        {/* Route Selector */}
        <div className="flex bg-muted rounded-lg p-1 mb-6">
          <Button
            variant={selectedRoute === 'route-to-office' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedRoute('route-to-office')}
            className="flex-1"
          >
            🏢 To Office
          </Button>
          <Button
            variant={selectedRoute === 'route-to-home' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedRoute('route-to-home')}
            className="flex-1"
          >
            🏠 To Home
          </Button>
        </div>

        {/* Route Stats Overview */}
        {selectedStats && (
          <Card className="p-6 bg-gradient-card shadow-card mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Route className="w-5 h-5 text-primary" />
              <span className="font-medium">
                {selectedRoute === 'route-to-office' ? 'Telkom University → Menara BJB' : 'Menara BJB → Telkom University'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{selectedStats.totalTrips}</div>
                <div className="text-sm text-muted-foreground">Total Trips</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{selectedStats.averageTime}</div>
                <div className="text-sm text-muted-foreground">Average Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{selectedStats.bestTime}</div>
                <div className="text-sm text-muted-foreground">Best Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{selectedStats.worstTime}</div>
                <div className="text-sm text-muted-foreground">Worst Time</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Consistency Score</span>
                <span className="font-semibold text-foreground">{selectedStats.consistency}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${selectedStats.consistency}%` }}
                ></div>
              </div>
            </div>
          </Card>
        )}

        {/* Recent Trips for Selected Route */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Trips</h2>
          <div className="space-y-3">
            {selectedTrips.slice(0, 3).map((trip, index) => (
              <Card key={trip.id} className="p-4 bg-background shadow-soft">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{trip.day}</div>
                      <div className="text-sm text-muted-foreground">{trip.date} • {trip.departureTime}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">{trip.time}</div>
                    <div className={`text-sm ${
                      trip.deltaType === 'faster' ? 'text-success' :
                      trip.deltaType === 'slower' ? 'text-warning' : 'text-muted-foreground'
                    }`}>
                      {trip.delta}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Insights */}
        <Card className="p-6 bg-background shadow-soft">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-primary" />
            <span className="font-medium">Insights</span>
          </div>
          
          <div className="space-y-3">
            {selectedRoute === 'route-to-office' ? (
              <>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    🌅 Your best departure time is around 7:05 AM for optimal traffic conditions.
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    ⚡ Sector 1 (Telkom to Batununggal) shows the most variation - consider alternative routes during peak hours.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-800">
                    🚦 Evening commutes are 76% more variable than morning trips due to traffic patterns.
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800">
                    📍 Sectors 2 & 3 (Pelajar Pejuang → Suryalaya → Home) fluctuate the most in evening traffic.
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
