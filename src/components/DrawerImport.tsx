import { Box, Button, ButtonProps, Drawer, Typography } from "@mui/material";
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import React, { ChangeEvent, useState } from "react";
import ErrorIcon from '@mui/icons-material/Error';
import { themePalette } from "../config/Theme.config";

interface DrawerImportProps {
    isOpen: boolean;
    onClose: () => void;
}

const Input = styled('input')({
    display: 'none',
});

const FileUploadButton = styled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: themePalette.BG_COLOR_WHITE,
    textTransform: 'none',
    color: themePalette.BG_COLOR_GRAY,
    border: `1px solid ${themePalette.BG_COLOR_GRAY}`,
    '&:hover': {
        backgroundColor: themePalette.BG_COLOR_WEAK_GRAY,
    },
}));


const DrawerImport: React.FC<DrawerImportProps> = ({ isOpen, onClose }) => {

    const [fileName, setFileName] = useState('');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFileName(files[0].name);
        } else {
            setFileName('');
        }
    };

    return (
        <>
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={onClose}
                disableEscapeKeyDown
                ModalProps={{
                    keepMounted: true,
                }}
                BackdropProps={{
                    onClick: (e) => e.stopPropagation(),
                }}
            >
                <Box
                    sx={{ width: { xs: 350, md: 425 }, p: 3 }}
                    role="presentation"
                >
                    <Grid container sx={{ mt: 2, justifyContent: 'center', textAlign: 'start' }}>
                        <Grid item xs={12} sx={{ mb: 4 }}>
                            <Typography variant="h5" component="h2">
                                Registro de entrega de EPP
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mb: 4 }}>
                            <Box
                                component="div"
                                sx={{
                                    border: `2px solid ${themePalette.BG_COLOR_GRAY}`,
                                    borderRadius: '10px',
                                    padding: 2
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{ display: "flex", gap: 2 }}
                                >
                                    <ErrorIcon />
                                    <span>
                                        Para poder importar EPPs necesitas usar una plantilla excel, puedes descargar la plantilla desde
                                        <Box
                                            component="a"
                                            href="#"
                                            sx={{ color: themePalette.BG_COLOR_WEAK_ORANGE, textDecoration: "underline", ml: 1 }}
                                        >
                                            aquí.
                                        </Box>
                                    </span>

                                </Box>

                            </Box>
                        </Grid>

                    </Grid>

                    <Grid container>
                        <Grid item xs={12}>
                            <Box component="span" sx={{ color: themePalette.BG_COLOR_GREEN, fontWeight: 'bold', fontSize: '17px' }}>
                                Archivo Excel:
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container gap={1} direction="row" wrap="nowrap"
                        sx={{
                            mt: 2,
                            justifyContent: "center",
                            border: `2px solid ${themePalette.BG_COLOR_WEAK_GRAY}`,
                            borderRadius: '12px',
                            paddingLeft: 0,
                            paddingRight: 0,
                            paddingTop: 3,
                            paddingBottom: 3,
                            background: themePalette.BG_COLOR_WEAK_GRAY
                        }}>
                        <Grid item sx={{ width: '250px !important' }} >
                            <Box flexGrow={1}>
                                <Input
                                    accept=".xlsx,.xls,.csv"
                                    id="contenedor-file"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="contenedor-file">
                                    <FileUploadButton
                                        variant="contained"
                                        component="span"
                                        fullWidth
                                    >
                                        {fileName || 'Seleccionar Archivo'}
                                    </FileUploadButton>
                                </label>
                            </Box>
                        </Grid>
                        <Grid item >
                            <Button variant="btnPrimeroCustomNormal" sx={{ width: '50px !important' }}>
                                Subir
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container sx={{ mt: 2 }}>
                        <Grid item xs={12} >
                            <Box display="flex"
                                justifyContent="center"
                                alignItems="center"
                                gap={1}
                                sx={{
                                    padding: { xs: 2, md: 3 },
                                    overflowX: { xs: 'auto', md: 'unset' },
                                    whiteSpace: 'nowrap',
                                    maxWidth: { xs: '100vw', md: 'none' }
                                }}>

                                <Button
                                    variant="btnPrimeroCustomInvertNormal"
                                    color="primary"
                                    onClick={onClose}
                                >
                                    Cerrar
                                </Button>

                                <Button
                                    variant="btnPrimeroCustomNormal"
                                    color="primary"
                                >
                                    Registrar
                                </Button>
                            </Box>
                        </Grid>

                    </Grid>

                </Box>


            </Drawer>
        </>
    );
}

export default DrawerImport;