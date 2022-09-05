import * as React from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Card, CardContent, Grid, TextField, Button, Typography, } from '@mui/material';
import { deepPurple, indigo, } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: indigo[400],
        dark: indigo[600]
      },
      secondary: {
        main: deepPurple[600],
        dark: deepPurple[800]
      }
    }
  });



export default function LoginForm() {
  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Typography variant="h3" align="center" my={5}>Help Desk Wizard</Typography>
    <Card sx={{ maxWidth: 468, mx: 'auto' }} variant="outlined">
        <CardContent>
            <Typography mb={2} variant="h5" align="center">Welcome Back</Typography>

            <form>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField 
                        required fullWidth
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="email@example.com"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        required fullWidth
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>Log In</Button>
                </Grid>
                <Grid item xs={12}></Grid>
            </Grid>
            </form>
        </CardContent>
    </Card>
</ThemeProvider>
  );
}
