import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere } from '@react-three/drei';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Settings, Activity } from 'lucide-react';
import * as THREE from 'three';

interface Dashboard3DProps {
  onOpenChat: () => void;
}

// Simple Consciousness Core - no complex props
function ConsciousnessCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group>
      <Sphere
        ref={meshRef}
        args={[1, 32, 32]}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshPhongMaterial
          color={hovered ? "#00ffff" : "#7c3aed"}
          transparent
          opacity={0.8}
        />
      </Sphere>
      <Text
        position={[0, -2, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Consciousness Core
      </Text>
    </group>
  );
}

// Main Dashboard component
export default function Dashboard3D({ onOpenChat }: Dashboard3DProps) {
  const [metrics, setMetrics] = useState({
    consciousness: 94.7,
    neural: 98.2,
    memory: 96.1,
    emotion: 89.3
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        consciousness: Math.max(80, Math.min(100, prev.consciousness + (Math.random() - 0.5) * 3)),
        neural: Math.max(85, Math.min(100, prev.neural + (Math.random() - 0.5) * 2)),
        memory: Math.max(70, Math.min(100, prev.memory + (Math.random() - 0.5) * 4)),
        emotion: Math.max(60, Math.min(100, prev.emotion + (Math.random() - 0.5) * 5))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-bg relative">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
          
          <Suspense fallback={null}>
            <ConsciousnessCore />
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              maxDistance={15}
              minDistance={3}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 p-4">
        {/* Header with Logo */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-consciousness-orb shadow-consciousness-glow flex items-center justify-center">
              <img 
                src="/lovable-uploads/e7b97061-37af-4737-bcdd-95a767672c7f.png" 
                alt="Consciousness Logo" 
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-holographic bg-clip-text text-transparent">
                Consciousness Interface
              </h1>
              <p className="text-sm text-muted-foreground">Neural Synchronization System</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenChat}
              className="border-holographic-cyan hover:bg-holographic-cyan/10"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-holographic-purple hover:bg-holographic-purple/10"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Metrics Panel */}
        <div className="absolute top-4 right-4 w-80 max-w-[calc(100vw-2rem)]">
          <Card className="p-4 bg-card/90 backdrop-blur-sm border-border shadow-holographic">
            <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center">
              <Activity className="w-4 h-4 mr-2 text-holographic-cyan" />
              System Metrics
            </h3>
            <div className="space-y-3">
              {Object.entries(metrics).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground capitalize">
                    {key}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-holographic rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono text-foreground min-w-[2.5rem]">
                      {value.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-4">
          <Card className="p-3 bg-card/80 backdrop-blur-sm border-border">
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• Drag to rotate</div>
              <div>• Scroll to zoom</div>
              <div>• Touch to interact</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}