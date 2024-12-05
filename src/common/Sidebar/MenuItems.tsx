import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import StorageIcon from '@mui/icons-material/Storage';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import { ListItemData } from './IListData'
import { store } from './../../redux/store';
import { logout } from '../../redux/slices/auth.slice';
import { loginApi } from './../../api/login/login-api.ts';

const handleLogout = async () => {

  const state = store.getState();
  const auth = state.authReducer.isAuth;

  if (auth) {

    const apilogout = await loginApi.logout();
    if (apilogout) {
      store.dispatch(logout());
      window.location.href = '/login';
    }

  }
}

export const listData: ListItemData[] = [
  {
    id: 1,
    isParent: 1,
    text: 'Bienvenido',
    routePath: '/inicio',
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    isParent: 1,
    text: 'EPP',
    icon: <InventoryIcon />,
    children: [
      { id: 21, isParent: 0, text: 'Consulta EPP', routePath: '/consulta', allowedRoles: ['abc'] },
      { id: 22, isParent: 0, text: 'Matriz EPP', routePath: '/matriz', allowedRoles: ['abc'] },
      { id: 23, isParent: 0, text: 'Requerimientos', routePath: '/requerimientos', allowedRoles: ['abc'] },
      { id: 24, isParent: 0, text: 'Solicitudes', routePath: '/solicitudes', allowedRoles: ['def'] },
      { id: 25, isParent: 0, text: 'Reportes', routePath: '/reportes', allowedRoles: ['abc', 'def'] },
    ],
  },
  {
    id: 3,
    isParent: 1,
    text: 'Gestión Base',
    icon: <StorageIcon />,
    children: [
      { id: 21, isParent: 0, text: 'Configura tu empresa', routePath: '/configurar' },
    ],
  },
  {
    id: 4,
    isParent: 1,
    text: 'Salir',
    icon: <PowerSettingsNewIcon />,
    action: () => handleLogout(),
  },
];
