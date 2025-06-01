
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { RoleRoute } from "./components/auth/RoleRoute";
import Login from "./pages/auth/Login";
import UserDashboard from "./pages/user/UserDashboard";
import CreateTicket from "./pages/user/CreateTicket";
import MyTickets from "./pages/user/MyTickets";
import TicketDetail from "./pages/user/TicketDetail";
import AgentDashboard from "./pages/agent/AgentDashboard";
import AgentTickets from "./pages/agent/AgentTickets";
import AgentTicketDetail from "./pages/agent/AgentTicketDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTickets from "./pages/admin/AdminTickets";
import AdminMisuseReports from "./pages/admin/AdminMisuseReports";
import AdminSystem from "./pages/admin/AdminSystem";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* User Routes */}
            <Route path="/user" element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["USER"]}>
                  <Navigate to="/user/dashboard" replace />
                </RoleRoute>
              </ProtectedRoute>
            } />
            <Route path="/user/dashboard" element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["USER"]}>
                  <UserDashboard />
                </RoleRoute>
              </ProtectedRoute>
            } />
            <Route path="/user/tickets/new" element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["USER"]}>
                  <CreateTicket />
                </RoleRoute>
              </ProtectedRoute>
            } />
            <Route path="/user/tickets" element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["USER"]}>
                  <MyTickets />
                </RoleRoute>
              </ProtectedRoute>
            } />
            <Route path="/user/tickets/:id" element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["USER"]}>
                  <TicketDetail />
                </RoleRoute>
              </ProtectedRoute>
            } />

            {/* Agent Routes */}
            <Route path="/agent" element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["IT_AGENT", "HR_AGENT"]}>
                  <Navigate to="/agent/dashboard" replace />
                </RoleRoute>
              </ProtectedRoute>
            } />
            <Route path="/agent/dashboard" element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["IT_AGENT", "HR_AGENT"]}>
                  <AgentDashboard />
                </RoleRoute>
              </ProtectedRoute>
            } />
            <Route path="/agent/tickets" element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["IT_AGENT", "HR_AGENT"]}>
                  <AgentTickets />
                </RoleRoute>
              </ProtectedRoute>
            } />
            <Route path="/agent/tickets/:id" element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["IT_AGENT", "HR_AGENT"]}>
                  <AgentTicketDetail />
                </RoleRoute>
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["ADMIN"]}>
                  <Navigate to="/admin/dashboard" replace />
                </RoleRoute>
              </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["ADMIN"]}>
                  <AdminDashboard />
                </RoleRoute>
              </ProtectedRoute>
            } />
            <Route path="/admin/tickets" element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["ADMIN"]}>
                  <AdminTickets />
                </RoleRoute>
              </ProtectedRoute>
            } />
            <Route path="/admin/misuse-reports" element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["ADMIN"]}>
                  <AdminMisuseReports />
                </RoleRoute>
              </ProtectedRoute>
            } />
            <Route path="/admin/system" element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["ADMIN"]}>
                  <AdminSystem />
                </RoleRoute>
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
