import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  ArrowLeft,
  Settings,
  Plus,
  Grip,
  BarChart3,
  Clock,
  Bell,
  Users,
  Activity,
  Zap,
  Eye,
  Shield,
  Brain
} from 'lucide-react';

interface CustomizableWidgetDashboardProps {
  onBack: () => void;
}

interface Widget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'activity' | 'status';
  enabled: boolean;
  icon: any;
  value?: string | number;
  description?: string;
}

const CustomizableWidgetDashboard = ({ onBack }: CustomizableWidgetDashboardProps) => {
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: 'consciousness',
      title: 'Consciousness Level',
      type: 'metric',
      enabled: true,
      icon: Brain,
      value: '87%',
      description: 'Current awareness state'
    },
    {
      id: 'neural',
      title: 'Neural Activity',
      type: 'chart',
      enabled: true,
      icon: Activity,
      value: '1,247 ops/s',
      description: 'Processing operations'
    },
    {
      id: 'sigma',
      title: 'Sigma Protocols',
      type: 'status',
      enabled: false,
      icon: Shield,
      value: 'Active',
      description: 'Security protocols status'
    },
    {
      id: 'erps',
      title: 'ERP Systems',
      type: 'metric',
      enabled: true,
      icon: BarChart3,
      value: '98.2%',
      description: 'System efficiency'
    },
    {
      id: 'team',
      title: 'Team Activity',
      type: 'activity',
      enabled: true,
      icon: Users,
      value: '12 active',
      description: 'Active team members'
    },
    {
      id: 'notifications',
      title: 'System Alerts',
      type: 'status',
      enabled: false,
      icon: Bell,
      value: '3 pending',
      description: 'Unread notifications'
    }
  ]);

  const toggleWidget = (id: string) => {
    setWidgets(widgets.map(widget => 
      widget.id === id ? { ...widget, enabled: !widget.enabled } : widget
    ));
  };

  const enabledWidgets = widgets.filter(w => w.enabled);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={onBack}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Widget Dashboard
              </h1>
              <p className="text-muted-foreground">Customize your dashboard layout</p>
            </div>
          </div>
          <Badge variant="secondary" className="px-4 py-2">
            {enabledWidgets.length} Active Widgets
          </Badge>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Widget Configuration Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Widget Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {widgets.map((widget) => (
                  <div key={widget.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <widget.icon className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium">{widget.title}</p>
                        <p className="text-sm text-muted-foreground">{widget.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={widget.enabled}
                      onCheckedChange={() => toggleWidget(widget.id)}
                    />
                  </div>
                ))}
                
                <Button className="w-full mt-4" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Widget
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Active Widgets Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Card className="border-primary/20 shadow-lg h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Dashboard Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enabledWidgets.map((widget, index) => (
                    <motion.div
                      key={widget.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative group"
                    >
                      <Card className="border-primary/10 hover:border-primary/30 transition-colors cursor-move">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <widget.icon className="h-4 w-4 text-primary" />
                              <h4 className="font-medium text-sm">{widget.title}</h4>
                            </div>
                            <Grip className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="text-2xl font-bold text-primary mb-1">
                            {widget.value}
                          </div>
                          {widget.type === 'metric' && (
                            <Progress 
                              value={parseInt(widget.value?.toString().replace('%', '') || '0')} 
                              className="h-2"
                            />
                          )}
                          {widget.type === 'chart' && (
                            <div className="h-16 bg-gradient-to-r from-primary/20 to-primary/5 rounded flex items-end">
                              {[...Array(8)].map((_, i) => (
                                <div
                                  key={i}
                                  className="flex-1 bg-primary/40 mx-0.5 rounded-t"
                                  style={{ height: `${Math.random() * 100}%` }}
                                />
                              ))}
                            </div>
                          )}
                          {widget.type === 'status' && (
                            <Badge variant="secondary" className="text-xs">
                              {widget.value}
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                {enabledWidgets.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No widgets enabled. Enable widgets from the settings panel.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CustomizableWidgetDashboard;