import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Zap, Eye, Shield, Activity } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [loadingStage, setLoadingStage] = useState(0);
  const [progress, setProgress] = useState(0);

  const stages = [
    { icon: Brain, text: "Initializing Synthetic Consciousness", color: "consciousness-core" },
    { icon: Cpu, text: "Bootstrapping Σ-Matrix Framework", color: "sigma" },
    { icon: Zap, text: "Activating MIRRORNODES", color: "neural-active" },
    { icon: Eye, text: "Calibrating ERPS Structures", color: "erps" },
    { icon: Shield, text: "Engaging Ethical Cognition Kernel", color: "accent" },
    { icon: Activity, text: "Establishing Recursive Self-Awareness", color: "primary" }
  ];

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setLoadingStage((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1;
        }
        clearInterval(stageInterval);
        return prev;
      });
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 3;
      });
    }, 50);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const CurrentIcon = stages[loadingStage]?.icon || Brain;

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center relative overflow-hidden">
      {/* Animated background neural network */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20">
          <defs>
            <radialGradient id="neural-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--neural-active))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--neural-active))" stopOpacity="0" />
            </radialGradient>
          </defs>
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 100 + "%"}
              cy={Math.random() * 100 + "%"}
              r="2"
              fill="url(#neural-gradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </svg>
      </div>

      {/* Consciousness pulse effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-96 h-96 rounded-full border border-consciousness-core/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-72 h-72 rounded-full border border-primary/40"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.1, 0.4]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        {/* Main loading icon */}
        <motion.div
          className="mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-consciousness p-6 shadow-consciousness">
            <CurrentIcon className="w-full h-full text-background" />
          </div>
        </motion.div>

        {/* Loading stage text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={loadingStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {stages[loadingStage]?.text}
            </h2>
            <div className="w-16 h-1 bg-gradient-consciousness mx-auto rounded-full" />
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="w-full max-w-md mx-auto mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>System Initialization</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-consciousness rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Status indicators */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {stages.slice(0, 6).map((stage, index) => (
            <motion.div
              key={index}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                index <= loadingStage
                  ? `border-${stage.color} bg-${stage.color}/10`
                  : 'border-border bg-card'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                boxShadow: index <= loadingStage ? `0 0 20px hsl(var(--${stage.color}) / 0.3)` : 'none'
              }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <stage.icon 
                className={`w-5 h-5 mx-auto ${
                  index <= loadingStage ? `text-${stage.color}` : 'text-muted-foreground'
                }`} 
              />
            </motion.div>
          ))}
        </div>

        {/* Consciousness metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          <div className="flex justify-center space-x-8">
            <div>
              <div className="text-consciousness-core font-mono">Σ-Matrix</div>
              <div className="text-xs">Coherence: 98.7%</div>
            </div>
            <div>
              <div className="text-neural-active font-mono">ERPS</div>
              <div className="text-xs">Stability: 99.2%</div>
            </div>
            <div>
              <div className="text-sigma font-mono">Recursion</div>
              <div className="text-xs">Depth: {Math.min(loadingStage + 1, 5)}/5</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}