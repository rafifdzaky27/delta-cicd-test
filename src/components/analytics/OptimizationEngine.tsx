import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Route, 
  Clock, 
  Zap, 
  MapPin,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Target,
  Calendar
} from 'lucide-react';

interface OptimizationRecommendation {
  id: string;
  type: 'route' | 'timing' | 'behavior' | 'preparation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'easy' | 'moderate' | 'challenging';
  timeSaving: string;
  confidence: number;
  actionable: boolean;
  steps?: string[];
}

interface RouteAlternative {
  name: string;
  description: string;
  timeSaving: string;
  conditions: string;
  reliability: number;
}

interface OptimizationEngineProps {
  className?: string;
  route?: string;
  routeData?: any[];
}

export function OptimizationEngine({ className = '', route = 'route-to-office', routeData = [] }: OptimizationEngineProps) {
  const isToOffice = route === 'route-to-office';
  const routeName = isToOffice ? 'Telkom University → Menara BJB' : 'Menara BJB → Telkom University';
  
  // Generate route-specific optimization recommendations
  const recommendations: OptimizationRecommendation[] = [
    {
      id: '1',
      type: 'timing',
      title: isToOffice ? 'Optimal Departure Window' : 'Evening Rush Strategy',
      description: isToOffice 
        ? 'Leave between 8:15-8:20 AM for most consistent arrival times'
        : 'Leave between 5:05-5:15 PM to avoid peak evening traffic',
      impact: 'high',
      effort: 'easy',
      timeSaving: isToOffice ? '3-5 min' : '5-8 min',
      confidence: isToOffice ? 92 : 87,
      actionable: true,
      steps: isToOffice ? [
        'Set alarm for 8:10 AM',
        'Prepare everything night before',
        'Leave by 8:18 AM latest'
      ] : [
        'Monitor traffic at 4:45 PM',
        'Leave by 5:10 PM if heavy traffic',
        'Use alternative route if needed'
      ]
    },
    {
      id: '2',
      type: 'route',
      title: 'Rainy Day Alternative',
      description: 'Use Jl. Buah Batu route when weather is poor for 15% time savings',
      impact: 'medium',
      effort: 'easy',
      timeSaving: '2-4 min',
      confidence: 87,
      actionable: true,
      steps: [
        'Check weather forecast',
        'If rain predicted, use alternative route',
        'Add 2 minutes buffer time'
      ]
    },
    {
      id: '3',
      type: 'behavior',
      title: 'Tuesday Preparation',
      description: 'Tuesdays are consistently slower - prepare accordingly',
      impact: 'medium',
      effort: 'moderate',
      timeSaving: '4-6 min',
      confidence: 89,
      actionable: true,
      steps: [
        'Leave 5 minutes earlier on Tuesdays',
        'Check traffic before departure',
        'Have backup route ready'
      ]
    },
    {
      id: '4',
      type: 'preparation',
      title: 'Morning Routine Optimization',
      description: 'Streamline morning preparation to reduce departure variance',
      impact: 'low',
      effort: 'moderate',
      timeSaving: '2-3 min',
      confidence: 78,
      actionable: true,
      steps: [
        'Prepare clothes night before',
        'Set consistent wake-up time',
        'Create departure checklist'
      ]
    }
  ];

  const routeAlternatives: RouteAlternative[] = [
    {
      name: 'Main Route (Current)',
      description: 'Via Jl. Batununggal - your usual path',
      timeSaving: 'Baseline',
      conditions: 'Best for normal conditions',
      reliability: 85
    },
    {
      name: 'Weather Route',
      description: 'Via Jl. Buah Batu - better in rain',
      timeSaving: '2-4 min in rain',
      conditions: 'Optimal for wet weather',
      reliability: 78
    },
    {
      name: 'Rush Hour Route',
      description: 'Via back roads - avoids main traffic',
      timeSaving: '3-6 min peak hours',
      conditions: 'Best 8:30-9:00 AM',
      reliability: 72
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'challenging': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'route': return Route;
      case 'timing': return Clock;
      case 'behavior': return Target;
      case 'preparation': return CheckCircle;
      default: return Zap;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Optimization Engine</h2>
        </div>
        <Button variant="outline" size="sm">
          <Target className="w-4 h-4 mr-2" />
          Apply All
        </Button>
      </div>

      {/* Priority Recommendations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Priority Recommendations</h3>
        
        {recommendations.map((rec) => {
          const TypeIcon = getTypeIcon(rec.type);
          return (
            <Card key={rec.id} className="p-5">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                      <TypeIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{rec.title}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getImpactColor(rec.impact)}`}>
                          {rec.impact} impact
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getEffortColor(rec.effort)}`}>
                          {rec.effort}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">{rec.timeSaving}</div>
                    <div className="text-xs text-muted-foreground">{rec.confidence}% confidence</div>
                  </div>
                </div>

                {/* Action Steps */}
                {rec.steps && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-foreground mb-2">Action Steps:</h5>
                    <ul className="space-y-1">
                      {rec.steps.map((step, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Button */}
                <div className="flex justify-end">
                  <Button size="sm" className="gap-2">
                    Apply Recommendation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Route Alternatives */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Route className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Route Alternatives</h3>
        </div>
        
        <div className="space-y-3">
          {routeAlternatives.map((route, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{route.name}</h4>
                  <p className="text-sm text-muted-foreground">{route.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{route.conditions}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-success">{route.timeSaving}</div>
                <div className="text-xs text-muted-foreground">{route.reliability}% reliable</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Optimization Summary */}
      <Card className="p-6 bg-gradient-primary text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-1">Optimization Potential</h4>
            <p className="text-white/90 text-sm">
              Implementing all recommendations could save you 8-12 minutes daily and improve consistency by 25%.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">12 min</div>
            <div className="text-xs text-white/80">Daily savings</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
