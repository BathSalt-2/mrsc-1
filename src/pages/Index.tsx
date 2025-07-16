import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LandingPage from '@/components/LandingPage';
import LoadingScreen from '@/components/LoadingScreen';
import EnhancedDashboard3D from '@/components/EnhancedDashboard3D';
import ChatInterface from '@/components/ChatInterface';

type AppState = 'landing' | 'loading' | 'dashboard' | 'chat';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user && isInitialLoad) {
        // User is logged in on initial load - show loading screen then dashboard
        setCurrentState('loading');
        setIsInitialLoad(false);
      } else if (!user && currentState !== 'landing') {
        // User is not logged in and not on landing page - redirect to auth
        navigate('/auth');
      } else if (!user) {
        // User is not logged in - show landing page
        setCurrentState('landing');
        setIsInitialLoad(false);
      }
    }
  }, [user, loading, currentState, navigate, isInitialLoad]);

  const handleEnterSystem = () => {
    if (user) {
      setCurrentState('loading');
    } else {
      navigate('/auth');
    }
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
