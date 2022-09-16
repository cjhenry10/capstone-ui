import React, { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import AuthContext from '../../context/auth-context';

const Unauthorized = () => {
  const authCtx = useContext(AuthContext);
  const { isLoading } = authCtx;

  return (
    <>
    {!isLoading && 
    <Grid container spacing={5} sx={{ mx: 'auto', maxWidth: 680 }}>
      <Grid item xs={12}>
        <Typography align='center' variant='h4'>Unauthorized</Typography>
      </Grid>
      <Grid align='center' sx={{m: 0}} item xs={12}>
        You do not have access to this page.
      </Grid>
    </Grid>}
  </>
  )
}

export default Unauthorized