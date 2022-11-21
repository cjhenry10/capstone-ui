import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UpdateTicket({ticketID}) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [ticket, setTicket] = React.useState('');
  const [notes, setNotes] = React.useState(''); 
  const [title, setTitle] = React.useState(''); 
  const [description, setDescription] = React.useState(''); 

  const handleOpen = async () => {
    setOpen(true);
    setIsLoading(true);

    try {
        const { data } = await axios.get(`http://localhost:8000/api/ticket/${ticketID[0]}/`, {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })

        console.log(data)
        setTicket(data);
        setTitle(data.title);
        setDescription(data.description);
        setIsLoading(false);

        if (error) {
          setError(false);
          setErrorMsg('')
        }
      } catch (error) {
        setError(true);
        setErrorMsg(error.response.data.detail)
        console.log(error)
      }
  }
  const handleClose = () => setOpen(false);
  const handleUpdate = async () => {
  
    console.log('CLICKED and ticketID:', ticketID)

    try {
      const res = await axios.put(`http://localhost:8000/api/ticket/${ticketID[0]}/`, {
        title,
        description,
        work_notes: [
            {
                note: notes
            }
        ]
    },
    {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      console.log(res)
      if (error) {
        setError(false);
        setErrorMsg('')
      }
      setOpen(false)
    } catch (error) {
      setError(true);
      setErrorMsg(error.response.data.detail)
      console.log(error)
    }
  }

  return (
    <div>
      {ticketID.length > 0 ? <Button onClick={handleOpen}>Update Ticket</Button> : <Button disabled>Update Ticket</Button>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        {error ? <Typography  id="modal-modal-title" variant="h6" component="h6">{errorMsg}</Typography> : <></>}
        {
            isLoading ? <CircularProgress /> :
            <>
                <TextField
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                        fullWidth
                        disabled
                        name='title'
                        type='title'
                        label=''
                        placeholder='Title'
                        variant='outlined'
                        />
                        <TextField
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required
                        fullWidth
                        disabled
                        multiline
                        rows={4}
                        name='description'
                        type='description'
                        label=''
                        placeholder='Description'
                        variant='outlined'
                        />
                <Typography  id="modal-modal-title" variant="h6" component="h6">{ticket ? ticket.work_notes.map(n => <li>{n.note}</li>) : ""}</Typography>
                <TextField
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                        required
                        fullWidth
                        multiline
                        rows={4}
                        name='notes'
                        type='notes'
                        label='Notes'
                        placeholder='Work Notes'
                        variant='outlined'
                        />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Button onClick ={handleUpdate}>Yes</Button><Button onClick ={handleClose}>No</Button>
                </Typography>
            </>
        }
        </Box>
      </Modal>
    </div>
  );
  
}
