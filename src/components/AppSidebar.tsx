
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
  ArrowUp,
  ArrowDown
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Calendar },
  { title: "Inventory", url: "/inventory", icon: Check },
  { title: "Suppliers", url: "/suppliers", icon: Users },
  { title: "Transactions", url: "/transactions", icon: ArrowUp },
  { title: "Audit Trail", url: "/audit", icon: ArrowDown },
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
    <Sidebar className="border-r bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <SidebarContent>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            {state !== "collapsed" && (
              <div>
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">SMS</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Supply Management</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive: linkActive }) =>
                        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                          isActive(item.url)
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {state !== "collapsed" && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
