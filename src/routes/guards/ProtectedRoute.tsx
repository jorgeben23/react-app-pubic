import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './../../redux/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: any[]; // Array de roles permitidos para acceder a la ruta
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const isAuth = useSelector((state: RootState) => state.authReducer.isAuth);
  const idRole = useSelector((state: RootState) => state.authReducer.roleId);

  // Redirigir al login si no está autenticado
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // Redirigir si el rol del usuario no está permitido
  if (allowedRoles.length > 0 && !allowedRoles.includes(idRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;