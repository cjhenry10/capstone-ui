import * as React from 'react';
import { useState } from 'react';
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

export default function SignUpForm() {
    // Axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    const url = "http://localhost:8000/api/register/";
    // const config = { 
    //     headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "application/json",
    //     "Cookie": "csrftoken=63gZUvpLj0nbjO8lY22YtqGjC3gm5syY9Xy8pbNpKzb6QnVPhmKYKOyL1OZc08TH",
    //     } 
    // };
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const newData={...data}
        newData[e.target.name] = e.target.value;
        setData(newData);
        console.log(newData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Axios.post(url,{
        //     "name": data.firstName + " " + data.lastName,
        //     "email": data.email,
        //     "password": data.password,
        // })
        // .then(res=>{
        //     console.log(res.data);
        // })
        const rawData = JSON.stringify({
            "name": data.firstName + " " + data.lastName,
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
            .then(data => console.log(data))
            .catch(error => console.log(error))

    }

  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Typography variant="h3" align="center" my={5}>Help Desk Wizard</Typography>
    <Card sx={{ maxWidth: 760, mx: 'auto' }} variant="outlined">
        <CardContent>
            <Typography mb={2} variant="h5" align="center">Create an Account</Typography>

            <form onSubmit={(e)=>handleSubmit(e)}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        onChange={(e)=>handleChange(e)}
                        value={data.firstName}
                        required fullWidth
                        name="firstName"
                        label="First Name"
                        placeholder="Enter first name"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        onChange={(e)=>handleChange(e)}
                        value={data.lastName}
                        required fullWidth
                        name="lastName"
                        label="Last Name"
                        placeholder="Enter last name"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        required fullWidth
                        onChange={(e)=>handleChange(e)}
                        value={data.email}
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
                        onChange={(e)=>handleChange(e)}
                        value={data.password}
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        required fullWidth
                        onChange={(e)=>handleChange(e)}
                        value={data.confirmPassword}
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
                </Grid>
            </Grid>
            </form>
        </CardContent>
    </Card>
</ThemeProvider>
  );
}
