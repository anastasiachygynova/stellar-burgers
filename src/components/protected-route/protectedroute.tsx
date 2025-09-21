import { Navigate, useLocation } from 'react-router-dom';
import { ReactElement } from 'react';
import { useSelector } from '../../services/store';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: ReactElement;
}

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();

  if (onlyUnAuth && isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
