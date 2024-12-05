import React from 'react'
import Grid from '@mui/material/Grid2';
import CabeceraPage from '../../../components/CabeceraPage'
import CardButton from '../../../components/CardButton'
import './../../../styles/components/CabeceraPage/index.css'
import { Box } from '@mui/material';

import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { routesConfig as cardsConfig } from './listRoutes'


export const Home: React.FC = () => {
  const nameUser = useSelector((state: RootState) => state.authReducer.fullName);
  const userRole = useSelector((state: RootState) => state.authReducer.roleId); // rol del usuario

  const objData = {
    firstData: "HOME",
    secondData: nameUser
  };

  // Filtra las tarjetas por el rol permitido
  const filteredCards = cardsConfig.filter(card =>
    card.allowedRoles.includes(userRole)
  );

  return (
    <>
      <Box>
        <Grid container className='fullBackground'>
            <CabeceraPage isWithBackground={true} objData={objData} />
        </Grid>

        <Grid container sx={{ mt: "3%", p: 3 }} spacing={3}>
          {filteredCards.filter(box => box.show == 1 ).map((card, index) => (
            <Grid key={index}  sx={{ xs:12}}>
              <CardButton name={card.name} icon={card.icon} path={card.path} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};