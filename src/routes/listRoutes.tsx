import React from "react"
import { Consulta, Matriz, Reportes, Requerimientos, Home, Gestion, Solicitudes, NuevoRequerimiento, listRequerimiento } from './../pages';



export interface listRoutesProps {
  path: string,
  component: React.ElementType,
  allowedRoles: any[],
  children?: listRoutesProps[]
}

export const routesConfig: listRoutesProps[] = [
  {
    path: "/inicio",
    component: Home,
    allowedRoles: ['abc', 'def'],
  },
  {
    path: "/consulta",
    component: Consulta,
    allowedRoles: ['abc'],
  },
  {
    path: "/matriz",
    component: Matriz,
    allowedRoles: ['abc'],
  },
  {
    path: "/reportes",
    component: Reportes,
    allowedRoles: ['abc', 'def'],
  },
  {
    path: "/requerimientos",
    component: Requerimientos,
    allowedRoles: ['abc'],
    children: [
      {
        path: "listRequerimientos",
        component: listRequerimiento,
        allowedRoles: ['abc'],
      },
      {
        path: "newRequerimiento",
        component: NuevoRequerimiento,
        allowedRoles: ['abc'],
      }
    ]
  },
  {
    path: "/solicitudes",
    component: Solicitudes,
    allowedRoles: ['def'],
  },
  {
    path: "/configurar",
    component: Gestion,
    allowedRoles: ['abc', 'def'],
  },
];

