import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './../../redux/store';

interface LoginRouteProps {
    children: React.ReactNode;
  }

  const LoginGuards: React.FC<LoginRouteProps> = ({ children }) => {
    const isAuth = useSelector((state: RootState) => state.authReducer.isAuth);
    const location = useLocation();

    if (isAuth && (location.pathname === '/login' )) {
      return <Navigate to="/inicio" replace />;
    }

    return <>{children}</>;
  };
  
  export default LoginGuards;