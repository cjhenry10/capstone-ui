import React from 'react';
import {
  Badge,
  Typography,
  Button,
  Paper,
  Modal,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Input,
  TableHead,
  responsiveFontSizes,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const deleteUrl = 'http://localhost:8000/api/group/';
const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept', 'application/json');
const deleteOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: '',
  credentials: 'include',
  //   redirect: 'follow',
};

const deleteRequest = async (objects) => {
  //   await fetch(deleteUrl + id + '/', deleteOptions)
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((err) => console.log(err));
//   Promise.all(objects.map((item) => fetch(deleteUrl + item.id + '/', deleteOptions)))
//   .then(responses => responses.map(res => res.json()))
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

  
};

const DeleteGroups = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('start data deletion');
    await Promise.all(props.data.map((item) => fetch(deleteUrl + item.id + '/', deleteOptions)))
    .then(responses => responses.map(res => res.json()))
    .then(data => console.log(data))
    .catch(err => console.log(err));
    console.log('data finished deleting');
    props.onModalClose();
    props.dataUpdated();
  };
  return (
    <Modal open={props.open}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TableContainer
          sx={{
            width: 'min(475px, 70vw)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          component={Paper}
        >
          <Typography py={2} variant='h5' align='center'>
            Delete {props.data.length} selected groups?
          </Typography>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Group Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell sx={{ height: 45 }}>{item.id}</TableCell>
                    <TableCell>{item.group_name}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell align='center'>
                  <Button onClick={props.onModalClose}>Cancel</Button>
                </TableCell>
                <TableCell align='right'>
                  <Badge badgeContent={props.data.length} color='secondary'>
                    <Button
                      type='submit'
                      variant='contained'
                      endIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </form>
    </Modal>
  );
};

export default DeleteGroups;
