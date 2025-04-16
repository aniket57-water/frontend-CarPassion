import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Pages
import Home from './pages/Home';
import CarDetail from './pages/CarDetail';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageCars from './pages/admin/ManageCars';
import AddCar from './pages/admin/AddCar';
import EditCar from './pages/admin/EditCar';
import NotFound from './pages/NotFound';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const { checkSession } = useAuth();
  
  useEffect(() => {
    checkSession();
  }, [checkSession]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cars/:id" element={<CarDetail />} />
          <Route path="/admin/login" element={<Login />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/cars" element={<ProtectedRoute><ManageCars /></ProtectedRoute>} />
          <Route path="/admin/cars/add" element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
          <Route path="/admin/cars/:id/edit" element={<ProtectedRoute><EditCar /></ProtectedRoute>} />
          
          {/* Default route - 404 */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;