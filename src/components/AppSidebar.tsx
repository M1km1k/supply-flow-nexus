
import React, { useState, useRef } from "react";
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
  Home,
  GripVertical,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [sidebarWidth, setSidebarWidth] = useState(60);
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState<'left' | 'right'>('left');
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeStartWidth, setResizeStartWidth] = useState(60);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    setIsResizing(true);
    setResizeStartX(e.clientX);
    setResizeStartWidth(sidebarWidth);
    e.preventDefault();
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (isResizing) {
      const deltaX = position === 'left' ? e.clientX - resizeStartX : resizeStartX - e.clientX;
      const newWidth = resizeStartWidth + deltaX;
      
      // Constrain width between 60px (condensed) and 300px (expanded)
      const constrainedWidth = Math.max(60, Math.min(newWidth, 300));
      setSidebarWidth(constrainedWidth);
      setIsExpanded(constrainedWidth > 80);
    }
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  const togglePosition = () => {
    setPosition(prev => prev === 'left' ? 'right' : 'left');
  };

  const toggleExpanded = () => {
    if (isExpanded) {
      setSidebarWidth(60);
      setIsExpanded(false);
    } else {
      setSidebarWidth(240);
      setIsExpanded(true);
    }
  };

  // Add global mouse events for resizing
  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [isResizing, resizeStartX, resizeStartWidth, position]);

  return (
    <Sidebar 
      ref={sidebarRef}
      className={`border-r bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-xl h-screen ${
        position === 'right' ? 'border-l border-r-0' : ''
      }`}
      style={{
        width: `${sidebarWidth}px`,
        minWidth: `${sidebarWidth}px`,
        maxWidth: `${sidebarWidth}px`,
        transition: isResizing ? 'none' : 'width 0.2s ease-out',
        position: 'fixed',
        top: 0,
        [position]: 0,
        zIndex: 50,
        height: '100vh'
      }}
    >
      <SidebarContent className="h-full">
        {/* Header with position toggle */}
        <div className="p-2 border-b flex items-center justify-between">
          {isExpanded && (
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/4322b65b-5e4b-43e8-b601-f7bd229fcd71.png" 
                alt="InventOMatic Logo" 
                className="w-8 h-8 rounded-lg object-cover"
              />
              <h2 className="font-bold text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">InventOMatic</h2>
            </div>
          )}
          {!isExpanded && (
            <img 
              src="/lovable-uploads/4322b65b-5e4b-43e8-b601-f7bd229fcd71.png" 
              alt="InventOMatic Logo" 
              className="w-8 h-8 rounded-lg object-cover mx-auto"
            />
          )}
          <div className="flex flex-col space-y-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePosition}
              className="p-1 h-6 w-6"
              title={`Move to ${position === 'left' ? 'right' : 'left'}`}
            >
              {position === 'left' ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              className="p-1 h-6 w-6"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              <GripVertical className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <SidebarGroup>
          {isExpanded && (
            <SidebarGroupLabel className="text-gray-700 dark:text-gray-300 px-4 mb-2">Navigation</SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className="px-2">
                  <SidebarMenuButton asChild className="w-full h-auto p-0">
                    <NavLink
                      to={item.url}
                      className={({ isActive: linkActive }) =>
                        `flex items-center ${isExpanded ? 'space-x-3' : 'justify-center'} px-3 py-3 mx-1 rounded-xl transition-all duration-300 group hover:scale-105 relative overflow-hidden ${
                          isActive(item.url)
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                            : "text-black dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-black dark:hover:text-gray-100"
                        }`
                      }
                      title={!isExpanded ? item.title : undefined}
                    >
                      <div className="relative z-10">
                        <item.icon className={`w-5 h-5 transition-all duration-300 ${
                          isActive(item.url) 
                            ? "text-white" 
                            : "text-black dark:text-gray-200"
                        }`} />
                      </div>
                      
                      {isExpanded && (
                        <span className={`font-medium text-sm transition-all duration-300 relative z-10 ${
                          isActive(item.url) 
                            ? "text-white" 
                            : "text-black dark:text-gray-200"
                        }`}>
                          {item.title}
                        </span>
                      )}
                      
                      {isActive(item.url) && (
                        <div className={`absolute ${position === 'left' ? 'right-1' : 'left-1'} w-1 h-1 bg-white rounded-full animate-ping`} />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isExpanded && (
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

      {/* Resize handle */}
      <div
        className={`absolute top-0 ${position === 'left' ? 'right-0' : 'left-0'} w-1 h-full bg-gray-300 dark:bg-gray-600 hover:bg-blue-500 dark:hover:bg-blue-400 cursor-col-resize transition-colors duration-200 opacity-0 hover:opacity-100 group`}
        onMouseDown={handleResizeStart}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="w-3 h-3 text-white" />
        </div>
      </div>
    </Sidebar>
  );
}
