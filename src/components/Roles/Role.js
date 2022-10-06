import React, { useEffect, useState, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper } from '@mui/material';
import AuthContext from '../../context/auth-context';
import Unauthorized from '../User/Unauthorized';

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

const convertDate = (date) => {
    const jsDate = new Date(date);
    const newDate = jsDate.toLocaleString('en-US', { dateStyle: 'medium' });
    return newDate;
}

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
                newData.forEach(data => {
                    data.creation_timestamp = convertDate(data.creation_timestamp);
                    data.modification_timestamp = convertDate(data.modification_timestamp);
                });
                setRoleData(newData);
            })
            .catch((err) => console.error(err));
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90, },
        { field: 'role_name', headerName: 'Role Name', width: 150, },
        { field: 'description', headerName: 'Description', width: 150, },
        { field: 'creation_timestamp', headerName: 'Created', width: 150, },
        { field: 'modification_timestamp', headerName: 'Last Modified', width: 150, },
    ]

    if (!isLoggedIn) {
        return <Unauthorized />
    }

    return (
        <Paper style={{ padding: 16 }}>
            <h2>All Roles</h2>
            <Box sx={{ height: 600, width: '100%' }}>
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
    )
}

export default Role