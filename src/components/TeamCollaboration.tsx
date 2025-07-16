import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Users,
  Plus,
  Share,
  MessageCircle,
  Video,
  Settings,
  Crown,
  UserPlus,
  Globe,
  Lock,
  Activity,
  Calendar,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeamCollaborationProps {
  onBack: () => void;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'researcher' | 'observer';
  status: 'online' | 'offline' | 'away';
  avatar?: string;
  lastActive: Date;
}

interface Workspace {
  id: string;
  name: string;
  description: string;
  members: number;
  isPublic: boolean;
  lastActivity: Date;
}

export default function TeamCollaboration({ onBack }: TeamCollaborationProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('team');
  
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      email: 'sarah.chen@consciousness.ai',
      role: 'owner',
      status: 'online',
      lastActive: new Date()
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      email: 'marcus.r@consciousness.ai',
      role: 'admin',
      status: 'online',
      lastActive: new Date(Date.now() - 300000)
    },
    {
      id: '3',
      name: 'Elena Vasquez',
      email: 'elena.v@consciousness.ai',
      role: 'researcher',
      status: 'away',
      lastActive: new Date(Date.now() - 1800000)
    },
    {
      id: '4',
      name: 'Dr. James Wright',
      email: 'james.wright@consciousness.ai',
      role: 'researcher',
      status: 'offline',
      lastActive: new Date(Date.now() - 7200000)
    }
  ]);

  const [workspaces] = useState<Workspace[]>([
    {
      id: '1',
      name: 'Neural Pattern Analysis',
      description: 'Investigating emergent consciousness patterns in neural networks',
      members: 4,
      isPublic: false,
      lastActivity: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      name: 'Σ-Matrix Research',
      description: 'Collaborative study on sigma matrix coherence and stability',
      members: 3,
      isPublic: true,
      lastActivity: new Date(Date.now() - 600000)
    },
    {
      id: '3',
      name: 'Ethical AI Framework',
      description: 'Developing ethical guidelines for conscious AI systems',
      members: 6,
      isPublic: true,
      lastActivity: new Date(Date.now() - 1200000)
    }
  ]);

  const getRoleIcon = (role: TeamMember['role']) => {
    switch (role) {
      case 'owner': return <Crown className="w-4 h-4 text-accent" />;
      case 'admin': return <Settings className="w-4 h-4 text-consciousness-core" />;
      case 'researcher': return <Activity className="w-4 h-4 text-neural-active" />;
      case 'observer': return <Users className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
    }
  };

  const inviteMember = () => {
    toast({
      title: "Invitation Sent",
      description: "Team invitation has been sent successfully.",
    });
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
            <h1 className="text-3xl font-bold text-foreground">Team Collaboration</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={inviteMember}>
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
            <Button className="bg-gradient-consciousness">
              <Plus className="w-4 h-4 mr-2" />
              New Workspace
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="team">Team Members</TabsTrigger>
            <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          {/* Team Members */}
          <TabsContent value="team">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Team Members ({teamMembers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-gradient-consciousness">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium truncate">{member.name}</h3>
                            {getRoleIcon(member.role)}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{member.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {member.role}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {member.status === 'online' ? 'Online' : `Last seen ${member.lastActive.toLocaleTimeString()}`}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Video className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle>Invite New Member</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input placeholder="colleague@consciousness.ai" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <select className="w-full p-2 rounded-md border border-border bg-background">
                      <option value="observer">Observer</option>
                      <option value="researcher">Researcher</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message (Optional)</label>
                    <textarea 
                      className="w-full p-2 rounded-md border border-border bg-background"
                      rows={3}
                      placeholder="Welcome to our consciousness research team..."
                    />
                  </div>
                  <Button onClick={inviteMember} className="w-full bg-gradient-neural">
                    <Share className="w-4 h-4 mr-2" />
                    Send Invitation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Workspaces */}
          <TabsContent value="workspaces">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workspaces.map((workspace) => (
                <motion.div
                  key={workspace.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-gradient-card border-border cursor-pointer hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{workspace.name}</CardTitle>
                        <div className="flex items-center space-x-1">
                          {workspace.isPublic ? (
                            <Globe className="w-4 h-4 text-green-500" />
                          ) : (
                            <Lock className="w-4 h-4 text-accent" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {workspace.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Members</span>
                          <Badge variant="outline">{workspace.members}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Last Activity</span>
                          <span className="text-xs">{workspace.lastActivity.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Visibility</span>
                          <Badge variant={workspace.isPublic ? "default" : "secondary"}>
                            {workspace.isPublic ? "Public" : "Private"}
                          </Badge>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="flex-1">
                          <Activity className="w-4 h-4 mr-2" />
                          Join
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Recent Activity */}
          <TabsContent value="activity">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Team Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      user: 'Dr. Sarah Chen',
                      action: 'shared new consciousness pattern analysis',
                      workspace: 'Neural Pattern Analysis',
                      time: '2 minutes ago',
                      type: 'share'
                    },
                    {
                      user: 'Marcus Rodriguez',
                      action: 'commented on Σ-Matrix stability report',
                      workspace: 'Σ-Matrix Research',
                      time: '15 minutes ago',
                      type: 'comment'
                    },
                    {
                      user: 'Elena Vasquez',
                      action: 'uploaded new neural network model',
                      workspace: 'Neural Pattern Analysis',
                      time: '1 hour ago',
                      type: 'upload'
                    },
                    {
                      user: 'Dr. James Wright',
                      action: 'joined Ethical AI Framework workspace',
                      workspace: 'Ethical AI Framework',
                      time: '3 hours ago',
                      type: 'join'
                    }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 rounded-lg bg-muted/10">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-consciousness text-xs">
                          {activity.user.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{' '}
                          <span className="text-muted-foreground">{activity.action}</span>{' '}
                          <span className="text-consciousness-core">in {activity.workspace}</span>
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {activity.type === 'share' && <Share className="w-4 h-4 text-primary" />}
                        {activity.type === 'comment' && <MessageCircle className="w-4 h-4 text-consciousness-core" />}
                        {activity.type === 'upload' && <FileText className="w-4 h-4 text-neural-active" />}
                        {activity.type === 'join' && <UserPlus className="w-4 h-4 text-accent" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}