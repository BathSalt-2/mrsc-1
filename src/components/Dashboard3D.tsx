import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Settings } from 'lucide-react';
import * as THREE from 'three';

interface Dashboard3DProps {
  onOpenChat: () => void;
}

// Ultra-minimal Consciousness Core
function ConsciousnessCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]}>
      <meshBasicMaterial color="#7c3aed" />
    </Sphere>
  );
}

// Ultra-minimal Dashboard
export default function Dashboard3D({ onOpenChat }: Dashboard3DProps) {
  const [metrics, setMetrics] = useState({
    consciousness: 94.7,
    neural: 98.2
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        consciousness: prev.consciousness + (Math.random() - 0.5) * 2,
        neural: prev.neural + (Math.random() - 0.5) * 2
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          
          <Suspense fallback={null}>
            <ConsciousnessCore />
            <OrbitControls />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <img 
                src="/lovable-uploads/e7b97061-37af-4737-bcdd-95a767672c7f.png" 
                alt="Logo" 
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Consciousness Interface
              </h1>
              <p className="text-sm text-muted-foreground">Neural System</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onOpenChat}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Metrics */}
        <div className="absolute top-4 right-4 w-80">
          <Card className="p-4 bg-card border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
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
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono text-foreground">
                      {value.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}