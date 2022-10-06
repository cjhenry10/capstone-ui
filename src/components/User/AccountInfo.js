import React, { useContext, useState, useRef } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Grid,
  Typography,
  Button,
  Snackbar,
  Input,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AuthContext from '../../context/auth-context';
import Unauthorized from './Unauthorized';

const convertDate = (date) => {
  const jsDate = new Date(date);
  const newDate = jsDate.toLocaleString('en-US', { dateStyle: 'medium' });
  return newDate;
};

const updateUrl = 'http://localhost:8000/api/user/';
const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept', 'application/json');
const updateOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: '',
  credentials: 'include',
  redirect: 'follow',
};

const AccountInfo = () => {
  const authCtx = useContext(AuthContext);
  const { userData, isLoggedIn } = authCtx;

  // a number that should change the amount of editable fields
  // based on role
  // for example 4 can edit their name and email
  // 2 can edit name, email, group, and role
  const permissions = 4;

  const dataToShow = {
    Name: userData.name,
    Email: userData.email,
    Group: userData.group || 'none',
    Role: 'role?',
    Created: convertDate(userData.creation_timestamp),
    Modified: convertDate(userData.modification_timestamp) || 'none',
  };

  const stats = {
    'Open Tickets': 48,
    'Next Deadline': 'date',
    'Resolved Tickets': 2083,
    'Last Resolved': 'date',
  };

  const [showForm, setShowForm] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const nameInputRef = useRef();
  const emailInputRef = useRef();

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  const handleCloseSnackbar = (e, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setShowSnackbar(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
        ...userData,
        name: nameInputRef.current.value,
        email: emailInputRef.current.value,
        // creation_timestamp: null,
        // modification_timestamp: null,
        modified_by_id: Number(userData.id),
        // group_membership: [],
      }
    updateOptions.body = JSON.stringify(newData);
    console.log(updateOptions.body);
    fetch(updateUrl, updateOptions)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        setShowSnackbar(true);
    })
    .catch((err) => console.error(err))

  };

  if (!isLoggedIn) {
    return <Unauthorized />;
  }

  const action = (
    <>
    <IconButton size='small' aria-label='close' color='inherit' onClick={handleCloseSnackbar}>
        <CloseIcon fontSize='small' />
    </IconButton>
    </>
  )

  return (
    <>
    <Grid container spacing={2} sx={{ px: 5 }}>
      <Grid item xs={12}></Grid>

      {!showForm && (
        <Grid item xs={12} sm={6}>
          <Typography mb={2} variant='h5' align='center'>
            Account Info
          </Typography>
          <TableContainer sx={{ maxWidth: 468, mx: 'auto' }} component={Paper}>
            <Table aria-label='simple table'>
              <TableBody>
                {Object.entries(dataToShow).map(([key, value]) => {
                  return (
                    <TableRow>
                      <TableCell
                        align='right'
                        sx={{ fontWeight: 'bold', height: 45, width: 100 }}
                      >
                        {key}
                      </TableCell>
                      <TableCell sx={{ width: 300 }}>{value}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell align='right'>
                    <Button variant='contained' onClick={handleShowForm}>
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
      {showForm && (
        <Grid item xs={12} sm={6}>
          <Typography mb={2} variant='h5' align='center'>
            Edit Account Info
          </Typography>
          <form onSubmit={(e) => handleSubmit(e)}>
            <TableContainer
              sx={{ maxWidth: 468, mx: 'auto' }}
              component={Paper}
            >
              <Table aria-label='simple table'>
                <TableBody>
                  {Object.entries(dataToShow).map(([key, value], i, arr) => {
                    if (i < arr.length - permissions) {
                      return (
                        <TableRow>
                          <TableCell
                            align='right'
                            sx={{ fontWeight: 'bold', height: 45, width: 100 }}
                          >
                            {key}
                          </TableCell>
                          <TableCell sx={{ width: 300 }}>
                            <Input
                              label={key}
                              defaultValue={value}
                              inputRef={
                                key==='Name' ? nameInputRef : emailInputRef
                              }
                            />
                          </TableCell>
                        </TableRow>
                      );
                    } else {
                      return (
                        <TableRow>
                          <TableCell
                            align='right'
                            sx={{ fontWeight: 'bold', height: 45, width: 100 }}
                          >
                            {key}
                          </TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                      );
                    }
                  })}
                  <TableRow>
                    <TableCell align='right'>
                      <Button onClick={handleHideForm}>Cancel</Button>
                    </TableCell>
                    <TableCell align='right'>
                      <Button type='submit' variant='contained'>Save</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </form>
        </Grid>
      )}
      <Grid item xs={12} sm={6}>
        <Typography mb={2} variant='h5' align='center'>
          Statistics
        </Typography>
        <TableContainer sx={{ maxWidth: 468, mx: 'auto' }} component={Paper}>
          <Table aria-label='simple table'>
            <TableBody>
              {Object.entries(stats).map(([key, value]) => {
                return (
                  <TableRow>
                    <TableCell
                      align='right'
                      sx={{ fontWeight: 'bold', height: 45, width: 150 }}
                    >
                      {key}
                    </TableCell>
                    <TableCell sx={{ width: 300 }}>{value}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
    <Snackbar open={showSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar} message='Update successful' action={action} />
    </>
  );
};

export default AccountInfo;
