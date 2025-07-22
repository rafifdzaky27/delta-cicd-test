import { Card } from '@/components/ui/card';
import { 
  CloudRain, 
  Sun, 
  Cloud, 
  Wind,
  Thermometer,
  Droplets,
  Eye,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Route
} from 'lucide-react';

interface WeatherImpact {
  condition: string;
  icon: any;
  averageDelay: number;
  frequency: number;
  reliability: number;
  recommendation: string;
  color: string;
}

interface SeasonalPattern {
  season: string;
  avgImpact: number;
  mainFactors: string[];
  adaptationTip: string;
}

interface WeatherForecast {
  day: string;
  condition: string;
  icon: any;
  expectedImpact: number;
  confidence: number;
  recommendation: string;
}

interface WeatherImpactAnalysisProps {
  className?: string;
  route?: string;
  routeData?: any[];
}

export function WeatherImpactAnalysis({ className = '' }: WeatherImpactAnalysisProps) {
  // Mock weather impact data - in real app, correlated with trip data and weather history
  const weatherImpacts: WeatherImpact[] = [
    {
      condition: 'Light Rain',
      icon: CloudRain,
      averageDelay: 3.2,
      frequency: 15,
      reliability: 78,
      recommendation: 'Leave 5 minutes earlier',
      color: 'text-blue-600'
    },
    {
      condition: 'Heavy Rain',
      icon: CloudRain,
      averageDelay: 8.7,
      frequency: 5,
      reliability: 45,
      recommendation: 'Leave 10+ minutes earlier, consider alternative route',
      color: 'text-blue-800'
    },
    {
      condition: 'Sunny',
      icon: Sun,
      averageDelay: -1.1,
      frequency: 45,
      reliability: 92,
      recommendation: 'Optimal conditions - stick to normal schedule',
      color: 'text-yellow-500'
    },
    {
      condition: 'Cloudy',
      icon: Cloud,
      averageDelay: 0.8,
      frequency: 25,
      reliability: 88,
      recommendation: 'Minimal impact - normal departure time',
      color: 'text-gray-500'
    },
    {
      condition: 'Fog',
      icon: Eye,
      averageDelay: 12.3,
      frequency: 3,
      reliability: 35,
      recommendation: 'Significant delays expected - leave much earlier',
      color: 'text-gray-700'
    }
  ];

  const seasonalPatterns: SeasonalPattern[] = [
    {
      season: 'Rainy Season',
      avgImpact: 4.2,
      mainFactors: ['Heavy rainfall', 'Reduced visibility', 'Cautious driving'],
      adaptationTip: 'Build 8-10 minute buffer into schedule'
    },
    {
      season: 'Dry Season',
      avgImpact: -0.5,
      mainFactors: ['Clear roads', 'Good visibility', 'Consistent conditions'],
      adaptationTip: 'Optimal time for route optimization experiments'
    },
    {
      season: 'Transition',
      avgImpact: 2.1,
      mainFactors: ['Variable conditions', 'Unpredictable weather', 'Mixed impacts'],
      adaptationTip: 'Check weather daily and adjust accordingly'
    }
  ];

  const weekForecast: WeatherForecast[] = [
    {
      day: 'Today',
      condition: 'Sunny',
      icon: Sun,
      expectedImpact: -1,
      confidence: 95,
      recommendation: 'Perfect conditions'
    },
    {
      day: 'Tomorrow',
      condition: 'Light Rain',
      icon: CloudRain,
      expectedImpact: 3,
      confidence: 87,
      recommendation: 'Leave 5 min early'
    },
    {
      day: 'Wednesday',
      condition: 'Cloudy',
      icon: Cloud,
      expectedImpact: 1,
      confidence: 78,
      recommendation: 'Normal schedule'
    },
    {
      day: 'Thursday',
      condition: 'Heavy Rain',
      icon: CloudRain,
      expectedImpact: 9,
      confidence: 82,
      recommendation: 'Leave 10+ min early'
    },
    {
      day: 'Friday',
      condition: 'Sunny',
      icon: Sun,
      expectedImpact: -1,
      confidence: 91,
      recommendation: 'Optimal conditions'
    }
  ];

  const getImpactColor = (impact: number) => {
    if (impact <= 0) return 'text-green-600';
    if (impact <= 3) return 'text-yellow-600';
    if (impact <= 8) return 'text-orange-600';
    return 'text-red-600';
  };

  const getImpactBackground = (impact: number) => {
    if (impact <= 0) return 'bg-green-100';
    if (impact <= 3) return 'bg-yellow-100';
    if (impact <= 8) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 85) return 'text-green-600';
    if (reliability >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center gap-2">
        <CloudRain className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">Weather Impact Analysis</h2>
      </div>

      {/* Weather Conditions Impact */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Condition Impact Analysis</h3>
        
        <div className="space-y-4">
          {weatherImpacts.map((weather, index) => {
            const IconComponent = weather.icon;
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                    <IconComponent className={`w-6 h-6 ${weather.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{weather.condition}</h4>
                    <p className="text-sm text-muted-foreground">{weather.recommendation}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {weather.frequency}% of trips
                      </span>
                      <span className={`text-xs font-medium ${getReliabilityColor(weather.reliability)}`}>
                        {weather.reliability}% reliable
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-lg font-bold ${getImpactColor(weather.averageDelay)}`}>
                    {weather.averageDelay > 0 ? '+' : ''}{weather.averageDelay} min
                  </div>
                  <div className="text-xs text-muted-foreground">avg impact</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Weekly Forecast */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">5-Day Impact Forecast</h3>
        
        <div className="grid grid-cols-5 gap-3">
          {weekForecast.map((forecast, index) => {
            const IconComponent = forecast.icon;
            return (
              <div key={index} className="text-center p-3 bg-gradient-card rounded-lg">
                <div className="text-sm font-medium text-foreground mb-2">{forecast.day}</div>
                <div className="w-12 h-12 mx-auto mb-2 bg-primary-light rounded-full flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <div className="text-xs text-muted-foreground mb-1">{forecast.condition}</div>
                <div className={`text-sm font-bold ${getImpactColor(forecast.expectedImpact)}`}>
                  {forecast.expectedImpact > 0 ? '+' : ''}{forecast.expectedImpact} min
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {forecast.confidence}% sure
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Seasonal Patterns */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Seasonal Impact Patterns</h3>
        
        <div className="space-y-4">
          {seasonalPatterns.map((pattern, index) => (
            <div key={index} className="p-4 bg-gradient-card rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-foreground">{pattern.season}</h4>
                <div className={`text-lg font-bold ${getImpactColor(pattern.avgImpact)}`}>
                  {pattern.avgImpact > 0 ? '+' : ''}{pattern.avgImpact} min avg
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-foreground">Main Factors: </span>
                  <span className="text-sm text-muted-foreground">
                    {pattern.mainFactors.join(', ')}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{pattern.adaptationTip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Weather Adaptation Tips */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Smart Adaptations</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <CloudRain className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Rainy Day Strategy</h4>
            </div>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Check weather at 7 AM</li>
              <li>• Add 5-10 min buffer time</li>
              <li>• Use alternative route if heavy rain</li>
              <li>• Keep umbrella in car</li>
            </ul>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="w-5 h-5 text-yellow-600" />
              <h4 className="font-semibold text-yellow-900">Optimal Conditions</h4>
            </div>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Perfect for route experiments</li>
              <li>• Stick to normal schedule</li>
              <li>• Good time for efficiency tests</li>
              <li>• Enjoy the smooth commute!</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Weather Impact Summary */}
      <Card className="p-6 bg-gradient-primary text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-1">Weather Awareness</h4>
            <p className="text-white/90 text-sm">
              Weather adds an average of 2.3 minutes to your commute. Stay informed and adapt your schedule accordingly.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">2.3 min</div>
            <div className="text-xs text-white/80">Avg impact</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
