import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CloudRain, 
  Sun,
  AlertTriangle,
  CheckCircle,
  Calendar,
  ArrowRight
} from 'lucide-react';

interface PredictionData {
  date: string;
  dayOfWeek: string;
  predictedDuration: string;
  confidence: 'high' | 'medium' | 'low';
  factors: {
    weather: {
      condition: 'sunny' | 'rainy' | 'cloudy';
      impact: 'positive' | 'negative' | 'neutral';
      description: string;
    };
    traffic: {
      level: 'light' | 'moderate' | 'heavy';
      impact: 'positive' | 'negative' | 'neutral';
      description: string;
    };
    pattern: {
      trend: 'faster' | 'slower' | 'normal';
      description: string;
    };
  };
  recommendation: {
    departureTime: string;
    reason: string;
    timeSaving: string;
  };
}

interface PredictiveInsightsProps {
  className?: string;
  route?: string;
  routeData?: any[];
}

export function PredictiveInsights({ className = '', route = 'route-to-office', routeData = [] }: PredictiveInsightsProps) {
  // Generate route-specific prediction data
  const isToOffice = route === 'route-to-office';
  const routeName = isToOffice ? 'Telkom University → Menara BJB' : 'Menara BJB → Telkom University';
  
  // Convert duration from milliseconds to minutes and calculate average
  const avgTime = routeData.length > 0 
    ? Math.round(routeData.reduce((sum, trip) => sum + (trip.duration / 60000), 0) / routeData.length) 
    : 20;
  
  // Route-specific prediction data
  const tomorrowPrediction: PredictionData = {
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    }),
    dayOfWeek: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
    predictedDuration: `${avgTime + (isToOffice ? 3 : 2)} min`,
    confidence: 'high',
    factors: {
      weather: {
        condition: 'rainy',
        impact: 'negative',
        description: isToOffice ? 'Light rain expected 8-9 AM' : 'Evening drizzle likely 5-6 PM'
      },
      traffic: {
        level: isToOffice ? 'moderate' : 'heavy',
        impact: isToOffice ? 'neutral' : 'negative',
        description: isToOffice ? 'Typical Tuesday morning traffic' : 'Heavy evening rush hour expected'
      },
      pattern: {
        trend: 'slower',
        description: isToOffice ? 'Tuesdays are 15% slower on average' : 'Evening commutes 25% more variable'
      }
    },
    recommendation: {
      departureTime: isToOffice ? '8:20 AM' : '5:10 PM',
      reason: isToOffice 
        ? 'Leave 10 minutes earlier to account for rain and Tuesday pattern'
        : 'Leave 15 minutes earlier due to heavy evening traffic and rain',
      timeSaving: isToOffice ? '5-7 min' : '8-12 min'
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return Sun;
      case 'rainy': return CloudRain;
      default: return Sun;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const WeatherIcon = getWeatherIcon(tomorrowPrediction.factors.weather.condition);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Tomorrow's Prediction
        </h2>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getConfidenceColor(tomorrowPrediction.confidence)}`}>
          {tomorrowPrediction.confidence} confidence
        </span>
      </div>
      
      {/* Route Info */}
      <div className="text-sm text-muted-foreground mb-4">
        📍 {routeName}
      </div>

      {/* Recommended Departure - MOVED TO TOP */}
      <Card className="p-6 bg-gradient-primary text-white">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-lg font-semibold">Recommended Departure</h4>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-3xl font-bold text-white">
                  {tomorrowPrediction.recommendation.departureTime}
                </div>
                <div className="text-white/80 text-sm">Tomorrow morning</div>
              </div>
              <div className="text-right">
                <div className="text-white/90 text-sm">Time saved</div>
                <div className="text-xl font-semibold text-white">
                  {tomorrowPrediction.recommendation.timeSaving}
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-3">
              <p className="text-white/90 text-sm">
                {tomorrowPrediction.recommendation.reason}
              </p>
            </div>
          </div>
          
          <Button 
            variant="secondary" 
            className="w-full bg-white text-primary hover:bg-white/90 font-medium"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Set Departure Reminder
          </Button>
        </div>
      </Card>

      {/* Main Prediction Card - MOVED BELOW */}
      <Card className="p-6 bg-gradient-card shadow-card">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {tomorrowPrediction.date}
              </h3>
              <p className="text-sm text-muted-foreground">
                Predicted trip time: <span className="font-medium text-foreground">{tomorrowPrediction.predictedDuration}</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {tomorrowPrediction.predictedDuration}
              </div>
              <div className="text-xs text-muted-foreground">vs {avgTime} min avg</div>
            </div>
          </div>

          {/* Factors Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Weather Factor */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <WeatherIcon className={`w-5 h-5 ${getImpactColor(tomorrowPrediction.factors.weather.impact)}`} />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">Weather</div>
                <div className="text-xs text-muted-foreground">
                  {tomorrowPrediction.factors.weather.description}
                </div>
              </div>
            </div>

            {/* Traffic Factor */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <TrendingUp className={`w-5 h-5 ${getImpactColor(tomorrowPrediction.factors.traffic.impact)}`} />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">Traffic</div>
                <div className="text-xs text-muted-foreground">
                  {tomorrowPrediction.factors.traffic.description}
                </div>
              </div>
            </div>

            {/* Pattern Factor */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <Clock className={`w-5 h-5 ${tomorrowPrediction.factors.pattern.trend === 'slower' ? 'text-orange-600' : 'text-green-600'}`} />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">Pattern</div>
                <div className="text-xs text-muted-foreground">
                  {tomorrowPrediction.factors.pattern.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">85%</div>
          <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">12</div>
          <div className="text-sm text-muted-foreground">Days Analyzed</div>
        </Card>
      </div>
    </div>
  );
}
