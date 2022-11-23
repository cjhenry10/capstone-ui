import { Paper, Box, Grid, Badge, Button, Typography, IconButton, Snackbar } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import convertDate from '../../helpers/convertDate';
import EditUserGroups from './EditUserGroups';
import UserDataActions from './UserDataActions';
import DeleteUsers from './DeleteUsers';

const urlUsers = 'http://localhost:8000/api/users/';
const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept', 'application/json');

const userOptions = {
  method: 'GET',
  headers: myHeaders,
  credentials: 'include',
  redirect: 'follow',
};

const AllUsers = () => {
    const [userData, setUserData] = useState([]);
    const [rowId, setRowId] = useState(null);
    const [selectedUserData, setSelectedUserData] = useState({});
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const getDataToModify = () => {
      const modData = userData.filter((item) => selected.includes(item.id));
      setSelectedData(modData);
    };

    const handleOpenDeleteModal = () => {
      getDataToModify();
      setDeleteModalOpen(true);
    };
  
    const handleCloseDeleteModal = () => {
      setDeleteModalOpen(false);
    };

    const getUsers = async () => {
        await fetch(urlUsers, userOptions)
        .then(response => response.json())
        .then(data => {
            const newData = [...data.results];
        newData.forEach((data) => {
          data.creation_timestamp = convertDate(data.creation_timestamp);
          data.modification_timestamp = convertDate(
            data.modification_timestamp
          );
        });
            setUserData(data.results);
            // console.log(data.results);
        })
        .catch(err => console.log(err));
    }
    useEffect(() => {
        getUsers();
        
    }, [editModalOpen]);

    const columns = React.useMemo(() => [
        { field: 'id', headerName: 'ID', minWidth: 50, flex: 1, editable: false },
        {
          field: 'name',
          headerName: 'Name',
          minWidth: 200,
          flex: 2,
          editable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          minWidth: 200,
          flex: 2,
          editable: true,
        },
        {
          field: 'creation_timestamp',
          headerName: 'Created',
          maxWidth: 200,
          flex: 2,
          editable: false,
        },
        {
          field: 'modification_timestamp',
          headerName: 'Last Modified',
          maxWidth: 200,
          flex: 2,
          editable: false,
        },
        {
          field: 'actions',
          headerName: 'Actions',
          type: 'actions',
          editable: false,
          renderCell: (params) => <UserDataActions {...{ params, setRowId, setSelectedUserData, setEditModalOpen, editModalOpen }} />,
        },
      ], []);

      const [showSnackbar, setShowSnackbar] = useState(false);
      const [snackbarMessage, setSnackbarMessage] = useState('');


      const handleCloseSnackbar = (e, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setShowSnackbar(false);
      };

      const action = (
        <>
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </>
      );

      const dataSaved = (message) => {
        setSnackbarMessage(message);
        setShowSnackbar(true);
        getUsers();
      };

  return (
    <>
    <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={action}
      />
    {editModalOpen && <EditUserGroups {...{selectedUserData, editModalOpen, setEditModalOpen, dataSaved }} />}
    <Paper style={{padding: 16}}>
    <DeleteUsers
          data={selectedData}
          onModalClose={handleCloseDeleteModal}
          open={deleteModalOpen}
          // dataUpdated={getData}
          // dataSaved={dataSaved}
        />
        <Box
        sx={{
            height: 'max(70vh, 600px)',
            width: 'max(350px, min(90vw, 1600px))',
            mx: 'auto',
            pb: '12vh',
          }}
        >
          <Grid container my={1} gap={0} alignItems='center'>
            <Grid item xs={12} mb={2}>
              <Typography pr={4} variant='h5' display='inline-block'>
                All Users
              </Typography>
            </Grid>
            <Grid item mr='auto'>
            </Grid>
            {/* <Grid item ml='auto'>
              <Badge badgeContent={selected.length} color='secondary'>
                <Button
                  sx={{ width: '125px' }}
                  variant='contained'
                  size='small'
                  endIcon={<DeleteIcon />}
                  onClick={handleOpenDeleteModal}
                >
                  Delete
                </Button>
              </Badge>
            </Grid> */}
          </Grid>
          <Box sx={{
            height: 'max(70vh, 400px)',
            width: 'max(350px, min(90vw, 1600px))',
            mx: 'auto',
          }}>
            <DataGrid 
            rows={userData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(s) => setSelected(s)}
            selectionModel={selected}
            experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </Box>
    </Paper>
    </>
  )
}

export default AllUsers