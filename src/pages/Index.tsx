
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

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="sms-theme">
      <SupplyContextProvider>
        <SidebarProvider defaultOpen={true}>
          <div className="min-h-screen flex w-full relative overflow-hidden">
            <AnimatedBackground />
            <AppSidebar />
            <main className="flex-1 flex flex-col relative z-10">
              <header className="h-16 border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center px-6 shadow-sm animate-slide-down">
                <SidebarTrigger className="mr-4 hover:scale-110 transition-transform duration-200" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  Supply Management System
                </h1>
              </header>
              <div className="flex-1 p-6 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/inventory" element={<InventoryPage />} />
                  <Route path="/suppliers" element={<SuppliersPage />} />
                  <Route path="/transactions" element={<TransactionsPage />} />
                  <Route path="/audit" element={<AuditTrailPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </SupplyContextProvider>
    </ThemeProvider>
  );
};

export default Index;
