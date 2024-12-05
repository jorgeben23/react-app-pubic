import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { styled, SxProps, Theme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { listData } from './../Sidebar/MenuItems';
import { ListItemData } from './IListData';
import { themePalette } from '../../config/Theme.config';
import { Box, Divider, IconButton } from '@mui/material';
import logoEmpresa from './../../assets/icono_empresa.png';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';



interface SidebarProps {
  theme: Theme;
  open: boolean;
  handleDrawerClose: React.Dispatch<React.MouseEvent<HTMLButtonElement>>;
  drawerWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({ theme, open, handleDrawerClose, drawerWidth }) => {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
  const location = useLocation();
  const navigate = useNavigate(); 

  const idRole = useSelector((state: RootState) => state.authReducer.roleId);

  const handleClick = (id: number) => {
    setOpenItems((prevOpen) => ({ ...prevOpen, [id]: !prevOpen[id] }));
  };

  const handleItemClick = (item: ListItemData) => {
    if (item.routePath) {
      navigate(item.routePath);
    } else if (item.action) {
      item.action();
    } else if (item.children) {
      handleClick(item.id);
    }
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const setInitialOpenItems = () => {
    const currentPathParts = location.pathname.split('/');
    const basePath = `/${currentPathParts[1]}`; 
    listData.forEach(item => {

      if (item.routePath === basePath) {
        setOpenItems(prev => ({ ...prev, [item.id]: true })); 
      }
      if (item.children) {
        item.children.forEach(child => {
          if (child.routePath === basePath) {
            setOpenItems(prev => ({ ...prev, [item.id]: true })); 
          }
        });
      }
    });
  };

  useEffect(() => {
    setInitialOpenItems();
  }, []);

  useEffect(() => {
    setInitialOpenItems();
  }, [location.pathname]);

  const renderListItems = (items: ListItemData[], ident: number = 0, idRole:string) => {
    return items.filter((item) => {
      if (!item.allowedRoles || item.allowedRoles.includes(idRole)) {
        return true;
      }
      return false;
    })
    .map((item) => {

      const isActive = location.pathname.startsWith(item.routePath);
      return (
        <React.Fragment key={item.id}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleItemClick(item)}
              sx={{
                pl: 3 * ident,
                color: isActive ? themePalette.BG_COLOR_GREEN : 'inherit',
                backgroundColor: isActive ? themePalette.BG_COLOR_WEAK_PURPLE : 'transparent',
                borderRight: isActive ? `4px solid ${themePalette.BG_COLOR_GREEN}` : 'none', 
                fontWeight: "bolder",
              }}
            >
              {item.isParent === 1 && item.icon && <ListItemIcon sx={{ color: isActive ? themePalette.BG_COLOR_GREEN : 'inherit' }}>{item.icon}</ListItemIcon>}
              <ListItemText primary={item.text} />
              {item.children && (openItems[item.id] ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>
          {item.children && (
            <Collapse in={openItems[item.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderListItems(item.children, ident + 1,idRole)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader
        sx={{
          background: themePalette.BG_COLOR_GREEN,
          color: themePalette.BG_COLOR_WHITE,
        } as SxProps<Theme>}
      >
        <Box
          component="img"
          alt="logo de empresa"
          src={logoEmpresa}
          sx={{
            width: {xs:'60%',sm:'50%', md:'80%'},
            height: 'auto',
            padding: '4px',
            background: themePalette.BG_COLOR_WHITE,
            borderRadius: '50px',
            textAlign: 'center'
          }}
        />
        <IconButton onClick={handleDrawerClose} sx={{ color: themePalette.BG_COLOR_WHITE }}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List sx={{ pl: 1 }}>{renderListItems(listData,0,idRole)}</List>
    </Drawer>
  );
};

export default Sidebar;