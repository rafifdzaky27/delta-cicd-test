import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Leaf,
  Snowflake,
  Sun,
  CloudRain,
  Clock,
  BarChart3,
  Target,
  AlertCircle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface SeasonalData {
  season: string;
  months: string[];
  icon: any;
  avgTripTime: number;
  consistency: number;
  mainFactors: string[];
  trend: 'improving' | 'stable' | 'declining';
  color: string;
  bgColor: string;
}

interface YearlyTrend {
  year: number;
  avgTime: number;
  consistency: number;
  improvement: number;
}

interface MonthlyPattern {
  month: string;
  avgTime: number;
  trafficLevel: 'low' | 'medium' | 'high';
  specialEvents: string[];
  recommendation: string;
}

interface SeasonalPatternsProps {
  className?: string;
  route?: string;
  routeData?: any[];
}

export function SeasonalPatterns({ className = '' }: SeasonalPatternsProps) {
  // Mock seasonal data - in real app, calculated from historical trip data
  const seasonalData: SeasonalData[] = [
    {
      season: 'Dry Season',
      months: ['May', 'Jun', 'Jul', 'Aug', 'Sep'],
      icon: Sun,
      avgTripTime: 17.8,
      consistency: 94,
      mainFactors: ['Clear roads', 'Predictable conditions', 'Optimal visibility'],
      trend: 'stable',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      season: 'Rainy Season',
      months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
      icon: CloudRain,
      avgTripTime: 21.2,
      consistency: 76,
      mainFactors: ['Wet roads', 'Reduced visibility', 'Cautious driving'],
      trend: 'improving',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      season: 'Transition',
      months: ['Mar', 'Apr'],
      icon: Leaf,
      avgTripTime: 19.1,
      consistency: 82,
      mainFactors: ['Variable weather', 'Mixed conditions', 'Adaptation period'],
      trend: 'stable',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  const yearlyTrends: YearlyTrend[] = [
    { year: 2021, avgTime: 22.5, consistency: 68, improvement: 0 },
    { year: 2022, avgTime: 20.8, consistency: 74, improvement: 7.6 },
    { year: 2023, avgTime: 19.4, consistency: 82, improvement: 6.7 },
    { year: 2024, avgTime: 18.9, consistency: 87, improvement: 2.6 }
  ];

  const monthlyPatterns: MonthlyPattern[] = [
    {
      month: 'January',
      avgTime: 20.5,
      trafficLevel: 'medium',
      specialEvents: ['New Year holidays', 'School resumption'],
      recommendation: 'Expect gradual traffic increase'
    },
    {
      month: 'February',
      avgTime: 21.8,
      trafficLevel: 'high',
      specialEvents: ['Valentine season', 'Peak rainy season'],
      recommendation: 'Add extra buffer time'
    },
    {
      month: 'March',
      avgTime: 19.2,
      trafficLevel: 'medium',
      specialEvents: ['Weather transition', 'School activities'],
      recommendation: 'Monitor weather daily'
    },
    {
      month: 'April',
      avgTime: 18.9,
      trafficLevel: 'medium',
      specialEvents: ['Easter holidays', 'Dry season start'],
      recommendation: 'Good time for route optimization'
    },
    {
      month: 'May',
      avgTime: 17.5,
      trafficLevel: 'low',
      specialEvents: ['Labor Day', 'Optimal weather'],
      recommendation: 'Enjoy consistent commutes'
    },
    {
      month: 'June',
      avgTime: 17.8,
      trafficLevel: 'low',
      specialEvents: ['Mid-year break', 'Clear conditions'],
      recommendation: 'Perfect for experiments'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return TrendingUp;
      case 'declining': return TrendingDown;
      default: return BarChart3;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-600';
      case 'declining': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrafficColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Seasonal Patterns</h2>
        </div>
        <Button variant="outline" size="sm">
          <BarChart3 className="w-4 h-4 mr-2" />
          Full Analysis
        </Button>
      </div>

      {/* Seasonal Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {seasonalData.map((season, index) => {
          const IconComponent = season.icon;
          const TrendIcon = getTrendIcon(season.trend);
          
          return (
            <Card key={index} className={`p-5 ${season.bgColor} border-2`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconComponent className={`w-8 h-8 ${season.color}`} />
                    <div>
                      <h3 className="font-semibold text-foreground">{season.season}</h3>
                      <p className="text-xs text-muted-foreground">
                        {season.months.join(', ')}
                      </p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 ${getTrendColor(season.trend)}`}>
                    <TrendIcon className="w-4 h-4" />
                    <span className="text-xs font-medium">{season.trend}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{season.avgTripTime}</div>
                    <div className="text-xs text-muted-foreground">avg minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{season.consistency}%</div>
                    <div className="text-xs text-muted-foreground">consistency</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Key Factors:</h4>
                  <ul className="space-y-1">
                    {season.mainFactors.map((factor, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-current"></div>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Yearly Progress */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Multi-Year Progress</h3>
        
        <div className="space-y-4">
          {yearlyTrends.map((year, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{year.year}</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {year.avgTime} min average
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {year.consistency}% consistency score
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                {year.improvement > 0 && (
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">+{year.improvement.toFixed(1)}%</span>
                  </div>
                )}
                {year.improvement === 0 && (
                  <span className="text-muted-foreground text-sm">Baseline year</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Monthly Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Patterns (Last 6 Months)</h3>
        
        <div className="space-y-3">
          {monthlyPatterns.map((month, index) => (
            <div key={index} className="p-4 bg-gradient-card rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-foreground">{month.month}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTrafficColor(month.trafficLevel)}`}>
                    {month.trafficLevel} traffic
                  </span>
                </div>
                <div className="text-lg font-bold text-foreground">{month.avgTime} min</div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-foreground">Events: </span>
                  <span className="text-sm text-muted-foreground">
                    {month.specialEvents.join(', ')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{month.recommendation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Seasonal Recommendations */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Seasonal Strategies</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <CloudRain className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Rainy Season (Oct-Feb)</h4>
            </div>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-current mt-2"></div>
                Add 5-8 minutes buffer time
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-current mt-2"></div>
                Monitor weather forecasts daily
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-current mt-2"></div>
                Keep alternative routes ready
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-current mt-2"></div>
                Focus on consistency over speed
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 mb-3">
              <Sun className="w-5 h-5 text-yellow-600" />
              <h4 className="font-semibold text-yellow-900">Dry Season (May-Sep)</h4>
            </div>
            <ul className="text-sm text-yellow-800 space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-current mt-2"></div>
                Optimize routes and timing
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-current mt-2"></div>
                Experiment with new paths
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-current mt-2"></div>
                Reduce buffer time gradually
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-current mt-2"></div>
                Focus on efficiency improvements
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Long-term Insights */}
      <Card className="p-6 bg-gradient-primary text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-1">Long-term Trend</h4>
            <p className="text-white/90 text-sm">
              You've improved your average commute time by 16% over the past 3 years through consistent optimization.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">16%</div>
            <div className="text-xs text-white/80">3-year improvement</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
