
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

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="sms-theme">
      <SupplyContextProvider>
        <SidebarProvider defaultOpen={true}>
          <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <AppSidebar />
            <main className="flex-1 flex flex-col">
              <header className="h-16 border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center px-6 shadow-sm">
                <SidebarTrigger className="mr-4" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
