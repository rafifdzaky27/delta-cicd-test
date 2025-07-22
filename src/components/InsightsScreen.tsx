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

// Phase 1.5 Insight Components - RESTORED
import { InsightHeroCard } from '@/components/insights/InsightHeroCard';
import { SmartSuggestions } from '@/components/insights/SmartSuggestions';
import { OptimalTiming } from '@/components/insights/OptimalTiming';
import { PatternAlert } from '@/components/insights/PatternAlert';

// Phase 2 Advanced Components - ADDED as enhancement
import { PredictiveInsights } from '@/components/analytics/PredictiveInsights';

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
  const [todaysInsight] = useState(getTodaysInsight());
  const [smartSuggestions] = useState(getSmartSuggestions());
  const [weeklyPattern] = useState(getWeeklyPattern());
  const [optimalTiming] = useState(getOptimalTiming());
  
  // Additional insights from Phase 1.5 - RESTORED
  const [additionalInsights] = useState([
    {
      type: 'optimization' as const,
      title: 'Route Efficiency Boost',
      description: 'Taking Jl. Buah Batu during rush hour saves 4 minutes on average',
      impact: 'medium' as const,
      actionable: true,
      confidence: 87
    },
    {
      type: 'pattern' as const, // Changed from 'behavioral' to 'pattern'
      title: 'Consistency Pattern',
      description: 'Your Tuesday departures are 23% more consistent than other weekdays',
      impact: 'low' as const,
      actionable: false,
      confidence: 92
    },
    {
      type: 'weather' as const, // Changed from 'predictive' to 'weather'
      title: 'Weather Impact Alert',
      description: 'Light rain tomorrow morning may add 3-5 minutes to your commute',
      impact: 'medium' as const,
      actionable: true,
      confidence: 78
    }
  ]);
  
  return (
    <div className="min-h-screen bg-gradient-surface pb-20 md:pb-6">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Smart Insights</h1>
            <p className="text-sm text-muted-foreground">Your personalized commute intelligence</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-6">
        
        {/* PHASE 1.5: Hero Insight - RESTORED */}
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

        {/* PHASE 2: Tomorrow's Prediction - COMPREHENSIVE (includes timing) */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Tomorrow's Forecast
          </h2>
          <PredictiveInsights />
        </div>

        {/* PHASE 1.5: Smart Suggestions - RESTORED */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Smart Suggestions
          </h2>
          <SmartSuggestions 
            suggestions={smartSuggestions}
            className="animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          />
        </div>

        {/* PHASE 1.5: Pattern Analysis - RESTORED */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Weekly Patterns
          </h2>
          <PatternAlert 
            pattern={weeklyPattern}
            className="animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          />
        </div>

        {/* PHASE 1.5: Additional Insights - FILTERED (remove weather duplicate) */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            More Insights
          </h2>
          <div className="space-y-3">
            {additionalInsights
              .filter(insight => insight.type !== 'weather') // Remove weather duplicate
              .map((insight, index) => (
                <InsightHeroCard 
                  key={index}
                  insight={insight}
                  className="animate-fade-in"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                />
              ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="p-6 bg-gradient-primary text-white text-center">
          <div className="space-y-4">
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
              <Clock className="w-4 h-4 mr-2" />
              Start Tracking
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
