import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react'
import { themePalette } from '../config/Theme.config';

interface propsCabeceraPage {
    isWithBackground: boolean,
    objData?: {
        firstData: string,
        secondData: string | null
    },
    
    toResponsive?: boolean
}

const CabeceraPage: React.FC<propsCabeceraPage> = ({ isWithBackground, objData, toResponsive }) => {

    const defaultData = {

        firstData: "HOME",
        secondData: "NO NAME"
    }

    const data = objData || defaultData;

    return (
        <>
            <Box sx={{ ml: 5 }} >
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h6"
                            sx={{
                                fontWeight: "bold",
                                fontSize: isWithBackground ? { xs: "16px", md: "18px" } : "14px",
                                color: themePalette.BG_COLOR_STRONG_ORANGE
                            }}>
                            {isWithBackground ? 'HOME' : data.firstData}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }} sx={{ mt: isWithBackground ? '0' : '-2%' }}>
                        <Typography variant="h6"
                            sx={{
                                fontWeight: "bold",
                                fontSize: isWithBackground ? { xs: "25px", md: "30px" } : toResponsive ? {xs: "22px", md: "30px" } : "30px",
                                color: themePalette.BG_COLOR_GREEN,
                                mt: 0.5
                            }}>
                            {data.secondData}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default CabeceraPage;