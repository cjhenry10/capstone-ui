import { Paper, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/auth-context';
import Unauthorized from '../User/Unauthorized';

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

const convertDate = (date) => {
    const jsDate = new Date(date);
    const newDate = jsDate.toLocaleString('en-US', {dateStyle: 'medium'});
    return newDate;
}

const columns = [
    {field: 'id', headerName: 'ID', width: 90,},
    {field: 'group_name', headerName: 'Group Name', width: 150,},
    {field: 'creation_timestamp', headerName: 'Created', width: 150,},
    {field: 'modification_timestamp', headerName: 'Last Modified', width: 150,},
]

const Group = () => {
    const authCtx = useContext(AuthContext);
    const { isLoggedIn } = authCtx;

    const [groupData, setGroupData] = useState([]);
    useEffect(() => {
        fetch(urlGroups, groupOptions)
            .then((response) => response.json())
            .then((data) => {
                // clean up date for display on page
                const newData = [...data.results];
                newData.forEach(data => {
                    data.creation_timestamp = convertDate(data.creation_timestamp);
                    data.modification_timestamp = convertDate(data.modification_timestamp);
                });
                setGroupData(newData);
            })
            .catch((err) => console.error(err));
    }, [])

    if (!isLoggedIn) {
        return <Unauthorized />
    }

    return (
        <Paper style={{ padding: 16 }}>
            <h2>All Groups</h2>
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={groupData}
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

export default Group