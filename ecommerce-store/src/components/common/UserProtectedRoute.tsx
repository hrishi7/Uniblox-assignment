import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user || user.role !== 'customer') {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default UserProtectedRoute;