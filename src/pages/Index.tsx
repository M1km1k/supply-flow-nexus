
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Dashboard } from "@/components/Dashboard";
import { InventoryPage } from "@/components/InventoryPage";
import { SuppliersPage } from "@/components/SuppliersPage";
import { TransactionsPage } from "@/components/TransactionsPage";
import { AuditTrailPage } from "@/components/AuditTrailPage";
import { SettingsPage } from "@/components/SettingsPage";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SupplyContextProvider } from "@/contexts/SupplyContext";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";

const Index = () => {
  const isMobile = useIsMobile();
  
  // Register service worker for offline functionality
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/serviceWorker.js')
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
          .catch(err => {
            console.log('ServiceWorker registration failed: ', err);
          });
      });
    }
  }, []);
  
  return (
    <ThemeProvider defaultTheme="light" storageKey="inventomatic-theme">
      <SupplyContextProvider>
        <SidebarProvider defaultOpen={!isMobile}>
          <div className="min-h-screen flex w-full relative overflow-hidden">
            <AnimatedBackground />
            <AppSidebar />
            <div className="flex-1 flex flex-col relative z-10 min-w-0">
              <header className="h-14 sm:h-16 border-b bg-white/90 dark:bg-gray-800/90 backdrop-blur-md flex items-center justify-between px-3 sm:px-4 lg:px-6 shadow-lg animate-slide-down flex-shrink-0">
                <div className="flex items-center min-w-0 flex-1 gap-2 sm:gap-3">
                  <SidebarTrigger className="hover:scale-110 transition-transform duration-200 text-gray-700 dark:text-gray-200 flex-shrink-0" />
                  <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient truncate">
                    InventOMatic
                  </h1>
                </div>
              </header>
              <main className="flex-1 overflow-auto">
                <div className="h-full p-3 sm:p-4 lg:p-6">
                  <div className="w-full max-w-none mx-auto h-full">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/inventory" element={<InventoryPage />} />
                      <Route path="/suppliers" element={<SuppliersPage />} />
                      <Route path="/transactions" element={<TransactionsPage />} />
                      <Route path="/audit" element={<AuditTrailPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                    </Routes>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </SupplyContextProvider>
    </ThemeProvider>
  );
};

export default Index;
