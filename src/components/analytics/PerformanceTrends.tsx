import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Target,
  Calendar,
  Clock,
  Zap,
  CheckCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface TrendData {
  period: string;
  value: number;
  change: number;
  changeType: 'improvement' | 'decline';
  unit: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'milestone' | 'streak' | 'optimization';
  icon: any;
}

interface PerformanceTrendsProps {
  className?: string;
  route?: string;
  routeData?: any[];
}

export function PerformanceTrends({ className = '', route = 'route-to-office', routeData = [] }: PerformanceTrendsProps) {
  const isToOffice = route === 'route-to-office';
  const routeName = isToOffice ? 'Telkom University → Menara BJB' : 'Menara BJB → Telkom University';
  
  // Calculate actual performance from route data
  const avgTime = routeData.length > 0 
    ? routeData.reduce((sum, trip) => sum + (trip.duration / 60000), 0) / routeData.length
    : (isToOffice ? 20 : 25);
  
  const bestTime = routeData.length > 0
    ? Math.min(...routeData.map(trip => trip.duration / 60000))
    : (isToOffice ? 16 : 19);
    
  // Generate route-specific performance metrics
  const keyMetrics: TrendData[] = [
    {
      period: 'This Month',
      value: Math.round(avgTime * 10) / 10,
      change: isToOffice ? -2.3 : -1.8,
      changeType: 'improvement',
      unit: 'min avg'
    },
    {
      period: 'Consistency',
      value: isToOffice ? 92 : 78,
      change: isToOffice ? 8 : 12,
      changeType: 'improvement',
      unit: '% score'
    },
    {
      period: 'On-Time Rate',
      value: 94,
      change: 6,
      changeType: 'improvement',
      unit: '% arrivals'
    },
    {
      period: 'Fuel Efficiency',
      value: 87,
      change: 12,
      changeType: 'improvement',
      unit: '% optimal'
    }
  ];

  const monthlyTrends = [
    { month: 'Oct', avgTime: 22.1, consistency: 78 },
    { month: 'Nov', avgTime: 20.8, consistency: 82 },
    { month: 'Dec', avgTime: 19.2, consistency: 88 },
    { month: 'Jan', avgTime: 18.5, consistency: 92 }
  ];

  const recentAchievements: Achievement[] = [
    {
      id: '1',
      title: 'Consistency Master',
      description: '7 days in a row within ±2 minutes',
      date: '2 days ago',
      type: 'streak',
      icon: Target
    },
    {
      id: '2',
      title: 'Time Optimizer',
      description: 'Reduced average commute by 15%',
      date: '1 week ago',
      type: 'optimization',
      icon: Zap
    },
    {
      id: '3',
      title: 'Perfect Week',
      description: 'All trips within optimal time range',
      date: '2 weeks ago',
      type: 'milestone',
      icon: Award
    }
  ];

  const getChangeColor = (changeType: string) => {
    return changeType === 'improvement' ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (changeType: string) => {
    return changeType === 'improvement' ? ArrowUp : ArrowDown;
  };

  const getAchievementColor = (type: string) => {
    switch (type) {
      case 'milestone': return 'bg-yellow-100 text-yellow-800';
      case 'streak': return 'bg-blue-100 text-blue-800';
      case 'optimization': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Performance Trends</h2>
        </div>
        <Button variant="outline" size="sm">
          <Calendar className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => {
          const ChangeIcon = getChangeIcon(metric.changeType);
          return (
            <Card key={index} className="p-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">
                  {metric.value}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    {metric.unit}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">{metric.period}</div>
                <div className={`flex items-center justify-center gap-1 text-xs font-medium ${getChangeColor(metric.changeType)}`}>
                  <ChangeIcon className="w-3 h-3" />
                  {Math.abs(metric.change)}
                  {metric.unit.includes('%') ? 'pts' : metric.unit.includes('min') ? 'min' : '%'}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Monthly Trend Chart (Mock) */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">4-Month Trend</h3>
        <div className="space-y-4">
          {/* Mock Chart - Simple Bar Representation */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-foreground">Average Trip Time</div>
            {monthlyTrends.map((trend, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 text-xs text-muted-foreground">{trend.month}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(25 - trend.avgTime) * 4}%` }}
                  ></div>
                </div>
                <div className="w-12 text-xs font-medium text-foreground">{trend.avgTime}m</div>
              </div>
            ))}
          </div>

          <div className="space-y-3 mt-6">
            <div className="text-sm font-medium text-foreground">Consistency Score</div>
            {monthlyTrends.map((trend, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 text-xs text-muted-foreground">{trend.month}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${trend.consistency}%` }}
                  ></div>
                </div>
                <div className="w-12 text-xs font-medium text-foreground">{trend.consistency}%</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Recent Achievements */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Recent Achievements</h3>
        </div>
        
        <div className="space-y-3">
          {recentAchievements.map((achievement) => {
            const IconComponent = achievement.icon;
            return (
              <div key={achievement.id} className="flex items-center gap-4 p-3 bg-gradient-card rounded-lg">
                <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getAchievementColor(achievement.type)}`}>
                      {achievement.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                <div className="text-xs text-muted-foreground">{achievement.date}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Performance Summary */}
      <Card className="p-6 bg-gradient-primary text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-1">Great Progress!</h4>
            <p className="text-white/90 text-sm">
              You've improved your commute efficiency by 15% this month. Keep up the excellent work!
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">15%</div>
            <div className="text-xs text-white/80">Improvement</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
