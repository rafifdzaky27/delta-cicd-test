import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight, 
  TrendingDown, 
  Clock, 
  MapPin,
  Activity,
  CheckCircle
} from 'lucide-react';

interface DemoScreenProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function DemoScreen({ onComplete, onSkip }: DemoScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [demoProgress, setDemoProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  // Demo data that shows the value
  const demoSteps = [
    {
      title: "Your Morning Commute",
      subtitle: "Telkom University → Menara BJB",
      time: "23:45",
      delta: "-2:15",
      deltaType: "faster",
      progress: 0.95,
      insight: "You're consistently faster on Tuesdays!"
    },
    {
      title: "Yesterday's Trip",
      subtitle: "Same route, different story",
      time: "26:00",
      delta: "+0:15",
      deltaType: "slower",
      progress: 1.0,
      insight: "Traffic was heavier around 8:30 AM"
    },
    {
      title: "Your Best Time",
      subtitle: "Personal record",
      time: "21:30",
      delta: "-4:30",
      deltaType: "best",
      progress: 1.0,
      insight: "Leaving 10 minutes earlier = 4 minutes saved"
    }
  ];

  // Auto-play demo
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setDemoProgress(prev => {
          if (prev >= 1) {
            // Move to next step
            setCurrentStep(current => {
              if (current >= demoSteps.length - 1) {
                setIsPlaying(false);
                return current;
              }
              return current + 1;
            });
            return 0;
          }
          return prev + 0.02; // 50 steps = ~2.5 seconds per step
        });
      }, 50);
    }

    return () => clearInterval(interval);
  }, [isPlaying, demoSteps.length]);

  const currentDemo = demoSteps[currentStep];

  const getDeltaColor = (type: string) => {
    switch (type) {
      case 'faster': return 'text-success';
      case 'slower': return 'text-warning';
      case 'best': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getDeltaIcon = (type: string) => {
    switch (type) {
      case 'faster': return TrendingDown;
      case 'slower': return Clock;
      case 'best': return CheckCircle;
      default: return Clock;
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setDemoProgress(0);
    setIsPlaying(true);
  };

  const DeltaIcon = getDeltaIcon(currentDemo.deltaType);

  return (
    <div className="min-h-screen bg-gradient-surface flex flex-col">
      {/* Header */}
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          See DELTA in Action
        </h1>
        <p className="text-muted-foreground">
          Here's how DELTA helps you understand your commute patterns
        </p>
      </div>

      {/* Demo Card */}
      <div className="flex-1 px-6 flex items-center justify-center">
        <div className="w-full max-w-sm space-y-6">
          
          {/* Main Demo Card */}
          <Card className="p-6 bg-gradient-card shadow-card animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">{currentDemo.title}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {demoSteps.length}
              </div>
            </div>

            <div className="space-y-4">
              {/* Route Info */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{currentDemo.subtitle}</span>
              </div>

              {/* Main Time Display */}
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-foreground mb-2">
                  {currentDemo.time}
                </div>
                <div className={`flex items-center justify-center gap-1 text-lg font-medium ${getDeltaColor(currentDemo.deltaType)}`}>
                  <DeltaIcon className="w-5 h-5" />
                  <span>{currentDemo.delta} vs usual</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Trip Progress</span>
                  <span className="text-foreground font-medium">
                    {Math.round(currentDemo.progress * 100)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300 relative"
                    style={{ width: `${currentDemo.progress * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full border-2 border-white shadow-sm"></div>
                  </div>
                </div>
              </div>

              {/* Insight */}
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium">
                  💡 {currentDemo.insight}
                </p>
              </div>
            </div>
          </Card>

          {/* Demo Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRestart}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Restart
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlayPause}
              className="flex items-center gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Play
                </>
              )}
            </Button>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2">
            {demoSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? 'bg-primary w-8' 
                    : index < currentStep 
                      ? 'bg-primary w-2' 
                      : 'bg-muted w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 space-y-3">
        <Button 
          onClick={onComplete}
          className="w-full h-12 text-base font-medium"
          size="lg"
        >
          Get Started with DELTA
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={onSkip}
          className="w-full"
        >
          Skip Demo
        </Button>
      </div>
    </div>
  );
}
