import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';
import Main from './Main/Main';
import { Navigate, Outlet } from 'react-router';
import environment from './../environment/environment'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useMediaQuery } from '@mui/material';


const drawerWidth = environment.WIDTH_SIDEBAR;

export const RouterLayout: React.FC = () => {
  const isAuth = useSelector((state: RootState) => state.authReducer.isAuth)
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width: 600px)');


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {

    if (isSmallScreen) {
      setOpen(false)
    }

  }, [isSmallScreen])


  return isAuth ? (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar open={open} handleDrawerOpen={handleDrawerOpen} drawerWidth={drawerWidth} />
        <Sidebar theme={theme} open={open} handleDrawerClose={handleDrawerClose} drawerWidth={drawerWidth} />
        <Main open={open} drawerWidth={drawerWidth} sx={{ p: 0 }}>
          <Toolbar />
          <Outlet />
        </Main>
      </Box>
    </>
  ) : (
    <Navigate to="/login" />
  )
}
