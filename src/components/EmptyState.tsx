import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Clock, Zap, ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-trips' | 'no-routes' | 'no-history';
  onAction?: () => void;
  actionLabel?: string;
}

export function EmptyState({ type, onAction, actionLabel }: EmptyStateProps) {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-trips':
        return {
          icon: <Clock className="w-12 h-12 text-muted-foreground" />,
          title: "No trips yet",
          description: "Start your first commute to see your personal tracking data here.",
          actionLabel: actionLabel || "Take your first trip",
          illustration: (
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-primary opacity-10 rounded-full mx-auto mb-4"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Clock className="w-12 h-12 text-primary" />
              </div>
            </div>
          )
        };
      
      case 'no-routes':
        return {
          icon: <MapPin className="w-12 h-12 text-muted-foreground" />,
          title: "No routes configured",
          description: "Set up your daily commute route to start automatic trip tracking.",
          actionLabel: actionLabel || "Create your first route",
          illustration: (
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-success opacity-10 rounded-full mx-auto mb-4"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-success" />
              </div>
            </div>
          )
        };
      
      case 'no-history':
        return {
          icon: <Zap className="w-12 h-12 text-muted-foreground" />,
          title: "No trip history",
          description: "Complete a few trips to see your patterns and insights here.",
          actionLabel: actionLabel || "Start tracking",
          illustration: (
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-warning opacity-10 rounded-full mx-auto mb-4"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-12 h-12 text-warning" />
              </div>
            </div>
          )
        };
      
      default:
        return {
          icon: <Clock className="w-12 h-12 text-muted-foreground" />,
          title: "Nothing here yet",
          description: "Start using DELTA to see your data.",
          actionLabel: "Get started"
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center px-6">
      <Card className="p-8 bg-gradient-card shadow-card max-w-sm w-full text-center">
        <div className="space-y-6">
          {/* Illustration */}
          {content.illustration || (
            <div className="flex justify-center">
              {content.icon}
            </div>
          )}
          
          {/* Content */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              {content.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {content.description}
            </p>
          </div>
          
          {/* Action Button */}
          {onAction && (
            <Button 
              onClick={onAction}
              className="w-full h-12"
              size="lg"
            >
              {content.actionLabel}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
          
          {/* Helpful tips */}
          <div className="pt-4 border-t border-border">
            <div className="space-y-2 text-xs text-muted-foreground">
              {type === 'no-trips' && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>DELTA automatically detects your trips</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Just start your commute as usual</span>
                  </div>
                </>
              )}
              {type === 'no-routes' && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                    <span>Set your home and work locations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                    <span>Enable location permissions</span>
                  </div>
                </>
              )}
              {type === 'no-history' && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
                    <span>Take 3-5 trips to see patterns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
                    <span>Data improves with more trips</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Specific empty state components for common use cases
export function NoTripsState({ onStartTrip }: { onStartTrip?: () => void }) {
  return (
    <EmptyState 
      type="no-trips" 
      onAction={onStartTrip}
      actionLabel="Start your first commute"
    />
  );
}

export function NoRoutesState({ onCreateRoute }: { onCreateRoute?: () => void }) {
  return (
    <EmptyState 
      type="no-routes" 
      onAction={onCreateRoute}
      actionLabel="Set up your route"
    />
  );
}

export function NoHistoryState({ onViewHome }: { onViewHome?: () => void }) {
  return (
    <EmptyState 
      type="no-history" 
      onAction={onViewHome}
      actionLabel="Go to home"
    />
  );
}
