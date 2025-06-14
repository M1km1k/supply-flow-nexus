
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
    <Sidebar className="border-r bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-xl animate-slide-right">
      <SidebarContent>
        <div className="p-6 animate-fade-in">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg animate-spin-slow">
              <Check className="w-7 h-7 text-white animate-pulse" />
            </div>
            {state !== "collapsed" && (
              <div className="animate-slide-right">
                <h2 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SMS</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 animate-fade-in">Supply Management</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="animate-fade-in">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className="animate-slide-right" style={{ animationDelay: `${index * 0.1}s` }}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive: linkActive }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group hover:scale-105 ${
                          isActive(item.url)
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30"
                        }`
                      }
                    >
                      <item.icon className={`w-5 h-5 transition-all duration-300 ${
                        isActive(item.url) 
                          ? "animate-bounce" 
                          : "group-hover:scale-110 group-hover:rotate-12"
                      }`} />
                      {state !== "collapsed" && (
                        <span className={`font-medium transition-all duration-300 ${
                          isActive(item.url) 
                            ? "animate-pulse" 
                            : "group-hover:translate-x-1"
                        }`}>
                          {item.title}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <div className="mt-auto p-6 animate-fade-in">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 text-center">
            {state !== "collapsed" && (
              <div className="animate-slide-up">
                <h3 className="font-semibold text-sm text-gray-800 dark:text-white mb-2">System Status</h3>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-300">All Systems Operational</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
