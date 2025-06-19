
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Shield, 
  Zap, 
  Database, 
  Lock, 
  TrendingUp, 
  BarChart3,
  Settings
} from 'lucide-react';

export const ObjectivesOverview: React.FC = () => {
  const objectives = [
    {
      id: 1,
      title: "Secure Platform Development",
      description: "Construct a secure, responsive web platform for centralized, real-time inventory tracking",
      icon: Shield,
      status: "Active",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Automated Workflow Triggers",
      description: "Implement automated workflow triggers including stock alerts for low inventory",
      icon: Zap,
      status: "Active", 
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "Centralized Supplier Data",
      description: "Create dedicated module for managing supplier information and procurement history",
      icon: Database,
      status: "Active",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "Role-Based Access Control (RBAC)",
      description: "Implement RBAC to restrict system functions based on user roles with detailed audit trail",
      icon: Lock,
      status: "Active",
      color: "from-red-500 to-red-600"
    },
    {
      id: 5,
      title: "Predictive Analytics Integration",
      description: "Incorporate predictive analytics module with decision-making tree algorithm",
      icon: TrendingUp,
      status: "Enhanced",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 6,
      title: "Intuitive Dashboards",
      description: "Design intuitive dashboards for visual data analysis and exportable reports",
      icon: BarChart3,
      status: "Enhanced",
      color: "from-teal-500 to-teal-600"
    },
    {
      id: 7,
      title: "Modular System Design",
      description: "Build using modular web design to support future scalability and customization",
      icon: Settings,
      status: "Active",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-6 h-6 text-blue-600" />
          <span>Invent O'Matic - Study Objectives</span>
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Web-based supply management system with transaction automation and predictive analytics
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {objectives.map((objective, index) => (
            <div 
              key={objective.id}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${objective.color}`}>
                  <objective.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                      {objective.title}
                    </h4>
                    <Badge 
                      variant={objective.status === 'Active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {objective.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {objective.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border">
          <h4 className="font-semibold text-sm text-blue-800 dark:text-blue-300 mb-2">System Scope</h4>
          <p className="text-xs text-blue-700 dark:text-blue-400">
            Web-based application development with modular design, predictive analytics module utilizing 
            decision-making tree algorithm, real-time functionality with stable internet connection requirement.
            Initial focus on core modules with future integration of third-party systems as enhancements.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
