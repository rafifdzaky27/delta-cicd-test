import { Card } from '@/components/ui/card';
import { 
  User, 
  TrendingUp, 
  Clock, 
  Calendar,
  Target,
  Award,
  BarChart3,
  Zap
} from 'lucide-react';

interface BehaviorPattern {
  category: string;
  insight: string;
  score: number;
  trend: 'improving' | 'stable' | 'declining';
  description: string;
}

interface PersonalityTrait {
  trait: string;
  strength: 'high' | 'medium' | 'low';
  description: string;
  icon: any;
}

interface BehaviorAnalysisProps {
  className?: string;
  route?: string;
  routeData?: any[];
}

export function BehaviorAnalysis({ className = '', route = 'route-to-office', routeData = [] }: BehaviorAnalysisProps) {
  const isToOffice = route === 'route-to-office';
  const routeName = isToOffice ? 'Telkom University → Menara BJB' : 'Menara BJB → Telkom University';
  
  // Generate route-specific behavior patterns
  const behaviorPatterns: BehaviorPattern[] = [
    {
      category: 'Consistency',
      insight: isToOffice ? 'You\'re most consistent on Tuesdays' : 'You\'re most flexible on Fridays',
      score: isToOffice ? 92 : 78,
      trend: 'improving',
      description: isToOffice 
        ? 'Your Tuesday departure times vary by only ±2 minutes'
        : 'Friday evening departures vary by ±8 minutes'
    },
    {
      category: 'Punctuality',
      insight: isToOffice ? 'Early bird - you prefer buffer time' : 'Flexible timer - you adapt to traffic',
      score: isToOffice ? 88 : 72,
      trend: 'stable',
      description: isToOffice
        ? 'You typically arrive 5-8 minutes before needed'
        : 'You adjust timing based on real-time conditions'
    },
    {
      category: 'Adaptability',
      insight: isToOffice ? 'Quick to adjust to traffic changes' : 'Excellent at reading evening patterns',
      score: isToOffice ? 76 : 89,
      trend: 'improving',
      description: isToOffice 
        ? 'You adapt departure times based on conditions'
        : 'You excel at predicting evening traffic patterns'
    },
    {
      category: 'Efficiency',
      insight: isToOffice ? 'Route optimization champion' : 'Alternative route explorer',
      score: isToOffice ? 84 : 71,
      trend: 'stable',
      description: isToOffice
        ? 'You consistently choose optimal routes'
        : 'You experiment with different evening routes'
    }
  ];

  const personalityTraits: PersonalityTrait[] = [
    {
      trait: 'Planner',
      strength: 'high',
      description: 'You prefer predictable, well-planned commutes',
      icon: Calendar
    },
    {
      trait: 'Optimizer',
      strength: 'high',
      description: 'Always looking for ways to improve efficiency',
      icon: Target
    },
    {
      trait: 'Consistent',
      strength: 'medium',
      description: 'You maintain regular commute patterns',
      icon: Clock
    },
    {
      trait: 'Adaptive',
      strength: 'medium',
      description: 'You adjust well to changing conditions',
      icon: Zap
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 75) return 'bg-blue-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-orange-100';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return TrendingUp;
      case 'declining': return TrendingUp; // Would be TrendingDown but using same for demo
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

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center gap-2">
        <User className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">Your Commute Personality</h2>
      </div>

      {/* Personality Overview */}
      <Card className="p-6 bg-gradient-card shadow-card">
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">The Strategic Commuter</h3>
            <p className="text-sm text-muted-foreground">
              You're a planner who values consistency and efficiency. You adapt well to changes while maintaining optimal performance.
            </p>
          </div>

          {/* Personality Traits */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {personalityTraits.map((trait, index) => {
              const IconComponent = trait.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <IconComponent className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{trait.trait}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStrengthColor(trait.strength)}`}>
                        {trait.strength}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{trait.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Behavior Patterns */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Behavior Analysis</h3>
        
        <div className="grid gap-4">
          {behaviorPatterns.map((pattern, index) => {
            const TrendIcon = getTrendIcon(pattern.trend);
            return (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getScoreBackground(pattern.score)}`}>
                      <span className={`text-lg font-bold ${getScoreColor(pattern.score)}`}>
                        {pattern.score}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{pattern.category}</h4>
                      <p className="text-sm text-primary">{pattern.insight}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendIcon className={`w-4 h-4 ${getTrendColor(pattern.trend)}`} />
                    <span className={`text-xs font-medium ${getTrendColor(pattern.trend)}`}>
                      {pattern.trend}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">{pattern.description}</p>
                
                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        pattern.score >= 90 ? 'bg-green-500' :
                        pattern.score >= 75 ? 'bg-blue-500' :
                        pattern.score >= 60 ? 'bg-yellow-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${pattern.score}%` }}
                    ></div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Weekly Pattern Summary */}
      <Card className="p-4">
        <h4 className="font-semibold text-foreground mb-3">Weekly Performance</h4>
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const scores = [85, 92, 78, 82, 75, 88, 90]; // Mock weekly scores
            const score = scores[index];
            return (
              <div key={day} className="text-center">
                <div className="text-xs text-muted-foreground mb-1">{day}</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getScoreBackground(score)} ${getScoreColor(score)}`}>
                  {score}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
