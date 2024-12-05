import { Box, IconButton, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import React from 'react';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AccountCircle from '@mui/icons-material/AccountCircle';
import logoEmpresa from './../../assets/icono_empresa.png';
import { themePalette } from '../../config/Theme.config';
import MoreIcon from '@mui/icons-material/MoreVert';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import './../../styles/common/NavBar/index.css'
import { useSelector } from 'react-redux';
import { RootState, store } from '../../redux/store';
import { loginApi } from './../../api/login/login-api';
import { logout } from './../../redux/slices/auth.slice';


interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
    handleDrawerOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
    drawerWidth: number;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
    width: '100%',
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


const Navbar: React.FC<AppBarProps> = ({ open, handleDrawerOpen, drawerWidth }) => {



    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const isAuth = useSelector((state: RootState) => state.authReducer.isAuth);
    const nameusuario = useSelector((state: RootState) => state.authReducer.fullName);
    const namerol = useSelector((state: RootState) => state.authReducer.roleName);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);



    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    // const handleMenuClose = () => {
    //     setAnchorEl(null);
    //     handleMobileMenuClose();
    // };

    const handleCerrarSesion = async () => {
        const state = store.getState();
        const auth = state.authReducer.token;
        if (auth) {
            const apilogout = await loginApi.logout();
            if (apilogout) {
                store.dispatch(logout());
                location.href = '/login'
            }
        }

    }


    const mobileMenuId = 'primary-search-account-menu-mobile';
    const menuId = 'primary-search-account-menu';

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            sx={{ mt: 4 }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <AccountCircle />
                <Box component="span" className='usernameblack' sx={{ pl: 1 }}>
                    Jorge Benites
                </Box>
            </MenuItem>
            <MenuItem onClick={handleCerrarSesion}>
                <PowerSettingsNewIcon sx={{ marginRight: 1 }} />
                <Box component="span" className='usernameblack'>
                    Cerrar Sesión
                </Box>
            </MenuItem>
        </Menu>
    );



    return (
        <>
            <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            mr: 2,
                            display: open ? 'none' : 'block',
                        }}
                    >
                        <MenuOpenIcon />
                    </IconButton>

                    <Box
                        component="img"
                        alt="logo de empresa"
                        src={logoEmpresa}
                        sx={{
                            width: { xs: '145px', sm: '15%', md: '11%', lg: '12%' },
                            height: 'auto',
                            padding: '4px',
                            background: themePalette.BG_COLOR_WHITE,
                            borderRadius: '25px',
                            display: open ? 'none' : 'block'
                        }}
                    />

                    <Box sx={{ flexGrow: 1 }} />
                    <Box onClick={handleProfileMenuOpen}
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            cursor: 'pointer'
                        }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Typography
                            align='center'
                            sx={{ ml: 1, mt: 1.5 }}
                        >
                            <Box component="span" className="nameuser">
                                {isAuth ? nameusuario?.toUpperCase() : 'Usuario'}
                            </Box>
                            {' - '}
                            <Box component="span" className="perfiluser">
                                {isAuth ? namerol?.toUpperCase() : 'GROUP ROL'}
                            </Box>
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </>
    );
}

export default Navbar;