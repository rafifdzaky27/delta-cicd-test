import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Lightbulb,
  TrendingUp,
  Clock,
  Target,
  Calendar,
  Zap
} from 'lucide-react';
import { InsightHeroCard } from '@/components/insights/InsightHeroCard';
import { SmartSuggestions } from '@/components/insights/SmartSuggestions';
import { OptimalTiming } from '@/components/insights/OptimalTiming';
import { PatternAlert } from '@/components/insights/PatternAlert';
import { 
  getTodaysInsight, 
  getSmartSuggestions, 
  getWeeklyPattern, 
  getOptimalTiming 
} from '@/lib/mockInsights';

interface InsightsScreenProps {
  onBack: () => void;
}

export function InsightsScreen({ onBack }: InsightsScreenProps) {
  // Get all insight data
  const [todaysInsight] = useState(getTodaysInsight());
  const [smartSuggestions] = useState(getSmartSuggestions());
  const [weeklyPattern] = useState(getWeeklyPattern());
  const [optimalTiming] = useState(getOptimalTiming());
  
  // Additional insights for dedicated screen
  const [additionalInsights] = useState([
    {
      type: 'trend' as const,
      title: 'Your consistency is improving',
      description: 'Trip times are 20% more predictable compared to last month',
      impact: 'medium' as const,
      actionable: false
    },
    {
      type: 'optimization' as const,
      title: 'Weekend pattern detected',
      description: 'Saturday trips are 25% faster - consider weekend errands',
      impact: 'low' as const,
      actionable: true
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header - Consistent with other screens */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Insights</h1>
            <p className="text-muted-foreground">Your commute intelligence</p>
          </div>
        </div>
        <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        
        {/* Hero Insight */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Today's Key Insight
          </h2>
          <InsightHeroCard 
            insight={todaysInsight}
            className="animate-fade-in"
          />
        </div>

        {/* Optimal Timing */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Timing Optimization
          </h2>
          <OptimalTiming 
            {...optimalTiming}
            className="animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          />
        </div>

        {/* Smart Suggestions */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Smart Recommendations
          </h2>
          <SmartSuggestions 
            suggestions={smartSuggestions}
            maxVisible={4}
            className="animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          />
        </div>

        {/* Pattern Analysis */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Pattern Analysis
          </h2>
          <PatternAlert 
            pattern={weeklyPattern}
            className="animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          />
        </div>

        {/* Additional Insights */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            More Insights
          </h2>
          <div className="space-y-3">
            {additionalInsights.map((insight, index) => (
              <InsightHeroCard 
                key={index}
                insight={insight}
                className="animate-fade-in"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        {/* Action Section */}
        <Card className="p-6 bg-gradient-primary text-white">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Ready to optimize?</h3>
              <p className="text-white/90 text-sm">
                Try implementing one recommendation today and see the difference.
              </p>
            </div>
            <Button 
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              Start Your Next Trip
            </Button>
          </div>
        </Card>

        {/* Bottom Spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
