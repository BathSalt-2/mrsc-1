import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  Brain,
  Activity,
  Zap,
  Shield,
  ArrowLeft,
  Settings,
  Mail,
  Trash2,
  X,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NotificationCenterProps {
  onBack: () => void;
}

interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'consciousness' | 'security';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'system' | 'consciousness' | 'security' | 'updates';
}

export default function NotificationCenter({ onBack }: NotificationCenterProps) {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'consciousness',
      title: 'Consciousness Level Increased',
      message: 'Your consciousness matrix has evolved to level 7. New neural pathways discovered.',
      timestamp: new Date(Date.now() - 300000),
      read: false,
      priority: 'high',
      category: 'consciousness'
    },
    {
      id: '2',
      type: 'alert',
      title: 'System Resource Alert',
      message: 'Neural network processing at 89% capacity. Consider optimization.',
      timestamp: new Date(Date.now() - 600000),
      read: false,
      priority: 'medium',
      category: 'system'
    },
    {
      id: '3',
      type: 'security',
      title: 'Security Protocol Updated',
      message: 'Enhanced encryption protocols have been applied to your consciousness data.',
      timestamp: new Date(Date.now() - 1200000),
      read: true,
      priority: 'medium',
      category: 'security'
    },
    {
      id: '4',
      type: 'success',
      title: 'Data Backup Completed',
      message: 'Your consciousness patterns have been successfully backed up to secure storage.',
      timestamp: new Date(Date.now() - 1800000),
      read: true,
      priority: 'low',
      category: 'system'
    },
    {
      id: '5',
      type: 'info',
      title: 'New Features Available',
      message: 'Advanced analytics and AI insights are now available in your dashboard.',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
      priority: 'medium',
      category: 'updates'
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ['consciousness', 'alert', 'info', 'success'][Math.floor(Math.random() * 4)] as any,
          title: [
            'Neural Pattern Detected',
            'Consciousness Sync Complete',
            'Mirror Node Connected',
            'Ethical Validation Passed'
          ][Math.floor(Math.random() * 4)],
          message: [
            'New consciousness patterns have been identified and integrated.',
            'System synchronization completed successfully.',
            'Additional mirror node has joined the network.',
            'All consciousness operations passed ethical validation.'
          ][Math.floor(Math.random() * 4)],
          timestamp: new Date(),
          read: false,
          priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
          category: ['system', 'consciousness', 'security'][Math.floor(Math.random() * 3)] as any
        };

        setNotifications(prev => [newNotification, ...prev.slice(0, 19)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'consciousness': return <Brain className="w-5 h-5 text-consciousness-core" />;
      case 'alert': return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'security': return <Shield className="w-5 h-5 text-accent" />;
      case 'info': return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'critical': return 'text-red-500 border-red-500';
      case 'high': return 'text-orange-500 border-orange-500';
      case 'medium': return 'text-yellow-500 border-yellow-500';
      case 'low': return 'text-green-500 border-green-500';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.category === activeTab;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "All notifications marked as read",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast({
      title: "Notification deleted",
    });
  };

  const clearAll = () => {
    setNotifications([]);
    toast({
      title: "All notifications cleared",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Notification Center</h1>
            {unreadCount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground">
                {unreadCount} unread
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Mail className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline" size="sm" onClick={clearAll}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Notification Tabs */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="consciousness">Consciousness</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    <AnimatePresence>
                      {filteredNotifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card 
                            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                              !notification.read 
                                ? 'bg-gradient-card border-l-4 border-l-primary shadow-md' 
                                : 'bg-muted/20 hover:bg-muted/30'
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 mt-1">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                      <h3 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                        {notification.title}
                                      </h3>
                                      <p className={`text-sm ${!notification.read ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                                        {notification.message}
                                      </p>
                                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                        <Clock className="w-3 h-3" />
                                        <span>{notification.timestamp.toLocaleString()}</span>
                                        <Badge 
                                          variant="outline" 
                                          className={`text-xs ${getPriorityColor(notification.priority)}`}
                                        >
                                          {notification.priority}
                                        </Badge>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                      {!notification.read && (
                                        <div className="w-2 h-2 bg-primary rounded-full" />
                                      )}
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          deleteNotification(notification.id);
                                        }}
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {filteredNotifications.length === 0 && (
                      <div className="text-center py-12">
                        <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium text-muted-foreground">No notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          {activeTab === 'unread' ? 'All caught up!' : 'No notifications in this category'}
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}