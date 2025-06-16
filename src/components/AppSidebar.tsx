
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  Calendar, 
  Settings, 
  Users,
  Package,
  ArrowUpDown,
  FileText,
  Home,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Suppliers", url: "/suppliers", icon: Users },
  { title: "Transactions", url: "/transactions", icon: ArrowUpDown },
  { title: "Audit Trail", url: "/audit", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <Sidebar className="border-r bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-xl transition-all duration-500 ease-in-out">
      <SidebarContent className="h-full">
        {/* Header with enhanced animations */}
        <div className="p-4 border-b flex items-center space-x-3 transition-all duration-300 ease-in-out">
          <div className="relative">
            <img 
              src="/lovable-uploads/4322b65b-5e4b-43e8-b601-f7bd229fcd71.png" 
              alt="InventOMatic Logo" 
              className="w-8 h-8 rounded-lg object-cover transition-transform duration-300 hover:scale-110 hover:rotate-3"
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
          </div>
          {state === "expanded" && (
            <h2 className="font-bold text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in transition-all duration-500">
              InventOMatic
            </h2>
          )}
        </div>

        <SidebarGroup>
          {state === "expanded" && (
            <SidebarGroupLabel className="text-gray-700 dark:text-gray-300 px-4 mb-2 animate-fade-in transition-all duration-300">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className="px-2">
                  <SidebarMenuButton asChild className="w-full h-auto p-0">
                    <NavLink
                      to={item.url}
                      className={({ isActive: linkActive }) =>
                        `flex items-center ${state === "expanded" ? 'space-x-3' : 'justify-center'} px-3 py-3 mx-1 rounded-xl transition-all duration-500 ease-in-out group hover:scale-105 relative overflow-hidden transform hover:-translate-y-1 hover:shadow-lg ${
                          isActive(item.url)
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105 animate-pulse"
                            : "text-black dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-black dark:hover:text-gray-100"
                        }`
                      }
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'both'
                      }}
                      title={state === "collapsed" ? item.title : undefined}
                    >
                      {/* Background ripple effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-all duration-500 transform scale-0 group-hover:scale-100"></div>
                      
                      {/* Icon with enhanced animations */}
                      <div className="relative z-10 transition-all duration-300 group-hover:rotate-12">
                        <item.icon className={`w-5 h-5 transition-all duration-500 transform group-hover:scale-110 ${
                          isActive(item.url) 
                            ? "text-white drop-shadow-lg" 
                            : "text-black dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                        }`} />
                      </div>
                      
                      {/* Text with slide animation */}
                      {state === "expanded" && (
                        <span className={`font-medium text-sm transition-all duration-500 relative z-10 transform ${
                          isActive(item.url) 
                            ? "text-white drop-shadow-sm" 
                            : "text-black dark:text-gray-200 group-hover:translate-x-1"
                        }`}>
                          {item.title}
                        </span>
                      )}
                      
                      {/* Active indicator with animation */}
                      {isActive(item.url) && (
                        <>
                          <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-ping" />
                          <div className="absolute right-2 w-2 h-2 bg-white rounded-full" />
                          <div className="absolute left-0 w-1 h-full bg-white rounded-r-full animate-pulse" />
                        </>
                      )}

                      {/* Hover glow effect */}
                      <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Enhanced footer with animations */}
        {state === "expanded" && (
          <div className="mt-auto p-4 animate-fade-in transition-all duration-700">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-3 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg border border-blue-100/50 dark:border-blue-800/50">
              <h3 className="font-semibold text-xs text-gray-800 dark:text-white mb-2 animate-fade-in">System Status</h3>
              <div className="flex items-center justify-center space-x-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping" />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300 transition-colors duration-300">Operational</span>
              </div>
              {/* Subtle background animation */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-100/20 to-purple-100/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
