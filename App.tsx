import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { OfflineBanner } from './components/OfflineBanner';

// Pages
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { CreateRequest } from './pages/CreateRequest';
import { RequestsList } from './pages/RequestsList';
import { PostResource } from './pages/PostResource';
import { ResourcesList } from './pages/ResourcesList';
import { AiMatchingPage } from './pages/AiMatchingPage';
import { LiveDisasterMap } from './pages/LiveDisasterMap';
import { DeliveriesList } from './pages/DeliveriesList';
import { NotificationsPage } from './pages/NotificationsPage';
import { ReportsPage } from './pages/ReportsPage';
import { ProfileSettings } from './pages/ProfileSettings';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminAuditLogs } from './pages/admin/AdminAuditLogs';

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-xs font-semibold text-blue-600">
        Authenticating session...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SocketProvider>
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <OfflineBanner />
        <div className="flex flex-1">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="flex-1 md:ml-64 flex flex-col min-w-0">
            <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
              {children}
            </main>
          </div>
        </div>
      </div>
    </SocketProvider>
  );
};

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Application Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            }
          />
          <Route
            path="/requests"
            element={
              <ProtectedLayout>
                <RequestsList />
              </ProtectedLayout>
            }
          />
          <Route
            path="/requests/create"
            element={
              <ProtectedLayout>
                <CreateRequest />
              </ProtectedLayout>
            }
          />
          <Route
            path="/resources"
            element={
              <ProtectedLayout>
                <ResourcesList />
              </ProtectedLayout>
            }
          />
          <Route
            path="/resources/create"
            element={
              <ProtectedLayout>
                <PostResource />
              </ProtectedLayout>
            }
          />
          <Route
            path="/ai-matching"
            element={
              <ProtectedLayout>
                <AiMatchingPage />
              </ProtectedLayout>
            }
          />
          <Route
            path="/ai-matching/:requestId"
            element={
              <ProtectedLayout>
                <AiMatchingPage />
              </ProtectedLayout>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedLayout>
                <LiveDisasterMap />
              </ProtectedLayout>
            }
          />
          <Route
            path="/deliveries"
            element={
              <ProtectedLayout>
                <DeliveriesList />
              </ProtectedLayout>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedLayout>
                <NotificationsPage />
              </ProtectedLayout>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedLayout>
                <ReportsPage />
              </ProtectedLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedLayout>
                <ProfileSettings />
              </ProtectedLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedLayout>
                <ProfileSettings />
              </ProtectedLayout>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/users"
            element={
              <ProtectedLayout>
                <AdminUsers />
              </ProtectedLayout>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedLayout>
                <AdminAnalytics />
              </ProtectedLayout>
            }
          />
          <Route
            path="/admin/audit-logs"
            element={
              <ProtectedLayout>
                <AdminAuditLogs />
              </ProtectedLayout>
            }
          />

          {/* Default Redirection */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
