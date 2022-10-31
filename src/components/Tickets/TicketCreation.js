import React, { useContext } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import AuthContext from '../../context/auth-context';
import Unauthorized from '../User/Unauthorized';
import TicketForm from './TicketForm';

export default function TicketCreation() {
  const authCtx = useContext(AuthContext);
  const { isLoading, isLoggedIn } = authCtx;

  if (!isLoggedIn) {
    return <Unauthorized /> 
  }

  return (
    <>
      {!isLoading && (
        <Card sx={{ mx: 1 }}>
          <Grid container spacing={2} sx={{ mx: 1, my: 1 }}>
            <Grid item xs={12}>
              <Typography variant='h4'>Ticket Creation</Typography>
            </Grid>
            <Grid item xs={12}>
              <TicketForm />
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
}
