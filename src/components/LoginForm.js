import * as React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
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

  const url = "http://localhost:8000/api/login/";
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [loginStatus, setLoginStatus] = useState(false);

    const [formClicked, setFormClicked] = useState(false);

    if (loginStatus) {
      return (
        <Navigate to="/user_home" />
      );
    }

    const handleChange = (e) => {
        const newData={...data}
        newData[e.target.name] = e.target.value;
        setData(newData);
        console.log(newData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const rawData = JSON.stringify({
            "email": data.email,
            "password": data.password,
        });

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Cookie", "csrftoken=63gZUvpLj0nbjO8lY22YtqGjC3gm5syY9Xy8pbNpKzb6QnVPhmKYKOyL1OZc08TH");
        
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: rawData,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
              console.log(data);
              setFormClicked(true);
              if (data.jwt) setLoginStatus(true);
              console.log("logged in successfully"); 
              localStorage.setItem("loginKey", data.jwt);
            })
            .catch(error => console.log(error));
        
            
        // if (loginStatus) {
        //   console.log("logged in successfully");
        //   return (
        //     <Navigate to="/user_home" />
        //   )
        // }
    }

  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Typography variant="h3" align="center" my={5}>Help Desk Wizard</Typography>
    <Card sx={{ maxWidth: 468, mx: 'auto' }} variant="outlined">
        <CardContent>
            <Typography mb={2} variant="h5" align="center">Welcome Back</Typography>

            <form onSubmit={(e)=>handleSubmit(e)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField 
                        onChange={(e)=>handleChange(e)}
                        value={data.email}
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
                        onChange={(e)=>handleChange(e)}
                        value={data.password}
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
            {!loginStatus && formClicked &&
                <p>Unrecognized username/password. Please try again.</p>
            }
        </CardContent>
    </Card>
</ThemeProvider>
  );
}
