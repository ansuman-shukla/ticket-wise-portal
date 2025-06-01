
import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface SystemHealth {
  database: 'online' | 'offline';
  aiService: 'online' | 'offline';
  websocket: 'online' | 'offline';
  apiLatency: number;
}

const AdminSystem: React.FC = () => {
  const { toast } = useToast();
  const [isRunningJob, setIsRunningJob] = useState(false);
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    database: 'online',
    aiService: 'online',
    websocket: 'online',
    apiLatency: 45
  });

  const jobStatus = {
    dailyMisuse: 'Running',
    lastRun: '2024-01-20T06:00:00Z',
    nextRun: '2024-01-21T06:00:00Z'
  };

  const getStatusColor = (status: string) => {
    return status === 'online' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getStatusIcon = (status: string) => {
    return status === 'online' ? '🟢' : '🔴';
  };

  const handleRunMisuseDetection = async () => {
    setIsRunningJob(true);
    try {
      // Simulate job execution
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Job Started",
        description: "Daily misuse detection job has been started successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start the misuse detection job.",
        variant: "destructive",
      });
    } finally {
      setIsRunningJob(false);
    }
  };

  const handleHealthCheck = async () => {
    try {
      // Simulate health check
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate random latency change
      setSystemHealth(prev => ({
        ...prev,
        apiLatency: Math.floor(Math.random() * 100) + 20
      }));
      
      toast({
        title: "Health Check Complete",
        description: "System health check completed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to run system health check.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Management</h1>
          <p className="text-gray-600 mt-2">
            Monitor system health and manage automated processes
          </p>
        </div>

        {/* Scheduler Status */}
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Daily Misuse Detection</h3>
                  <p className="text-sm text-gray-600">
                    Last run: {new Date(jobStatus.lastRun).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Next run: {new Date(jobStatus.nextRun).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-green-100 text-green-800">
                    {jobStatus.dailyMisuse}
                  </Badge>
                  <Button 
                    onClick={handleRunMisuseDetection}
                    disabled={isRunningJob}
                  >
                    {isRunningJob ? "Running..." : "Run Now"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>System Health</CardTitle>
              <Button variant="outline" onClick={handleHealthCheck}>
                Run Health Check
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{getStatusIcon(systemHealth.database)}</span>
                  <h3 className="font-medium">Database</h3>
                </div>
                <Badge className={getStatusColor(systemHealth.database)}>
                  {systemHealth.database.charAt(0).toUpperCase() + systemHealth.database.slice(1)}
                </Badge>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{getStatusIcon(systemHealth.aiService)}</span>
                  <h3 className="font-medium">AI Service</h3>
                </div>
                <Badge className={getStatusColor(systemHealth.aiService)}>
                  {systemHealth.aiService.charAt(0).toUpperCase() + systemHealth.aiService.slice(1)}
                </Badge>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{getStatusIcon(systemHealth.websocket)}</span>
                  <h3 className="font-medium">WebSocket</h3>
                </div>
                <Badge className={getStatusColor(systemHealth.websocket)}>
                  {systemHealth.websocket.charAt(0).toUpperCase() + systemHealth.websocket.slice(1)}
                </Badge>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">⚡</span>
                  <h3 className="font-medium">API Latency</h3>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {systemHealth.apiLatency}ms
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Manual Job Triggers */}
        <Card>
          <CardHeader>
            <CardTitle>Manual Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={handleRunMisuseDetection}
                disabled={isRunningJob}
                className="h-20 text-left"
                variant="outline"
              >
                <div>
                  <div className="font-medium">Run Daily Misuse Detection</div>
                  <div className="text-sm text-gray-600">
                    Scan all tickets for policy violations
                  </div>
                </div>
              </Button>

              <Button 
                onClick={handleHealthCheck}
                className="h-20 text-left"
                variant="outline"
              >
                <div>
                  <div className="font-medium">Run System Health Check</div>
                  <div className="text-sm text-gray-600">
                    Check all system components status
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Future Configuration Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <p>System configuration panel</p>
              <p className="text-sm">Coming soon...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminSystem;
