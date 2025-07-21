import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, TrendingUp, Clock } from 'lucide-react';
import heroImage from '@/assets/hero-commute.jpg';

interface WelcomeScreenProps {
  onViewDemo: () => void;
  onSkipToSetup: () => void;
}

export function WelcomeScreen({ onViewDemo, onSkipToSetup }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-surface flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12">
        <div className="w-full max-w-sm mx-auto text-center space-y-8">
          
          {/* Hero Image */}
          <div className="animate-fade-in">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="DELTA Commute Tracking" 
                className="w-full h-48 object-cover rounded-2xl shadow-card"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl"></div>
            </div>
          </div>
          
          {/* Main Message */}
          <div className="animate-fade-in space-y-4" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome to <span className="text-primary">DELTA</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Discover your commute patterns and optimize your daily journey. 
              <span className="block mt-2 font-medium text-foreground">
                No racing, just rhythm.
              </span>
            </p>
          </div>

          {/* Value Props */}
          <div className="animate-fade-in space-y-4" style={{ animationDelay: '0.4s' }}>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground">Track your daily patterns</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-success-light flex items-center justify-center">
                  <Clock className="w-4 h-4 text-success" />
                </div>
                <span className="text-foreground">Find your optimal timing</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-warning-light flex items-center justify-center">
                  <Zap className="w-4 h-4 text-warning" />
                </div>
                <span className="text-foreground">Get personalized insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 pb-8 space-y-3 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <Button 
          onClick={onViewDemo}
          className="w-full h-12 text-base font-medium"
          size="lg"
        >
          See How It Works
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={onSkipToSetup}
          className="w-full"
        >
          Skip to Setup
        </Button>
      </div>
    </div>
  );
}
