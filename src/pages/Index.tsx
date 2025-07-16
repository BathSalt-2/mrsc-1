import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LandingPage from '@/components/LandingPage';
import LoadingScreen from '@/components/LoadingScreen';
import EnhancedDashboard3D from '@/components/EnhancedDashboard3D';
import CustomizableWidgetDashboard from '@/components/CustomizableWidgetDashboard';
import AIInsightsEngine from '@/components/AIInsightsEngine';
import HelpOnboarding from '@/components/HelpOnboarding';
import AdvancedSecurityCenter from '@/components/AdvancedSecurityCenter';
import UserProfile from '@/components/UserProfile';
import NotificationCenter from '@/components/NotificationCenter';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import TeamCollaboration from '@/components/TeamCollaboration';
import OfflineMode from '@/components/OfflineMode';
import ChatInterface from '@/components/ChatInterface';

type AppState = 'landing' | 'loading' | 'dashboard' | 'chat' | 'profile' | 'notifications' | 'analytics' | 'team' | 'offline' | 'widgets' | 'insights' | 'help' | 'security';

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

  const handleOpenProfile = () => setCurrentState('profile');
  const handleOpenNotifications = () => setCurrentState('notifications');
  const handleOpenAnalytics = () => setCurrentState('analytics');
  const handleOpenTeam = () => setCurrentState('team');
  const handleOpenOffline = () => setCurrentState('offline');
  const handleOpenWidgets = () => setCurrentState('widgets');
  const handleOpenInsights = () => setCurrentState('insights');
  const handleOpenHelp = () => setCurrentState('help');
  const handleOpenSecurity = () => setCurrentState('security');

  switch (currentState) {
    case 'landing':
      return <LandingPage onEnterSystem={handleEnterSystem} />;
    case 'loading':
      return <LoadingScreen onComplete={handleLoadingComplete} />;
    case 'dashboard':
      return <EnhancedDashboard3D onOpenChat={handleOpenChat} onOpenProfile={handleOpenProfile} onOpenNotifications={handleOpenNotifications} onOpenAnalytics={handleOpenAnalytics} onOpenTeam={handleOpenTeam} onOpenOffline={handleOpenOffline} />;
    case 'chat':
      return <ChatInterface onBack={handleBackToDashboard} />;
    case 'profile':
      return <UserProfile onBack={handleBackToDashboard} />;
    case 'notifications':
      return <NotificationCenter onBack={handleBackToDashboard} />;
    case 'analytics':
      return <AnalyticsDashboard onBack={handleBackToDashboard} />;
    case 'team':
      return <TeamCollaboration onBack={handleBackToDashboard} />;
    case 'offline':
      return <OfflineMode onBack={handleBackToDashboard} />;
    case 'widgets':
      return <CustomizableWidgetDashboard onBack={handleBackToDashboard} />;
    case 'insights':
      return <AIInsightsEngine onBack={handleBackToDashboard} />;
    case 'help':
      return <HelpOnboarding onBack={handleBackToDashboard} />;
    case 'security':
      return <AdvancedSecurityCenter onBack={handleBackToDashboard} />;
    default:
      return <LandingPage onEnterSystem={handleEnterSystem} />;
  }
};

export default Index;
