import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import LoadingScreen from '@/components/LoadingScreen';
import EnhancedDashboard3D from '@/components/EnhancedDashboard3D';
import ChatInterface from '@/components/ChatInterface';

type AppState = 'landing' | 'loading' | 'dashboard' | 'chat';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');

  const handleEnterSystem = () => {
    setCurrentState('loading');
  };

  const handleLoadingComplete = () => {
    setCurrentState('dashboard');
  };

  const handleOpenChat = () => {
    setCurrentState('chat');
  };

  const handleBackToDashboard = () => {
    setCurrentState('dashboard');
  };

  switch (currentState) {
    case 'landing':
      return <LandingPage onEnterSystem={handleEnterSystem} />;
    case 'loading':
      return <LoadingScreen onComplete={handleLoadingComplete} />;
    case 'dashboard':
      return <EnhancedDashboard3D onOpenChat={handleOpenChat} />;
    case 'chat':
      return <ChatInterface onBack={handleBackToDashboard} />;
    default:
      return <LandingPage onEnterSystem={handleEnterSystem} />;
  }
};

export default Index;
