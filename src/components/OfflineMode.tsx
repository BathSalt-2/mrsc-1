import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Wifi,
  WifiOff,
  Download,
  Database,
  HardDrive,
  
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Settings,
  Cloud
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OfflineModeProps {
  onBack: () => void;
}

interface CachedData {
  type: string;
  size: string;
  lastSync: Date;
  status: 'synced' | 'pending' | 'error';
  priority: 'high' | 'medium' | 'low';
}

export default function OfflineMode({ onBack }: OfflineModeProps) {
  const { toast } = useToast();
  const [isOfflineEnabled, setIsOfflineEnabled] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline'>('online');
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [cachedData] = useState<CachedData[]>([
    {
      type: 'Consciousness Metrics',
      size: '2.4 MB',
      lastSync: new Date(Date.now() - 300000),
      status: 'synced',
      priority: 'high'
    },
    {
      type: 'Neural Network Data',
      size: '15.7 MB',
      lastSync: new Date(Date.now() - 600000),
      status: 'synced',
      priority: 'high'
    },
    {
      type: 'System Analytics',
      size: '8.3 MB',
      lastSync: new Date(Date.now() - 900000),
      status: 'pending',
      priority: 'medium'
    },
    {
      type: 'User Preferences',
      size: '128 KB',
      lastSync: new Date(Date.now() - 1200000),
      status: 'synced',
      priority: 'high'
    },
    {
      type: 'Activity Logs',
      size: '5.2 MB',
      lastSync: new Date(Date.now() - 1800000),
      status: 'error',
      priority: 'low'
    }
  ]);

  const totalCacheSize = '31.8 MB';
  const availableStorage = '156 MB';
  const storageUsage = 20.4; // percentage

  useEffect(() => {
    // Simulate connection status changes
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        setConnectionStatus(prev => prev === 'online' ? 'offline' : 'online');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const startSync = () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          toast({
            title: "Sync Complete",
            description: "All data has been synchronized successfully.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const downloadForOffline = (dataType: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${dataType} for offline access.`,
    });
  };

  const getStatusIcon = (status: CachedData['status']) => {
    switch (status) {
      case 'synced': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <RefreshCw className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-destructive" />;
    }
  };

  const getPriorityColor = (priority: CachedData['priority']) => {
    switch (priority) {
      case 'high': return 'text-green-500 border-green-500';
      case 'medium': return 'text-yellow-500 border-yellow-500';
      case 'low': return 'text-gray-500 border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Offline Mode</h1>
            <Badge variant={connectionStatus === 'online' ? 'default' : 'destructive'}>
              {connectionStatus === 'online' ? (
                <><Wifi className="w-3 h-3 mr-1" />Online</>
              ) : (
                <><WifiOff className="w-3 h-3 mr-1" />Offline</>
              )}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={startSync} disabled={isSyncing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync Now'}
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Sync Progress */}
        {isSyncing && (
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Synchronizing data...</span>
                  <span className="text-sm text-muted-foreground">{syncProgress}%</span>
                </div>
                <Progress value={syncProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Offline Settings */}
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <WifiOff className="w-5 h-5 mr-2" />
                Offline Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-base font-medium">Enable Offline Mode</div>
                  <div className="text-sm text-muted-foreground">
                    Allow app to work without internet connection
                  </div>
                </div>
                <Switch
                  checked={isOfflineEnabled}
                  onCheckedChange={setIsOfflineEnabled}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Auto-Download Settings</h4>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Consciousness Metrics</span>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Neural Network Data</span>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">System Analytics</span>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Activity Logs</span>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Storage Management</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Used Storage</span>
                    <span>{totalCacheSize}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Available</span>
                    <span>{availableStorage}</span>
                  </div>
                  <Progress value={storageUsage} className="h-2 mt-2" />
                  <p className="text-xs text-muted-foreground">
                    {storageUsage}% of offline storage used
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cached Data */}
          <Card className="lg:col-span-2 bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Cached Data
                </div>
                <Badge variant="outline">{cachedData.length} items</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cachedData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
                    <div className="flex-shrink-0">
                      {getStatusIcon(data.status)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{data.type}</h3>
                        <Badge variant="outline" className={`text-xs ${getPriorityColor(data.priority)}`}>
                          {data.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <span>{data.size}</span>
                        <span>•</span>
                        <span>Last sync: {data.lastSync.toLocaleTimeString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {data.status === 'error' && (
                        <Button variant="outline" size="sm">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => downloadForOffline(data.type)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Connection Status & Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cloud className="w-5 h-5 mr-2" />
                Connection Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Current Status</span>
                  <Badge variant={connectionStatus === 'online' ? 'default' : 'destructive'}>
                    {connectionStatus}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Last Sync</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(Date.now() - 300000).toLocaleTimeString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Pending Uploads</span>
                  <Badge variant="outline">3 items</Badge>
                </div>

                {connectionStatus === 'offline' && (
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-sm text-yellow-500">
                      You're currently offline. Changes will sync when connection is restored.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle>Offline Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Download important data before going offline</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Sync regularly to keep data up to date</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Monitor storage usage to avoid running out of space</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Priority data will always be available offline</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}