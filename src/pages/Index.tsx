
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dashboard } from "@/components/Dashboard";
import { ModularDashboard } from "@/components/dashboard/ModularDashboard";
import { InventoryPage } from "@/components/InventoryPage";
import { SuppliersPage } from "@/components/SuppliersPage";
import { TransactionsPage } from "@/components/TransactionsPage";
import { AuditTrailPage } from "@/components/AuditTrailPage";
import { SettingsPage } from "@/components/SettingsPage";
import { LoginPage } from "@/components/LoginPage";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SupplyContextProvider } from "@/contexts/SupplyContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { BackgroundManager } from "@/components/BackgroundManager";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, User, LogOut } from "lucide-react";

const AppContent = () => {
  const isMobile = useIsMobile();
  const { user, isAuthenticated, logout } = useAuth();
  const [backgroundStyle, setBackgroundStyle] = useState('gradient');
  
  // Register service worker for offline functionality
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Determine the correct service worker path based on environment
      const swPath = '/serviceWorker.js';
      
      navigator.serviceWorker.register(swPath)
        .then(registration => {
          console.log('InventOMatic: ServiceWorker registration successful', registration.scope);
          
          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('InventOMatic: New content available, will update automatically.');
                  // Automatically update to new version
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                }
              });
            }
          });

          // Listen for controlling service worker changes
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('InventOMatic: Service worker updated, reloading page...');
            window.location.reload();
          });
        })
        .catch(err => {
          console.log('InventOMatic: ServiceWorker registration failed:', err);
        });

      // Handle online/offline status
      const handleOnline = () => {
        console.log('InventOMatic: Back online');
        // Optional: Show a toast notification
      };

      const handleOffline = () => {
        console.log('InventOMatic: Now offline - cached content will be served');
        // Optional: Show a toast notification
      };

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  // Listen for background animation changes
  useEffect(() => {
    const handleBackgroundChange = (event: CustomEvent) => {
      setBackgroundStyle(event.detail.style);
    };

    // Load initial background preference
    const savedBackground = localStorage.getItem('background-animation') || 'gradient';
    setBackgroundStyle(savedBackground);

    window.addEventListener('backgroundAnimationChange', handleBackgroundChange as EventListener);
    
    return () => {
      window.removeEventListener('backgroundAnimationChange', handleBackgroundChange as EventListener);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full relative overflow-hidden">
        <BackgroundManager style={backgroundStyle} />
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="h-14 sm:h-16 border-b bg-white/90 dark:bg-gray-800/90 backdrop-blur-md flex items-center justify-between px-3 sm:px-4 lg:px-6 shadow-lg animate-slide-down flex-shrink-0">
            <div className="flex items-center min-w-0 flex-1 gap-2 sm:gap-3">
              <SidebarTrigger />
              <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%] animate-[gradient_12s_ease-in-out_infinite] truncate">
                InventOMatic
              </h1>
            </div>
            
            {/* User Info, Notifications and Logout Button */}
            {user && (
              <div className="flex items-center space-x-2 sm:space-x-4 animate-slide-left">
                <Badge variant="secondary" className="hidden sm:flex">
                  <Shield className="w-3 h-3 mr-1" />
                  {user.role.toUpperCase()}
                </Badge>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline">{user.name}</span>
                </div>
                
                {/* Functional Notification Dropdown */}
                <NotificationDropdown />
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            )}
          </header>
          <main className="flex-1 overflow-auto">
            <div className="h-full p-3 sm:p-4 lg:p-6">
              <div className="w-full max-w-none mx-auto h-full">
                <Routes>
                  <Route path="/" element={<ModularDashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/inventory" element={<InventoryPage />} />
                  <Route path="/suppliers" element={<SuppliersPage />} />
                  <Route path="/transactions" element={<TransactionsPage />} />
                  <Route path="/audit" element={<AuditTrailPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="inventomatic-theme">
      <AuthProvider>
        <SupplyContextProvider>
          <AppContent />
        </SupplyContextProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Index;
