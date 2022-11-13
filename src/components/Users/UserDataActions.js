import React, { useEffect, useState } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import { Box, Tooltip, Fab, Badge } from '@mui/material';

const UserDataActions = ({
  params,
  setRowId,
  setSelectedUserData,
  setEditModalOpen,
}) => {
  const [numGroups, setNumGroups] = useState(0);

  useEffect(() => {
    if (params.row.group_membership) {
      setNumGroups(params.row.group_membership.length);
    } else {
      setNumGroups(0);
    }
  }, [params.row]);

  const handleClick = () => {
    setSelectedUserData(params.row);
    setRowId(params.row.id);
    setEditModalOpen(true);
  };
  return (
    <>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Tooltip title='Edit roles'>
          <Fab
            color='primary'
            sx={{
              width: 40,
              height: 40,
            }}
            onClick={handleClick}
          >
            <Badge color='secondary' badgeContent={numGroups}>
              <GroupsIcon />
            </Badge>
          </Fab>
        </Tooltip>
      </Box>
    </>
  );
};

export default UserDataActions;
