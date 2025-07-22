import { Card } from '@/components/ui/card';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Target,
  Award,
  Clock,
  Calendar,
  Users,
  Trophy,
  Zap
} from 'lucide-react';

interface ComparisonData {
  metric: string;
  yourValue: number;
  comparison: number;
  comparisonType: 'personal_best' | 'average' | 'peer_group';
  unit: string;
  performance: 'better' | 'worse' | 'equal';
  improvement: number;
}

interface BenchmarkData {
  category: string;
  yourScore: number;
  benchmarkScore: number;
  percentile: number;
  status: 'excellent' | 'good' | 'average' | 'needs_improvement';
}

interface ComparativeMetricsProps {
  className?: string;
  route?: string;
  routeData?: any[];
}

export function ComparativeMetrics({ className = '', route = 'route-to-office', routeData = [] }: ComparativeMetricsProps) {
  const isToOffice = route === 'route-to-office';
  const routeName = isToOffice ? 'Telkom University → Menara BJB' : 'Menara BJB → Telkom University';
  
  // Calculate route-specific metrics from real data
  const avgTime = routeData.length > 0 
    ? routeData.reduce((sum, trip) => sum + (trip.duration / 60000), 0) / routeData.length
    : (isToOffice ? 20 : 25);
    
  const bestTime = routeData.length > 0
    ? Math.min(...routeData.map(trip => trip.duration / 60000))
    : (isToOffice ? 16 : 19);
    
  // Route-specific comparative data
  const comparisons: ComparisonData[] = [
    {
      metric: 'Average Trip Time',
      yourValue: Math.round(avgTime * 10) / 10,
      comparison: Math.round(bestTime * 10) / 10,
      comparisonType: 'personal_best',
      unit: 'min',
      performance: avgTime < bestTime * 1.2 ? 'better' : 'worse',
      improvement: Math.round(((bestTime - avgTime) / bestTime) * 100 * 10) / 10
    },
    {
      metric: 'Consistency Score',
      yourValue: isToOffice ? 92 : 78,
      comparison: 78,
      comparisonType: 'average',
      unit: '%',
      performance: 'better',
      improvement: 17.9
    },
    {
      metric: 'On-Time Arrivals',
      yourValue: 94,
      comparison: 87,
      comparisonType: 'peer_group',
      unit: '%',
      performance: 'better',
      improvement: 8.0
    },
    {
      metric: 'Route Efficiency',
      yourValue: 87,
      comparison: 91,
      comparisonType: 'personal_best',
      unit: '%',
      performance: 'worse',
      improvement: -4.4
    }
  ];

  const benchmarks: BenchmarkData[] = [
    {
      category: 'Time Management',
      yourScore: 92,
      benchmarkScore: 75,
      percentile: 85,
      status: 'excellent'
    },
    {
      category: 'Route Optimization',
      yourScore: 87,
      benchmarkScore: 80,
      percentile: 72,
      status: 'good'
    },
    {
      category: 'Consistency',
      yourScore: 89,
      benchmarkScore: 70,
      percentile: 78,
      status: 'good'
    },
    {
      category: 'Adaptability',
      yourScore: 76,
      benchmarkScore: 85,
      percentile: 45,
      status: 'average'
    }
  ];

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'better': return 'text-green-600';
      case 'worse': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPerformanceIcon = (performance: string) => {
    switch (performance) {
      case 'better': return TrendingUp;
      case 'worse': return TrendingDown;
      default: return BarChart3;
    }
  };

  const getComparisonLabel = (type: string) => {
    switch (type) {
      case 'personal_best': return 'vs Your Best';
      case 'average': return 'vs Your Average';
      case 'peer_group': return 'vs Similar Commuters';
      default: return 'vs Benchmark';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'average': return 'bg-yellow-100 text-yellow-800';
      case 'needs_improvement': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return Trophy;
      case 'good': return Award;
      case 'average': return Target;
      case 'needs_improvement': return TrendingUp;
      default: return BarChart3;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">Performance Comparison</h2>
      </div>

      {/* Key Comparisons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comparisons.map((comp, index) => {
          const PerformanceIcon = getPerformanceIcon(comp.performance);
          return (
            <Card key={index} className="p-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">{comp.metric}</h4>
                  <span className="text-xs text-muted-foreground">
                    {getComparisonLabel(comp.comparisonType)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {comp.yourValue}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        {comp.unit}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      vs {comp.comparison}{comp.unit}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`flex items-center gap-1 ${getPerformanceColor(comp.performance)}`}>
                      <PerformanceIcon className="w-4 h-4" />
                      <span className="font-medium">
                        {comp.improvement > 0 ? '+' : ''}{comp.improvement.toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {comp.performance === 'better' ? 'Better' : comp.performance === 'worse' ? 'Needs work' : 'Same'}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Comparison</span>
                    <span>You</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          comp.performance === 'better' ? 'bg-green-500' : 
                          comp.performance === 'worse' ? 'bg-red-500' : 'bg-gray-500'
                        }`}
                        style={{ 
                          width: `${Math.min(100, (comp.yourValue / Math.max(comp.yourValue, comp.comparison)) * 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Benchmark Analysis */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Benchmark Analysis</h3>
        </div>
        
        <div className="space-y-4">
          {benchmarks.map((benchmark, index) => {
            const StatusIcon = getStatusIcon(benchmark.status);
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                    <StatusIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{benchmark.category}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(benchmark.status)}`}>
                        {benchmark.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {benchmark.percentile}th percentile
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">
                    {benchmark.yourScore}
                    <span className="text-sm font-normal text-muted-foreground">/{benchmark.benchmarkScore}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Your score</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Performance Ranking */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Your Ranking</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gradient-card rounded-lg">
            <div className="text-2xl font-bold text-green-600">Top 15%</div>
            <div className="text-sm text-muted-foreground">Consistency</div>
          </div>
          <div className="p-4 bg-gradient-card rounded-lg">
            <div className="text-2xl font-bold text-blue-600">Top 25%</div>
            <div className="text-sm text-muted-foreground">Efficiency</div>
          </div>
          <div className="p-4 bg-gradient-card rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">Top 40%</div>
            <div className="text-sm text-muted-foreground">Adaptability</div>
          </div>
        </div>
      </Card>

      {/* Improvement Opportunities */}
      <Card className="p-6 bg-gradient-primary text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-1">Biggest Opportunity</h4>
            <p className="text-white/90 text-sm">
              Improve your adaptability score by 15 points to reach the top 25% of commuters.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">+15</div>
            <div className="text-xs text-white/80">Points needed</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
