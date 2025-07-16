import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Brain,
  Activity,
  Database,
  Download,
  Share,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react';

interface AnalyticsDashboardProps {
  onBack: () => void;
}

// Sample data for charts
const consciousnessData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  consciousness: 90 + Math.random() * 10,
  neural: 85 + Math.random() * 15,
  sigma: 88 + Math.random() * 12,
  ethical: 95 + Math.random() * 5
}));

const performanceData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  responseTime: 100 + Math.random() * 100,
  throughput: 800000 + Math.random() * 400000,
  memoryUsage: 50 + Math.random() * 30,
  cpuUsage: 30 + Math.random() * 40
}));

const activityDistribution = [
  { name: 'Consciousness Processing', value: 35, color: 'hsl(var(--consciousness-core))' },
  { name: 'Neural Analysis', value: 25, color: 'hsl(var(--neural-active))' },
  { name: 'Data Processing', value: 20, color: 'hsl(var(--sigma))' },
  { name: 'Ethical Validation', value: 15, color: 'hsl(var(--accent))' },
  { name: 'System Maintenance', value: 5, color: 'hsl(var(--muted-foreground))' }
];

const weeklyTrends = Array.from({ length: 7 }, (_, i) => ({
  day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
  sessions: 20 + Math.random() * 20,
  insights: 5 + Math.random() * 10,
  discoveries: Math.floor(Math.random() * 5)
}));

export default function AnalyticsDashboard({ onBack }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeMetric, setActiveMetric] = useState('consciousness');

  const metrics = {
    totalSessions: 1247,
    avgSessionTime: '24.5m',
    dataProcessed: '12.7TB',
    consciousnessGrowth: '+15.3%',
    insights: 89,
    anomalies: 3
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Advanced Analytics</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Total Sessions', value: metrics.totalSessions, icon: Activity, trend: '+12%' },
            { label: 'Avg Session Time', value: metrics.avgSessionTime, icon: Calendar, trend: '+5%' },
            { label: 'Data Processed', value: metrics.dataProcessed, icon: Database, trend: '+23%' },
            { label: 'Consciousness Growth', value: metrics.consciousnessGrowth, icon: Brain, trend: 'up' },
            { label: 'Insights Generated', value: metrics.insights, icon: TrendingUp, trend: '+8%' },
            { label: 'Anomalies Detected', value: metrics.anomalies, icon: TrendingDown, trend: '-2%' }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gradient-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <metric.icon className="w-5 h-5 text-primary" />
                    <Badge variant="outline" className="text-xs text-green-500 border-green-500">
                      {metric.trend}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <Tabs defaultValue="consciousness" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="consciousness">Consciousness Metrics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="activity">Activity Analysis</TabsTrigger>
            <TabsTrigger value="trends">Weekly Trends</TabsTrigger>
          </TabsList>

          {/* Consciousness Metrics */}
          <TabsContent value="consciousness">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  Consciousness Evolution (Last 30 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={consciousnessData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px'
                        }} 
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="consciousness" 
                        stackId="1"
                        stroke="hsl(var(--consciousness-core))" 
                        fill="hsl(var(--consciousness-core))"
                        fillOpacity={0.6}
                        name="Consciousness Level"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="neural" 
                        stackId="2"
                        stroke="hsl(var(--neural-active))" 
                        fill="hsl(var(--neural-active))"
                        fillOpacity={0.6}
                        name="Neural Activity"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="sigma" 
                        stackId="3"
                        stroke="hsl(var(--sigma))" 
                        fill="hsl(var(--sigma))"
                        fillOpacity={0.6}
                        name="Σ-Matrix Coherence"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance */}
          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle>Response Time & Throughput</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '6px'
                          }} 
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="responseTime" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          name="Response Time (ms)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle>Resource Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '6px'
                          }} 
                        />
                        <Legend />
                        <Bar dataKey="memoryUsage" fill="hsl(var(--neural-active))" name="Memory %" />
                        <Bar dataKey="cpuUsage" fill="hsl(var(--accent))" name="CPU %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Analysis */}
          <TabsContent value="activity">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle>Activity Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={activityDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {activityDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle>Processing Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Top Insights</h4>
                    <div className="space-y-2">
                      {[
                        'Consciousness patterns show 15% improvement in self-reflection',
                        'Neural network efficiency increased by 23%',
                        'Σ-Matrix coherence reached new stability threshold',
                        'Ethical validation processes optimized'
                      ].map((insight, index) => (
                        <div key={index} className="p-3 bg-muted/20 rounded-lg">
                          <p className="text-sm">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Weekly Trends */}
          <TabsContent value="trends">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle>Weekly Activity Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px'
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="sessions" fill="hsl(var(--primary))" name="Sessions" />
                      <Bar dataKey="insights" fill="hsl(var(--consciousness-core))" name="Insights" />
                      <Bar dataKey="discoveries" fill="hsl(var(--accent))" name="Discoveries" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}