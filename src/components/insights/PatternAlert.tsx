import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

interface PatternAlertProps {
  pattern: {
    type: 'daily' | 'weekly' | 'weather' | 'seasonal';
    severity: 'info' | 'warning' | 'success';
    title: string;
    description: string;
    impact: string;
    frequency: string;
    trend: 'improving' | 'worsening' | 'stable';
  };
  className?: string;
  style?: React.CSSProperties;
}

export function PatternAlert({ pattern, className = '', style }: PatternAlertProps) {
  const getPatternIcon = (type: string) => {
    switch (type) {
      case 'daily': return Clock;
      case 'weekly': return Calendar;
      case 'weather': return AlertCircle;
      case 'seasonal': return TrendingUp;
      default: return Info;
    }
  };

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'warning':
        return {
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-900',
          iconColor: 'text-orange-600',
          accentColor: 'bg-orange-100'
        };
      case 'success':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-900',
          iconColor: 'text-green-600',
          accentColor: 'bg-green-100'
        };
      default: // info
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-900',
          iconColor: 'text-blue-600',
          accentColor: 'bg-blue-100'
        };
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return TrendingUp;
      case 'worsening': return TrendingDown;
      default: return CheckCircle;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-600';
      case 'worsening': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const PatternIcon = getPatternIcon(pattern.type);
  const TrendIcon = getTrendIcon(pattern.trend);
  const config = getSeverityConfig(pattern.severity);

  return (
    <Card className={`p-4 border-2 ${config.bgColor} ${config.borderColor} ${className}`} style={style}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm`}>
              <PatternIcon className={`w-5 h-5 ${config.iconColor}`} />
            </div>
            <div>
              <h3 className={`font-semibold ${config.textColor}`}>
                {pattern.title}
              </h3>
              <p className={`text-sm ${config.textColor} opacity-80`}>
                {pattern.frequency}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <TrendIcon className={`w-4 h-4 ${getTrendColor(pattern.trend)}`} />
            <span className={`text-xs font-medium ${getTrendColor(pattern.trend)}`}>
              {pattern.trend}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className={`text-sm ${config.textColor} opacity-90`}>
          {pattern.description}
        </p>

        {/* Impact */}
        <div className={`p-3 ${config.accentColor} rounded-lg`}>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${config.iconColor.replace('text-', 'bg-')}`}></div>
            <span className={`text-sm font-medium ${config.textColor}`}>
              Impact: {pattern.impact}
            </span>
          </div>
        </div>

        {/* Pattern Type Badge */}
        <div className="flex justify-between items-center">
          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-white ${config.textColor}`}>
            {pattern.type.charAt(0).toUpperCase() + pattern.type.slice(1)} Pattern
          </span>
          
          {pattern.severity === 'warning' && (
            <span className="text-xs text-orange-700 font-medium">
              Action recommended
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
