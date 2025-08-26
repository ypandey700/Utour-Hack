import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Navigation, Search, Filter, ArrowLeft, Route, Clock, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import SimulationMap from "@/components/SimulationMap";
import mapBackground from "@/assets/uttarakhand-landscape.jpg";

const TouristMap = () => {
  const destinations = [
    { name: "Kedarnath Temple", distance: "223 km", eta: "6h 30m", status: "Open", danger: "Low", type: "Temple" },
    { name: "Badrinath Temple", distance: "296 km", eta: "8h 15m", status: "Open", danger: "Low", type: "Temple" },
    { name: "Gangotri Temple", distance: "249 km", eta: "7h 45m", status: "Open", danger: "Medium", type: "Temple" },
    { name: "Yamunotri Temple", distance: "220 km", eta: "6h 45m", status: "Open", danger: "Medium", type: "Temple" },
    { name: "Rishikesh", distance: "45 km", eta: "1h 30m", status: "Open", danger: "Low", type: "Spiritual" },
    { name: "Haridwar", distance: "24 km", eta: "45m", status: "Open", danger: "Low", type: "Spiritual" },
    { name: "Valley of Flowers", distance: "274 km", eta: "8h 30m", status: "Seasonal", danger: "High", type: "National Park" },
    { name: "Jim Corbett Park", distance: "95 km", eta: "2h 45m", status: "Open", danger: "Low", type: "Wildlife" },
    { name: "Nainital", distance: "285 km", eta: "7h 15m", status: "Open", danger: "Low", type: "Hill Station" },
    { name: "Mussoorie", distance: "35 km", eta: "1h 15m", status: "Open", danger: "Low", type: "Hill Station" }
  ];

  const restrictedAreas = [
    { name: "Kedarnath Approach Road", reason: "Landslide Warning", severity: "High" },
    { name: "Char Dham Route (NH7)", reason: "Heavy Traffic", severity: "Medium" },
    { name: "Valley of Flowers Trail", reason: "Weather Conditions", severity: "High" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-green-100 text-green-800";
      case "Seasonal": return "bg-yellow-100 text-yellow-800";
      case "Closed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDangerColor = (danger: string) => {
    switch (danger) {
      case "Low": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "High": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low": return "bg-blue-100 text-blue-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "High": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${mapBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm"></div>
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-card border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to="/tourist-dashboard" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-heading text-xl font-semibold">Map & Navigation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Navigation className="mr-2 h-4 w-4" />
                My Location
              </Button>
              <Button variant="outline" size="sm">
                <Route className="mr-2 h-4 w-4" />
                Plan Route
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Interactive Simulation Section */}
          <Card className="mb-8 shadow-card border-primary/20">
            <CardHeader>
              <CardTitle className="font-heading text-xl text-primary">🗺️ Interactive Route Simulation</CardTitle>
              <CardDescription>Experience real-time navigation with live tracking and safety alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <SimulationMap viewMode="tourist" />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Section (Placeholder) */}
            <div className="lg:col-span-2">
              <Card className="shadow-card h-[600px]">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Uttarakhand Tourism Map
                  </CardTitle>
                  <CardDescription>Interactive map showing destinations, routes, and safety information</CardDescription>
                </CardHeader>
                <CardContent className="h-full">
                  <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <MapPin className="h-16 w-16 text-primary mx-auto" />
                      <div>
                        <h3 className="font-heading text-xl font-semibold mb-2">Interactive Map</h3>
                        <p className="text-muted-foreground mb-4">
                          Detailed map with real-time navigation, destination information, and safety alerts
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          <Badge variant="outline">Real-time Traffic</Badge>
                          <Badge variant="outline">Weather Updates</Badge>
                          <Badge variant="outline">Safety Alerts</Badge>
                          <Badge variant="outline">Offline Maps</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Search and Filters */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Find Destinations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-10" placeholder="Search destinations..." />
                  </div>
                  <Select>
                    <SelectTrigger>
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="temple">Temples</SelectItem>
                      <SelectItem value="spiritual">Spiritual</SelectItem>
                      <SelectItem value="wildlife">Wildlife</SelectItem>
                      <SelectItem value="hill-station">Hill Stations</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Popular Destinations */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Popular Destinations</CardTitle>
                  <CardDescription>Click to view route and details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                  {destinations.map((destination, index) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{destination.name}</h4>
                          <p className="text-xs text-muted-foreground">{destination.type}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Badge className={`text-xs ${getStatusColor(destination.status)}`}>
                            {destination.status}
                          </Badge>
                          <Badge className={`text-xs ${getDangerColor(destination.danger)}`}>
                            {destination.danger} Risk
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {destination.distance}
                        </span>
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {destination.eta}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Restricted Areas Alert */}
              <Card className="shadow-card border-yellow-200">
                <CardHeader>
                  <CardTitle className="font-heading text-lg flex items-center text-yellow-800">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Travel Alerts
                  </CardTitle>
                  <CardDescription>Current restrictions and warnings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {restrictedAreas.map((area, index) => (
                    <div key={index} className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-sm text-yellow-800">{area.name}</h4>
                        <Badge className={`text-xs ${getSeverityColor(area.severity)}`}>
                          {area.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-yellow-700">{area.reason}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Navigation Tools */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Navigation Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Navigation className="mr-2 h-4 w-4" />
                    Get Directions
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Route className="mr-2 h-4 w-4" />
                    Plan Multi-stop Route
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MapPin className="mr-2 h-4 w-4" />
                    Save Location
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Report Issue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristMap;