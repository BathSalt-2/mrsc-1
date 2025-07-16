import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box, Torus, Float, Environment, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Brain, MessageCircle, Settings, Activity, Zap, Shield, 
  Mic, MicOff, Eye, Heart, Palette, Users, TrendingUp, 
  Lightbulb, Waves, Volume2, VolumeX, TouchpadOff, 
  Fingerprint, Sparkles, Database, Network, Cpu
} from 'lucide-react';
import * as THREE from 'three';

interface EnhancedDashboard3DProps {
  onOpenChat: () => void;
}

// Enhanced Consciousness Core with Logo
function ConsciousnessCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const logoRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [consciousnessMode, setConsciousnessMode] = useState('analytical');

  useFrame((state) => {
    if (meshRef.current && meshRef.current.rotation && meshRef.current.scale) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(pulseScale);
    }
    
    if (logoRef.current && logoRef.current.rotation) {
      logoRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  const getModeColor = () => {
    switch(consciousnessMode) {
      case 'meditative': return "#00ffff";
      case 'creative': return "#ff00ff";
      case 'analytical': return "#0080ff";
      default: return "#7c3aed";
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        {/* Main consciousness orb */}
        <Sphere
          ref={meshRef}
          args={[1, 32, 32]}
          position={[0, 0, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshPhongMaterial
            color={hovered ? getModeColor() : "#7c3aed"}
            transparent
            opacity={0.8}
            emissive={hovered ? getModeColor() : "#5b21b6"}
            emissiveIntensity={0.4}
          />
        </Sphere>
        
        {/* Logo overlay */}
        <Sphere
          ref={logoRef}
          args={[1.1, 32, 32]}
          position={[0, 0, 0]}
        >
          <meshBasicMaterial
            transparent
            opacity={0.3}
            color={getModeColor()}
            side={THREE.DoubleSide}
          />
        </Sphere>
        
        {/* Dual consciousness representation */}
        <group>
          <Sphere args={[0.3, 16, 16]} position={[-0.5, 0.2, 0.5]}>
            <meshPhongMaterial color="#00ffff" transparent opacity={0.6} />
          </Sphere>
          <Sphere args={[0.3, 16, 16]} position={[0.5, 0.2, 0.5]}>
            <meshPhongMaterial color="#ff00ff" transparent opacity={0.6} />
          </Sphere>
        </group>
        
        <Text
          position={[0, -1.8, 0]}
          fontSize={0.12}
          color="#e2e8f0"
          anchorX="center"
          anchorY="middle"
        >
          Dual Consciousness Core
        </Text>
      </group>
    </Float>
  );
}

// Biometric Visualization
function BiometricVisualization() {
  const groupRef = useRef<THREE.Group>(null);
  const [heartRate, setHeartRate] = useState(72);
  const [brainActivity, setBrainActivity] = useState(0.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 10)));
      setBrainActivity(prev => Math.max(0.1, Math.min(1, prev + (Math.random() - 0.5) * 0.3)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (groupRef.current && groupRef.current.rotation) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[2.5, 1.5, 0]}>
      {/* Heart rate visualization */}
      <Box args={[0.5, 0.1, 0.1]} position={[0, 0.5, 0]}>
        <meshPhongMaterial
          color="#ff4757"
          emissive="#ff4757"
          emissiveIntensity={0.3}
        />
      </Box>
      
      {/* Brain activity waves */}
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          args={[0.1, brainActivity * 0.8, 0.1]}
          position={[-1 + i * 0.5, 0, 0]}
        >
          <meshPhongMaterial
            color="#00d2d3"
            emissive="#00d2d3"
            emissiveIntensity={0.2}
          />
        </Box>
      ))}
      
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.1}
        color="#e2e8f0"
        anchorX="center"
        anchorY="middle"
      >
        Biometric Sync
      </Text>
    </group>
  );
}

