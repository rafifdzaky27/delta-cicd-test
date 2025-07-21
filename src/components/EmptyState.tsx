import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  MapPin, 
  Clock, 
  Zap, 
  AlertCircle, 
  Wifi, 
  Battery,
  Navigation,
  Route,
  Calendar,
  Settings
} from 'lucide-react';

interface EmptyStateProps {
  type: 'no-trips' | 'no-routes' | 'no-permission' | 'no-gps' | 'no-connection' | 'loading-error';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

export function EmptyState({ 
  type, 
  title, 
  description, 
  actionLabel, 
  onAction,
  secondaryActionLabel,
  onSecondaryAction 
}: EmptyStateProps) {
  
  const getEmptyStateConfig = () => {
    switch (type) {
      case 'no-trips':
        return {
          icon: <Calendar className="w-16 h-16 text-muted-foreground" />,
          title: title || 'No trips recorded yet',
          description: description || 'Start your first commute to see your trip history and analytics.',
          actionLabel: actionLabel || 'Set up route',
          gradient: 'from-blue-50 to-indigo-50',
          iconBg: 'bg-blue-100',
          actionVariant: 'default' as const
        };
      
      case 'no-routes':
        return {
          icon: <Route className="w-16 h-16 text-muted-foreground" />,
          title: title || 'No routes configured',
          description: description || 'Create your first route to start tracking your daily commute.',
          actionLabel: actionLabel || 'Create route',
          gradient: 'from-green-50 to-emerald-50',
          iconBg: 'bg-green-100',
          actionVariant: 'default' as const
        };
      
      case 'no-permission':
        return {
          icon: <Navigation className="w-16 h-16 text-orange-500" />,
          title: title || 'Location permission needed',
          description: description || 'DELTA needs location access to track your commute automatically.',
          actionLabel: actionLabel || 'Grant permission',
          gradient: 'from-orange-50 to-amber-50',
          iconBg: 'bg-orange-100',
          actionVariant: 'default' as const
        };
      
      case 'no-gps':
        return {
          icon: <MapPin className="w-16 h-16 text-red-500" />,
          title: title || 'GPS unavailable',
          description: description || 'Please enable GPS/location services to track your trips.',
          actionLabel: actionLabel || 'Open settings',
          gradient: 'from-red-50 to-rose-50',
          iconBg: 'bg-red-100',
          actionVariant: 'destructive' as const
        };
      
      case 'no-connection':
        return {
          icon: <Wifi className="w-16 h-16 text-gray-500" />,
          title: title || 'No connection',
          description: description || 'Check your internet connection and try again.',
          actionLabel: actionLabel || 'Retry',
          gradient: 'from-gray-50 to-slate-50',
          iconBg: 'bg-gray-100',
          actionVariant: 'outline' as const
        };
      
      case 'loading-error':
        return {
          icon: <AlertCircle className="w-16 h-16 text-red-500" />,
          title: title || 'Something went wrong',
          description: description || 'Unable to load your data. Please try again.',
          actionLabel: actionLabel || 'Try again',
          gradient: 'from-red-50 to-pink-50',
          iconBg: 'bg-red-100',
          actionVariant: 'destructive' as const
        };
      
      default:
        return {
          icon: <Clock className="w-16 h-16 text-muted-foreground" />,
          title: title || 'Nothing here yet',
          description: description || 'Content will appear here once available.',
          actionLabel: actionLabel || 'Continue',
          gradient: 'from-gray-50 to-slate-50',
          iconBg: 'bg-gray-100',
          actionVariant: 'default' as const
        };
    }
  };

  const config = getEmptyStateConfig();

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center px-6">
      <Card className={`p-8 text-center max-w-sm w-full bg-gradient-to-br ${config.gradient} border-0 shadow-card animate-scale-in`}>
        {/* Animated Icon */}
        <div className={`w-24 h-24 ${config.iconBg} rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle`}>
          {config.icon}
        </div>
        
        {/* Content */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h2 className="text-xl font-semibold text-foreground">
            {config.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {config.description}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3 mt-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
          {onAction && (
            <Button 
              onClick={onAction}
              variant={config.actionVariant}
              className="w-full h-12"
            >
              {config.actionLabel}
            </Button>
          )}
          
          {onSecondaryAction && secondaryActionLabel && (
            <Button 
              onClick={onSecondaryAction}
              variant="ghost"
              className="w-full"
            >
              {secondaryActionLabel}
            </Button>
          )}
        </div>

        {/* Helpful Tips */}
        {type === 'no-trips' && (
          <div className="mt-6 p-4 bg-white/50 rounded-lg animate-fade-in" style={{ animationDelay: '600ms' }}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-primary" />
              <span>Tip: DELTA will automatically detect your trips once you start commuting</span>
            </div>
          </div>
        )}

        {type === 'no-permission' && (
          <div className="mt-6 space-y-2 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Your location data stays on your device</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span>Used only for trip tracking</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span>No data shared with third parties</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// Specialized empty state components for common scenarios
export function NoTripsState({ onSetupRoute }: { onSetupRoute: () => void }) {
  return (
    <EmptyState
      type="no-trips"
      onAction={onSetupRoute}
      secondaryActionLabel="Learn more"
      onSecondaryAction={() => console.log('Show help')}
    />
  );
}

export function NoRoutesState({ onCreateRoute }: { onCreateRoute: () => void }) {
  return (
    <EmptyState
      type="no-routes"
      onAction={onCreateRoute}
      secondaryActionLabel="Import route"
      onSecondaryAction={() => console.log('Import route')}
    />
  );
}

export function LocationPermissionState({ onGrantPermission }: { onGrantPermission: () => void }) {
  return (
    <EmptyState
      type="no-permission"
      onAction={onGrantPermission}
      secondaryActionLabel="Manual setup"
      onSecondaryAction={() => console.log('Manual setup')}
    />
  );
}
