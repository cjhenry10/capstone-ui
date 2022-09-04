import * as React from 'react';
import { Card, CardContent, Grid, TextField, Button, Typography, } from '@mui/material';
import { deepPurple, indigo, } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const theme = createTheme({
    palette: {
      mode: 'dark',
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



export default function SignUpForm() {
  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Typography gutterTop variant="h3" align="center" my={5}>Help Desk Wizard</Typography>
    <Card sx={{ maxWidth: 760, mx: 'auto' }} variant="outlined">
        <CardContent>
            <Typography mb={2} variant="h5" align="center">Create an Account</Typography>

            <form>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        required fullWidth
                        name="first_name"
                        label="First Name"
                        placeholder="Enter first name"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        required fullWidth
                        name="last_name"
                        label="Last Name"
                        placeholder="Enter last name"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        required fullWidth
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="email@example.com"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth
                        name="company"
                        label="Company"
                        placeholder="Enter company name"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        required fullWidth
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        required fullWidth
                        name="password"
                        type="password"
                        label="Confirm Password"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} spacing={3}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
                </Grid>
            </Grid>
            </form>
        </CardContent>
    </Card>
</ThemeProvider>
  );
}
