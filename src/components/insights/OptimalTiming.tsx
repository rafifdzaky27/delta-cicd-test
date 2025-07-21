import { Card } from '@/components/ui/card';
import { 
  Clock, 
  Target, 
  TrendingUp, 
  TrendingDown,
  Minus
} from 'lucide-react';

interface OptimalTimingProps {
  currentDeparture: string;
  optimalDeparture: string;
  difference: number; // minutes (positive = leave later, negative = leave earlier)
  confidence: 'high' | 'medium' | 'low';
  reasoning: string;
  className?: string;
  style?: React.CSSProperties;
}

export function OptimalTiming({ 
  currentDeparture, 
  optimalDeparture, 
  difference, 
  confidence, 
  reasoning,
  className = '',
  style
}: OptimalTimingProps) {
  const getConfidenceColor = (conf: string) => {
    switch (conf) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDifferenceIcon = (diff: number) => {
    if (diff > 0) return TrendingUp;
    if (diff < 0) return TrendingDown;
    return Minus;
  };

  const getDifferenceText = (diff: number) => {
    if (diff === 0) return 'Perfect timing!';
    if (diff > 0) return `Leave ${diff} min later`;
    return `Leave ${Math.abs(diff)} min earlier`;
  };

  const getDifferenceColor = (diff: number) => {
    if (diff === 0) return 'text-green-600';
    if (Math.abs(diff) <= 5) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const DifferenceIcon = getDifferenceIcon(difference);

  return (
    <Card className={`p-4 bg-gradient-card ${className}`} style={style}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Optimal Departure Time</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(confidence)}`}>
            {confidence} confidence
          </span>
        </div>

        {/* Time Comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Current</div>
            <div className="text-2xl font-bold text-foreground">{currentDeparture}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Optimal</div>
            <div className="text-2xl font-bold text-primary">{optimalDeparture}</div>
          </div>
        </div>

        {/* Difference Indicator */}
        <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-lg">
          <DifferenceIcon className={`w-5 h-5 ${getDifferenceColor(difference)}`} />
          <span className={`font-medium ${getDifferenceColor(difference)}`}>
            {getDifferenceText(difference)}
          </span>
        </div>

        {/* Reasoning */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Why this timing?</p>
              <p className="text-xs text-blue-700 mt-1">{reasoning}</p>
            </div>
          </div>
        </div>

        {/* Impact Preview */}
        {difference !== 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Potential improvement:</span>
            <span className="font-medium text-success">
              {Math.abs(difference) <= 5 ? '2-3 minutes saved' : '5-8 minutes saved'}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
