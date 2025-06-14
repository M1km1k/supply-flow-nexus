
import { useState } from "react";
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
  Check,
  Package,
  ArrowUpDown,
  FileText,
  Home
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
    <Sidebar className="border-r bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-xl animate-slide-right min-w-[280px] w-[280px]">
      <SidebarContent>
        <div className="p-6 animate-fade-in">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg animate-spin-slow">
              <Check className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div className="animate-slide-right">
              <h2 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">InventOMatic</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 animate-fade-in">Inventory Management</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="animate-fade-in text-gray-700 dark:text-gray-300 px-4 mb-2">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className="animate-slide-right px-2" style={{ animationDelay: `${index * 0.1}s` }}>
                  <SidebarMenuButton asChild className="w-full h-auto p-0">
                    <NavLink
                      to={item.url}
                      className={({ isActive: linkActive }) =>
                        `flex items-center space-x-4 px-4 py-4 mx-2 rounded-xl transition-all duration-300 group hover:scale-105 relative overflow-hidden ${
                          isActive(item.url)
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                            : "text-black dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-black dark:hover:text-gray-100"
                        }`
                      }
                    >
                      {/* Animated background effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive(item.url) ? 'opacity-100' : ''}`} />
                      
                      {/* Icon with enhanced animations */}
                      <div className="relative z-10">
                        <item.icon className={`w-6 h-6 transition-all duration-300 ${
                          isActive(item.url) 
                            ? "animate-bounce drop-shadow-lg text-white" 
                            : "group-hover:scale-125 group-hover:rotate-12 group-hover:drop-shadow-md text-black dark:text-gray-200"
                        }`} />
                      </div>
                      
                      {/* Text with enhanced animations - always black in light mode */}
                      <span className={`font-medium text-base transition-all duration-300 relative z-10 ${
                        isActive(item.url) 
                          ? "animate-pulse drop-shadow-lg text-white" 
                          : "group-hover:translate-x-2 group-hover:font-semibold text-black dark:text-gray-200"
                      }`}>
                        {item.title}
                      </span>
                      
                      {/* Animated indicator */}
                      {isActive(item.url) && (
                        <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-ping" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Enhanced Footer */}
        <div className="mt-auto p-6 animate-fade-in">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 text-center relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20 animate-pulse" />
            
            <div className="animate-slide-up relative z-10">
              <h3 className="font-semibold text-sm text-gray-800 dark:text-white mb-3">System Status</h3>
              <div className="flex items-center justify-center space-x-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">All Systems Operational</span>
              </div>
              
              {/* Additional status indicators */}
              <div className="mt-3 flex justify-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Online</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Synced</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
