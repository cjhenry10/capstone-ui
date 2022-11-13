import {
  Paper,
  Box,
  Typography,
  Button,
  Badge,
  Grid,
  Backdrop,
  CircularProgress,
  IconButton,
  Snackbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/auth-context';
import Unauthorized from '../User/Unauthorized';
import NewGroup from './NewGroup';
import convertDate from '../../helpers/convertDate';
import DeleteGroups from './DeleteGroups';
import DataActions from './DataActions';
import { indigo } from '@mui/material/colors';
import useApi from '../../hooks/useApi';

const urlGroups = 'http://localhost:8000/api/groups/';
const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept', 'application/json');

const groupOptions = {
  method: 'GET',
  headers: myHeaders,
  credentials: 'include',
  redirect: 'follow',
};

const Group = () => {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  const [selected, setSelected] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rowId, setRowId] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [originalData, setOriginalData] = useState(null);
  const { fetchOne, data, loading } = useApi(
    'http://localhost:8000/api/groups/'
  );
  console.log(selected);
  console.log(selectedData);

  const columns = React.useMemo(
    () => [
      { field: 'id', headerName: 'ID', minWidth: 50, flex: 1, editable: false },
      {
        field: 'group_name',
        headerName: 'Group Name',
        minWidth: 200,
        flex: 2,
        editable: true,
      },
      {
        field: 'email_address',
        headerName: 'Group Email',
        minWidth: 200,
        flex: 2,
        editable: true,
      },
      {
        field: 'creation_timestamp',
        headerName: 'Created',
        minWidth: 200,
        flex: 2,
        editable: false,
      },
      {
        field: 'modification_timestamp',
        headerName: 'Last Modified',
        minWidth: 200,
        flex: 2,
        editable: false,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        editable: false,
        renderCell: (params) => (
          <DataActions {...{ params, rowId, setRowId, getData, dataSaved }} />
        ),
      },
    ],
    [rowId]
  );

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
  };
  const getData = () => {
    fetchOne(urlGroups);
    setGroupData(data);
  };

  useEffect(() => {
    // getData()
    if (data) {
      setGroupData(data);
    } else {
      setGroupData([]);
    }
  }, [data]);

  const getDataToModify = () => {
    const modData = groupData.filter((item) => selected.includes(item.id));
    setSelectedData(modData);
  };

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    getDataToModify();
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  if (!isLoggedIn) {
    return <Unauthorized />;
  }

  return (
    <>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={action}
      />
      <Backdrop
        open={loading}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: indigo[100],
        }}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Paper style={{ padding: 16 }}>
        <NewGroup
          onModalClose={handleCloseCreateModal}
          dataUpdated={getData}
          open={createModalOpen}
          dataSaved={dataSaved}
        />
        <DeleteGroups
          data={selectedData}
          dataUpdated={getData}
          onModalClose={handleCloseDeleteModal}
          open={deleteModalOpen}
          dataSaved={dataSaved}
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
                All Groups
              </Typography>
            </Grid>
            <Grid item mr='auto'>
              <Button
                sx={{ width: '125px', mr: 'auto' }}
                variant='contained'
                endIcon={<AddIcon />}
                size='small'
                onClick={handleOpenCreateModal}
              >
                New Group
              </Button>
            </Grid>
            <Grid item>
              {/* <Badge badgeContent={selected.length} color='secondary'>
              <Button
                sx={{ width: '125px' }}
                variant='contained'
                size='small'
                endIcon={<EditIcon />}
                onClick={getDataToModify}
              >
                Edit
              </Button>
            </Badge> */}
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
            </Grid>
          </Grid>
          <Box
            sx={{
              height: 'max(70vh, 400px)',
              width: 'max(350px, min(90vw, 1600px))',
              mx: 'auto',
            }}
          >
            <DataGrid
              rows={groupData}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={(s) => setSelected(s)}
              selectionModel={selected}
              experimentalFeatures={{ newEditingApi: true }}
              onCellEditStop={(params) => {
                setRowId(params.id);
              }}
            />
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default Group;
