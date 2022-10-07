import React, {useState, useRef} from 'react';
import { Card, CardContent, Grid, TextField, Button, Typography, Alert, Modal, } from '@mui/material';

const groupUrl = 'http://localhost:8000/api/group/';
const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept', 'application/json');
const createGroupOptions = {
  method: 'POST',
  headers: myHeaders,
  body: '',
  credentials: 'include',
  redirect: 'follow',
};

const NewGroup = (props) => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('name ' + nameInputRef.current.value);
    const newGroup = {
      group_name: nameInputRef.current.value,
      email_address: emailInputRef.current.value,
    }
    createGroupOptions.body = JSON.stringify(newGroup);
    fetch(groupUrl, createGroupOptions)
    .then((response) => response.json())
    .then((data) => {
      props.onModalClose();
      props.dataUpdated();
    })
    .catch((err) => console.log(err));
  }

  return (
    <>
    <Modal open={props.open}>
    <Card sx={{ maxWidth: 760, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }} elevation={6}>
        <CardContent>
            <Typography mb={2} variant="h5" align="left">New Group</Typography>

            <form onSubmit={(e) => handleSubmit(e)}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField 
                        required fullWidth
                        name="group_name"
                        label="Name"
                        placeholder="Enter group name"
                        variant="outlined"
                        inputRef={nameInputRef}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        required fullWidth
                        name="email_address"
                        type="email"
                        label="Email"
                        placeholder="email@example.com"
                        variant="outlined"
                        inputRef={emailInputRef}
                    />
                </Grid>
                <Grid item xs={12} md={6} alignItems='self-end'>
                <Button type="button" variant="outlined" color="primary" fullWidth onClick={props.onModalClose}>Cancel</Button>
                </Grid>
                <Grid item xs={12} md={6}>
                <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            </form>
            {/* {problem && (
            <Alert severity='error' variant='outlined'>{}</Alert>
          )} */}
        </CardContent>
    </Card>
    </Modal>
    </>
  )
}

export default NewGroup