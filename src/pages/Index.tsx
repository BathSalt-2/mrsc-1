import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LandingPage from '@/components/LandingPage';
import LoadingScreen from '@/components/LoadingScreen';
import Dashboard3D from '@/components/Dashboard3D';
import ChatInterface from '@/components/ChatInterface';

type AppState = 'landing' | 'loading' | 'dashboard' | 'chat';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to auth if not logged in and not on landing page
    if (!loading && !user && currentState !== 'landing') {
      navigate('/auth');
    }
  }, [user, loading, currentState, navigate]);

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
      return <Dashboard3D onOpenChat={handleOpenChat} />;
    case 'chat':
      return <ChatInterface onBack={handleBackToDashboard} />;
    default:
      return <LandingPage onEnterSystem={handleEnterSystem} />;
  }
};

export default Index;
