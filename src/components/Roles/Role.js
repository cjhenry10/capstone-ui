import React, { useEffect, useState, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AuthContext from '../../context/auth-context';
import Unauthorized from '../User/Unauthorized';
import convertDate from '../../helpers/convertDate';

const urlRoles = 'http://localhost:8000/api/roles/';
const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept', 'application/json');

const groupOptions = {
  method: 'GET',
  headers: myHeaders,
  credentials: 'include',
  redirect: 'follow',
};

const Role = () => {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  const [roleData, setRoleData] = useState([]);
  useEffect(() => {
    fetch(urlRoles, groupOptions)
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
        setRoleData(newData);
      })
      .catch((err) => console.error(err));
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 50, flex: 1 },
    { field: 'role_name', headerName: 'Role Name', minWidth: 200, flex: 2 },
    { field: 'description', headerName: 'Description', minWidth: 200, flex: 2 },
    {
      field: 'creation_timestamp',
      headerName: 'Created',
      minWidth: 200,
      flex: 2,
    },
    {
      field: 'modification_timestamp',
      headerName: 'Last Modified',
      minWidth: 200,
      flex: 2,
    },
  ];

  if (!isLoggedIn) {
    return <Unauthorized />;
  }

  return (
    <Paper style={{ padding: 16 }}>
      <Box
        sx={{
          height: 'max(80vh, 500px)',
          width: 'max(80vw, 350px)',
          mx: 'auto',
          pb: 5,
        }}
      >
        <Typography pb={2} pr={4} variant='h5' align='left' display='inline-block'>
          All Roles
        </Typography>
        {/* <Button variant='contained' endIcon={<AddIcon />} size='small'>New Role</Button> */}
        <DataGrid
          rows={roleData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          // experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Paper>
  );
};

export default Role;
