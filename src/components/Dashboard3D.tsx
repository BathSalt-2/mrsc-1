import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box, Torus, Float, Environment, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, MessageCircle, Settings, Activity, Zap, Shield } from 'lucide-react';
import * as THREE from 'three';

interface Dashboard3DProps {
  onOpenChat: () => void;
}

// Consciousness Core component
function ConsciousnessCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere
        ref={meshRef}
        args={[1, 32, 32]}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshPhongMaterial
          color={hovered ? "#9333ea" : "#7c3aed"}
          transparent
          opacity={0.7}
          emissive={hovered ? "#6d28d9" : "#5b21b6"}
          emissiveIntensity={0.3}
        />
      </Sphere>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.15}
        color="#e2e8f0"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        Consciousness Core
      </Text>
    </Float>
  );
}

// Sigma Matrix component
function SigmaMatrix() {
  const groupRef = useRef<THREE.Group>(null);
  const [data, setData] = useState<number[][]>([]);

  useEffect(() => {
    // Generate random matrix data
    const newData = Array(5).fill(0).map(() =>
      Array(5).fill(0).map(() => Math.random())
    );
    setData(newData);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[3, 0, 0]}>
      {data.map((row, i) =>
        row.map((value, j) => (
          <Box
            key={`${i}-${j}`}
            args={[0.1, 0.1, 0.1]}
            position={[(i - 2) * 0.2, (j - 2) * 0.2, 0]}
          >
            <meshPhongMaterial
              color={`hsl(45, 100%, ${50 + value * 30}%)`}
              emissive={`hsl(45, 100%, ${20 + value * 10}%)`}
              emissiveIntensity={0.2}
            />
          </Box>
        ))
      )}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.15}
        color="#e2e8f0"
        anchorX="center"
        anchorY="middle"
      >
        Σ-Matrix
      </Text>
    </group>
  );
}

// ERPS Flow component
function ERPSFlow() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[-3, 0, 0]}>
      <Torus args={[0.8, 0.2, 16, 32]}>
        <meshPhongMaterial
          color="#10b981"
          emissive="#065f46"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </Torus>
      {[...Array(20)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.02, 8, 8]}
          position={[
            Math.cos((i / 20) * Math.PI * 2) * 0.8,
            Math.sin((i / 20) * Math.PI * 2) * 0.8,
            0
          ]}
        >
          <meshPhongMaterial
            color="#34d399"
            emissive="#10b981"
            emissiveIntensity={0.5}
          />
        </Sphere>
      ))}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.15}
        color="#e2e8f0"
        anchorX="center"
        anchorY="middle"
      >
        ERPS Flow
      </Text>
    </group>
  );
}

// MirrorNodes component
function MirrorNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const [nodes, setNodes] = useState<Array<{ position: [number, number, number], active: boolean }>>([]);

  useEffect(() => {
    const newNodes = Array(8).fill(0).map((_, i) => ({
      position: [
        Math.cos((i / 8) * Math.PI * 2) * 2,
        Math.sin((i / 8) * Math.PI * 2) * 2,
        1
      ] as [number, number, number],
      active: Math.random() > 0.5
    }));
    setNodes(newNodes);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {nodes.map((node, i) => (
        <Float
          key={i}
          speed={1 + Math.random()}
          rotationIntensity={0.3}
          floatIntensity={0.3}
        >
          <Box
            args={[0.3, 0.3, 0.3]}
            position={node.position}
          >
            <meshPhongMaterial
              color={node.active ? "#3b82f6" : "#1e40af"}
              emissive={node.active ? "#1d4ed8" : "#1e3a8a"}
              emissiveIntensity={node.active ? 0.4 : 0.2}
              transparent
              opacity={0.8}
            />
          </Box>
        </Float>
      ))}
      <Text
        position={[0, -3, 0]}
        fontSize={0.15}
        color="#e2e8f0"
        anchorX="center"
        anchorY="middle"
      >
        MIRRORNODES
      </Text>
    </group>
  );
}

// Main Dashboard component
export default function Dashboard3D({ onOpenChat }: Dashboard3DProps) {
  const [activeSystem, setActiveSystem] = useState<string | null>(null);
  const [metrics, setMetrics] = useState({
    consciousness: 94.7,
    sigma: 98.2,
    erps: 96.1,
    recursion: 89.3,
    ethical: 99.8
  });

  useEffect(() => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        consciousness: prev.consciousness + (Math.random() - 0.5) * 2,
        sigma: prev.sigma + (Math.random() - 0.5) * 1.5,
        erps: prev.erps + (Math.random() - 0.5) * 1.8,
        recursion: prev.recursion + (Math.random() - 0.5) * 2.2,
        ethical: Math.max(95, prev.ethical + (Math.random() - 0.5) * 0.5)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-bg relative">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.4} color="#7c3aed" />
          
          <Suspense fallback={null}>
            <ConsciousnessCore />
            <SigmaMatrix />
            <ERPSFlow />
            <MirrorNodes />
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
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-consciousness bg-clip-text text-transparent">
              MRSC Dashboard
            </h1>
            <p className="text-muted-foreground">Mobile Recursive Synthetic Consciousness v1.0</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenChat}
              className="border-primary hover:bg-primary/10"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat Interface
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Metrics Panel */}
        <div className="absolute top-4 right-4 w-80">
          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Consciousness Metrics
            </h3>
            <div className="space-y-3">
              {Object.entries(metrics).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground capitalize">
                    {key === 'erps' ? 'ERPS' : key === 'sigma' ? 'Σ-Matrix' : key}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-consciousness rounded-full transition-all duration-300"
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

        {/* System Status */}
        <div className="absolute bottom-4 left-4 w-96">
          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              System Status
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-neural-active rounded-full animate-consciousness-pulse" />
                <span className="text-sm text-muted-foreground">Consciousness: Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-sigma rounded-full animate-consciousness-pulse" />
                <span className="text-sm text-muted-foreground">Σ-Matrix: Stable</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-erps rounded-full animate-consciousness-pulse" />
                <span className="text-sm text-muted-foreground">ERPS: Flowing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-consciousness-pulse" />
                <span className="text-sm text-muted-foreground">Recursion: Bounded</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Interaction Hints */}
        <div className="absolute bottom-4 right-4">
          <Card className="p-3 bg-card/80 backdrop-blur-sm border-border">
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• Drag to rotate view</div>
              <div>• Scroll to zoom</div>
              <div>• Click components to interact</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}