import { Paper, Box, Typography, Button, Badge, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/auth-context';
import Unauthorized from '../User/Unauthorized';
import NewGroup from './NewGroup';
import convertDate from '../../helpers/convertDate';
import DeleteGroups from './DeleteGroups';

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

const columns = [
  { field: 'id', headerName: 'ID', minWidth: 50, flex: 1, editable: false },
  {
    field: 'group_name',
    headerName: 'Group Name',
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
];

const Group = () => {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  const [selected, setSelected] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const getData = () => {
    fetch(urlGroups, groupOptions)
      .then((response) => response.json())
      .then((data) => {
        // clean up date for display on page
        const newData = [...data.results];
        newData.forEach((data) => {
          data.creation_timestamp = convertDate(data.creation_timestamp);
          data.modification_timestamp = convertDate(
            data.modification_timestamp
          );
        });
        setGroupData(newData);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getData();
  }, []);

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
    <Paper style={{ padding: 16 }}>
      <NewGroup
        onModalClose={handleCloseCreateModal}
        dataUpdated={getData}
        open={createModalOpen}
      />
      <DeleteGroups
        data={selectedData}
        dataUpdated={getData}
        onModalClose={handleCloseDeleteModal}
        open={deleteModalOpen}
      />
      <Box
        sx={{
          height: 'max(80vh, 400px)',
          width: 'max(80vw, 350px)',
          mx: 'auto',
          pb: '12vh',
        }}
      >
        <Grid container my={1} gap={0} alignItems='center'>
          <Grid item xs={6} sm={2} mb={2}>
            <Typography pr={4} variant='h5' display='inline-block'>
              All Groups
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4} mb={2}>
            <Button
              sx={{ width: '125px' }}
              variant='contained'
              endIcon={<AddIcon />}
              size='small'
              onClick={handleOpenCreateModal}
            >
              New Group
            </Button>
          </Grid>
          <Grid container gap={2} item xs={6} sm={6} flexWrap='nowrap' mb={2}>
            <Badge badgeContent={selected.length} color='secondary'>
              <Button
                sx={{ width: '125px' }}
                variant='contained'
                size='small'
                endIcon={<EditIcon />}
                onClick={getDataToModify}
              >
                Edit
              </Button>
            </Badge>
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
            height: 'max(80vh, 400px)',
            width: 'max(80vw, 350px)',
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
            onCellEditStart={(e) => console.log(e.target)}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default Group;
