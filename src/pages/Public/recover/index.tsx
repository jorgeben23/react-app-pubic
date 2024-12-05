import { Alert, Box, Button, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import iconCompany from './../../../assets/icono_empresa.png';
import { validateFormUpdatePassword } from "../../../utils/validateUpdatePass";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';


import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import { loginApi } from './../../../api/login/login-api';
import { CustomSweetAlert } from "../../../config/Theme.config";


const showAlert = (
    titulo: string,
    mssg: string,
    tipo: "success" | "error" | "warning" | "info"
): Promise<void> => {
    return CustomSweetAlert.fire({
        title: titulo,
        html: mssg,
        icon: tipo,
        showConfirmButton: true,
        confirmButtonText: "Entendido",
    }).then(() => {
        return;
    });
};

interface PasswordRequirement {
    key: string;
    text: string;
    value: string;
}

export const updatePassword: React.FC = () => {

    const [searchParams] = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirement[]>([]);
    const [currentRequirementStatus, setCurrentRequirementStatus] = useState<{ [key: string]: boolean }>({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const isFirstTime = useRef(true);
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleShowConfPassword = () => {
        setShowConfPassword(!showConfPassword);
    }

    useEffect(() => {

        const fetchPasswordRequirements = async () => {

            try {
                const data = await loginApi.getRulesForPassword();
                setPasswordRequirements(data.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPasswordRequirements();

    }, []);

    // Función para validar requisitos en tiempo real
    const validatePasswordRequirements = (password: string) => {
        const status = passwordRequirements.reduce((acc, req) => {
            switch (req.key) {
                case "MINIMUN_PASSWORD_LENGTH":
                    acc[req.key] = password.length >= parseInt(req.value);
                    break;
                case "MAXIMUM_PASSWORD_LENGTH":
                    acc[req.key] = password.length <= parseInt(req.value) && password.length >= 1;
                    break;
                case "REQUIRE_LOWER_LETTERS":
                    acc[req.key] = /[a-z]/.test(password);
                    break;
                case "REQUIRE_CAPITAL_LETTERS":
                    acc[req.key] = /[A-Z]/.test(password);
                    break;
                case "REQUIRE_NUMBER":
                    acc[req.key] = /\d/.test(password);
                    break;
                case "REQUIRE_CARACTER_ESPECIAL":
                    acc[req.key] = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
                    break;
                default:
                    acc[req.key] = false;
            }
            return acc;
        }, {} as { [key: string]: boolean });

        setCurrentRequirementStatus(status);
    };

    useEffect(() => {

        if (isFirstTime.current) {
            isFirstTime.current = false;
        } else {

            if (Object.values(currentRequirementStatus).length > 0) {
                const allReqTrue = Object.values(currentRequirementStatus).every(value => value === true);
                if (allReqTrue) {
                    setIsButtonDisabled(false);
                } else {
                    setIsButtonDisabled(true);
                }
            }
        }

    }, [currentRequirementStatus]);

    const redirectLogin = () => {
        navigate('/');
    }


    const formik = useFormik({
        initialValues: {
            password: '',
            confpassword: '',
        },
        validationSchema: validateFormUpdatePassword,
        onSubmit: async (values) => {
            try {
                const responseUpdate = await loginApi.postUpdatePassword(values.password, values.confpassword, token);
                await showAlert("¡Atención!", `<b>${responseUpdate.data.message}</b>`, "warning").then(() => {
                    redirectLogin();
                });
               
            } catch (error) {
                const mssg = `${error.response.data.message}
                <div style="text-align: center; margin-top:3px !important;">ID : ${error.response.data.ID}</div>
              `;
                showAlert("¡Atención!", `<b>${mssg}</b>`, "warning");
            }

        }
    });


    return (
        <>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                    height: "100vh",
                    padding: "20px",
                    backgroundColor: "rgba(74, 118, 40, 0.9)",
                }}
            >
                <Grid
                    item
                    sx={{
                        width: { xs: "100%", sm: "100%", md: "50%" },
                        maxWidth: "400px",
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                >

                    <Grid item sx={{ marginBottom: 2, textAlign: "center" }}>
                        <Box
                            component="img"
                            height="100px"
                            src={iconCompany}
                            alt="Ejemplo de imagen"
                            sx={{
                                objectFit: "contain",
                                maxWidth: "100%",
                            }}
                        />
                    </Grid>


                    <Grid item sx={{ marginBottom: 2 }}>
                        <Typography variant="h5" align="center">
                            Crear una nueva contraseña
                        </Typography>
                    </Grid>

                    <Grid item sx={{ marginBottom: 2, textAlign: "center" }}>
                        Al finalizar este paso, serás dirigido automáticamente a la página de inicio de sesión.
                    </Grid>

                    <Grid item sx={{ marginBottom: 2 }}>
                        <Alert  severity="warning">
                           Caracteres especiales validos son <b>., !, @, #, $, %, +, *, _, -</b>
                        </Alert>
                    </Grid>

                    <Box component="form" onSubmit={formik.handleSubmit}>

                        <Grid item sx={{ marginBottom: 2 }}>
                            <TextField
                                name="password"
                                id="password"
                                label="Contraseña"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={handleShowPassword}>
                                            {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                                        </IconButton>
                                    )
                                }}
                                onChange={(e) => {
                                    validatePasswordRequirements(e.target.value);
                                    formik.handleChange(e);
                                }}
                                value={formik.values.password}
                                error={
                                    formik.touched.password && Boolean(formik.errors.password)
                                }
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </Grid>

                        <Grid item sx={{ marginBottom: 2 }}>
                            <TextField
                                name="confpassword"
                                id="confirm-password"
                                label="Confirmar contraseña"
                                type={showConfPassword ? 'text' : 'password'}
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={handleShowConfPassword}>
                                            {showConfPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                                        </IconButton>
                                    )
                                }}

                                value={formik.values.confpassword}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.confpassword && Boolean(formik.errors.confpassword)
                                }
                                helperText={formik.touched.confpassword && formik.errors.confpassword}
                            />
                        </Grid>

                        <Grid item sx={{ marginBottom: 2 }}>
                            <List dense>
                                {passwordRequirements.map((req) => (
                                    <ListItem key={req.key}>
                                        <ListItemIcon>
                                            {currentRequirementStatus[req.key] ? (
                                                <CheckCircleOutlineIcon color="success" />
                                            ) : (
                                                <RadioButtonUncheckedIcon color="disabled" />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText primary={req.text} />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>

                        <Grid item sx={{ marginBottom: 2, textAlign: "center" }}>
                            <Button
                                variant="btnPrimeroCustomNormal"
                                color="primary"
                                type="submit"
                                fullWidth
                                disabled={isButtonDisabled}
                                sx={{
                                    width: "200px !important",
                                    height: "50px !important",
                                    fontSize: "16px",
                                }}
                            >
                                Actualizar contraseña
                            </Button>
                        </Grid>

                    </Box>



                </Grid>
            </Grid>
        </>
    );
}