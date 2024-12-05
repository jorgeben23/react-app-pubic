import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import UnauthorizedImage from './../../../assets/403.png'; // Cambia la ruta a tu archivo 404.png
import { themePalette } from '../../../config/Theme.config';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import React from 'react';

export const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.authReducer.isAuth)

  const handleRedirect = (isAuth: boolean) => {
    if (isAuth) {
      navigate('/inicio');
    } else {
      navigate('/login');
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Box
        component="img"
        src={UnauthorizedImage}
        alt="403 Forbidden"
        sx={{ width: '25%', maxWidth: 400 }}
      />
      <Typography variant="h4" gutterBottom sx={{ mt: 4, color: themePalette.BG_COLOR_GREEN, fontWeight: 'bold' }}>
        Acceso denegado
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="btnTercerCustom"
          color="primary"
          onClick={() => handleRedirect(isAuth)}
          sx={{ marginRight: 0, width: '150%', height: '40px', fontSize: '20px' }}
        >
          Regresar
        </Button>

      </Box>
    </Container>
  );
};

