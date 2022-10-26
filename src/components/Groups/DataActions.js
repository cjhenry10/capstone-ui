import { Box, CircularProgress, Fab, Tooltip } from '@mui/material';
import Check from '@mui/icons-material/Check';
import Save from '@mui/icons-material/Save';
import React, { useEffect, useState } from 'react';
import { indigo } from '@mui/material/colors';
import useApi from '../../hooks/useApi';

const urlGroup = 'http://localhost:8000/api/group/';
const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept', 'application/json');

const groupOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: '',
  credentials: 'include',
  redirect: 'follow',
};

const DataActions = ({ params, rowId, setRowId, getData, dataSaved }) => {
  const [loading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { fetchOne } = useApi();

  const handleSubmit = async () => {
    // if (params.row.group_name === originalData.group_name && params.row.email_address === originalData.email_address) {
    //     console.log('data didnt change');
    //     setRowId(null);
    //     dataSaved('Data did not change');
    //     return;
    // }
    setIsLoading(true);
    setTimeout(async () => {
      const { group_name, email_address, id } = params.row;
      console.log(params.row);
      const body = {
        group_name: group_name,
        email_address: email_address,
        ...params.row,
      };

      // const result = await fetch(urlGroup + id + '/', groupOptions)
      // .then(response => response.json())
      // .then(data => {
      //     console.log(data)
      //     console.log('no errors');
      //     setSuccess(true);
      //     setRowId(null);
      // })
      // .catch(err => console.log(err));
      const result = await fetchOne(urlGroup + id + '/', 'put', body);
      setSuccess(true);
      setRowId(null);
      getData();
      setIsLoading(false);
      dataSaved('Data updated successfully');
    }, 1000);
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId, params.id, success]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(false);
    }, 2000);
    //   console.log('useEffect running');

    return () => {
      clearTimeout(timer);
    };
  }, [success]);

  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      {success ? (
        <Tooltip title='Successfully saved'>
          <Fab
            color='primary'
            sx={{
              width: 40,
              height: 40,
              bgcolor: indigo[500],
              '&:hover': { bgcolor: indigo[700] },
            }}
          >
            <Check />
          </Fab>
        </Tooltip>
      ) : (
        <Tooltip title='Save edits'>
          <span>
            <Fab
              color='primary'
              sx={{
                width: 40,
                height: 40,
              }}
              disabled={params.id !== rowId || loading}
              onClick={handleSubmit}
            >
              <Save />
            </Fab>
          </span>
        </Tooltip>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: indigo[100],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default DataActions;
