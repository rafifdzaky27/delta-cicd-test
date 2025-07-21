// Mock insight data for Phase 1.5 implementation

export interface Insight {
  type: 'timing' | 'pattern' | 'optimization' | 'weather' | 'trend';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
}

export interface Suggestion {
  id: string;
  type: 'timing' | 'route' | 'weather' | 'pattern';
  title: string;
  description: string;
  action?: string;
  savings?: string;
}

export interface PatternData {
  type: 'daily' | 'weekly' | 'weather' | 'seasonal';
  severity: 'info' | 'warning' | 'success';
  title: string;
  description: string;
  impact: string;
  frequency: string;
  trend: 'improving' | 'worsening' | 'stable';
}

// Generate contextual insights based on current day and conditions
export const getTodaysInsight = (): Insight => {
  const dayOfWeek = new Date().getDay();
  const hour = new Date().getHours();
  
  const insights: Insight[] = [
    {
      type: 'timing',
      title: 'Leave 5 minutes earlier tomorrow',
      description: 'Tuesday mornings typically have 15% more traffic around 8:30 AM',
      impact: 'high',
      actionable: true
    },
    {
      type: 'pattern',
      title: 'Mondays are your fastest days',
      description: 'You consistently arrive 3-4 minutes earlier on Monday mornings',
      impact: 'medium',
      actionable: false
    },
    {
      type: 'optimization',
      title: 'Alternative route available',
      description: 'Route via Jl. Buah Batu could save 2-3 minutes during peak hours',
      impact: 'medium',
      actionable: true
    },
    {
      type: 'weather',
      title: 'Rain expected - plan extra time',
      description: 'Weather forecast shows rain at 8 AM, typically adds 5-7 minutes',
      impact: 'high',
      actionable: true
    },
    {
      type: 'trend',
      title: 'Your consistency is improving',
      description: 'Trip times are 20% more predictable compared to last month',
      impact: 'low',
      actionable: false
    }
  ];

  // Return contextual insight based on day
  if (dayOfWeek === 1) return insights[1]; // Monday
  if (dayOfWeek === 2) return insights[0]; // Tuesday
  if (hour >= 7 && hour <= 9) return insights[3]; // Morning rush
  
  return insights[Math.floor(Math.random() * insights.length)];
};

export const getSmartSuggestions = (): Suggestion[] => {
  return [
    {
      id: '1',
      type: 'timing',
      title: 'Optimal departure time',
      description: 'Leave at 8:15 AM for most consistent arrival',
      action: 'Set reminder',
      savings: '3-5 min'
    },
    {
      id: '2',
      type: 'route',
      title: 'Try alternative route',
      description: 'Jl. Buah Batu route is 12% faster on Tuesdays',
      action: 'Navigate',
      savings: '2-3 min'
    },
    {
      id: '3',
      type: 'weather',
      title: 'Weather impact alert',
      description: 'Rain forecast for tomorrow morning',
      action: 'Plan ahead',
      savings: '5-7 min'
    },
    {
      id: '4',
      type: 'pattern',
      title: 'Weekly pattern detected',
      description: 'Fridays are consistently 8% slower',
      savings: 'Plan +5 min'
    }
  ];
};

export const getWeeklyPattern = (): PatternData => {
  const patterns: PatternData[] = [
    {
      type: 'weekly',
      severity: 'warning',
      title: 'Tuesday Traffic Pattern',
      description: 'Your commute is consistently 15% slower on Tuesday mornings between 8:15-8:45 AM',
      impact: 'Adds 3-4 minutes to your trip',
      frequency: 'Every Tuesday for the past 4 weeks',
      trend: 'worsening'
    },
    {
      type: 'daily',
      severity: 'success',
      title: 'Morning Consistency Improved',
      description: 'Your departure timing has become 25% more consistent over the past month',
      impact: 'More predictable arrival times',
      frequency: 'Daily improvement trend',
      trend: 'improving'
    },
    {
      type: 'weather',
      severity: 'info',
      title: 'Rain Impact Analysis',
      description: 'Light rain typically adds 5-7 minutes, heavy rain adds 10-12 minutes to your commute',
      impact: 'Weather-based time adjustments needed',
      frequency: 'Based on 8 rainy day trips',
      trend: 'stable'
    }
  ];

  return patterns[Math.floor(Math.random() * patterns.length)];
};

export const getOptimalTiming = () => {
  const currentTime = new Date();
  const currentDeparture = '8:30 AM';
  const optimalDeparture = '8:25 AM';
  
  return {
    currentDeparture,
    optimalDeparture,
    difference: -5, // 5 minutes earlier
    confidence: 'high' as const,
    reasoning: 'Based on 15 trips, leaving 5 minutes earlier avoids the 8:30 AM traffic surge on Jl. Batununggal, consistently saving 3-4 minutes.'
  };
};

// Generate insights for trip summary screen
export const getTripInsights = (tripDuration: number, averageDuration: number) => {
  const difference = tripDuration - averageDuration;
  const percentDiff = ((difference / averageDuration) * 100);
  
  const insights: Insight[] = [];
  
  if (Math.abs(percentDiff) > 15) {
    insights.push({
      type: 'pattern',
      title: percentDiff > 0 ? 'Slower than usual' : 'Faster than usual',
      description: `This trip was ${Math.abs(percentDiff).toFixed(0)}% ${percentDiff > 0 ? 'slower' : 'faster'} than your average`,
      impact: Math.abs(percentDiff) > 25 ? 'high' : 'medium',
      actionable: percentDiff > 0
    });
  }
  
  if (percentDiff > 20) {
    insights.push({
      type: 'timing',
      title: 'Consider earlier departure',
      description: 'Leaving 10 minutes earlier could help avoid peak traffic',
      impact: 'high',
      actionable: true
    });
  }
  
  return insights;
};

export const getRouteOptimizationInsights = () => {
  return [
    {
      type: 'optimization' as const,
      title: 'Route efficiency analysis',
      description: 'Your current route is optimal for 70% of your trips',
      impact: 'medium' as const,
      actionable: true
    },
    {
      type: 'pattern' as const,
      title: 'Sector performance',
      description: 'Batununggal intersection adds most variability to your commute',
      impact: 'high' as const,
      actionable: true
    }
  ];
};