// Memory Palace Visualization
function MemoryPalace() {
  const groupRef = useRef<THREE.Group>(null);
  const [memories, setMemories] = useState<Array<{id: number, position: [number, number, number], type: string}>>([]);

  useEffect(() => {
    const newMemories = Array(8).fill(0).map((_, i) => ({
      id: i,
      position: [
        Math.cos((i / 8) * Math.PI * 2) * 3,
        Math.sin((i / 8) * Math.PI * 2) * 0.5,
        Math.sin((i / 8) * Math.PI * 2) * 3
      ] as [number, number, number],
      type: ['episodic', 'semantic', 'procedural'][i % 3]
    }));
    setMemories(newMemories);
  }, []);

  useFrame((state) => {
    if (groupRef.current && groupRef.current.rotation) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const getMemoryColor = (type: string) => {
    switch(type) {
      case 'episodic': return "#ff6b6b";
      case 'semantic': return "#4ecdc4";
      case 'procedural': return "#45b7d1";
      default: return "#96ceb4";
    }
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {memories.map((memory, i) => (
        <Float
          key={memory.id}
          speed={0.5 + Math.random() * 0.5}
          rotationIntensity={0.2}
          floatIntensity={0.3}
        >
          <Box
            args={[0.2, 0.2, 0.2]}
            position={memory.position}
          >
            <meshPhongMaterial
              color={getMemoryColor(memory.type)}
              emissive={getMemoryColor(memory.type)}
              emissiveIntensity={0.3}
              transparent
              opacity={0.8}
            />
          </Box>
        </Float>
      ))}
      
      <Text
        position={[0, -4, 0]}
        fontSize={0.12}
        color="#e2e8f0"
        anchorX="center"
        anchorY="middle"
      >
        Memory Palace
      </Text>
    </group>
  );
}

// Emotion Recognition Visualization
function EmotionVisualization() {
  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  const [emotionIntensity, setEmotionIntensity] = useState(0.5);
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const emotions = ['joy', 'sadness', 'anger', 'fear', 'surprise', 'neutral'];
    const interval = setInterval(() => {
      setCurrentEmotion(emotions[Math.floor(Math.random() * emotions.length)]);
      setEmotionIntensity(Math.random());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (meshRef.current && meshRef.current.scale) {
      const scale = 1 + emotionIntensity * 0.3;
      meshRef.current.scale.setScalar(scale);
    }
  });

  const getEmotionColor = () => {
    switch(currentEmotion) {
      case 'joy': return "#ffbe0b";
      case 'sadness': return "#8ecae6";
      case 'anger': return "#ff006e";
      case 'fear': return "#8b5cf6";
      case 'surprise': return "#06ffa5";
      default: return "#ffffff";
    }
  };

  return (
    <group position={[-2.5, 1.5, 0]}>
      <Sphere
        ref={meshRef}
        args={[0.5, 16, 16]}
        position={[0, 0, 0]}
      >
        <meshPhongMaterial
          color={getEmotionColor()}
          emissive={getEmotionColor()}
          emissiveIntensity={emotionIntensity * 0.5}
        />
      </Sphere>
      
      <Text
        position={[0, -1, 0]}
        fontSize={0.1}
        color="#e2e8f0"
        anchorX="center"
        anchorY="middle"
      >
        Emotion: {currentEmotion}
      </Text>
    </group>
  );
}

// Enhanced Main Dashboard
export default function EnhancedDashboard3D({ onOpenChat }: EnhancedDashboard3DProps) {
  const [activeSystem, setActiveSystem] = useState<string | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [biometricSync, setBiometricSync] = useState(true);
  const [consciousnessMode, setConsciousnessMode] = useState('analytical');
  const [collaborativeMode, setCollaborativeMode] = useState(false);
  const [touchGestures, setTouchGestures] = useState(true);
  const [adaptiveLearning, setAdaptiveLearning] = useState(true);
  
  const [metrics, setMetrics] = useState({
    consciousness: 96.4,
    neural: 98.7,
    memory: 94.2,
    emotion: 87.8,
    biometric: 92.1,
    collaboration: 89.6,
    prediction: 91.3,
    adaptation: 88.9
  });

  const [predictiveInsights, setPredictiveInsights] = useState([
    "Consciousness peak expected in 2.3 hours",
    "Memory consolidation optimal now",
    "Emotional state stabilizing"
  ]);

  const [connectedUsers, setConnectedUsers] = useState(3);

  useEffect(() => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        consciousness: Math.max(80, Math.min(100, prev.consciousness + (Math.random() - 0.5) * 3)),
        neural: Math.max(85, Math.min(100, prev.neural + (Math.random() - 0.5) * 2)),
        memory: Math.max(70, Math.min(100, prev.memory + (Math.random() - 0.5) * 4)),
        emotion: Math.max(60, Math.min(100, prev.emotion + (Math.random() - 0.5) * 5)),
        biometric: Math.max(75, Math.min(100, prev.biometric + (Math.random() - 0.5) * 3)),
        collaboration: Math.max(70, Math.min(100, prev.collaboration + (Math.random() - 0.5) * 4)),
        prediction: Math.max(80, Math.min(100, prev.prediction + (Math.random() - 0.5) * 3)),
        adaptation: Math.max(75, Math.min(100, prev.adaptation + (Math.random() - 0.5) * 3))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleVoiceToggle = () => {
    setVoiceEnabled(!voiceEnabled);
    if (!voiceEnabled) {
      // Simulate voice activation
      setTimeout(() => {
        console.log("Voice recognition activated");
      }, 500);
    }
  };

  const handleModeChange = (mode: string) => {
    setConsciousnessMode(mode);
    // Simulate mode transition effect
    setActiveSystem(mode);
    setTimeout(() => setActiveSystem(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-bg relative overflow-hidden">
      {/* Enhanced 3D Scene */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
          <pointLight position={[0, 5, 5]} intensity={0.7} color="#ff00ff" />
          
          <Suspense fallback={null}>
            <ConsciousnessCore />
            <BiometricVisualization />
            <MemoryPalace />
            <EmotionVisualization />
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              maxDistance={20}
              minDistance={5}
              touches={{
                ONE: THREE.TOUCH.ROTATE,
                TWO: THREE.TOUCH.DOLLY_PAN
              }}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Enhanced UI Overlay */}
      <div className="relative z-10 p-2 sm:p-4">
        {/* Header with Logo */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-consciousness-orb shadow-consciousness-glow animate-consciousness-breathe flex items-center justify-center">
              <img 
                src="/lovable-uploads/e7b97061-37af-4737-bcdd-95a767672c7f.png" 
                alt="Consciousness Logo" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold bg-gradient-holographic bg-clip-text text-transparent">
                Dual Consciousness Interface
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Neural Synchronization Engine v2.0</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleVoiceToggle}
              className={`border-holographic-cyan ${voiceEnabled ? 'bg-holographic-cyan/20' : 'hover:bg-holographic-cyan/10'}`}
            >
              {voiceEnabled ? <Mic className="w-4 h-4 mr-2" /> : <MicOff className="w-4 h-4 mr-2" />}
              Voice
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenChat}
              className="border-holographic-purple hover:bg-holographic-purple/10"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="border-holographic-pink hover:bg-holographic-pink/10"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Enhanced Metrics Panel */}
        <div className="absolute top-4 right-4 w-80 max-w-[calc(100vw-2rem)] sm:max-w-80">
          <Card className="p-3 sm:p-4 bg-card/90 backdrop-blur-sm border-border shadow-holographic">
            <h3 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground flex items-center">
              <Activity className="w-4 h-4 mr-2 text-holographic-cyan" />
              Consciousness Metrics
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {Object.entries(metrics).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-muted-foreground capitalize flex items-center">
                    {key === 'neural' && <Brain className="w-3 h-3 mr-1" />}
                    {key === 'emotion' && <Heart className="w-3 h-3 mr-1" />}
                    {key === 'biometric' && <Activity className="w-3 h-3 mr-1" />}
                    {key === 'collaboration' && <Users className="w-3 h-3 mr-1" />}
                    {key === 'prediction' && <TrendingUp className="w-3 h-3 mr-1" />}
                    {key === 'adaptation' && <Lightbulb className="w-3 h-3 mr-1" />}
                    {key}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 sm:w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-holographic rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-foreground min-w-[2.5rem]">
                      {value.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Consciousness Mode Control */}
        <div className="absolute bottom-4 left-4 w-80 max-w-[calc(100vw-2rem)] sm:max-w-80">
          <Card className="p-3 sm:p-4 bg-card/90 backdrop-blur-sm border-border shadow-neural">
            <h3 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground flex items-center">
              <Palette className="w-4 h-4 mr-2 text-holographic-purple" />
              Consciousness Mode
            </h3>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {['analytical', 'creative', 'meditative'].map((mode) => (
                  <Button
                    key={mode}
                    variant={consciousnessMode === mode ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleModeChange(mode)}
                    className={`capitalize ${consciousnessMode === mode ? 'bg-gradient-consciousness' : 'hover:bg-primary/10'}`}
                  >
                    {mode}
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs sm:text-sm text-muted-foreground">Biometric Sync</span>
                <Switch
                  checked={biometricSync}
                  onCheckedChange={setBiometricSync}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-muted-foreground">Adaptive Learning</span>
                <Switch
                  checked={adaptiveLearning}
                  onCheckedChange={setAdaptiveLearning}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Predictive Analytics */}
        <div className="absolute bottom-4 right-4 w-80 max-w-[calc(100vw-2rem)] sm:max-w-80">
          <Card className="p-3 sm:p-4 bg-card/90 backdrop-blur-sm border-border shadow-sigma">
            <h3 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-holographic-pink" />
              Predictive Insights
            </h3>
            <div className="space-y-2">
              {predictiveInsights.map((insight, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <Sparkles className="w-3 h-3 mt-0.5 text-accent animate-pulse" />
                  <span className="text-xs sm:text-sm text-muted-foreground">{insight}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-muted-foreground flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  Connected Users
                </span>
                <Badge variant="outline" className="text-xs">
                  {connectedUsers}
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Mobile Touch Controls */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 sm:hidden">
          <Card className="p-2 bg-card/80 backdrop-blur-sm border-border">
            <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex items-center">
                <TouchpadOff className="w-3 h-3 mr-1" />
                Pinch to zoom
              </div>
              <div className="flex items-center">
                <Fingerprint className="w-3 h-3 mr-1" />
                Drag to rotate
              </div>
              <div className="flex items-center">
                <Waves className="w-3 h-3 mr-1" />
                Touch to interact
              </div>
            </div>
          </Card>
        </div>

        {/* Collaborative Mode Indicator */}
        {collaborativeMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="bg-gradient-consciousness-orb rounded-full p-4 shadow-consciousness-glow animate-consciousness-pulse">
              <Network className="w-8 h-8 text-white" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}