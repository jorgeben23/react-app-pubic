import { Box, Button, Container, Paper, TextField, Typography, InputAdornment, IconButton } from '@mui/material'
import React, { useState } from 'react'
import Grid from '@mui/material/Grid2';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useNavigate } from 'react-router-dom'
import { CustomSweetAlert, themePalette } from '../../../../config/Theme.config';
import { useFormik } from 'formik';
import { LoginValidate } from '../../../../utils/validateForm';
import { validateFormRecoverPassword } from './../../../../utils/validateFormRecoverPassword'
import { useDispatch } from 'react-redux';
import { login as loginUser } from './../../../../redux/slices/auth.slice'
import ErrorIcon from '@mui/icons-material/Error';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { loginApi } from './../../../../api/login/login-api.ts';

const showAlert = (
  titulo: string,
  mssg: string,
  tipo: "success" | "error" | "warning" | "info"
) => {
  CustomSweetAlert.fire({
    title: titulo,
    html: mssg,
    icon: tipo,
    showConfirmButton: true,
    confirmButtonText: "Entendido",
  });
};

interface dataSingIn {
  idUser: number | null;
  userName: string | null;
  fullName?: string;
  roleId: number | null;
  roleName: string | null;
  token: string | null;
  expirationToken: Date | null;
}

type LoginType = {
  username: string;
  password: string;
};

type RecoverType = {
  userNick: string;
};



