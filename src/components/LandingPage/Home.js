import {
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
} from '@mui/material';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../Icons/Logo';

export default function Home({theme}) {
  let navigate = useNavigate();

  const handleGetStartedButton = () => {
    navigate('/signup');
  };

  const handleLoginButton = () => {
    navigate('/login');
  };

  const mode = theme.palette.mode;


  const [iconColor, setIconColor] = useState('');
  // const [buttonColor, setButtonColor] = useState('#b4bbe9');

  useEffect(() => {
    if (mode === 'dark') {
      setIconColor('#fff');
      // setButtonColor('#b4bbe9');
    } else {
      setIconColor('#000');
      // setButtonColor('');
    }
  }, [mode, theme]);
  

  return (
    <Paper sx={{ maxWidth: 1200, mx: 'auto', p: 4 }} elevation={1}>
      {/* <CardContent> */}
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6} sx={{my: 'auto'}}>
          <Typography
            variant='h1'
            align='center'
            sx={{ fontSize: 'clamp(36px, 8vw, 96px)' }}
          >
            Help Desk Wizard
            <Logo color={iconColor} width='0.75em' margin='0 20px' />
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ my: 'auto', ml: 'auto' }}>
          <Typography
            variant='h5'
            sx={{ pb: 1, fontSize: 'clamp(20px, 3vw, 32px)' }}
          >
            Improve customer support through the <b><em>magic</em></b> of an optimized support ticket resolution system.
          </Typography>

          <Box textAlign='center'>
            <Button
              onClick={handleGetStartedButton}
              sx={{ m: 1, maxWidth: '200px' }}
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
            >
              Get Started
            </Button>
            <Button
              onClick={handleLoginButton}
              sx={{ m: 1, maxWidth: '200px' }}
              type='submit'
              variant='outlined'
              color='primary'
              fullWidth
            >
              Log In
            </Button>
          </Box>

        </Grid>
        {/* <Grid item xs={12} sm={3} sx={{my: 'auto'}}> */}

        {/* </Grid> */}

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography mb={2} variant='h6' align='left'>
                Work Notes
                <Logo color={iconColor} width='0.75em' margin='0 20px' />
              </Typography>
              <Typography variant='body1'>
                Leave messages on tickets to denote progress and improve technician communication.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography mb={2} variant='h6' align='left'>
                Groups
                <Logo color={iconColor} width='0.75em' margin='0 20px' />
              </Typography>
              <Typography variant='body1'>
                Create and manage groups of users to stay organized as you grow your business.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography mb={2} variant='h6' align='left'>
                Roles
                <Logo color={iconColor} width='0.75em' margin='0 20px' />
              </Typography>
              <Typography variant='body1'>
                Take advantage of role management to keep control of the resolution process.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* </CardContent> */}
    </Paper>
  );
}
