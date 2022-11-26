import * as React from 'react';
import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';
// import { deepPurple, indigo } from '@mui/material/colors';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
import AuthContext from '../../context/auth-context';

// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: {
//       main: indigo[400],
//       dark: indigo[600],
//     },
//     secondary: {
//       main: deepPurple[600],
//       dark: deepPurple[800],
//     },
//   },
// });

export default function LoginForm() {
  const ctx = useContext(AuthContext);
  const { isLoggedIn } = ctx;
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [formClicked, setFormClicked] = useState(false);

  if (isLoggedIn) {
    return <Navigate to='/tickets' />;
  }

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ctx.onLogin(data.email, data.password)
      .then(() => {
        setFormClicked(true);
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
        // setLoginStatus(false);
      });
  };

  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
    <>
      {/* <Typography variant='h3' align='center' my={5}>
        Help Desk Wizard
      </Typography> */}
      <Card sx={{ maxWidth: 468, mx: 'auto' }} elevation={7}>
        <CardContent>
          <Typography mb={2} variant='h5' align='center'>
            Welcome Back
          </Typography>

          <form onSubmit={(e) => handleSubmit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => handleChange(e)}
                  value={data.email}
                  required
                  fullWidth
                  name='email'
                  type='email'
                  label='Email'
                  placeholder='email@example.com'
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => handleChange(e)}
                  value={data.password}
                  required
                  fullWidth
                  name='password'
                  type='password'
                  label='Password'
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  fullWidth
                >
                  Log In
                </Button>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </form>
          {!ctx.isLoggedIn && formClicked && (
            <Alert severity='error' variant='outlined'>Unrecognized login. Please try again.</Alert>
          )}
        </CardContent>
      </Card>
    </>
  );
}
