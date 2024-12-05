import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import CardFormComponent from './components/CardFormComponent';
import fondoCompany from './../../../assets/fondoCompany.png';
import fondomovil from './../../../assets/fondomovil.png';

export const Login: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundImage: {
                    xs: `url(${fondomovil})`,
                    md: `url(${fondoCompany})`
                },
                backgroundSize: {
                    xs: 'cover', 
                    md: 'cover'
                },
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh', 
                overflow: 'hidden', 
                position: 'relative',
            }}
        >
            <Grid 
                container 
                sx={{ 
                    height: '100%', 
                    position: 'absolute',
                    top: 0,
                    left : {
                        xs:0,
                        md:1000
                    },
                    right: 0,
                    bottom: 0,
                    overflow: 'hidden', 
                }}
            >
               
                <Grid
                    xs={12}
                    md={6}
                    sx={{
                        display: { xs: 'none', md: 'block' }
                    }}
                >
                    <Box sx={{
                        p: 2,
                        textAlign: "center",
                    }}>
                       
                    </Box>
                </Grid>

                {/* Columna derecha, siempre visible */}
                <Grid 
                    xs={12} 
                    md={6}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%', 
                    }}
                >
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        px: { xs: 2, md: 4 }, 
                        pt: { xs: '90%', md: '20%' }, 
                    }}>
                        <CardFormComponent />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Login;