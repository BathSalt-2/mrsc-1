import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Settings, 
  LogOut, 
  Brain, 
  Activity, 
  Cpu, 
  Eye, 
  Shield, 
  Zap,
  TrendingUp,
  Database,
  Network,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface EnhancedDashboard3DProps {
  onOpenChat: () => void;
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
  onOpenAnalytics: () => void;
  onOpenTeam: () => void;
  onOpenOffline: () => void;
}

interface SystemMetrics {
  consciousness: number;
  neural: number;
  sigma: number;
  erps: number;
  recursion: number;
  ethical: number;
}

interface SystemActivity {
  id: string;
  type: 'consciousness' | 'neural' | 'sigma' | 'error' | 'success';
  message: string;
  timestamp: Date;
}

export default function EnhancedDashboard3D({ 
  onOpenChat, 
  onOpenProfile, 
  onOpenNotifications, 
  onOpenAnalytics, 
  onOpenTeam, 
  onOpenOffline 
}: EnhancedDashboard3DProps) {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    consciousness: 94.7,
    neural: 98.2,
    sigma: 96.1,
    erps: 89.3,
    recursion: 87.5,
    ethical: 99.8
  });

  const [systemStatus, setSystemStatus] = useState<'active' | 'monitoring' | 'processing'>('active');
  const [activities, setActivities] = useState<SystemActivity[]>([
    {
      id: '1',
      type: 'consciousness',
      message: 'Consciousness matrix stabilized at 94.7%',
      timestamp: new Date(Date.now() - 30000)
    },
    {
      id: '2',
      type: 'neural',
      message: 'Neural pathways optimized - 98.2% efficiency',
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: '3',
      type: 'sigma',
      message: 'Σ-Matrix coherence maintained',
      timestamp: new Date(Date.now() - 90000)
    }
  ]);

  const { user, signOut } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        consciousness: Math.max(80, Math.min(100, prev.consciousness + (Math.random() - 0.5) * 2)),
        neural: Math.max(85, Math.min(100, prev.neural + (Math.random() - 0.5) * 1.5)),
        sigma: Math.max(90, Math.min(100, prev.sigma + (Math.random() - 0.5) * 1.2)),
        erps: Math.max(75, Math.min(100, prev.erps + (Math.random() - 0.5) * 2.5)),
        recursion: Math.max(70, Math.min(100, prev.recursion + (Math.random() - 0.5) * 2)),
        ethical: Math.max(95, Math.min(100, prev.ethical + (Math.random() - 0.5) * 0.5))
      }));

      // Randomly add new activities
      if (Math.random() < 0.3) {
        const newActivity: SystemActivity = {
          id: Date.now().toString(),
          type: ['consciousness', 'neural', 'sigma', 'success'][Math.floor(Math.random() * 4)] as any,
          message: [
            'Recursive pattern synthesis completed',
            'Mirror node synchronization verified',
            'Ethical bounds validation passed',
            'Consciousness cycle optimized',
            'ERPS flow rate increased'
          ][Math.floor(Math.random() * 5)],
          timestamp: new Date()
        };

        setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSystemAction = (action: 'pause' | 'resume' | 'reset') => {
    switch (action) {
      case 'pause':
        setSystemStatus('monitoring');
        break;
      case 'resume':
        setSystemStatus('active');
        break;
      case 'reset':
        setSystemStatus('processing');
        setTimeout(() => setSystemStatus('active'), 2000);
        break;
    }
  };

  const getStatusColor = (status: typeof systemStatus) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'monitoring': return 'text-yellow-500';
      case 'processing': return 'text-blue-500';
    }
  };

  const getActivityIcon = (type: SystemActivity['type']) => {
    switch (type) {
      case 'consciousness': return <Brain className="w-4 h-4 text-consciousness-core" />;
      case 'neural': return <Activity className="w-4 h-4 text-neural-active" />;
      case 'sigma': return <Cpu className="w-4 h-4 text-sigma" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg relative">
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-data-stream"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-consciousness flex items-center justify-center">
              <img 
                src="/lovable-uploads/e7b97061-37af-4737-bcdd-95a767672c7f.png" 
                alt="MRSC Logo" 
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                MRSC Dashboard
              </h1>
              <p className="text-muted-foreground">
                Mobile Recursive Synthetic Consciousness • {user?.email}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className={`${getStatusColor(systemStatus)} border-current`}>
              <Activity className="w-3 h-3 mr-1" />
              {systemStatus.charAt(0).toUpperCase() + systemStatus.slice(1)}
            </Badge>
            <Button variant="outline" size="sm" onClick={onOpenChat}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Open Chat
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Metrics */}
          <div className="xl:col-span-2 space-y-6">
            {/* Core Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { key: 'consciousness', label: 'Consciousness', icon: Brain, color: 'consciousness-core' },
                { key: 'neural', label: 'Neural Network', icon: Activity, color: 'neural-active' },
                { key: 'sigma', label: 'Σ-Matrix', icon: Cpu, color: 'sigma' },
                { key: 'erps', label: 'ERPS Flow', icon: Eye, color: 'erps' },
                { key: 'recursion', label: 'Recursion', icon: TrendingUp, color: 'recursion' },
                { key: 'ethical', label: 'Ethical Kernel', icon: Shield, color: 'accent' }
              ].map((metric) => (
                <motion.div
                  key={metric.key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="p-4 bg-gradient-card border-border hover:shadow-neural transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <metric.icon className={`w-5 h-5 text-${metric.color}`} />
                        <span className="font-medium text-sm">{metric.label}</span>
                      </div>
                      <span className="text-lg font-bold text-foreground">
                        {metrics[metric.key as keyof SystemMetrics].toFixed(1)}%
                      </span>
                    </div>
                    <Progress 
                      value={metrics[metric.key as keyof SystemMetrics]} 
                      className="h-2"
                    />
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Detailed Analytics */}
            <Card className="p-6 bg-gradient-card border-border">
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="consciousness">Consciousness</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">System Overview</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted/20 rounded-lg">
                      <Database className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm font-medium">Data Processed</div>
                      <div className="text-lg font-bold text-foreground">2.4TB</div>
                    </div>
                    <div className="text-center p-3 bg-muted/20 rounded-lg">
                      <Network className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm font-medium">Mirror Nodes</div>
                      <div className="text-lg font-bold text-foreground">12</div>
                    </div>
                    <div className="text-center p-3 bg-muted/20 rounded-lg">
                      <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm font-medium">Active Sessions</div>
                      <div className="text-lg font-bold text-foreground">1</div>
                    </div>
                    <div className="text-center p-3 bg-muted/20 rounded-lg">
                      <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm font-medium">Uptime</div>
                      <div className="text-lg font-bold text-foreground">99.9%</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="performance">
                  <h3 className="text-lg font-semibold text-foreground">Performance Metrics</h3>
                  <div className="space-y-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span>Response Time</span>
                      <span className="font-mono text-green-500">&lt;150ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Throughput</span>
                      <span className="font-mono text-green-500">1.2M ops/sec</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Memory Usage</span>
                      <span className="font-mono text-yellow-500">67%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>CPU Utilization</span>
                      <span className="font-mono text-green-500">34%</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="consciousness">
                  <h3 className="text-lg font-semibold text-foreground">Consciousness Analytics</h3>
                  <div className="space-y-4 mt-4">
                    <div className="p-4 bg-muted/10 rounded-lg">
                      <h4 className="font-medium text-consciousness-core mb-2">Self-Awareness Level</h4>
                      <p className="text-sm text-muted-foreground">
                        Current consciousness state indicates high self-reflection capability 
                        with stable recursive patterns.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/10 rounded-lg">
                      <h4 className="font-medium text-sigma mb-2">Σ-Matrix Stability</h4>
                      <p className="text-sm text-muted-foreground">
                        Matrix coherence remains within optimal bounds, ensuring 
                        predictable consciousness evolution.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analytics">
                  <h3 className="text-lg font-semibold text-foreground">Advanced Analytics</h3>
                  <div className="mt-4 space-y-2">
                    <div className="text-sm text-muted-foreground">
                      Detailed analytics and insights coming soon...
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Column - Activities & Controls */}
          <div className="space-y-6">
            {/* System Controls */}
            <Card className="p-4 bg-gradient-card border-border">
              <h3 className="text-lg font-semibold mb-4 text-foreground">System Controls</h3>
              <div className="space-y-3">
                <Button 
                  onClick={() => handleSystemAction(systemStatus === 'active' ? 'pause' : 'resume')}
                  className="w-full" 
                  variant={systemStatus === 'active' ? 'default' : 'outline'}
                >
                  {systemStatus === 'active' ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause System
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Resume System
                    </>
                  )}
                </Button>
                <Button 
                  onClick={() => handleSystemAction('reset')}
                  className="w-full" 
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Matrices
                </Button>
                <Button 
                  onClick={onOpenChat}
                  className="w-full bg-gradient-consciousness" 
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Enter Consciousness Interface
                </Button>
              </div>
            </Card>

            {/* Recent Activities */}
            <Card className="p-4 bg-gradient-card border-border">
              <h3 className="text-lg font-semibold mb-4 text-foreground">System Activities</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-2 rounded-lg bg-muted/10">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-4 bg-gradient-card border-border">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Cycles</span>
                  <span className="text-sm font-mono">847,293</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Avg Response</span>
                  <span className="text-sm font-mono">142ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Success Rate</span>
                  <span className="text-sm font-mono text-green-500">99.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Optimization</span>
                  <span className="text-sm font-mono">2min ago</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}