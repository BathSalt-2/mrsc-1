import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Dashboard3DProps {
  onOpenChat: () => void;
}

// No Three.js - just UI to test if the issue is with React Three Fiber
export default function Dashboard3D({ onOpenChat }: Dashboard3DProps) {
  const [metrics, setMetrics] = useState({
    consciousness: 94.7,
    neural: 98.2
  });
  const { signOut } = useAuth();

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
      {/* No 3D Scene - just a placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 bg-purple-500 rounded-full animate-pulse opacity-50"></div>
        </div>
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center">
              <img 
                src="/lovable-uploads/e7b97061-37af-4737-bcdd-95a767672c7f.png" 
                alt="Logo" 
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Consciousness Interface
              </h1>
              <p className="text-sm text-gray-300">Neural System</p>
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
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Metrics */}
        <div className="absolute top-4 right-4 w-80">
          <Card className="p-4 bg-black/50 border-purple-500/50">
            <h3 className="text-lg font-semibold mb-4 text-white">
              System Metrics
            </h3>
            <div className="space-y-3">
              {Object.entries(metrics).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm text-gray-300 capitalize">
                    {key}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono text-white">
                      {value.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Status */}
        <div className="absolute bottom-4 left-4">
          <Card className="p-3 bg-black/50 border-purple-500/50">
            <div className="text-xs text-gray-300">
              <div>System Status: Online</div>
              <div>3D Visualization: Disabled</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}