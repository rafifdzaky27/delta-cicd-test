import { Card } from '@/components/ui/card';
import { 
  Lightbulb, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Zap
} from 'lucide-react';

interface InsightHeroCardProps {
  insight: {
    type: 'timing' | 'pattern' | 'optimization' | 'weather' | 'trend';
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    actionable: boolean;
  };
  className?: string;
  style?: React.CSSProperties;
}

export function InsightHeroCard({ insight, className = '', style }: InsightHeroCardProps) {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'timing': return Clock;
      case 'pattern': return TrendingUp;
      case 'optimization': return Zap;
      case 'weather': return AlertTriangle;
      case 'trend': return CheckCircle;
      default: return Lightbulb;
    }
  };

  const getInsightColor = (type: string, impact: string) => {
    if (impact === 'high') {
      return type === 'weather' || type === 'pattern' 
        ? 'bg-orange-50 border-orange-200' 
        : 'bg-blue-50 border-blue-200';
    }
    if (impact === 'medium') {
      return 'bg-yellow-50 border-yellow-200';
    }
    return 'bg-green-50 border-green-200';
  };

  const getTextColor = (type: string, impact: string) => {
    if (impact === 'high') {
      return type === 'weather' || type === 'pattern'
        ? 'text-orange-900'
        : 'text-blue-900';
    }
    if (impact === 'medium') {
      return 'text-yellow-900';
    }
    return 'text-green-900';
  };

  const getIconColor = (type: string, impact: string) => {
    if (impact === 'high') {
      return type === 'weather' || type === 'pattern'
        ? 'text-orange-600'
        : 'text-blue-600';
    }
    if (impact === 'medium') {
      return 'text-yellow-600';
    }
    return 'text-green-600';
  };

  const IconComponent = getInsightIcon(insight.type);

  return (
    <Card className={`p-4 border-2 ${getInsightColor(insight.type, insight.impact)} ${className}`} style={style}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
          <IconComponent className={`w-5 h-5 ${getIconColor(insight.type, insight.impact)}`} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold ${getTextColor(insight.type, insight.impact)}`}>
              {insight.title}
            </h3>
            {insight.actionable && (
              <span className="px-2 py-0.5 bg-white rounded-full text-xs font-medium text-primary">
                Actionable
              </span>
            )}
          </div>
          
          <p className={`text-sm ${getTextColor(insight.type, insight.impact)} opacity-80`}>
            {insight.description}
          </p>
          
          {insight.impact === 'high' && (
            <div className="mt-2 flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-current opacity-60"></div>
              <span className="text-xs font-medium opacity-80">High Impact</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
