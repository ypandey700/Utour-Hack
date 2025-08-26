import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, ArrowLeft, Activity, AlertTriangle, TrendingUp, Eye, Brain, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const AIMonitoring = () => {
  const monitoringAlerts = [
    {
      id: 1,
      type: "Sudden Drop",
      severity: "High",
      location: "Valley of Flowers Trek",
      tourist: "TID-4751",
      description: "Tourist signal dropped suddenly at high altitude. No movement detected for 15 minutes.",
      timestamp: "10 minutes ago",
      aiConfidence: 94,
      status: "Active"
    },
    {
      id: 2,
      type: "Route Deviation",
      severity: "Medium",
      location: "Kedarnath Trail",
      tourist: "TID-3892",
      description: "Tourist deviated significantly from marked trail. Now in restricted area.",
      timestamp: "25 minutes ago",
      aiConfidence: 87,
      status: "Investigating"
    },
    {
      id: 3,
      type: "Unusual Behavior",
      severity: "Low",
      location: "Badrinath Temple",
      tourist: "TID-5124",
      description: "Prolonged stay at single location with erratic movement patterns detected.",
      timestamp: "45 minutes ago",
      aiConfidence: 76,
      status: "Monitoring"
    },
    {
      id: 4,
      type: "Crowd Anomaly",
      severity: "High",
      location: "Haridwar Ghat",
      tourist: "Multiple",
      description: "Unusual crowd density patterns detected. Potential stampede risk identified.",
      timestamp: "1 hour ago",
      aiConfidence: 91,
      status: "Resolved"
    }
  ];

  const systemMetrics = {
    touristsMonitored: 2847,
    activeSensors: 156,
    aiAccuracy: 94.2,
    alertsGenerated: 23,
    falsePositives: 2.1,
    responseTime: 1.8
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-red-100 text-red-800";
      case "Investigating": return "bg-yellow-100 text-yellow-800";
      case "Monitoring": return "bg-blue-100 text-blue-800";
      case "Resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/police-dashboard" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Police Dashboard
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-heading text-xl font-semibold">AI Monitoring</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800">
              <Activity className="mr-1 h-3 w-3" />
              System Active
            </Badge>
            <Button variant="outline" size="sm">
              Configure AI
            </Button>
            <Button variant="outline" size="sm">
              Export Data
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            AI <span className="text-primary">Monitoring</span> System
          </h1>
          <p className="text-muted-foreground">
            Advanced artificial intelligence system for real-time tourist safety monitoring and anomaly detection
          </p>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="shadow-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary mb-1">{systemMetrics.touristsMonitored.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Tourists Monitored</p>
            </CardContent>
          </Card>
          <Card className="shadow-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-secondary mb-1">{systemMetrics.activeSensors}</div>
              <p className="text-xs text-muted-foreground">Active Sensors</p>
            </CardContent>
          </Card>
          <Card className="shadow-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600 mb-1">{systemMetrics.aiAccuracy}%</div>
              <p className="text-xs text-muted-foreground">AI Accuracy</p>
            </CardContent>
          </Card>
          <Card className="shadow-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{systemMetrics.alertsGenerated}</div>
              <p className="text-xs text-muted-foreground">Alerts Generated</p>
            </CardContent>
          </Card>
          <Card className="shadow-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">{systemMetrics.falsePositives}%</div>
              <p className="text-xs text-muted-foreground">False Positives</p>
            </CardContent>
          </Card>
          <Card className="shadow-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-accent mb-1">{systemMetrics.responseTime}s</div>
              <p className="text-xs text-muted-foreground">Avg Response</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Alerts */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-heading text-2xl font-bold">AI Generated Alerts</h2>
              <div className="flex space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="drop">Sudden Drop</SelectItem>
                    <SelectItem value="deviation">Route Deviation</SelectItem>
                    <SelectItem value="behavior">Unusual Behavior</SelectItem>
                    <SelectItem value="crowd">Crowd Anomaly</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {monitoringAlerts.map((alert) => (
                <Card key={alert.id} className="shadow-card border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Brain className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-semibold">{alert.type}</h3>
                          <p className="text-sm text-muted-foreground">{alert.location}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-foreground mb-4">{alert.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-sm">
                        <span className="font-medium">Tourist ID:</span>
                        <p>{alert.tourist}</p>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Detected:</span>
                        <p>{alert.timestamp}</p>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">AI Confidence:</span>
                        <p className={`font-semibold ${getConfidenceColor(alert.aiConfidence)}`}>
                          {alert.aiConfidence}%
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-1 h-3 w-3" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Send Alert
                      </Button>
                      <Button variant="outline" size="sm">
                        Mark False Positive
                      </Button>
                      {alert.status === "Active" && (
                        <Button size="sm" className="bg-secondary hover:bg-secondary-light">
                          Dispatch Unit
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AI System Status */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  System Status
                </CardTitle>
                <CardDescription>Real-time AI system performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing Power</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Memory Usage</span>
                    <span>62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Network Load</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Model Accuracy</span>
                    <span>94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Detection Types
                </CardTitle>
                <CardDescription>AI monitoring categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Route Deviation</span>
                  <Badge variant="outline">8 alerts</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sudden Drop</span>
                  <Badge variant="outline">5 alerts</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Unusual Behavior</span>
                  <Badge variant="outline">7 alerts</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Crowd Anomaly</span>
                  <Badge variant="outline">3 alerts</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading">AI Learning</CardTitle>
                <CardDescription>Continuous improvement metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Data Points Processed</span>
                  <span className="font-semibold">2.8M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Model Version</span>
                  <span className="font-semibold">v3.2.1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Training</span>
                  <span className="font-semibold">2 days ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Accuracy Improvement</span>
                  <span className="font-semibold text-green-600">+2.3%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-green-200">
              <CardHeader>
                <CardTitle className="font-heading text-green-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full">
                  Configure Thresholds
                </Button>
                <Button variant="outline" className="w-full">
                  Train Model
                </Button>
                <Button variant="outline" className="w-full">
                  System Diagnostics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMonitoring;