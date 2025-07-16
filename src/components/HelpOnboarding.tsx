import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  BookOpen,
  HelpCircle,
  CheckCircle,
  Video,
  FileText,
  MessageCircle,
  Compass,
  Star,
  Users,
  Zap,
  Shield,
  Target
} from 'lucide-react';

interface HelpOnboardingProps {
  onBack: () => void;
}

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  content: string;
  completed: boolean;
}

interface HelpTopic {
  id: string;
  title: string;
  category: 'getting-started' | 'features' | 'troubleshooting' | 'advanced';
  icon: any;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const HelpOnboarding = ({ onBack }: HelpOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);

  const onboardingSteps: OnboardingStep[] = [
    {
      id: '1',
      title: 'Welcome to MRSC',
      description: 'Let\'s get you started with your AI-powered system',
      icon: Compass,
      content: 'MRSC is an advanced consciousness monitoring and response system. This tutorial will guide you through the core features and help you maximize your experience.',
      completed: false
    },
    {
      id: '2',
      title: 'Dashboard Overview',
      description: 'Understanding your main control center',
      icon: Target,
      content: 'The 3D dashboard displays real-time metrics including consciousness levels, neural activity, and system performance. Each widget provides interactive controls and detailed analytics.',
      completed: false
    },
    {
      id: '3',
      title: 'AI Chat Interface',
      description: 'Communicate with your AI systems',
      icon: MessageCircle,
      content: 'The chat interface allows direct communication with AI subsystems. Use natural language to query status, request actions, or get insights about system performance.',
      completed: false
    },
    {
      id: '4',
      title: 'Analytics & Reports',
      description: 'Track performance and trends',
      icon: Zap,
      content: 'Access comprehensive analytics including historical data, performance trends, and predictive insights to optimize your system operations.',
      completed: false
    },
    {
      id: '5',
      title: 'Security Features',
      description: 'Protecting your digital consciousness',
      icon: Shield,
      content: 'Learn about advanced security measures including authentication protocols, access controls, and threat monitoring systems.',
      completed: false
    }
  ];

  const helpTopics: HelpTopic[] = [
    {
      id: '1',
      title: 'Getting Started Guide',
      category: 'getting-started',
      icon: BookOpen,
      description: 'Complete beginner\'s guide to MRSC',
      difficulty: 'beginner'
    },
    {
      id: '2',
      title: 'Dashboard Customization',
      category: 'features',
      icon: Target,
      description: 'Learn to customize your dashboard widgets',
      difficulty: 'intermediate'
    },
    {
      id: '3',
      title: 'AI Communication Protocols',
      category: 'features',
      icon: MessageCircle,
      description: 'Advanced communication with AI systems',
      difficulty: 'advanced'
    },
    {
      id: '4',
      title: 'Troubleshooting Common Issues',
      category: 'troubleshooting',
      icon: HelpCircle,
      description: 'Solutions to frequently encountered problems',
      difficulty: 'beginner'
    },
    {
      id: '5',
      title: 'Team Collaboration Setup',
      category: 'features',
      icon: Users,
      description: 'Setting up and managing team workflows',
      difficulty: 'intermediate'
    },
    {
      id: '6',
      title: 'Advanced Security Configuration',
      category: 'advanced',
      icon: Shield,
      description: 'Deep dive into security protocols',
      difficulty: 'advanced'
    }
  ];

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      const updatedSteps = [...onboardingSteps];
      updatedSteps[currentStep].completed = true;
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-700';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-700';
      case 'advanced': return 'bg-red-500/20 text-red-700';
      default: return 'bg-gray-500/20 text-gray-700';
    }
  };

  const completedSteps = onboardingSteps.filter(step => step.completed).length;
  const progress = (completedSteps / onboardingSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            <BookOpen className="h-5 w-5 text-primary/40" />
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
                Help & Onboarding
              </h1>
              <p className="text-muted-foreground">Learn and master your MRSC system</p>
            </div>
          </div>
          <Badge variant="secondary" className="px-4 py-2">
            {completedSteps}/{onboardingSteps.length} Complete
          </Badge>
        </motion.div>

        <Tabs defaultValue="onboarding" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="onboarding">Interactive Tutorial</TabsTrigger>
            <TabsTrigger value="help">Help Center</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="onboarding">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tutorial Progress */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1"
              >
                <Card className="border-primary/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Compass className="h-5 w-5 text-primary" />
                      Tutorial Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      {onboardingSteps.map((step, index) => (
                        <div
                          key={step.id}
                          className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                            index === currentStep 
                              ? 'bg-primary/10 border border-primary/20' 
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => setCurrentStep(index)}
                        >
                          <div className={`p-1 rounded ${
                            step.completed 
                              ? 'bg-green-500/20 text-green-600'
                              : index === currentStep
                              ? 'bg-primary/20 text-primary'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {step.completed ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <step.icon className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${
                              index === currentStep ? 'text-primary' : ''
                            }`}>
                              {step.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className="w-full"
                      onClick={() => setShowTutorial(true)}
                      disabled={completedSteps === onboardingSteps.length}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {completedSteps === onboardingSteps.length ? 'Tutorial Complete!' : 'Start Tutorial'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tutorial Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2"
              >
                <Card className="border-primary/20 shadow-lg h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {(() => {
                          const IconComponent = onboardingSteps[currentStep].icon;
                          return <IconComponent className="h-5 w-5 text-primary" />;
                        })()}
                        {onboardingSteps[currentStep].title}
                      </CardTitle>
                      <Badge variant="outline">
                        Step {currentStep + 1} of {onboardingSteps.length}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <p className="text-lg leading-relaxed">
                        {onboardingSteps[currentStep].content}
                      </p>
                      
                      {/* Interactive Demo Area */}
                      <div className="bg-muted/30 border border-dashed border-primary/30 rounded-lg p-8 text-center">
                        <div className="space-y-4">
                          <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {(() => {
                              const IconComponent = onboardingSteps[currentStep].icon;
                              return <IconComponent className="h-16 w-16 mx-auto text-primary/60" />;
                            })()}
                          </motion.div>
                          <p className="text-muted-foreground">
                            Interactive demonstration would appear here
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          onClick={prevStep}
                          disabled={currentStep === 0}
                        >
                          <ChevronLeft className="h-4 w-4 mr-2" />
                          Previous
                        </Button>
                        <Button 
                          onClick={nextStep}
                          disabled={currentStep === onboardingSteps.length - 1}
                        >
                          Next
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="help">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {helpTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <topic.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{topic.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {topic.description}
                          </p>
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {topic.category.replace('-', ' ')}
                            </Badge>
                            <Badge 
                              className={`text-xs ${getDifficultyColor(topic.difficulty)}`}
                              variant="outline"
                            >
                              {topic.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Article
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="support">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Contact Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Need help? Our support team is here to assist you with any questions or issues.
                  </p>
                  <div className="space-y-2">
                    <Button className="w-full justify-start">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Live Chat Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Video className="h-4 w-4 mr-2" />
                      Schedule Video Call
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Submit Ticket
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Community Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Connect with other MRSC users and learn from the community.
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Community Forum
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Star className="h-4 w-4 mr-2" />
                      User Guides
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Video className="h-4 w-4 mr-2" />
                      Video Tutorials
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HelpOnboarding;