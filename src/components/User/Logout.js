import { Paper, CardContent, Typography, Button, Grid } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = ({theme}) => {

  const mode = theme.palette.mode;

    const navigate = useNavigate();

    const handleLoginButton = () => {
        navigate('/login');
    }

    const handleHomeButton = () => {
        navigate('/');
    }

    const [buttonColor, setButtonColor] = useState('#ddd');

  useEffect(() => {
    if (mode === 'dark') {
      setButtonColor('#ddd');
    } else {
      setButtonColor('');
    }
  }, [mode, theme]);

  return (
    <Paper sx={{ maxWidth: 468, mx: 'auto', my: 5 }} elevation={6}>
        <CardContent>
        <Typography variant='h5' align='center' mb={4}>
            Log out successful.
            </Typography>
            <Grid container spacing={2}>
            <Button
            onClick={handleHomeButton}
            sx={{mx: 'auto', my: 1, maxWidth: '200px', color: buttonColor}}
                  type='submit'
                  variant='outlined'
                  color='primary'
                  fullWidth
                >
                  Home
                </Button>
                <Button
            onClick={handleLoginButton}
            sx={{mx: 'auto', my: 1,maxWidth: '200px'}}
                  type='submit'
                  variant='contained'
                  color='primary'
                  fullWidth
                >
                  Log In
                </Button>
          
          </Grid>
        </CardContent>
    </Paper>
  )
}

export default Logout