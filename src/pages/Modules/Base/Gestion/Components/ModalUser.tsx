import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Radio, RadioGroup, FormControlLabel, Typography, Grid, Box, IconButton } from '@mui/material';
import { CustomSweetAlert, themePalette } from '../../../../../config/Theme.config';
import { baseData } from '../../../../../api/base/baseData';
import { reactSelectStyles } from '../../../../../styles/Fields/reactSelectStyles';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface SettingModalUserProps {
    openModal: boolean;
    IDuser: string;
    document: string;
    refreshTableData: () => void;
    onClose: () => void;
}

interface PerfilOption {
    value: string;
    label: string;
}

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

const SettingModalUser: React.FC<SettingModalUserProps> = ({ openModal, IDuser, document, refreshTableData, onClose }) => {
    const [perfiles, setPerfiles] = useState<PerfilOption[]>([]);
    const [selectedPerfil, setSelectedPerfil] = useState<PerfilOption | null>(null);
    const [formValues, setFormValues] = useState({
        option: 1,
        password: '',
        confirmPassword: '',
        idUsuario: IDuser,
        idRole: null
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, option: event.target.value === 'cambiar' ? 1 : 0 });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async () => {

        CustomSweetAlert.fire({
            title: '¡Atención!',
            html: `<b>¿Esta seguro que desea guardar los cambios?</b>`,
            icon: "warning",
            showConfirmButton: true,
            confirmButtonText: "Sí,sí deseo.",
            showCancelButton: true,
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (formValues.option === 1 && (!formValues.password || !formValues.confirmPassword)) {
                    showAlert("¡Atención!", `<b>Faltan los campos de contraseña.</b>`, "warning");
                    return;
                }

                if (formValues.password && formValues.confirmPassword && (formValues.password !== formValues.confirmPassword)) {
                    showAlert("¡Atención!", `<b>Contraseña y la confirmación de contraseña no coinciden.</b>`, "warning");
                    return;
                }

                if (!formValues.idRole) {
                    showAlert("¡Atención!", `<b>Falta seleccionar el perfil.</b>`, "warning");
                    return;
                }

                try {
                    let idUsuario = formValues.idUsuario;
                    const dataSend = formValues.option === 1
                        ? {
                            idRole: formValues.idRole,
                            mode: `${formValues.option}`,
                            password: formValues.password,
                            confirmPassword: formValues.confirmPassword,
                        }
                        : {
                            idRole: formValues.idRole,
                            mode: `${formValues.option}`,
                        };

                    const data = await baseData.putDataUsuario(dataSend, idUsuario);
                    if (data?.status == 200) {
                        await showAlert("¡Éxito!", `<b>${data.data.message}</b>`, "success");
                        await refreshTableData();
                        await onClose();
                    }
                } catch (error) {
                    console.log(error);
                }

            }
        });
    };


    const obtenerPerfiles = async () => {
        try {
            const response = await baseData.getRolesAll();
            const perfilesFormateados = response?.data.data.map((perfil: any) => ({
                value: perfil.idRole,
                label: perfil.name
            }));
            setPerfiles(perfilesFormateados);
        } catch (error) {
            console.error('Error al obtener perfiles:', error);
        }
    };

    useEffect(() => {
        if (openModal) {
            setFormValues({
                option: 1,
                password: '',
                confirmPassword: '',
                idUsuario: IDuser,
                idRole: null
            });
            setSelectedPerfil(null);
            obtenerPerfiles();
        }
    }, [openModal, IDuser]);

    const handleProfileSelect = (option: PerfilOption | null) => {
        setSelectedPerfil(option);
        setFormValues({ ...formValues, idRole: option?.value || '' });
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div>
            <Dialog open={openModal} >
                <DialogTitle>Usuario</DialogTitle>
                <DialogContent>
                    <TextField
                        size="small"
                        variant="outlined"
                        placeholder="idUsuario"
                        type="text"
                        InputLabelProps={{
                            shrink: false,
                        }}
                        fullWidth
                        value={formValues.idUsuario || ''}
                        readOnly
                    />

                    <label>Perfil</label>
                    <Select
                        value={selectedPerfil}
                        onChange={handleProfileSelect}
                        options={perfiles}
                        isSearchable
                        placeholder="Selecciona un perfil"
                        styles={reactSelectStyles}
                        isClearable={true}
                        noOptionsMessage={() => "No hay perfiles disponibles"}
                    />
                    <RadioGroup
                        row
                        value={formValues.option === 1 ? 'cambiar' : 'resetear'}
                        onChange={handleOptionChange}
                        sx={{ mt: 3 }}
                    >
                        <FormControlLabel
                            value="cambiar"
                            control={<Radio />}
                            label="Cambiar Contraseña"
                        />
                        <FormControlLabel
                            value="resetear"
                            control={<Radio />}
                            label="Resetear Contraseña"
                        />
                    </RadioGroup>
                    {formValues.option === 1 ? (
                        <>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Box>
                                        <label htmlFor="pass">Contraseña</label>
                                        <TextField
                                            id="pass"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formValues.password}
                                            onChange={handleInputChange}
                                            margin="normal"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton onClick={handleTogglePassword}>
                                                        {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                                                    </IconButton>
                                                )
                                            }}
                                        />
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box>
                                        <label htmlFor="repass">Verificar Contraseña</label>
                                        <TextField
                                            id="repass"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            value={formValues.confirmPassword}
                                            onChange={handleInputChange}
                                            margin="normal"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton onClick={handleToggleConfirmPassword}>
                                                        {showConfirmPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                                                    </IconButton>
                                                )
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs={12}>
                                    <Box sx={{ border: `2px solid ${themePalette.BG_COLOR_WEAK_ORANGE}`, mt: 2, borderRadius: '5px !important' }}>
                                        <Typography variant="caption" color="textSecondary" sx={{ p: 1, fontSize: '16px', textAlign: 'center', justifyContent: 'center', display: 'flex' }}>
                                            Esta contraseña es temporal, al usuario se le pedirá actualizar su contraseña al iniciar sesión.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </>
                    ) : (
                        <Grid container>
                            <Grid item xs={12}>
                                <Box sx={{ border: `2px solid ${themePalette.BG_COLOR_WEAK_ORANGE}`, mt: 2, borderRadius: '5px !important' }}>
                                    <Typography variant="caption" color="textSecondary" sx={{ p: 2, fontSize: '16px', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                                        Tu contraseña por defecto será el DNI : {document}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button variant="btnPrimeroCustomInvertNormal" onClick={onClose} sx={{ mb: 3 }}>
                        Cancelar
                    </Button>
                    <Button variant="btnPrimeroCustomNormal" onClick={handleSubmit} sx={{ mb: 3 }}>
                        Actualizar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SettingModalUser;
