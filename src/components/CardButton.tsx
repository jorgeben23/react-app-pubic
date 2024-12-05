import React from "react";
import Grid from '@mui/material/Grid2';
import HideImageIcon from '@mui/icons-material/HideImage';
import './../styles/components/CardButton/index.css'
import { Box, SvgIcon, Typography } from "@mui/material";
import { themePalette } from "../config/Theme.config";
import { Link } from 'react-router-dom';

interface CardButtonProps {
    name:string,
    icon?: React.ReactNode,
    path?: string

}

const CardButton: React.FC <CardButtonProps>= ({ name, icon, path }) => {
    return (

        <>
            <Box sx={{ cursor: 'pointer', textDecoration:'none'}} component={Link} to={path || '#'} >
                <Grid container className="style-button" 
                      sx={{ width: { xs: '290px', sm:'220px', md:'300px'},
                            height: { xs: '110px', sm:'100px', md: '110px'},
                            marginBottom: { xs:'15px'}
                      }}
                >
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <SvgIcon 
                         sx={{ fontWeight: 'bold', color: themePalette.BG_COLOR_WEAK_ORANGE, 
                                fontSize: { xs:'92px', sm:'70px', md:'104px'} }} >
                             {icon || <HideImageIcon/>} 
                        </SvgIcon>
                        <Typography sx={{ textAlign: 'center', 
                            fontSize: { xs:'20px', sm:'16px', md:'20px'}, 
                            fontWeight: 'bold', color: themePalette.BG_COLOR_WEAK_ORANGE }}>{name}</Typography>
                    </Box>
                </Grid>

            </Box>

        </>

    );
}

export default CardButton;