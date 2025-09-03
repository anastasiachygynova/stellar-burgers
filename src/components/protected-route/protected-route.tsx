import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  
  // Здесь должна быть логика проверки авторизации
  // Пока что возвращаем children для демонстрации
  // В реальном приложении здесь будет проверка токена/состояния авторизации
  const isAuthenticated = false; // Замените на реальную проверку авторизации
  
  if (!isAuthenticated) {
    // Перенаправляем на страницу входа, сохраняя текущий путь
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;