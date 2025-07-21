import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Clock, 
  Route, 
  CloudRain,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface Suggestion {
  id: string;
  type: 'timing' | 'route' | 'weather' | 'pattern';
  title: string;
  description: string;
  action?: string;
  savings?: string;
}

interface SmartSuggestionsProps {
  suggestions: Suggestion[];
  maxVisible?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function SmartSuggestions({ 
  suggestions, 
  maxVisible = 3, 
  className = '',
  style
}: SmartSuggestionsProps) {
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'timing': return Clock;
      case 'route': return Route;
      case 'weather': return CloudRain;
      case 'pattern': return TrendingUp;
      default: return Calendar;
    }
  };

  const visibleSuggestions = suggestions.slice(0, maxVisible);

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`} style={style}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Smart Suggestions</h3>
        {suggestions.length > maxVisible && (
          <span className="text-sm text-muted-foreground">
            +{suggestions.length - maxVisible} more
          </span>
        )}
      </div>
      
      <div className="space-y-2">
        {visibleSuggestions.map((suggestion) => {
          const IconComponent = getSuggestionIcon(suggestion.type);
          
          return (
            <Card key={suggestion.id} className="p-3 bg-gradient-card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                  <IconComponent className="w-4 h-4 text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground text-sm">
                      {suggestion.title}
                    </h4>
                    {suggestion.savings && (
                      <span className="text-xs font-medium text-success">
                        {suggestion.savings}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {suggestion.description}
                  </p>
                </div>
                
                {suggestion.action && (
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
      
      {suggestions.length > maxVisible && (
        <Button variant="outline" size="sm" className="w-full">
          View All Suggestions
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
}
