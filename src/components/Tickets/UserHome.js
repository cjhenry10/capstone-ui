import React, { useContext } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import AuthContext from '../../context/auth-context';
import Unauthorized from '../User/Unauthorized';

export default function UserHome() {
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
              <Typography variant='h4'>Tickets</Typography>
            </Grid>
            <Grid item xs={12}>
              tickets
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
}