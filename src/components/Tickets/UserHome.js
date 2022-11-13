import React, { useContext, useState } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import AuthContext from '../../context/auth-context';
import Unauthorized from '../User/Unauthorized';
import TicketList from './TicketList';
import DetailsModal from './SingleTicketList';
import DeleteModal from './DeleteTicket';

export default function UserHome() {
  const authCtx = useContext(AuthContext);
  const { isLoading, isLoggedIn } = authCtx;

const [ticketID, setTicketID] = useState ([])

const ticketHandler = (id) => {
  console.log("passed in id:", id)
  setTicketID(id);
  console.log("changed state to:", ticketID)
}

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
              <TicketList ticketHandler={ticketHandler} /><DetailsModal ticketID={ticketID} /><DeleteModal ticketID={ticketID} />
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
}
