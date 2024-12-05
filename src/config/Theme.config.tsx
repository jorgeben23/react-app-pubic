import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react'
import '@fontsource/roboto';
import Swal from 'sweetalert2';

type ThemeProp = {
    children: JSX.Element;
};

export enum themePalette {
    BG_COLOR_STRONG_ORANGE = "#E75300",
    BG_COLOR_WEAK_ORANGE = "#FF8744",
    BG_COLOR_GRAY = "#485973",
    BG_COLOR_GREEN = "#4A7628",
    BG_COLOR_WHITE = "#FFFFFF",
    BG_COLOR_RED = "#AF0000",
    BG_COLOR_WEAK_PURPLE = "#5974E221",
    BG_COLOR_WEAK_LIGTHBLUE = "#F6F6FE",
    BG_COLOR_WEAK_GRAY = "#E5E5E5",
    FONT_GLOBAL = "Roboto, Arial, sans-serif"
}

// Declaración para extender las variantes de Button
declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        btnPrimeroCustom: true;
        btnPrimerCustomInvert: true;
        btnSegundoCustom: true;
        btnTercerCustom: true;
        btnPrimeroCustomNormal: true;
        btnPrimeroCustomInvertNormal: true;
    }
}

const theme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: themePalette.BG_COLOR_WHITE,
            paper: themePalette.BG_COLOR_WHITE
        },
        primary: {
            main: themePalette.BG_COLOR_GREEN,
        },
        secondary: {
            main: themePalette.BG_COLOR_WEAK_ORANGE,
        },
    },
    typography: {
        fontFamily: themePalette.FONT_GLOBAL
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'btnPrimeroCustom' },
                    style: {
                        textTransform: "none",
                        boxShadow: "none",
                        borderRadius: "0.3em",
                        background: themePalette.BG_COLOR_WEAK_ORANGE,
                        fontWeight: "bolder",
                        color: themePalette.BG_COLOR_WHITE,
                        padding: "10px 20px",
                        '&:hover': {
                            background: themePalette.BG_COLOR_STRONG_ORANGE,
                        },
                    },
                },
                {
                    props: { variant: 'btnPrimerCustomInvert' },
                    style: {
                        width: "30%",
                        textTransform: "none",
                        boxShadow: "none",
                        borderRadius: "0.3em",
                        border: `2px solid ${themePalette.BG_COLOR_WEAK_ORANGE}`,
                        background: 'transparent',
                        fontWeight: "bold",
                        color: themePalette.BG_COLOR_WEAK_ORANGE,
                        '&:hover': {
                            background: themePalette.BG_COLOR_WEAK_ORANGE,
                            color: themePalette.BG_COLOR_WHITE,
                        },
                    },
                },
                {
                    props: { variant: 'btnSegundoCustom' },
                    style: {
                        width: "50%",
                        textTransform: "none",
                        boxShadow: "none",
                        borderRadius: "1.5em",
                        border: `2px solid ${themePalette.BG_COLOR_WEAK_ORANGE}`,
                        background: themePalette.BG_COLOR_WEAK_ORANGE,
                        fontWeight: "bold",
                        color: themePalette.BG_COLOR_WHITE,
                        padding: "3px",
                        '&:hover': {
                            background: themePalette.BG_COLOR_WEAK_ORANGE,
                            color: themePalette.BG_COLOR_WHITE,
                        },
                    },
                },
                {
                    props: { variant: 'btnTercerCustom' },
                    style: {
                        width: "50%",
                        textTransform: "none",
                        boxShadow: "none",
                        borderRadius: "1.5em",
                        border: `2px solid ${themePalette.BG_COLOR_WEAK_ORANGE}`,
                        background: 'transparent',
                        fontWeight: "bold",
                        color: themePalette.BG_COLOR_WEAK_ORANGE,
                        padding: "3px",
                        '&:hover': {
                            background: themePalette.BG_COLOR_WEAK_ORANGE,
                            color: themePalette.BG_COLOR_WHITE,
                        },
                    },
                },
                {
                    props: { variant: 'btnPrimeroCustomNormal' },
                    style: ({ theme }) => ({
                        textTransform: "none",
                        boxShadow: "none",
                        borderRadius: "0.3em",
                        background: themePalette.BG_COLOR_WEAK_ORANGE,
                        fontWeight: "bolder",
                        color: themePalette.BG_COLOR_WHITE,
                        width: "140px",
                        height: "40px",
                        [theme.breakpoints.up('md')]: {
                            width: "150px",
                        },
                        padding: "10px 20px",
                        '&:hover': {
                            background: themePalette.BG_COLOR_STRONG_ORANGE,
                        },
                    }),
                },
                {
                    props: { variant: 'btnPrimeroCustomInvertNormal' },
                    style: ({ theme }) => ({
                        textTransform: "none",
                        boxShadow: "none",
                        borderRadius: "0.3em",
                        border: `2px solid ${themePalette.BG_COLOR_WEAK_ORANGE}`,
                        background: 'transparent',
                        fontWeight: "bold",
                        color: themePalette.BG_COLOR_WEAK_ORANGE,
                        width: "140px",
                        height: "40px",
                        [theme.breakpoints.up('md')]: {
                            width: "150px",
                        },
                        padding: "10px 20px",
                        '&:hover': {
                            background: themePalette.BG_COLOR_WEAK_ORANGE,
                            color: themePalette.BG_COLOR_WHITE,
                        },
                    }),
                },
            ]
        }
    }
})

