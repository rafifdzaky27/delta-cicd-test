import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { DemoScreen } from '@/components/DemoScreen';
import { RouteSetup } from '@/components/RouteSetup';
import { HomeScreen } from '@/components/HomeScreen';
import { InsightsScreen } from '@/components/InsightsScreen';
import { TripSummaryScreen } from '@/components/TripSummaryScreen';
import { HistoryScreen } from '@/components/HistoryScreen';
import { AnalyticsScreen } from '@/components/AnalyticsScreen';
import { SettingsScreen } from '@/components/SettingsScreen';
import { LiveTripScreen } from '@/components/LiveTripScreen';
import { TripCompletionScreen } from '@/components/TripCompletionScreen';
import { Navbar } from '@/components/Navbar';

type Screen = 'welcome' | 'demo' | 'setup' | 'home' | 'trip' | 'history' | 'analytics' | 'settings' | 'live-trip' | 'trip-complete';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [previousScreen, setPreviousScreen] = useState<Screen>('home');
  const [selectedTripId, setSelectedTripId] = useState<string | undefined>(undefined);
  const [completedTripData, setCompletedTripData] = useState<any>(null);
  
  // Background trip state
  const [backgroundTrip, setBackgroundTrip] = useState({
    isRunning: false,
    startTime: 0,
    elapsedTime: 0,
    progress: 0
  });

  // Onboarding handlers
  const handleViewDemo = () => {
    setCurrentScreen('demo');
  };

  const handleSkipToSetup = () => {
    setCurrentScreen('setup');
  };

  const handleCompleteDemo = () => {
    setCurrentScreen('setup');
  };

  const handleSkipDemo = () => {
    setCurrentScreen('setup');
  };

  const handleCompleteSetup = () => {
    setCurrentScreen('home');
  };

  // Legacy handler for direct welcome completion (fallback)
  const handleCompleteWelcome = () => {
    setCurrentScreen('home');
  };

  const handleViewHistory = () => {
    setPreviousScreen(currentScreen);
    setCurrentScreen('history');
  };

  const handleViewInsights = () => {
    setPreviousScreen(currentScreen);
    setCurrentScreen('insights');
  };

  const handleViewTrip = (tripId?: string) => {
    setPreviousScreen(currentScreen);
    setSelectedTripId(tripId);
    setCurrentScreen('trip');
  };

  const handleBackToPrevious = () => {
    setSelectedTripId(undefined);
    setCurrentScreen(previousScreen);
  };

  const handleSelectTrip = (tripId: string) => {
    setPreviousScreen('history');
    setSelectedTripId(tripId);
    setCurrentScreen('trip');
  };

  const handleNavigation = (screen: 'home' | 'trip' | 'insights' | 'history' | 'settings' | 'analytics') => {
    if (screen !== 'trip') {
      setSelectedTripId(undefined);
    }
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  // Handle progress update from HomeScreen
  const handleBackgroundProgressUpdate = (progress: number) => {
    setBackgroundTrip(prev => ({
      ...prev,
      progress: progress,
      elapsedTime: Math.floor(progress * 150000) // Calculate elapsed time from progress
    }));
  };

  // Live Trip Handlers
  const handleStartMockTrip = () => {
    setPreviousScreen(currentScreen);
    setCurrentScreen('live-trip');
  };

  const handleTripComplete = (tripData: any) => {
    setCompletedTripData(tripData);
    setCurrentScreen('trip-complete');
  };

  const handleBackFromLiveTrip = () => {
    setCurrentScreen(previousScreen);
  };

  const handleViewCompletedTripDetails = () => {
    // Create a mock trip ID for the completed trip
    setSelectedTripId('completed-trip');
    setCurrentScreen('trip');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onViewDemo={handleViewDemo} onSkipToSetup={handleSkipToSetup} />;
      case 'demo':
        return <DemoScreen onComplete={handleCompleteDemo} onSkip={handleSkipDemo} />;
      case 'setup':
        return <RouteSetup onComplete={handleCompleteSetup} />;
      case 'home':
        return (
          <HomeScreen 
            onViewHistory={handleViewHistory} 
            onViewTrip={() => handleViewTrip()}
            onStartMockTrip={handleStartMockTrip}
            onReturnToLiveTrip={() => setCurrentScreen('live-trip')}
            backgroundTripRunning={backgroundTrip.isRunning}
            backgroundTripProgress={backgroundTrip.progress}
            onUpdateBackgroundProgress={handleBackgroundProgressUpdate}
          />
        );
      case 'trip':
        return <TripSummaryScreen onBack={handleBackToPrevious} tripId={selectedTripId} />;
      case 'insights':
        return <InsightsScreen onBack={handleBackToPrevious} />;
      case 'history':
        return <HistoryScreen onBack={handleBackToPrevious} onSelectTrip={handleSelectTrip} />;
      case 'analytics':
        return <AnalyticsScreen onBack={handleBackToPrevious} />;
      case 'settings':
        return <SettingsScreen onBack={handleBackToPrevious} />;
      case 'live-trip':
        return (
          <LiveTripScreen 
            onBack={handleBackFromLiveTrip} 
            onTripComplete={handleTripComplete}
            backgroundTripState={backgroundTrip}
            onUpdateBackgroundTrip={setBackgroundTrip}
          />
        );
      case 'trip-complete':
        return (
          <TripCompletionScreen
            tripData={completedTripData}
            onBackToHome={() => setCurrentScreen('home')}
            onViewDetails={handleViewCompletedTripDetails}
          />
        );
      default:
        return (
          <HomeScreen 
            onViewHistory={handleViewHistory} 
            onViewTrip={() => handleViewTrip()}
            onStartMockTrip={handleStartMockTrip}
          />
        );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen relative">
      {renderScreen()}
      {/* Show navbar on all screens except onboarding and trip-complete */}
      {(currentScreen !== 'welcome' && currentScreen !== 'demo' && currentScreen !== 'setup' && currentScreen !== 'trip-complete') && (
        <Navbar 
          currentScreen={currentScreen === 'live-trip' ? 'home' : currentScreen} 
          onNavigate={handleNavigation}
        />
      )}
      {/* Add bottom padding for screens that show navbar */}
      {(currentScreen !== 'welcome' && currentScreen !== 'demo' && currentScreen !== 'setup' && currentScreen !== 'trip-complete') && <div className="h-20"></div>}
    </div>
  );
};

export default Index;
