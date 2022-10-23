import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function TicketForm() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [description, setDescription] = React.useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = {
      ticket_number: firstName,
      status: lastName,
      title,
      work_notes: [],
      priority,
      description,
    };
    try {
      const res = await axios.post('http://localhost:8000/api/ticket/', form, {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Ticket Number"
          //defaultValue="First Name"
          onChange={(text)=> setFirstName(text.target.value)}
        />

        <TextField
          required
          id="outlined-required"
          label="Status"
          defaultValue=""
          onChange={(text)=> setLastName(text.target.value)}
        />

        <TextField
          id="outlined-helperText"
          label="Title"
          defaultValue="Title"
          helperText="(Ex: Outlook Issues)"
          onChange={(text)=> setTitle(text.target.value)}
        />

        <TextField
          id="outlined-helperText"
          label="Work Notes"
          defaultValue=""
          helperText="(Ex: jgarcia@helpdeskwizard.com)"
          onChange={(text)=> setEmail(text.target.value)}
        />

        <TextField
          id="outlined-number"
          label="Priority"
          type="number"
          helperText="1 = Low, 2 = Medium, 3 = High"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(text)=> setPriority(text.target.value)}
        />


        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          defaultValue="Describe your issue in detail"
          onChange={(text)=> setDescription(text.target.value)}
        />
        <Button variant="contained" onClick={submitHandler}>Submit</Button>
      </div>
    </Box>
  );
}
