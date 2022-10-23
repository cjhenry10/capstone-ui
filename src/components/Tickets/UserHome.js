import React, { useContext } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import AuthContext from '../../context/auth-context';
import Unauthorized from '../User/Unauthorized';
import TicketList from './TicketList';
import BasicModal from './SingleTicketList';

export default function UserHome() {
  const authCtx = useContext(AuthContext);
  const { isLoading, isLoggedIn } = authCtx;

  if (!isLoggedIn) { //I changed this so I could see what my ticketlist looks like; will change back after we get auth working 
    return <Unauthorized /> 
  }

  return (
    <>
      {!isLoading && (
        <Card sx={{ mx: 1 }}>
          <Grid container spacing={2} sx={{ mx: 1, my: 1 }}>
            <Grid item xs={12}>
              <Typography variant='h4'>Tickets</Typography>
            </Grid>
            <Grid item xs={12}>
              <TicketList /><BasicModal />
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
}
