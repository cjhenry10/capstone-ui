import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'

const getReq = async () => {
  const tickets = await axios.get('http://localhost:8000/api/tickets/', {
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return tickets.data;
}


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'ticket_number', headerName: 'Ticket Number', width: 150 },
  { field: 'title', headerName: 'Title', width: 130 },
  { field: 'creation_timestamp', headerName: 'Creation Timestamp', width: 150 },
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
    width: 350,
  },
];


export default function TicketList({ticketHandler}) {
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    try {

      const getTickets = async() => {
        const tickets = await getReq();

        console.log('Fetched the tickets:', tickets)
        setRows(tickets.results);
      }
      
      getTickets();
    } catch (error) {
      console.log(error)
    }
    
  }, [])

  const checkboxHandler = (id) => {
    console.log('Clicked box:', id);
    ticketHandler(id)
    console.log('after set state')
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pprioritySize={5}
        rowsPerPpriorityOptions={[5]}
        checkboxSelection
        onSelectionModelChange={id => checkboxHandler(id)}
      />
    </div>
  );
}
   
