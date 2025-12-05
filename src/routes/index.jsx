import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import MainLayout from '../layouts/MainLayout';

const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const StudentManagement = lazy(() => import('../pages/admin/StudentManagement'));
const CustomFields = lazy(() => import('../pages/admin/CustomFields'));

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    if (user?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading Page...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="admin/students" element={<AdminRoute><StudentManagement /></AdminRoute>} />
            <Route path="admin/fields" element={<AdminRoute><CustomFields /></AdminRoute>} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
