import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RouterLayout } from "../common/RouterLayout";
import { Login, Unauthorized, NotFound, Recover } from './../pages';
import ProtectedRoute from "./guards/ProtectedRoute";
import LoginGuard from "./guards/LoginGuards";
import { routesConfig } from './listRoutes';
import { listRoutesProps } from './listRoutes';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TokenExpirationHandler from "../pages/Modules/ExpirationToken/TokenExpirationHandler";


const renderRoutes = (routes: listRoutesProps[]) => {
  return routes.map(({ path, component: Component, allowedRoles, children }) => (
    <Route
      key={path}
      path={path}
      element={
        <ProtectedRoute allowedRoles={allowedRoles}>
          <TokenExpirationHandler />
          <Component />
        </ProtectedRoute>
      }
    >
      {children && renderRoutes(children)} {/* Renderiza rutas hijas */}
    </Route>
  ));
};


export const AppRouter: React.FC = () => {

  const isAuth = useSelector((state: RootState) => state.authReducer.isAuth);

  return (
    <Routes>
      <Route element={<RouterLayout />}>
        <Route path="/" element={isAuth ? <Navigate to="/inicio" /> : <Navigate to="login" />} />
        <Route path="/requerimientos" element={<Navigate to="/requerimientos/listRequerimientos" />} />
        {renderRoutes(routesConfig)}
      </Route>

      <Route path="/login" element={
        <LoginGuard>
          <Login />
        </LoginGuard>
      } />

      <Route path="/recover-password" element={
        <LoginGuard>
          <Recover />
        </LoginGuard>
      }
      />

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
