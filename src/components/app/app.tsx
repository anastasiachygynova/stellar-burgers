import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
  ConstructorPage, 
  Feed, 
  Login, 
  Register, 
  ForgotPassword, 
  ResetPassword, 
  Profile, 
  ProfileOrders, 
  NotFound404 
} from '@pages';
import { AppHeader, ProtectedRoute } from '@components';
import '../../index.css';
import styles from './app.module.css';

const App = () => (
  <BrowserRouter>
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        {/* Публичные роуты */}
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />
        
        {/* Защищённые роуты */}
        <Route 
          path="/login" 
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/forgot-password" 
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reset-password" 
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile/orders" 
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          } 
        />
        
        {/* Роут для несуществующих страниц */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