// Configuración mejorada de SweetAlert2
export const CustomSweetAlert = Swal.mixin({
    customClass: {
        confirmButton: 'MuiButton-root MuiButton-btnPrimeroCustom',
        cancelButton: 'MuiButton-root MuiButton-btnPrimeroCustomInvert',
        title: 'custom-swal-title',
        popup: 'custom-swal-popup',
        container: 'custom-swal-container'
    },
    buttonsStyling: false,
    background: themePalette.BG_COLOR_WHITE,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    iconColor: themePalette.BG_COLOR_WEAK_ORANGE,
});

export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
    React.useEffect(() => {
        const styles = `
            /* Estilos globales para el contenedor de SweetAlert */
            .custom-swal-container.swal2-container {
                z-index: 9999 !important;
                position: fixed !important;
            }

            /* Estilos para el overlay/backdrop */
            .swal2-backdrop-show {
                z-index: 9998 !important;
            }

            /* Estilos principales del popup */
            .custom-swal-popup {
                font-family: ${themePalette.FONT_GLOBAL};
                border-radius: 0.3em;
                position: relative;
                z-index: 10000 !important;
            }

            /* Asegura que el popup esté por encima del overlay */
            .swal2-popup {
                position: relative;
                z-index: 10000 !important;
            }

            /* Estilos del título */
            .custom-swal-title {
                color: ${themePalette.BG_COLOR_STRONG_ORANGE};
                position: relative;
                z-index: 10000 !important;
            }

            /* Contenedor del mensaje */
            .swal2-html-container {
                color: ${themePalette.BG_COLOR_GRAY};
                position: relative;
                z-index: 10000 !important;
            }

            /* Estilos del botón principal */
            .MuiButton-btnPrimeroCustom {
                background: ${themePalette.BG_COLOR_STRONG_ORANGE}; 
                color: ${themePalette.BG_COLOR_WHITE};             
                border-radius: 5px;        
                padding: 10px 20px;
                font-size: 15px;
                font-weight: bolder;
                cursor: pointer;        
                border: none;
                margin-right: 5px;
                position: relative;
                z-index: 10000 !important;             
            }

            /* Estilos del botón invertido */
            .MuiButton-btnPrimeroCustomInvert {
                background: ${themePalette.BG_COLOR_WHITE}; 
                color: ${themePalette.BG_COLOR_STRONG_ORANGE};             
                border-radius: 5px;        
                padding: 10px 20px;
                font-size: 15px;
                font-weight: bolder;
                cursor: pointer;        
                border: 2px solid ${themePalette.BG_COLOR_STRONG_ORANGE};
                position: relative;
                z-index: 10000 !important;
            }

            .MuiButton-btnPrimeroCustomInvert:hover {
                background: ${themePalette.BG_COLOR_STRONG_ORANGE};
                color: ${themePalette.BG_COLOR_WHITE};
            }

            /* Asegura que los modales de Material-UI tengan un z-index menor */
            .MuiModal-root {
                z-index: 1300 !important;
            }

            /* Estilos del scrollbar */
            :root {
                --bg-color-strong-orange : ${themePalette.BG_COLOR_STRONG_ORANGE};
                --bg-color-weak-orange : ${themePalette.BG_COLOR_WEAK_ORANGE};
                --bg-color-gray : ${themePalette.BG_COLOR_GRAY};
                --bg-color-green : ${themePalette.BG_COLOR_GREEN};
                --bg-color-white : ${themePalette.BG_COLOR_WHITE};
                --bg-color-red : ${themePalette.BG_COLOR_RED};
                --bg-color-weak-purple : ${themePalette.BG_COLOR_WEAK_PURPLE};
                --bg-color-weak-light-blue : ${themePalette.BG_COLOR_WEAK_LIGTHBLUE};
                --bg-color-weak-gray : ${themePalette.BG_COLOR_WEAK_GRAY};

                ::-webkit-scrollbar {
                    width: 12px;
                    height: 12px;
                    border-radius: 10px;
                }

                ::-webkit-scrollbar-thumb {
                    background-color: var(--bg-color-weak-orange);
                    border-radius: 20px;
                    border: 3px solid var(--bg-color-white);
                }

                ::-webkit-scrollbar-thumb:hover {
                    background-color: var(--bg-color-strong-orange);
                }

                ::-webkit-scrollbar-track {
                    background-color: var(--bg-color-weak-gray);
                    border-radius: 20px;
                    border: 2px solid var(--bg-color-white);
                }
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}