import {
  Modal,
  Box,
  Button,
  Paper,
  Typography,
  Grid,
  Popover,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';
import NewUserGroup from './NewUserGroup';

const editUrl = 'http://localhost:8000/api/user/';
const groupUrl = 'http://localhost:8000/api/groups/';
const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept', 'application/json');

const editOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: '',
  credentials: 'include',
  redirect: 'follow',
};

const testData = [
  { group_id: 1, role_id: 1 },
  { group_id: ' ', role_id: 2 },
  { group_id: 3, role_id: 3 },
];
const tempRow = { group_id: '', role_id: '' };

const EditUserGroups = ({
  selectedUserData,
  editModalOpen,
  setEditModalOpen,
}) => {
  /** TODO:
   * - get groups to display in dropdown
   * - save edited data to server
   *
   */
  // const [groupData, setGroupData] = useState([]);
  const { roleData } = useApi();
  console.log(roleData);
  const {data: groupData} = useApi();

  


  const groups = [];
  if (groupData) {
    groupData.forEach((group) => groups.push(group.group_name));
  }

  console.log(groupData);
  const roles = [];
  if (roleData) {
    roleData.forEach(role => roles.push(role.role_name));
  }

  console.log(groupData);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [tempRoleData, setTempRoleData] = useState(
    selectedUserData.group_membership ? selectedUserData.group_membership : []
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  //  if (selectedUserData.group_membership) {
  //     setTempRoleData
  //  }

  useEffect(() => {
    if (selectedUserData.group_membership) {
      setTempRoleData(selectedUserData.group_membership);
    }
  }, [selectedUserData]);
  // console.log(selectedUserData);
  // console.log(groups);
  const columns = [
    {
      field: 'group_id',
      headerName: 'Group',
      minWidth: 200,
      flex: 1,
      editable: false,
      type: 'singleSelect',
      valueOptions: groups,
    },
    {
      field: 'role_id',
      headerName: 'Role',
      minWidth: 200,
      flex: 1,
      editable: true,
      type: 'singleSelect',
      valueOptions: roles,
    },
  ];

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setTempRoleData([]);
  };

  const handleSave = () => {
    console.log(selectedUserData);
    console.log(tempRoleData);
    const newRoles = tempRoleData.filter(
      (item) => !selectedUserData.group_membership.includes(item)
    );
    editOptions.body = JSON.stringify({
      ...selectedUserData,
      group_membership: newRoles,
    });
    console.log(editOptions.body);
    fetch(editUrl + selectedUserData.id + '/', editOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    setEditModalOpen(false);
    setTempRoleData([]);
  };

  // const handleNewUser = () => {
  //   console.log(tempRoleData);
  //   if (tempRoleData.length === 0) {
  //     setTempRoleData((prev) => [tempRow, ...prev, ]);
  //   } else if (
  //     tempRoleData[0].group_id !== tempRow.group_id &&
  //     tempRoleData[0].role_id !== tempRow.role_id
  //   ) {
  //     setTempRoleData((prev) => [tempRow, ...prev, ]);
  //   }
  // };

  return (
    <Modal open={editModalOpen} onClose={handleCloseModal}>
      <Paper
        sx={{
          height: 'min(90vh, 650px)',
          width: 'max(350px, min(50vw, 800px))',
          my: 5,
          mx: 'auto',
          px: '3vw',
        }}
      >
        <Box
          sx={{
            height: 'min(60vh, 350px)',
            width: 'max(350px, min(50vw, 800px))',
            mx: 'auto',
            pt: 2,
          }}
        >
          <Grid container pb={2}>
            <Grid item mr='auto'>
              <Typography
                variant='h5'
                pb={1}
                display='inline-block'
                mr={'auto'}
              >
                {selectedUserData.name}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton sx={{ ml: 'auto' }} onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>

          <DataGrid
            columns={columns}
            // rows={selectedUserData.group_membership ? selectedUserData.group_membership : []}
            rows={tempRoleData}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) => row.group_id}
            onCellEditStop={(params) => console.log(params)}
          />
          <Grid container>
            <Grid item mr='auto'>
              <Button
                sx={{ mt: 1 }}
                variant='contained'
                size='small'
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                }}
              >
                New Role
              </Button>
            </Grid>
            <Grid item>
              <Button sx={{ ml: 2, mt: 1 }} onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                variant='contained'
                sx={{ ml: 2, mt: 1 }}
                disabled={saveButtonDisabled}
                onClick={handleSave}
              >
                Save
              </Button>
            </Grid>
          </Grid>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <NewUserGroup
              {...{
                tempRoleData,
                setTempRoleData,
                setAnchorEl,
                setSaveButtonDisabled,
              }}
            />
          </Popover>
        </Box>
      </Paper>
    </Modal>
  );
};

export default EditUserGroups;
