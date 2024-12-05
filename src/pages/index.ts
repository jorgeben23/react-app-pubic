import { lazy } from 'react'


// -- Publicas

export const Login =  lazy(() => import('./Public/login').then(module => ({ default: module.Login})));
export const Recover = lazy(() =>  import('./Public/recover').then(module => ({ default: module.updatePassword })));


// -- Modulos

export const Consulta = lazy(() => import('./Modules/Epps/Consulta').then(module => ({ default: module.Consulta })));
export const Matriz = lazy(() => import('./Modules/Epps/Matriz').then(module => ({ default: module.Matriz })));
export const Reportes = lazy(() => import('./Modules/Epps/Reportes').then(module => ({ default: module.Reportes })));

export const Requerimientos = lazy(() => import('./Modules/Epps/Requerimientos').then(module => ({ default: module.Requerimientos })));
export const NuevoRequerimiento = lazy(() => import('./Modules/Epps/Requerimientos/NewRequerimiento.tsx').then(module => ({ default: module.NewRequerimiento })));
export const listRequerimiento = lazy(() => import('./Modules/Epps/Requerimientos/RequerimientoMain.tsx').then(module => ({ default: module.RequerimientoMain })));

export const Home = lazy(() => import('./Modules/home').then(module => ({ default: module.Home })));
export const Gestion = lazy(() => import('./Modules/Base/Gestion').then(module => ({ default: module.Gestion })))

export const Solicitudes = lazy(() => import('./Modules/Epps/Solicitudes').then(module => ({ default: module.Solicitudes })));



export const Unauthorized = lazy(() => import('./httpStatusCodes/Unauthorized').then(module => ({ default: module.Unauthorized })))
export const NotFound = lazy(() => import('./httpStatusCodes/NotFound').then(module => ({ default: module.NotFound })))
