import React, { useEffect, useState, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import convertDate from '../../helpers/convertDate';
import AuthContext from '../../context/auth-context';
import Unauthorized from '../User/Unauthorized';
import { Box, Button, Paper, Typography, Link } from '@mui/material';
import UpdateTicket from './UpdateTicket';

const ticketUrl = 'http://localhost:8000/api/tickets/';
const myHeaders = new Headers();

export default function TicketList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ticketID, setTicketID] = useState ()
  const [open, setOpen] = useState(false)
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'ticket_number', headerName: 'Ticket Number', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'created_by_id', headerName: 'Created by Id', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 90,
    },
    {
      field: 'description',
      headerName: 'Description',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 250,
    },
    { field: 'creation_timestamp', headerName: 'Created', width: 250 },
    { field: 'modification_timestamp', headerName: 'Modified', width: 250 },
    {
      field: "action",
      headerName: "Open",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return (
        <>
          <a href={`/ticket/${params.id}`}> 
            <Button>Edit Ticket</Button>
          </a>
        </>);
      }
    }
  ];

  useEffect(() => {
    fetch(ticketUrl, {
      method: 'GET',
      headers: myHeaders,
      credentials: 'include',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((data) => {
        // clean up date for display on page
        const newData = [...data.results];
        newData.forEach((data) => {
          data.creation_timestamp = convertDate(data.creation_timestamp);
          data.modification_timestamp = convertDate(
            data.modification_timestamp
          );
        });
        setRows(newData);
        setLoading(false)
      })
      .catch((err) => console.error(err));

  }, [])

  return ( !isLoggedIn ? <Unauthorized /> :
    <Paper style={{ padding: 16 }}>
      {(open && <UpdateTicket ticketID={ticketID} open={open}>...</UpdateTicket>)}
      <Box
        sx={{
          height: 'max(80vh, 500px)',
          width: 'max(80vw, 350px)',
          mx: 'auto',
          pb: 5,
        }}
      >
        <Typography pb={2} pr={4} variant='h5' align='left' display='inline-block'>
          All Tickets
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          loading={loading}
        />
      </Box>
    </Paper>
  );
}
   