const CardFormComponent: React.FC = () => {

  const [typeScreen, setTypeScreen] = useState('login');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [emailToSend, setToEmailToSend] = useState('');
  const [userNameToSend, setUsernameToSend] = useState('');
  const [isButtonSendDisabled, setIsButtonSendDisabled] = useState(false);

  let userData: dataSingIn;

  const formik = useFormik<LoginType>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginValidate,
    onSubmit: async (values: LoginType) => {

      try {

        const data = await loginApi.getSessionByCredentials(values);

        if (data) {
          userData = {
            idUser: data?.idUser,
            userName: data?.userName,
            fullName: data?.fullName,
            roleId: data?.roleId,
            roleName: data?.roleName,
            token: data?.token,
            expirationToken: data?.expirationToken,
          }

          dispatch(loginUser(userData));
          navigate('/');
        }
      } catch (error) {

        const mssg = `${error.details.message}
                        <div style="text-align: center; margin-top:3px !important;">ID : ${error.details.ID}</div>
                      `;
        showAlert("¡Atención!", `<b>${mssg}</b>`, "warning");
      }

    },
  });

  const toRecuperarPassword = () => {
    setTypeScreen('forgot')
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const formkitRecover = useFormik<RecoverType>({
    initialValues: {
      userNick: ''
    },
    validationSchema: validateFormRecoverPassword,
    onSubmit: async (values: RecoverType) => {

      try {
  
          const data = await loginApi.getEmailByUsername(values.userNick);
          setToEmailToSend(data?.data.email);
          setUsernameToSend(values.userNick);
          setTypeScreen("sendRecover");
        // }
        
      } catch (error) {
          setUsernameToSend('');
          const mssg = `${error.response.data.message}
          <div style="text-align: center; margin-top:3px !important;">ID : ${error.response.data.ID}</div>`;
          showAlert("¡Atención!", `<b>${mssg}</b>`, "warning");
      }

    }
  })

  const backToInicio = () => {
    setUsernameToSend('');
    navigate('/inicio');
  }

  const sendEmailToRecover = async () => {

    setIsButtonSendDisabled(true);
    try {
      const data = await loginApi.getSendRecoverEmail(userNameToSend);
      if(data.status == 200) {
        setTypeScreen("messageSendEmail");
      }
    } catch (error) {
          const mssg = `${error.response.data.message}
          <div style="text-align: center; margin-top:3px !important;">ID : ${error.response.data.ID}</div>`;
          showAlert("¡Atención!", `<b>${mssg}</b>`, "warning");
    } finally {
      setIsButtonSendDisabled(false);
    }
  }


  return (
    <>
      <Container >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '100vh' }}
        >

          <Grid sx={(theme) => ({
            display: 'flex',
            justifyContent: 'center',
            [theme.breakpoints.up('xs')]: {
              mt: "-100%"
            },
            [theme.breakpoints.up('xs')]: {
              mt: "-90%"
            },
            [theme.breakpoints.up('md')]: {
              mt: "0"
            }
          })} >

            {typeScreen == 'login' ?

              <Paper sx={{
                padding: '1.2em', borderRadius: '0.5em',
                width: { xs: "100%", md: "85%" }
              }}>

                <Box component="div" sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      mt: 1,
                      mb: 1,
                      fontWeight: "bold",
                      color: themePalette.BG_COLOR_STRONG_ORANGE,
                      fontSize: { xs: "21px", sm: "28px", md: "34px" }
                    }}
                    component="p"
                    variant="h5"
                  >
                    INICIAR SESIÓN
                  </Typography>
                </Box>

                <Box component="form" onSubmit={formik.handleSubmit} >
                  <TextField
                    name="username"
                    margin="normal"
                    type="text"
                    fullWidth
                    label="Usuario"
                    sx={{ mt: 2, mb: 1.5 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <PersonIcon />
                        </InputAdornment>
                      )
                    }}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={formik.touched.username && formik.errors.username}

                  />
                  <TextField
                    name="password"
                    margin="normal"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    label="Contraseña"
                    sx={{ mt: 1.5, mb: 1.5 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <VpnKeyIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <IconButton onClick={handleShowPassword}>
                          {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                        </IconButton>
                      )
                    }}

                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={formik.touched.password && formik.errors.password}
                  />

                  <Box component="div" sx={{ textAlign: "center" }}>
                    <Button

                      type="submit"
                      variant="btnSegundoCustom"
                      sx={{
                        mt: 1.5, mb: 3, textAlign: "center", width: "50%",
                        fontSize: { xs: "16px", sm: "24px", md: "21px" }
                      }}
                    >
                      Ingresar
                    </Button>
                  </Box>

                  <Box
                    component="a"
                    sx={{ textAlign: "center", textDecoration: "underline", fontWeight: "bold", color: themePalette.BG_COLOR_WEAK_ORANGE, cursor: 'pointer' }}
                    onClick={toRecuperarPassword}
                  >
                    <Typography variant='h6' sx={{
                      fontSize: { xs: "16px", sm: "24px", md: "21px" }
                    }}>
                      Recuperar contraseña
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              : typeScreen == 'forgot' ?

                <Paper sx={{
                  padding: '1.2em', borderRadius: '0.5em',
                  width: { xs: "100%", md: "85%" }
                }}>
                  <Box component="div" sx={{ textAlign: "center" }}>
                    <Typography
                      sx={{
                        mt: 1,
                        mb: 1,
                        fontWeight: "bold",
                        color: themePalette.BG_COLOR_STRONG_ORANGE,
                        fontSize: { xs: "21px", sm: "28px", md: "34px" }
                      }}
                      component="p"
                      variant="h5"
                    >
                      RECUPERAR CONTRASEÑA
                    </Typography>
                  </Box>
                  <Box component="form" onSubmit={formkitRecover.handleSubmit}>
                    <TextField
                      name="userNick"
                      margin="normal"
                      type="text"
                      fullWidth
                      label="Usuario"
                      sx={{ mt: 2, mb: 1.5 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <PersonIcon />
                          </InputAdornment>
                        )
                      }}
                      value={formkitRecover.values.userNick}
                      onChange={formkitRecover.handleChange}
                      error={
                        formkitRecover.touched.userNick && Boolean(formkitRecover.errors.userNick)
                      }
                      helperText={formkitRecover.touched.userNick && formkitRecover.errors.userNick}
                    />

                    <Box component="div" sx={{ textAlign: "center" }}>
                      <Button
                        type="submit"
                        variant="btnSegundoCustom"
                        sx={{
                          mt: 1.5, mb: 3, textAlign: "center",
                          fontSize: { xs: "16px", sm: "22px", md: "19px" }
                        }}
                      >
                        Validar
                      </Button>
                    </Box>

                    <Box component="div" sx={{ textAlign: "center" }}>
                      <Button
                        variant="btnTercerCustom"
                        sx={{
                          mt: 1, mb: 3, textAlign: "center",
                          fontSize: { xs: "16px", sm: "22px", md: "19px" }
                        }}
                        onClick={backToInicio}
                      >
                        Regresar
                      </Button>
                    </Box>
                  </Box>
                </Paper>

                : typeScreen == 'sendRecover' ?
                  <Paper sx={{
                    padding: '1.2em', borderRadius: '0.5em',
                    width: { xs: "100%", md: "70%" }
                  }}>
                    <Box component="div" sx={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          mt: 1,
                          mb: 1,
                          fontWeight: "bold",
                          color: themePalette.BG_COLOR_STRONG_ORANGE,
                          fontSize: { xs: "21px", sm: "28px", md: "34px" }
                        }}
                        component="p"
                        variant="h5"
                      >
                        RECUPERAR CONTRASEÑA
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">
                        <Box component="span" sx={{ display: "flex", gap: 2, p: 4 }}>
                          <ErrorIcon sx={{ color: themePalette.BG_COLOR_STRONG_ORANGE }} />
                          Se enviará un correo con el enlace para cambiar tu contraseña a la dirección {emailToSend}. Por favor, haz clic en Enviar correo, luego revisa tu bandeja de entrada y sigue las instrucciones.
                        </Box>
                      </Typography>
                    </Box>

                    <Box component="div" sx={{ textAlign: "center" }}>
                      <Button
                        type="button"
                        variant="btnSegundoCustom"
                        onClick={sendEmailToRecover}
                        disabled={isButtonSendDisabled}
                        sx={{
                          mt: 1.5, mb: 3, textAlign: "center",
                          fontSize: { xs: "16px", sm: "22px", md: "19px" }
                        }}
                      >
                        Enviar correo
                      </Button>
                    </Box>

                    <Box component="div" sx={{ textAlign: "center" }}>
                      <Button
                        variant="btnTercerCustom"
                        sx={{
                          mt: 1.5, mb: 3, textAlign: "center",
                          fontSize: { xs: "16px", sm: "22px", md: "19px" }
                        }}
                        onClick={backToInicio}
                      >
                        Regresar
                      </Button>
                    </Box>
                  </Paper>
                  : typeScreen == 'messageSendEmail' ?
                  <Paper sx={{
                    padding: '1.2em', borderRadius: '0.5em',
                    width: { xs: "100%", md: "70%" }
                  }}>
                    <Box component="div" sx={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          mt: 1,
                          mb: 1,
                          fontWeight: "bold",
                          color: themePalette.BG_COLOR_STRONG_ORANGE,
                          fontSize: { xs: "21px", sm: "28px", md: "34px" }
                        }}
                        component="p"
                        variant="h5"
                      >
                        RECUPERAR CONTRASEÑA
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">
                        <Box component="span" sx={{ display: "flex", gap: 2, p: 4 }}>
                          <ErrorIcon sx={{ color: themePalette.BG_COLOR_STRONG_ORANGE }} />
                          Se envió un correo con el enlace para la recuperación de tu contraseña. Por favor, revisa tu bandeja de entrada
                        </Box>
                      </Typography>
                    </Box>
                    <Box component="div" sx={{ textAlign: "center" }}>
                      <Button
                        variant="btnSegundoCustom"
                        sx={{
                          mt: 1.5, mb: 3, textAlign: "center",
                          fontSize: { xs: "16px", sm: "22px", md: "19px" }
                        }}
                        onClick={backToInicio}
                      >
                        Loguearse
                      </Button>
                    </Box>
                  </Paper>
                  : <></>
            }




          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default CardFormComponent
