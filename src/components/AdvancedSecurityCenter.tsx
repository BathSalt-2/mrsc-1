import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Fingerprint,
  Key,
  Scan,
  Globe,
  UserCheck,
  Activity,
  Bell,
  Settings,
  Zap,
  Clock,
  FileText
} from 'lucide-react';

interface AdvancedSecurityCenterProps {
  onBack: () => void;
}

interface SecurityMetric {
  id: string;
  name: string;
  value: number;
  status: 'safe' | 'warning' | 'critical';
  description: string;
}

interface SecurityEvent {
  id: string;
  type: 'login' | 'access' | 'threat' | 'update';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  source: string;
}

interface SecuritySetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  level: 'basic' | 'enhanced' | 'maximum';
}

const AdvancedSecurityCenter = ({ onBack }: AdvancedSecurityCenterProps) => {
  const [securityScore, setSecurityScore] = useState(87);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const [securityMetrics] = useState<SecurityMetric[]>([
    {
      id: '1',
      name: 'Authentication Security',
      value: 95,
      status: 'safe',
      description: 'Multi-factor authentication and biometric verification active'
    },
    {
      id: '2',
      name: 'Network Protection',
      value: 78,
      status: 'warning',
      description: 'Some ports showing unusual activity'
    },
    {
      id: '3',
      name: 'Data Encryption',
      value: 100,
      status: 'safe',
      description: 'All data encrypted with AES-256'
    },
    {
      id: '4',
      name: 'Access Control',
      value: 91,
      status: 'safe',
      description: 'Role-based access control functioning normally'
    },
    {
      id: '5',
      name: 'Threat Detection',
      value: 64,
      status: 'warning',
      description: 'AI threat detection needs optimization'
    }
  ]);

  const [securityEvents] = useState<SecurityEvent[]>([
    {
      id: '1',
      type: 'login',
      message: 'Successful admin login from verified device',
      severity: 'low',
      timestamp: new Date(Date.now() - 300000),
      source: '192.168.1.100'
    },
    {
      id: '2',
      type: 'threat',
      message: 'Suspicious access attempt blocked',
      severity: 'high',
      timestamp: new Date(Date.now() - 900000),
      source: '45.123.45.67'
    },
    {
      id: '3',
      type: 'update',
      message: 'Security protocols updated successfully',
      severity: 'low',
      timestamp: new Date(Date.now() - 1800000),
      source: 'System'
    },
    {
      id: '4',
      type: 'access',
      message: 'Unauthorized neural network access attempt',
      severity: 'critical',
      timestamp: new Date(Date.now() - 3600000),
      source: 'Unknown'
    }
  ]);

  const [securitySettings, setSecuritySettings] = useState<SecuritySetting[]>([
    {
      id: '1',
      name: 'Biometric Authentication',
      description: 'Enable fingerprint and facial recognition',
      enabled: true,
      level: 'enhanced'
    },
    {
      id: '2',
      name: 'Real-time Threat Scanning',
      description: 'Continuous monitoring for security threats',
      enabled: true,
      level: 'maximum'
    },
    {
      id: '3',
      name: 'Network Isolation',
      description: 'Isolate critical systems from external networks',
      enabled: false,
      level: 'maximum'
    },
    {
      id: '4',
      name: 'Behavioral Analysis',
      description: 'AI-powered user behavior monitoring',
      enabled: true,
      level: 'enhanced'
    },
    {
      id: '5',
      name: 'Quantum Encryption',
      description: 'Next-generation quantum-resistant encryption',
      enabled: false,
      level: 'maximum'
    }
  ]);

  const startSecurityScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    const timer = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsScanning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const toggleSetting = (id: string) => {
    setSecuritySettings(settings =>
      settings.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-500/20 text-green-700';
      case 'medium': return 'bg-yellow-500/20 text-yellow-700';
      case 'high': return 'bg-orange-500/20 text-orange-700';
      case 'critical': return 'bg-red-500/20 text-red-700';
      default: return 'bg-gray-500/20 text-gray-700';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login': return UserCheck;
      case 'access': return Key;
      case 'threat': return AlertTriangle;
      case 'update': return Settings;
      default: return Activity;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden">
      {/* Security-themed Background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 90, 180, 270, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            <Shield className="h-4 w-4 text-primary/30" />
          </motion.div>
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
                Advanced Security Center
              </h1>
              <p className="text-muted-foreground">Comprehensive security monitoring and control</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge 
              variant={securityScore >= 90 ? 'default' : securityScore >= 70 ? 'secondary' : 'destructive'}
              className="px-4 py-2 text-lg"
            >
              Security Score: {securityScore}%
            </Badge>
            <Button onClick={startSecurityScan} disabled={isScanning}>
              {isScanning ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Scan className="h-4 w-4" />
                  </motion.div>
                  Scanning...
                </>
              ) : (
                <>
                  <Scan className="h-4 w-4 mr-2" />
                  Security Scan
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Security Scan Progress */}
        {isScanning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Shield className="h-8 w-8 text-primary" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Deep Security Scan in Progress</h3>
                    <Progress value={scanProgress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-1">
                      Analyzing network security, access controls, and threat patterns...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Security Overview</TabsTrigger>
            <TabsTrigger value="events">Security Events</TabsTrigger>
            <TabsTrigger value="settings">Security Settings</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {securityMetrics.map((metric, index) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{metric.name}</h3>
                        <Badge className={`text-xs ${getStatusColor(metric.status)}`}>
                          {metric.status}
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary">
                            {metric.value}%
                          </span>
                          <div className="text-right">
                            <Progress value={metric.value} className="w-20 h-2" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {metric.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="space-y-4">
              {securityEvents.map((event, index) => {
                const IconComponent = getEventIcon(event.type);
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{event.message}</h3>
                              <Badge className={`text-xs ${getSeverityColor(event.severity)}`}>
                                {event.severity}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-4">
                                <span>Source: {event.source}</span>
                                <span>Type: {event.type}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3" />
                                {event.timestamp.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid gap-4">
              {securitySettings.map((setting, index) => (
                <motion.div
                  key={setting.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{setting.name}</h3>
                            <Badge 
                              variant={setting.level === 'maximum' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {setting.level}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{setting.description}</p>
                        </div>
                        <Switch
                          checked={setting.enabled}
                          onCheckedChange={() => toggleSetting(setting.id)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="compliance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Compliance Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { name: 'ISO 27001', status: 'compliant' },
                      { name: 'SOC 2 Type II', status: 'compliant' },
                      { name: 'GDPR', status: 'compliant' },
                      { name: 'HIPAA', status: 'pending' },
                      { name: 'PCI DSS', status: 'compliant' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="font-medium">{item.name}</span>
                        <Badge 
                          variant={item.status === 'compliant' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {item.status === 'compliant' ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <Clock className="h-3 w-3 mr-1" />
                          )}
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Security Reports
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Security Audit Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Fingerprint className="h-4 w-4 mr-2" />
                    Generate Compliance Certificate
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="h-4 w-4 mr-2" />
                    Security Metrics Dashboard
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Configure Alert Policies
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedSecurityCenter;