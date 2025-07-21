import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { HomeScreen } from '@/components/HomeScreen';
import { TripSummaryScreen } from '@/components/TripSummaryScreen';
import { HistoryScreen } from '@/components/HistoryScreen';
import { AnalyticsScreen } from '@/components/AnalyticsScreen';
import { SettingsScreen } from '@/components/SettingsScreen';
import { Navbar } from '@/components/Navbar';

type Screen = 'welcome' | 'home' | 'trip' | 'history' | 'analytics' | 'settings';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [previousScreen, setPreviousScreen] = useState<Screen>('home'); // Track previous screen
  const [selectedTripId, setSelectedTripId] = useState<string | undefined>(undefined);

  const handleCompleteWelcome = () => {
    setCurrentScreen('home');
  };

  const handleViewHistory = () => {
    setPreviousScreen(currentScreen);
    setCurrentScreen('history');
  };

  const handleViewTrip = (tripId?: string) => {
    setPreviousScreen(currentScreen);
    setSelectedTripId(tripId);
    setCurrentScreen('trip');
  };

  const handleBackToPrevious = () => {
    setSelectedTripId(undefined);
    setCurrentScreen(previousScreen); // Go back to previous screen
  };

  const handleSelectTrip = (tripId: string) => {
    setPreviousScreen('history'); // Set history as previous when selecting from history
    setSelectedTripId(tripId);
    setCurrentScreen('trip');
  };

  const handleNavigation = (screen: 'home' | 'trip' | 'history' | 'settings' | 'analytics') => {
    if (screen !== 'trip') {
      setSelectedTripId(undefined);
    }
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onComplete={handleCompleteWelcome} />;
      case 'home':
        return <HomeScreen onViewHistory={handleViewHistory} onViewTrip={() => handleViewTrip()} />;
      case 'trip':
        return <TripSummaryScreen onBack={handleBackToPrevious} tripId={selectedTripId} />;
      case 'history':
        return <HistoryScreen onBack={handleBackToPrevious} onSelectTrip={handleSelectTrip} />;
      case 'analytics':
        return <AnalyticsScreen onBack={handleBackToPrevious} />;
      case 'settings':
        return <SettingsScreen onBack={handleBackToPrevious} />;
      default:
        return <HomeScreen onViewHistory={handleViewHistory} onViewTrip={() => handleViewTrip()} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen relative">
      {renderScreen()}
      <Navbar 
        currentScreen={currentScreen} 
        onNavigate={handleNavigation}
      />
      {currentScreen !== 'welcome' && <div className="h-20"></div>}
    </div>
  );
};

export default Index;
