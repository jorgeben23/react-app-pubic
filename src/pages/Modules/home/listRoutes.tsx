import React from "react"
import { Consulta, Matriz, Reportes, Requerimientos, Gestion, Solicitudes } from './../../../pages';


import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import GroupIcon from '@mui/icons-material/Group';

interface listRoutesProps {
    name:string,
    icon?:React.ReactNode,
    path:string,
    show: 0 | 1,
    component:React.ElementType,
    allowedRoles:any[] ,
    children?:listRoutesProps[]
}

export const routesConfig:listRoutesProps[] = [

      {
        name:"Consulta EPP",
        icon:<DescriptionOutlinedIcon/>,
        path: "/consulta",
        show: 0,
        component: Consulta,
        allowedRoles: ['abc'],
      },
      {
        name:"Matriz EPP",
        icon:<EngineeringOutlinedIcon/>,
        path: "/matriz",
        show: 1,
        component: Matriz,
        allowedRoles: ['abc'],
      },
      {
        name:"Reportes",
        icon:<ImportContactsOutlinedIcon/>,
        path: "/reportes",
        show: 0,
        component: Reportes,
        allowedRoles: ['abc', 'def'],
      },
      {
        name:"Requerimientos",
        icon:<LibraryAddIcon/>,
        path: "/requerimientos",
        show: 1,
        component: Requerimientos,
        allowedRoles: ['abc'],
      },
      {
        name:"Solicitudes",
        icon:<GroupIcon/>,
        path: "/solicitudes",
        show: 1,
        component: Solicitudes,
        allowedRoles: ['def'],
      },
      {
        name:"Gestión Base",
        icon:<CardTravelOutlinedIcon/>,
        path: "/configurar",
        show: 0,
        component: Gestion,
        allowedRoles: ['abc', 'def'],
      },
] ;

