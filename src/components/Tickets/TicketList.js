import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
//import { width } from '@mui/system';
import axios from 'axios'

const getReq = async () => {
  const tickets = await axios.get('http://localhost:8000/api/tickets/', {
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      //Cookie: 'jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNjY1OTg0MjQ2LjU2NDM5NywiaWF0IjoxNjY1OTgwNjQ2LjU2NDM5N30.cHPZlDKV4U-meB-i6iE7WUEesn8Yx1zySraZuZdbnLw'
    }
  });
  //console.log(JSON.stringify(tickets, null, 2));
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
    //type: 'number',
    width: 90,
  },
  {
    field: 'description',
    headerName: 'Description',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 350,
    //valueGetter: (params) =>
      //`${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

/* const rows = [
  { id: 1, ticketNumber: 69, title: `Outlook Issues`, creationDate: `20220922`, lastName: 'Garcia', firstName: 'Justin', priority: 3, description:`This is a description of Justin's problem` },
  { id: 2, ticketNumber: 420, title: `Outlook Issues`, creationDate: `[auto generate this]`, lastName: 'Courtnay', firstName: 'Braden', priority: 3, description:`This is a description of Braden's problem`  },
  { id: 3, ticketNumber: `[auto generate this]`, title: `Outlook Issues`, creationDate: `20220921`, lastName: 'Henry', firstName: 'Conner', priority: 1, description:`This is a description of Conner's problem`  },
  { id: 4, ticketNumber: 123, creationDate: `<date>`, title: `Outlook Issues`, lastName: 'McTestFace', firstName: 'Testy', priority: 2, description:`This is a description of Testy's problem`  },
  { id: 5, ticketNumber: 124, creationDate: `<date>`, title: `Outlook Issues`, lastName: 'McTestFace', firstName: 'Testy', priority: 2, description:`This is a description of Testy's problem`  },
]; */

export default function TicketList() {
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

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pprioritySize={5}
        rowsPerPpriorityOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
   
