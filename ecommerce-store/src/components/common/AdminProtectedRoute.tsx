import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;