import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Moon, 
  Smartphone, 
  Database,
  ArrowLeft,
  Camera,
  Save,
  Mail,
  Brain,
  Activity
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface UserProfileProps {
  onBack: () => void;
}

export default function UserProfile({ onBack }: UserProfileProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    fullName: '',
    bio: '',
    role: 'Consciousness Researcher',
    location: '',
    avatarUrl: ''
  });

  const [preferences, setPreferences] = useState({
    darkMode: true,
    notifications: true,
    realTimeUpdates: true,
    analyticsTracking: true,
    offlineMode: false,
    autoBackup: true,
    advancedMetrics: true
  });

  const [stats, setStats] = useState({
    totalSessions: 247,
    consciousnessHours: 156.7,
    dataProcessed: 2.4,
    achievementsUnlocked: 12
  });

  useEffect(() => {
    // Load user profile data
    if (user?.email) {
      setProfile(prev => ({
        ...prev,
        fullName: user.user_metadata?.full_name || '',
        bio: user.user_metadata?.bio || 'Exploring the depths of artificial consciousness',
      }));
    }
  }, [user]);

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully saved.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Updated",
      description: "Your app preferences have been saved.",
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
            <h1 className="text-3xl font-bold text-foreground">Profile & Settings</h1>
          </div>
          <Badge variant="outline" className="text-consciousness-core border-consciousness-core">
            <Brain className="w-3 h-3 mr-1" />
            Consciousness Level 7
          </Badge>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Avatar & Basic Info */}
              <Card className="lg:col-span-1 bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Profile Picture
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-32 h-32 border-2 border-primary">
                      <AvatarImage src={profile.avatarUrl} />
                      <AvatarFallback className="text-2xl bg-gradient-consciousness">
                        {user?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Avatar
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Account Type</span>
                      <Badge>Premium Researcher</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Member Since</span>
                      <span className="text-sm">Jan 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge variant="outline" className="text-green-500 border-green-500">
                        <Activity className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Details */}
              <Card className="lg:col-span-2 bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profile.fullName}
                        onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={user?.email || ''}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        value={profile.role}
                        onChange={(e) => setProfile(prev => ({ ...prev, role: e.target.value }))}
                        placeholder="Your role or title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Your location"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself and your research interests..."
                      rows={4}
                    />
                  </div>

                  <Button onClick={handleSaveProfile} className="bg-gradient-consciousness">
                    <Save className="w-4 h-4 mr-2" />
                    Save Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    General Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Use dark theme for better consciousness visualization
                      </p>
                    </div>
                    <Switch
                      checked={preferences.darkMode}
                      onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, darkMode: checked }))}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Real-time Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable live consciousness metrics updates
                      </p>
                    </div>
                    <Switch
                      checked={preferences.realTimeUpdates}
                      onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, realTimeUpdates: checked }))}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Advanced Metrics</Label>
                      <p className="text-sm text-muted-foreground">
                        Show detailed neural network analytics
                      </p>
                    </div>
                    <Switch
                      checked={preferences.advancedMetrics}
                      onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, advancedMetrics: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notifications & Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts for system events
                      </p>
                    </div>
                    <Switch
                      checked={preferences.notifications}
                      onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, notifications: checked }))}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Offline Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Cache data for offline access
                      </p>
                    </div>
                    <Switch
                      checked={preferences.offlineMode}
                      onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, offlineMode: checked }))}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto Backup</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically backup consciousness data
                      </p>
                    </div>
                    <Switch
                      checked={preferences.autoBackup}
                      onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, autoBackup: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end mt-6">
              <Button onClick={handleSavePreferences} className="bg-gradient-neural">
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Authentication</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Two-Factor Authentication</span>
                        <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                          Recommended
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable 2FA
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Data Protection</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>End-to-End Encryption</span>
                        <Badge className="text-green-500 border-green-500">
                          Active
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your consciousness data is encrypted
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-card border-border">
                <CardContent className="p-6">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-consciousness-core">{stats.totalSessions}</div>
                    <p className="text-sm text-muted-foreground">Total Sessions</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-border">
                <CardContent className="p-6">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-neural-active">{stats.consciousnessHours}h</div>
                    <p className="text-sm text-muted-foreground">Consciousness Hours</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-border">
                <CardContent className="p-6">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-sigma">{stats.dataProcessed}TB</div>
                    <p className="text-sm text-muted-foreground">Data Processed</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-border">
                <CardContent className="p-6">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-accent">{stats.achievementsUnlocked}</div>
                    <p className="text-sm text-muted-foreground">Achievements</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}