import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Brain,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Eye,
  Target,
  Lightbulb,
  BarChart3,
  Clock,
  Sparkles
} from 'lucide-react';

interface AIInsightsEngineProps {
  onBack: () => void;
}

interface Insight {
  id: string;
  category: 'performance' | 'security' | 'optimization' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timestamp: Date;
  actionable: boolean;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedImpact: string;
  complexity: 'easy' | 'moderate' | 'complex';
}

const AIInsightsEngine = ({ onBack }: AIInsightsEngineProps) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  useEffect(() => {
    // Simulate AI analysis
    setIsAnalyzing(true);
    const timer = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsAnalyzing(false);
          generateInsights();
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  const generateInsights = () => {
    const mockInsights: Insight[] = [
      {
        id: '1',
        category: 'performance',
        title: 'CPU Usage Optimization Opportunity',
        description: 'Neural processing modules are operating at 87% efficiency. Implementing parallel processing could increase performance by 23%.',
        confidence: 94,
        impact: 'high',
        timestamp: new Date(),
        actionable: true
      },
      {
        id: '2',
        category: 'security',
        title: 'Anomalous Access Pattern Detected',
        description: 'Unusual authentication patterns detected in the last 24 hours. Recommend enhanced monitoring.',
        confidence: 78,
        impact: 'medium',
        timestamp: new Date(Date.now() - 3600000),
        actionable: true
      },
      {
        id: '3',
        category: 'prediction',
        title: 'Resource Scaling Recommendation',
        description: 'Based on current trends, system load will increase by 45% over the next 7 days. Proactive scaling recommended.',
        confidence: 89,
        impact: 'high',
        timestamp: new Date(Date.now() - 7200000),
        actionable: true
      },
      {
        id: '4',
        category: 'optimization',
        title: 'Memory Usage Efficiency',
        description: 'Recursive algorithms showing optimal performance. Current implementation exceeds baseline by 34%.',
        confidence: 96,
        impact: 'medium',
        timestamp: new Date(Date.now() - 10800000),
        actionable: false
      }
    ];

    const mockRecommendations: Recommendation[] = [
      {
        id: '1',
        title: 'Implement Dynamic Load Balancing',
        description: 'Deploy adaptive load balancing to optimize resource distribution across neural networks.',
        priority: 'high',
        estimatedImpact: '23% performance improvement',
        complexity: 'moderate'
      },
      {
        id: '2',
        title: 'Enhanced Security Protocols',
        description: 'Upgrade authentication systems with biometric verification and behavioral analysis.',
        priority: 'critical',
        estimatedImpact: '67% security enhancement',
        complexity: 'complex'
      },
      {
        id: '3',
        title: 'Predictive Maintenance Schedule',
        description: 'Implement AI-driven maintenance scheduling to prevent system degradation.',
        priority: 'medium',
        estimatedImpact: '15% uptime improvement',
        complexity: 'easy'
      }
    ];

    setInsights(mockInsights);
    setRecommendations(mockRecommendations);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return TrendingUp;
      case 'security': return AlertTriangle;
      case 'optimization': return Target;
      case 'prediction': return Eye;
      default: return Brain;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden">
      {/* AI-themed Background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            <Brain className="h-4 w-4 text-primary/30" />
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
                AI Insights Engine
              </h1>
              <p className="text-muted-foreground">Advanced system analysis and recommendations</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <Badge variant="secondary" className="px-4 py-2">
              AI Active
            </Badge>
          </div>
        </motion.div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="h-8 w-8 text-primary" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">AI Analysis in Progress</h3>
                    <Progress value={analysisProgress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-1">
                      Analyzing system patterns and generating insights...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="insights">Smart Insights</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="insights">
            <div className="grid gap-4">
              {insights.map((insight, index) => {
                const IconComponent = getCategoryIcon(insight.category);
                return (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{insight.title}</h3>
                              <Badge 
                                variant={insight.impact === 'high' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {insight.impact} impact
                              </Badge>
                              {insight.actionable && (
                                <Badge variant="outline" className="text-xs">
                                  <Lightbulb className="h-3 w-3 mr-1" />
                                  Actionable
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground mb-3">{insight.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-muted-foreground">Confidence:</span>
                                <Progress value={insight.confidence} className="w-20 h-2" />
                                <span className="text-primary font-medium">{insight.confidence}%</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {insight.timestamp.toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="recommendations">
            <div className="grid gap-4">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold">{rec.title}</h3>
                        <Badge variant={getPriorityColor(rec.priority) as any}>
                          {rec.priority} priority
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{rec.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-muted-foreground">Impact:</span>
                          <span className="font-medium">{rec.estimatedImpact}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-blue-500" />
                          <span className="text-muted-foreground">Complexity:</span>
                          <span className="font-medium capitalize">{rec.complexity}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Implement
                        </Button>
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIInsightsEngine;