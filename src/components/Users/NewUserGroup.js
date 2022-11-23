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

const urlGroups = 'http://localhost:8000/api/groups/';
const urlRoles = 'http://localhost:8000/api/roles/';

const NewUserGroup = ({
  tempRoleData,
  setTempRoleData,
  setAnchorEl,
  setSaveButtonDisabled,
}) => {
  const groupRef = useRef();
  const roleRef = useRef();

  const {data: groupData} = useApi(urlGroups);
  const {roleData} = useApi(urlRoles);
  const allGroups = [];
  const usedGroups = [];
  let groups = [];
  const roles = [];

  
  tempRoleData.forEach(group => usedGroups.push(group.group_id));
  
  if (groupData) {
    // console.log(groupData)
    groupData.forEach(group => allGroups.push(group.id))
    groups = allGroups.filter(group => !usedGroups.includes(group))
  }
  if (roleData) {
    roleData.forEach(role => roles.push(role.id));
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
