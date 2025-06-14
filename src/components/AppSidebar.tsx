
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
    <Sidebar className="border-r bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-xl">
      <SidebarContent className="h-full">
        {/* Header */}
        <div className="p-4 border-b flex items-center space-x-3">
          <img 
            src="/lovable-uploads/4322b65b-5e4b-43e8-b601-f7bd229fcd71.png" 
            alt="InventOMatic Logo" 
            className="w-8 h-8 rounded-lg object-cover"
          />
          {state === "expanded" && (
            <h2 className="font-bold text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              InventOMatic
            </h2>
          )}
        </div>

        <SidebarGroup>
          {state === "expanded" && (
            <SidebarGroupLabel className="text-gray-700 dark:text-gray-300 px-4 mb-2">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} className="px-2">
                  <SidebarMenuButton asChild className="w-full h-auto p-0">
                    <NavLink
                      to={item.url}
                      className={({ isActive: linkActive }) =>
                        `flex items-center ${state === "expanded" ? 'space-x-3' : 'justify-center'} px-3 py-3 mx-1 rounded-xl transition-all duration-300 group hover:scale-105 relative overflow-hidden ${
                          isActive(item.url)
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                            : "text-black dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-black dark:hover:text-gray-100"
                        }`
                      }
                      title={state === "collapsed" ? item.title : undefined}
                    >
                      <div className="relative z-10">
                        <item.icon className={`w-5 h-5 transition-all duration-300 ${
                          isActive(item.url) 
                            ? "text-white" 
                            : "text-black dark:text-gray-200"
                        }`} />
                      </div>
                      
                      {state === "expanded" && (
                        <span className={`font-medium text-sm transition-all duration-300 relative z-10 ${
                          isActive(item.url) 
                            ? "text-white" 
                            : "text-black dark:text-gray-200"
                        }`}>
                          {item.title}
                        </span>
                      )}
                      
                      {isActive(item.url) && (
                        <div className="absolute right-1 w-1 h-1 bg-white rounded-full animate-ping" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {state === "expanded" && (
          <div className="mt-auto p-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-3 text-center">
              <h3 className="font-semibold text-xs text-gray-800 dark:text-white mb-2">System Status</h3>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-600 dark:text-gray-300">Operational</span>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
