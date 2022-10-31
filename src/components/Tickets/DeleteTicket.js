import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';

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

export default function DeleteModal({ticketID}) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = async () => {
  
    console.log('CLICKED and ticketID:', ticketID)

    try {
      const res = await axios.delete(`http://localhost:8000/api/ticket/${ticketID[0]}/`, {
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
      <Button onClick={handleOpen}>Close Ticket</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        {error ? <Typography  id="modal-modal-title" variant="h6" component="h6">{errorMsg}</Typography> : <></>}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to close the selected ticket?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick ={handleDelete}>Yes</Button><Button onClick ={handleClose}>No</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
  
}
