import Add from '@mui/icons-material/Add';
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Box,
  Alert,
} from '@mui/material';
import React, { useRef } from 'react';
import useApi from '../../hooks/useApi';

const roles = ['User', 'Technician', 'Admin'];
const urlGroups = 'http://localhost:8000/api/groups/';

const NewUserGroup = ({
  tempRoleData,
  setTempRoleData,
  setAnchorEl,
  setSaveButtonDisabled,
}) => {
  const groupRef = useRef();
  const roleRef = useRef();

  const {data} = useApi(urlGroups);
  const allGroups = [];
  const usedGroups = [];
  let groups = [];
  
  tempRoleData.forEach(group => usedGroups.push(group.group_id));
  
  if (data) {
    data.forEach(group => allGroups.push(group.group_name))
    groups = allGroups.filter(group => !usedGroups.includes(group))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupRef.current.value && roleRef.current.value) {
      setTempRoleData((prev) => [
        ...prev,
        { group_id: groupRef.current.value, role_id: roleRef.current.value },
      ]);
      setAnchorEl(null);
      setSaveButtonDisabled(false);
    }
  };

  if (groups.length === 0) {
    return <div style={{padding: 5}}>
      <Alert severity='error'>No more groups available</Alert>
    </div>
  }

  return (
    <>
      { groups.length !== 0 && <form onSubmit={handleSubmit}>
        <Grid container sx={{ minWidth: 250, p: 2 }} spacing={1}>
          <Grid item xs={6} sm={5}>
            <FormControl sx={{ minWidth: 150, maxWidth: 150 }} variant='filled'>
              <InputLabel>Group</InputLabel>
              <Select inputRef={groupRef} defaultValue=''>
                {groups.map((group) => (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={5}>
            <FormControl sx={{ minWidth: 150, maxWidth: 150 }} variant='filled'>
              <InputLabel>Role</InputLabel>
              <Select inputRef={roleRef} defaultValue=''>
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sx={{ my: 'auto', }} xs={12} sm={2}>
            <IconButton size='large' type='submit'>
              <Add />
            </IconButton>
          </Grid>
        </Grid>
      </form>}
    </>
  );
};

export default NewUserGroup;
